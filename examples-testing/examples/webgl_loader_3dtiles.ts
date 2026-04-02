import * as THREE from 'three';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { toCreasedNormals } from 'three/addons/utils/BufferGeometryUtils.js';
import { TilesRenderer, GlobeControls, CAMERA_FRAME } from '3d-tiles-renderer';
import { CesiumIonAuthPlugin } from '3d-tiles-renderer/core/plugins';
import { GLTFExtensionsPlugin, TilesFadePlugin, UpdateOnChangePlugin } from '3d-tiles-renderer/three/plugins';

import { EffectMaterial, EffectPass, NormalPass, SMAAEffect } from 'postprocessing';
import {
    CloudsEffect,
    CLOUD_SHAPE_TEXTURE_SIZE,
    CLOUD_SHAPE_DETAIL_TEXTURE_SIZE,
    DEFAULT_LOCAL_WEATHER_URL,
    DEFAULT_SHAPE_URL,
    DEFAULT_SHAPE_DETAIL_URL,
    DEFAULT_TURBULENCE_URL,
} from '@takram/three-clouds';
import { AerialPerspectiveEffect, PrecomputedTexturesGenerator, getSunDirectionECEF } from '@takram/three-atmosphere';
import { STBNLoader, DEFAULT_STBN_URL } from '@takram/three-geospatial';
import { DitheringEffect, LensFlareEffect } from '@takram/three-geospatial-effects';

// Ion key provided by Cesium for use on threejs.org
// A personal Cesium Ion key can be used for development.
const ION_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMTFiZTRmZS1mMWIxLTQ5YzYtYjA4Zi0xYTE0MjFmYzQ5OGYiLCJpZCI6MjY3NzgzLCJpYXQiOjE3MzY0NzQxMDh9.ppGPgpse1lq7QeNyljX7THUyK5w1x_4HksSHSlhe5sY';

let camera, scene, renderer;
let tiles, controls;
let clouds, aerialPerspective;
let _prevTime = 0,
    _deltaTime = 0;

init();

async function init() {
    // camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 1e6);

    // scene
    scene = new THREE.Scene();

    // renderer
    renderer = new THREE.WebGLRenderer({ outputBufferType: THREE.HalfFloatType });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.AgXToneMapping;
    renderer.toneMappingExposure = 10;
    document.body.appendChild(renderer.domElement);

    // loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('jsm/libs/draco/gltf/');
    dracoLoader.setDecoderConfig({ type: 'js' });

    const DEG2RAD = Math.PI / 180;

    // tiles
    class TileCreasedNormalsPlugin {
        processTileModel(scene) {
            scene.traverse(mesh => {
                if (mesh.geometry) {
                    mesh.geometry = toCreasedNormals(mesh.geometry, 30 * DEG2RAD);
                }
            });
        }
    }

    tiles = new TilesRenderer();
    tiles.registerPlugin(new CesiumIonAuthPlugin({ apiToken: ION_KEY, assetId: '2275207', autoRefreshToken: true }));
    tiles.registerPlugin(new GLTFExtensionsPlugin({ dracoLoader }));
    tiles.registerPlugin(new TileCreasedNormalsPlugin());
    tiles.registerPlugin(new TilesFadePlugin());
    tiles.registerPlugin(new UpdateOnChangePlugin());
    tiles.setCamera(camera);
    tiles.setResolutionFromRenderer(camera, renderer);

    scene.add(tiles.group);

    // position camera above Tokyo
    tiles.ellipsoid.getObjectFrame(
        35.6812 * DEG2RAD,
        139.8 * DEG2RAD,
        500,
        -90 * DEG2RAD,
        -10 * DEG2RAD,
        0,
        camera.matrix,
        CAMERA_FRAME,
    );
    camera.matrix.decompose(camera.position, camera.quaternion, camera.scale);

    // controls
    controls = new GlobeControls(scene, camera, renderer.domElement);
    controls.setEllipsoid(tiles.ellipsoid, tiles.group);
    controls.enableDamping = true;

    // Workaround: adjustHeight causes camera drift as tiles load.
    // Disable until first user interaction.
    controls.adjustHeight = false;

    function enableAdjustHeight() {
        controls.adjustHeight = true;
        renderer.domElement.removeEventListener('pointerdown', enableAdjustHeight);
        renderer.domElement.removeEventListener('wheel', enableAdjustHeight);
    }

    renderer.domElement.addEventListener('pointerdown', enableAdjustHeight);
    renderer.domElement.addEventListener('wheel', enableAdjustHeight);

    // sun direction
    const sunDirection = new THREE.Vector3();
    const params = { hourUTC: 0 }; // 0:00 UTC = 9:00 AM Tokyo

    function updateSunDirection() {
        const ms = params.hourUTC * 3600000;
        const date = new Date(Date.UTC(2024, 2, 1) + ms);
        getSunDirectionECEF(date, sunDirection);
        aerialPerspective.sunDirection.copy(sunDirection);
        clouds.sunDirection.copy(sunDirection);
    }

    // aerial perspective (sky + atmosphere + deferred lighting)
    aerialPerspective = new AerialPerspectiveEffect(camera);
    aerialPerspective.sky = true;
    aerialPerspective.sunLight = true;
    aerialPerspective.skyLight = true;

    const normalPass = new NormalPass(scene, camera);
    aerialPerspective.normalBuffer = normalPass.texture;

    // clouds
    clouds = new CloudsEffect(camera);
    clouds.coverage = 0.3;
    clouds.localWeatherVelocity.set(0.001, 0);
    clouds.shadow.farScale = 0.25;
    clouds.shadow.maxFar = 1e5;
    clouds.shadow.cascadeCount = 2;
    clouds.shadow.mapSize.set(512, 512);
    clouds.shadow.splitMode = 'practical';
    clouds.shadow.splitLambda = 0.71;

    // sync cloud shadows to atmosphere
    clouds.events.addEventListener('change', event => {
        if (event.property === 'atmosphereOverlay') aerialPerspective.overlay = clouds.atmosphereOverlay;
        if (event.property === 'atmosphereShadow') aerialPerspective.shadow = clouds.atmosphereShadow;
        if (event.property === 'atmosphereShadowLength') aerialPerspective.shadowLength = clouds.atmosphereShadowLength;
    });

    // adapter: bridges pmndrs postprocessing passes to renderer.setEffects()

    class EffectPassAdapter {
        constructor(pass) {
            this.pass = pass;
            this.needsSwap = pass.needsSwap !== false;
            this.enabled = true;
            this._initialized = false;
        }

        render(renderer, writeBuffer, readBuffer) {
            if (!this._initialized) {
                this.pass.initialize(renderer, false, THREE.HalfFloatType);
                this.pass.setSize(readBuffer.width, readBuffer.height);

                if (readBuffer.depthTexture && this.pass.setDepthTexture) {
                    this.pass.setDepthTexture(readBuffer.depthTexture);
                }

                this._initialized = true;
            }

            if (this.pass.fullscreenMaterial instanceof EffectMaterial) {
                this.pass.fullscreenMaterial.adoptCameraSettings(camera);
            }

            this.pass.render(renderer, readBuffer, writeBuffer, _deltaTime);
        }

        setSize(width, height) {
            if (this._initialized) this.pass.setSize(width, height);
        }
    }

    // postprocessing
    renderer.setEffects([
        new EffectPassAdapter(normalPass),
        new EffectPassAdapter(new EffectPass(camera, clouds, aerialPerspective)),
        new EffectPassAdapter(new EffectPass(camera, new LensFlareEffect())),
        new EffectPassAdapter(new EffectPass(camera, new SMAAEffect())),
        new EffectPassAdapter(new EffectPass(camera, new DitheringEffect())),
    ]);

    // generate precomputed atmosphere textures on GPU
    const texturesGenerator = new PrecomputedTexturesGenerator(renderer);
    const textures = await texturesGenerator.update();
    Object.assign(aerialPerspective, textures);
    Object.assign(clouds, textures);

    // load cloud textures
    const textureLoader = new THREE.TextureLoader();

    function loadCloudTexture(url, property) {
        textureLoader.load(url, texture => {
            texture.minFilter = THREE.LinearMipMapLinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.colorSpace = THREE.NoColorSpace;
            texture.needsUpdate = true;
            clouds[property] = texture;
        });
    }

    loadCloudTexture(DEFAULT_LOCAL_WEATHER_URL, 'localWeatherTexture');
    loadCloudTexture(DEFAULT_TURBULENCE_URL, 'turbulenceTexture');

    function loadData3DTexture(url, size, property) {
        fetch(url)
            .then(res => res.arrayBuffer())
            .then(buffer => {
                const data = new Uint8Array(buffer);
                const texture = new THREE.Data3DTexture(data, size, size, size);
                texture.format = THREE.RedFormat;
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.wrapR = THREE.RepeatWrapping;
                texture.colorSpace = THREE.NoColorSpace;
                texture.needsUpdate = true;
                clouds[property] = texture;
            });
    }

    loadData3DTexture(DEFAULT_SHAPE_URL, CLOUD_SHAPE_TEXTURE_SIZE, 'shapeTexture');
    loadData3DTexture(DEFAULT_SHAPE_DETAIL_URL, CLOUD_SHAPE_DETAIL_TEXTURE_SIZE, 'shapeDetailTexture');

    new STBNLoader().load(DEFAULT_STBN_URL, texture => {
        clouds.stbnTexture = texture;
        aerialPerspective.stbnTexture = texture;
    });

    // initial sun position
    updateSunDirection();

    document.getElementById('hour').addEventListener('input', e => {
        params.hourUTC = parseFloat(e.target.value);
        updateSunDirection();
    });

    // start rendering
    renderer.setAnimationLoop(animate);

    window.addEventListener('resize', onWindowResize);
    onWindowResize();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    tiles.setResolutionFromRenderer(camera, renderer);
}

function animate(time) {
    _deltaTime = (time - _prevTime) / 1000;
    _prevTime = time;

    controls.update();
    tiles.update();

    renderer.render(scene, camera);
}
