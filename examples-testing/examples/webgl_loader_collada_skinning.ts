import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

import { ColladaLoader } from 'three/addons/loaders/ColladaLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let container: HTMLElement, stats: Stats, clock: THREE.Clock, controls: OrbitControls;
let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer, mixer: THREE.AnimationMixer;

init();

function init() {
    container = document.getElementById('container')!;

    camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(15, 10, -15);

    scene = new THREE.Scene();

    clock = new THREE.Clock();

    // collada

    const loader = new ColladaLoader();
    loader.load('./models/collada/stormtrooper/stormtrooper.dae', function (collada) {
        const avatar = collada.scene;
        const animations = avatar.animations;

        mixer = new THREE.AnimationMixer(avatar);
        mixer.clipAction(animations[0]).play();

        scene.add(avatar);
    });

    //

    const gridHelper = new THREE.GridHelper(10, 20, 0xc1c1c1, 0x8d8d8d);
    scene.add(gridHelper);

    //

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(1.5, 1, -1.5);
    scene.add(directionalLight);

    //

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    //

    controls = new OrbitControls(camera, renderer.domElement);
    controls.screenSpacePanning = true;
    controls.minDistance = 5;
    controls.maxDistance = 40;
    controls.target.set(0, 2, 0);
    controls.update();

    //

    stats = new Stats();
    container.appendChild(stats.dom);

    //

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    render();
    stats.update();
}

function render() {
    const delta = clock.getDelta();

    if (mixer !== undefined) {
        mixer.update(delta);
    }

    renderer.render(scene, camera);
}
