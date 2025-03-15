import * as THREE from 'three/webgpu';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

let renderer: THREE.WebGPURenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera, controls: OrbitControls;

init().catch(function (err) {
    console.error(err);
});

async function init() {
    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setAnimationLoop(render);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.05, 20);
    camera.position.set(0.35, 0.05, 0.35);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = -0.5;
    controls.target.set(0, 0.2, 0);
    controls.update();

    const rgbeLoader = new RGBELoader().setPath('textures/equirectangular/');

    const gltfLoader = new GLTFLoader().setPath('models/gltf/');

    const [texture, gltf] = await Promise.all([
        rgbeLoader.loadAsync('venice_sunset_1k.hdr'),
        gltfLoader.loadAsync('IridescenceLamp.glb'),
    ]);

    // environment

    texture.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = texture;
    scene.environment = texture;

    // model

    scene.add(gltf.scene);

    render();

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();
}

function render() {
    controls.update();
    renderer.render(scene, camera);
}
