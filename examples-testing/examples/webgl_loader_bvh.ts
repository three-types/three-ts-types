import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { BVHLoader } from 'three/addons/loaders/BVHLoader.js';

const timer = new THREE.Timer();
timer.connect(document);

let camera, controls, scene, renderer;
let mixer;

init();

const loader = new BVHLoader();
loader.load('models/bvh/pirouette.bvh', function (result) {
    const skeletonHelper = new THREE.SkeletonHelper(result.skeleton.bones[0]);

    scene.add(result.skeleton.bones[0]);
    scene.add(skeletonHelper);

    // play animation
    mixer = new THREE.AnimationMixer(result.skeleton.bones[0]);
    mixer.clipAction(result.clip).play();
});

function init() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 200, 300);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    scene.add(new THREE.GridHelper(400, 10));

    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 300;
    controls.maxDistance = 700;

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    timer.update();

    const delta = timer.getDelta();

    if (mixer) mixer.update(delta);

    renderer.render(scene, camera);
}
