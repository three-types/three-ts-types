import * as THREE from 'three';
import { normalWorld, uniform, normalView, positionViewDirection, cameraViewMatrix, pmremTexture } from 'three/tsl';

import { RGBMLoader } from 'three/addons/loaders/RGBMLoader.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let camera, scene, renderer;

init();

async function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
    camera.position.set(-1.8, 0.6, 2.7);

    scene = new THREE.Scene();

    const forceWebGL = false;

    renderer = new THREE.WebGPURenderer({ antialias: true, forceWebGL });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    await renderer.init();

    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render); // use if there is no animation loop
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.update();

    new RGBMLoader()
        .setPath('./textures/cube/pisaRGBM16/')
        .loadCubemap(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], function (map) {
            const reflectVec = positionViewDirection.negate().reflect(normalView).transformDirection(cameraViewMatrix);

            const pmremRoughness = uniform(0.5);
            const pmremNode = pmremTexture(map, reflectVec, pmremRoughness);

            scene.backgroundNode = pmremTexture(map, normalWorld, pmremRoughness);

            scene.add(
                new THREE.Mesh(
                    new THREE.SphereGeometry(0.5, 64, 64),
                    new THREE.MeshBasicNodeMaterial({ colorNode: pmremNode }),
                ),
            );

            // gui

            const gui = new GUI();
            gui.add(pmremRoughness, 'value', 0, 1, 0.001)
                .name('roughness')
                .onChange(() => render());

            render();
        });

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();
}

//

function render() {
    renderer.render(scene, camera);
}
