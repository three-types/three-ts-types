import * as THREE from 'three/webgpu';

import { texture, uniform, uv } from 'three/tsl';

import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';

//

let camera: THREE.PerspectiveCamera,
    scene: THREE.Scene,
    mesh: THREE.Mesh,
    renderer: THREE.WebGPURenderer,
    clock: THREE.Clock;

const depth = uniform(0);

const planeWidth = 50;
const planeHeight = 25;

let depthStep = 1;

init();

async function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 70;

    scene = new THREE.Scene();

    //
    clock = new THREE.Clock();

    renderer = new THREE.WebGPURenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    await renderer.init();

    //

    const ktx2Loader = new KTX2Loader();
    ktx2Loader.setTranscoderPath('jsm/libs/basis/');
    ktx2Loader.detectSupport(renderer);

    ktx2Loader.load('textures/spiritedaway.ktx2', function (texturearray) {
        const material = new THREE.NodeMaterial();

        material.colorNode = texture(texturearray, uv().flipY()).depth(depth);
        const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);

        mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh);
    });

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    if (mesh) {
        const delta = clock.getDelta() * 10;

        depthStep += delta;

        const value = depthStep % 5;

        depth.value = value;
    }

    render();
}

function render() {
    renderer.render(scene, camera);
}
