import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { TilesRenderer, GlobeControls } from '3d-tiles-renderer';
import {
    CesiumIonAuthPlugin,
    GLTFExtensionsPlugin,
    TilesFadePlugin,
    UpdateOnChangePlugin,
} from '3d-tiles-renderer/plugins';

// Ion key provided by Cesium for use on threejs.org
// A personal Cesium Ion key can be used for development.
const ION_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMTFiZTRmZS1mMWIxLTQ5YzYtYjA4Zi0xYTE0MjFmYzQ5OGYiLCJpZCI6MjY3NzgzLCJpYXQiOjE3MzY0NzQxMDh9.ppGPgpse1lq7QeNyljX7THUyK5w1x_4HksSHSlhe5sY';

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
let tiles: TilesRenderer, controls: GlobeControls;

init();

function init() {
    // camera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100);
    camera.position.set(-1, 1, 1).normalize().multiplyScalar(10);
    camera.position.set(-8000000, 10000000, -14720000);
    camera.lookAt(0, 0, 0);

    // scene
    scene = new THREE.Scene();

    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    // loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('jsm/libs/draco/');
    dracoLoader.setDecoderConfig({ type: 'js' });

    // tiles
    tiles = new TilesRenderer();
    tiles.registerPlugin(new CesiumIonAuthPlugin({ apiToken: ION_KEY, assetId: '2275207', autoRefreshToken: true }));
    tiles.registerPlugin(new GLTFExtensionsPlugin({ dracoLoader }));
    tiles.registerPlugin(new TilesFadePlugin());
    tiles.registerPlugin(new UpdateOnChangePlugin());
    tiles.setCamera(camera);
    tiles.setResolutionFromRenderer(camera, renderer);
    scene.add(tiles.group);

    // rotate the globe so the north pole is up
    tiles.group.rotation.x = -Math.PI / 2;

    // controls
    controls = new GlobeControls(scene, camera, renderer.domElement, tiles);
    controls.enableDamping = true;

    window.addEventListener('resize', onWindowResize);
    onWindowResize();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    tiles.setResolutionFromRenderer(camera, renderer);
}

function animate() {
    controls.update();
    tiles.update();

    renderer.render(scene, camera);
}
