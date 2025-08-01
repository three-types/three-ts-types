import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { USDLoader } from 'three/addons/loaders/USDLoader.js';

let camera, scene, renderer;

init();

async function init() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0.75, -1.5);

    scene = new THREE.Scene();

    const rgbeLoader = new RGBELoader().setPath('textures/equirectangular/');

    const usdzLoader = new USDLoader().setPath('models/usdz/');

    const [texture, model] = await Promise.all([
        rgbeLoader.loadAsync('venice_sunset_1k.hdr'),
        usdzLoader.loadAsync('saeukkang.usdz'),
    ]);

    // environment

    texture.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = texture;
    scene.backgroundBlurriness = 0.5;
    scene.environment = texture;

    // model

    model.position.y = 0.25;
    model.position.z = -0.25;
    scene.add(model);

    // renderer

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.0;
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 8;
    // controls.target.y = 15;
    // controls.update();

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.render(scene, camera);
}
