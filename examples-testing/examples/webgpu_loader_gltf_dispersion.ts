import * as THREE from 'three/webgpu';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGPURenderer;

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

    const hdrTexture = await new HDRLoader()
        .setPath('textures/equirectangular/')
        .loadAsync('pedestrian_overpass_1k.hdr');
    hdrTexture.mapping = THREE.EquirectangularReflectionMapping;

    scene = new THREE.Scene();
    scene.backgroundBlurriness = 0.5;
    scene.environment = hdrTexture;
    scene.background = hdrTexture;

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
