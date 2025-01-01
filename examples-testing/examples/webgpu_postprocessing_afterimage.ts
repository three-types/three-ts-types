import * as THREE from 'three';
import { pass } from 'three/tsl';
import { afterImage } from 'three/addons/tsl/display/AfterImageNode.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let camera, scene, renderer;
let mesh, postProcessing, combinedPass;

const params = {
    damp: 0.96,
};

init();
createGUI();

function init() {
    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 1, 1000);

    const geometry = new THREE.TorusKnotGeometry(100, 30, 100, 16);
    const material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // postprocessing

    postProcessing = new THREE.PostProcessing(renderer);

    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode();

    combinedPass = scenePassColor;
    combinedPass = afterImage(combinedPass, params.damp);

    postProcessing.outputNode = combinedPass;

    window.addEventListener('resize', onWindowResize);
}

function createGUI() {
    const gui = new GUI({ title: 'Damp setting' });
    gui.add(combinedPass.damp, 'value', 0, 1).step(0.001);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
    mesh.rotation.x += 0.0075;
    mesh.rotation.y += 0.015;

    postProcessing.render();
}

function animate() {
    render();
}
