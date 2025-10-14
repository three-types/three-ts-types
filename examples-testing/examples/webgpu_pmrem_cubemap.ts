import * as THREE from 'three/webgpu';
import {
    normalWorldGeometry,
    uniform,
    normalView,
    positionViewDirection,
    cameraViewMatrix,
    pmremTexture,
} from 'three/tsl';

import { HDRCubeTextureLoader } from 'three/addons/loaders/HDRCubeTextureLoader.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { Inspector } from 'three/addons/inspector/Inspector.js';

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
    renderer.setAnimationLoop(render);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.inspector = new Inspector();

    //await renderer.init();

    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render); // use if there is no animation loop
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.update();

    new HDRCubeTextureLoader()
        .setPath('./textures/cube/pisaHDR/')
        .load(['px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr'], function (map) {
            const reflectVec = positionViewDirection.negate().reflect(normalView).transformDirection(cameraViewMatrix);

            const pmremRoughness = uniform(0.5);
            const pmremNode = pmremTexture(map, reflectVec, pmremRoughness);

            scene.backgroundNode = pmremTexture(map, normalWorldGeometry, pmremRoughness);

            scene.add(
                new THREE.Mesh(
                    new THREE.SphereGeometry(0.5, 64, 64),
                    new THREE.MeshBasicNodeMaterial({ colorNode: pmremNode }),
                ),
            );

            // gui

            const gui = renderer.inspector.createParameters('Settings');
            gui.add(pmremRoughness, 'value', 0, 1, 0.001)
                .name('roughness')
                .onChange(() => render());
        });

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
