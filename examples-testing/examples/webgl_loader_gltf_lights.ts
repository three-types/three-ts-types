import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let camera, scene, renderer;

const params = {
    punctualLightsEnabled: true,
};

init().then(render);

async function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
    camera.position.set(-2, 1.5, 3);

    scene = new THREE.Scene();

    const rgbeLoader = new RGBELoader();
    const envMap = await rgbeLoader.loadAsync('textures/equirectangular/moonless_golf_1k.hdr ');
    envMap.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = envMap;
    scene.environment = envMap;

    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync('models/gltf/LightsPunctualLamp.glb');

    scene.add(gltf.scene);

    const gui = new GUI();

    gui.add(params, 'punctualLightsEnabled').onChange(toggleLights);
    gui.open();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render); // use if there is no animation loop
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.target.set(0, 1, 0);
    controls.update();

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();
}

function toggleLights(visible) {
    scene.traverse(function (object) {
        if (object.isLight) {
            object.visible = visible;
        }
    });

    render();
}

//

function render() {
    renderer.render(scene, camera);
}
