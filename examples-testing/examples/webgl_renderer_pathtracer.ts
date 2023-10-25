import * as THREE from 'three';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { LDrawLoader } from 'three/addons/loaders/LDrawLoader.js';
import { LDrawUtils } from 'three/addons/utils/LDrawUtils.js';
import { FullScreenQuad } from 'three/addons/postprocessing/Pass.js';

import {
    PhysicalPathTracingMaterial,
    PathTracingRenderer,
    MaterialReducer,
    BlurredEnvMapGenerator,
    PathTracingSceneGenerator,
    GradientEquirectTexture,
} from 'three-gpu-pathtracer';

let progressBarDiv, samplesEl;
let camera, scene, renderer, controls, gui;
let pathTracer, sceneInfo, fsQuad, floor;
let delaySamples = 0;

const params = {
    enable: true,
    toneMapping: true,
    pause: false,
    tiles: 3,
    transparentBackground: false,
    resolutionScale: 1,
    download: () => {
        const link = document.createElement('a');
        link.download = 'pathtraced-render.png';
        link.href = renderer.domElement.toDataURL().replace('image/png', 'image/octet-stream');
        link.click();
    },
    roughness: 0.15,
    metalness: 0.9,
};

init();
render();

function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(150, 200, 250);

    // initialize the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, premultipliedAlpha: false });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.setClearColor(0xdddddd);
    document.body.appendChild(renderer.domElement);

    // initialize the pathtracer
    pathTracer = new PathTracingRenderer(renderer);
    pathTracer.alpha = true;
    pathTracer.tiles.set(params.tiles, params.tiles);
    pathTracer.material = new PhysicalPathTracingMaterial();
    pathTracer.material.setDefine('FEATURE_MIS', 1);

    const gradientMap = new GradientEquirectTexture();
    gradientMap.topColor.set(0xeeeeee);
    gradientMap.bottomColor.set(0xeaeaea);
    gradientMap.update();

    pathTracer.material.backgroundMap = gradientMap;
    pathTracer.camera = camera;

    fsQuad = new FullScreenQuad(
        new THREE.MeshBasicMaterial({
            map: pathTracer.target.texture,
            blending: THREE.CustomBlending,
        }),
    );

    // scene
    scene = new THREE.Scene();

    controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', () => {
        delaySamples = 5;
        pathTracer.reset();
    });

    window.addEventListener('resize', onWindowResize);
    onWindowResize();

    progressBarDiv = document.createElement('div');
    progressBarDiv.innerText = 'Loading...';
    progressBarDiv.style.fontSize = '3em';
    progressBarDiv.style.color = '#888';
    progressBarDiv.style.display = 'block';
    progressBarDiv.style.position = 'absolute';
    progressBarDiv.style.top = '50%';
    progressBarDiv.style.width = '100%';
    progressBarDiv.style.textAlign = 'center';

    // load materials and then the model
    createGUI();

    loadModel();
}

async function loadModel() {
    progressBarDiv.innerText = 'Loading...';

    let model = null;
    let envMap = null;

    updateProgressBar(0);
    showProgressBar();

    // only smooth when not rendering with flat colors to improve processing time
    const ldrawPromise = new LDrawLoader()
        .setPath('models/ldraw/officialLibrary/')
        .loadAsync('models/7140-1-X-wingFighter.mpd_Packed.mpd', onProgress)
        .then(function (legoGroup) {
            legoGroup = LDrawUtils.mergeObject(legoGroup);
            legoGroup.rotation.x = Math.PI;

            // adjust the materials to use transmission, be a bit shinier
            legoGroup.traverse(c => {
                if (c.material) {
                    c.material.roughness *= 0.25;

                    if (c.material.opacity < 1.0) {
                        const oldMaterial = c.material;
                        const newMaterial = new THREE.MeshPhysicalMaterial();

                        newMaterial.opacity = 1.0;
                        newMaterial.transmission = 1.0;
                        newMaterial.ior = 1.4;
                        newMaterial.roughness = oldMaterial.roughness;
                        newMaterial.metalness = 0.0;

                        const hsl = {};
                        oldMaterial.color.getHSL(hsl);
                        hsl.l = Math.max(hsl.l, 0.35);
                        newMaterial.color.setHSL(hsl.h, hsl.s, hsl.l);

                        c.material = newMaterial;
                    }
                }
            });

            model = new THREE.Group();
            model.add(legoGroup);

            // Convert from LDraw coordinates: rotate 180 degrees around OX
            model.updateMatrixWorld();
        })
        .catch(onError);

    const envMapPromise = new RGBELoader()
        .setPath('textures/equirectangular/')
        .loadAsync('royal_esplanade_1k.hdr')
        .then(tex => {
            const envMapGenerator = new BlurredEnvMapGenerator(renderer);
            const blurredEnvMap = envMapGenerator.generate(tex, 0);

            scene.environment = blurredEnvMap;
            envMap = blurredEnvMap;
        });

    await Promise.all([envMapPromise, ldrawPromise]);

    hideProgressBar();
    document.body.classList.add('checkerboard');

    // Adjust camera
    const bbox = new THREE.Box3().setFromObject(model);
    const size = bbox.getSize(new THREE.Vector3());
    const radius = Math.max(size.x, Math.max(size.y, size.z)) * 0.4;

    controls.target0.copy(bbox.getCenter(new THREE.Vector3()));
    controls.position0.set(2.3, 1, 2).multiplyScalar(radius).add(controls.target0);
    controls.reset();

    // add floor
    floor = new THREE.Mesh(
        new THREE.PlaneGeometry(),
        new THREE.MeshStandardMaterial({
            side: THREE.DoubleSide,
            roughness: 0.01,
            metalness: 1,
            map: generateRadialFloorTexture(1024),
            transparent: true,
        }),
    );
    floor.scale.setScalar(2500);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = bbox.min.y;
    model.add(floor);
    model.updateMatrixWorld();

    // de-duplicate and reduce the number of materials used in place
    const reducer = new MaterialReducer();
    reducer.process(model);

    // reset the progress bar to display bvh generation
    progressBarDiv.innerText = 'Generating BVH...';
    updateProgressBar(0);

    const generator = new PathTracingSceneGenerator();
    const result = generator.generate(model);

    // add the model to the scene
    sceneInfo = result;
    sceneInfo.scene.traverse(c => {
        if (c.isLineSegments) {
            c.visible = false;
        }
    });
    scene.add(sceneInfo.scene);

    // update the material
    const { bvh, textures, materials } = result;
    const geometry = bvh.geometry;
    const material = pathTracer.material;

    material.bvh.updateFrom(bvh);
    material.attributesArray.updateFrom(
        geometry.attributes.normal,
        geometry.attributes.tangent,
        geometry.attributes.uv,
        geometry.attributes.color,
    );
    material.materialIndexAttribute.updateFrom(geometry.attributes.materialIndex);
    material.textures.setTextures(renderer, 2048, 2048, textures);
    material.materials.updateFrom(materials, textures);
    pathTracer.material.envMapInfo.updateFrom(envMap);
    pathTracer.reset();
}

function onWindowResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const scale = params.resolutionScale;
    const dpr = window.devicePixelRatio;

    pathTracer.setSize(w * scale * dpr, h * scale * dpr);
    pathTracer.reset();

    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio * scale);

    const aspect = w / h;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
}

function createGUI() {
    if (gui) {
        gui.destroy();
    }

    gui = new GUI();
    gui.add(params, 'enable');
    gui.add(params, 'pause');
    gui.add(params, 'toneMapping');
    gui.add(params, 'transparentBackground').onChange(v => {
        pathTracer.material.backgroundAlpha = v ? 0 : 1;
        renderer.setClearAlpha(v ? 0 : 1);
        pathTracer.reset();
    });
    gui.add(params, 'resolutionScale', 0.1, 1.0, 0.1).onChange(onWindowResize);
    gui.add(params, 'tiles', 1, 3, 1).onChange(v => {
        pathTracer.tiles.set(v, v);
    });
    gui.add(params, 'roughness', 0, 1)
        .name('floor roughness')
        .onChange(() => {
            pathTracer.reset();
        });
    gui.add(params, 'metalness', 0, 1)
        .name('floor metalness')
        .onChange(() => {
            pathTracer.reset();
        });
    gui.add(params, 'download').name('download image');

    const renderFolder = gui.addFolder('Render');

    samplesEl = document.createElement('div');
    samplesEl.classList.add('gui-render');
    samplesEl.innerText = 'samples: 0';

    renderFolder.$children.appendChild(samplesEl);
    renderFolder.open();
}

//

function render() {
    requestAnimationFrame(render);

    if (!sceneInfo) {
        return;
    }

    renderer.toneMapping = params.toneMapping ? THREE.ACESFilmicToneMapping : THREE.NoToneMapping;

    if (pathTracer.samples < 1.0 || !params.enable) {
        renderer.render(scene, camera);
    }

    if (params.enable && delaySamples === 0) {
        const samples = Math.floor(pathTracer.samples);
        samplesEl.innerText = `samples: ${samples}`;

        floor.material.roughness = params.roughness;
        floor.material.metalness = params.metalness;

        pathTracer.material.materials.updateFrom(sceneInfo.materials, sceneInfo.textures);
        pathTracer.material.filterGlossyFactor = 1;
        pathTracer.material.physicalCamera.updateFrom(camera);

        camera.updateMatrixWorld();

        if (!params.pause || pathTracer.samples < 1) {
            pathTracer.update();
        }

        renderer.autoClear = false;
        fsQuad.render(renderer);
        renderer.autoClear = true;
    } else if (delaySamples > 0) {
        delaySamples--;
    }

    samplesEl.innerText = `samples: ${Math.floor(pathTracer.samples)}`;
}

function onProgress(xhr) {
    if (xhr.lengthComputable) {
        updateProgressBar(xhr.loaded / xhr.total);

        console.log(Math.round((xhr.loaded / xhr.total) * 100, 2) + '% downloaded');
    }
}

function onError(error) {
    const message = 'Error loading model';
    progressBarDiv.innerText = message;
    console.log(message);
    console.error(error);
}

function showProgressBar() {
    document.body.appendChild(progressBarDiv);
}

function hideProgressBar() {
    document.body.removeChild(progressBarDiv);
}

function updateProgressBar(fraction) {
    progressBarDiv.innerText = 'Loading... ' + Math.round(fraction * 100, 2) + '%';
}

function generateRadialFloorTexture(dim) {
    const data = new Uint8Array(dim * dim * 4);

    for (let x = 0; x < dim; x++) {
        for (let y = 0; y < dim; y++) {
            const xNorm = x / (dim - 1);
            const yNorm = y / (dim - 1);

            const xCent = 2.0 * (xNorm - 0.5);
            const yCent = 2.0 * (yNorm - 0.5);
            let a = Math.max(Math.min(1.0 - Math.sqrt(xCent ** 2 + yCent ** 2), 1.0), 0.0);
            a = a ** 1.5;
            a = a * 1.5;
            a = Math.min(a, 1.0);

            const i = y * dim + x;
            data[i * 4 + 0] = 255;
            data[i * 4 + 1] = 255;
            data[i * 4 + 2] = 255;
            data[i * 4 + 3] = a * 255;
        }
    }

    const tex = new THREE.DataTexture(data, dim, dim);
    tex.format = THREE.RGBAFormat;
    tex.type = THREE.UnsignedByteType;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.needsUpdate = true;
    return tex;
}
