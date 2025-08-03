import * as THREE from 'three/webgpu';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

let camera, scene, renderer;

init();

async function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 5);
    camera.position.set(0.1, 0.05, 0.15);

    scene = new THREE.Scene();

    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(render);
    renderer.toneMapping = THREE.ReinhardToneMapping; // TODO: Add THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1;
    container.appendChild(renderer.domElement);

    const rgbeLoader = await new RGBELoader()
        .setPath('textures/equirectangular/')
        .loadAsync('pedestrian_overpass_1k.hdr');
    rgbeLoader.mapping = THREE.EquirectangularReflectionMapping;

    scene = new THREE.Scene();
    scene.backgroundBlurriness = 0.5;
    scene.environment = rgbeLoader;
    scene.background = rgbeLoader;

    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync('models/gltf/DispersionTest.glb');

    scene.add(gltf.scene);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 0.1;
    controls.maxDistance = 10;
    controls.target.set(0, 0, 0);
    controls.update();

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function render() {
    renderer.render(scene, camera);
}
