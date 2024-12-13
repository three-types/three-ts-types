import * as THREE from 'three';
import { pass } from 'three/tsl';
import { sobel } from 'three/addons/tsl/display/SobelOperatorNode.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let camera, scene, renderer;
let postProcessing;

const params = {
    enable: true,
};

init();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1, 3);
    camera.lookAt(scene.position);

    //

    const ambientLight = new THREE.AmbientLight(0xe7e7e7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 20);
    camera.add(pointLight);
    scene.add(camera);

    //

    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 256, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0xffff00 });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //

    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    document.body.appendChild(renderer.domElement);

    //

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;

    // postprocessing

    postProcessing = new THREE.PostProcessing(renderer);

    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode();

    postProcessing.outputNode = sobel(scenePassColor);

    //

    const gui = new GUI();

    gui.add(params, 'enable');
    gui.open();

    //

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    if (params.enable === true) {
        postProcessing.render();
    } else {
        renderer.render(scene, camera);
    }
}
