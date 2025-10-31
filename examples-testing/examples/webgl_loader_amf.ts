import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { AMFLoader } from 'three/addons/loaders/AMFLoader.js';

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;

init();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x999999);

    scene.add(new THREE.AmbientLight(0x999999));

    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 500);

    // Z is up for objects intended to be 3D printed.

    camera.up.set(0, 0, 1);
    camera.position.set(0, -9, 6);

    camera.add(new THREE.PointLight(0xffffff, 250));

    scene.add(camera);

    const grid = new THREE.GridHelper(50, 50, 0xffffff, 0x555555);
    grid.rotateOnAxis(new THREE.Vector3(1, 0, 0), 90 * (Math.PI / 180));
    scene.add(grid);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const loader = new AMFLoader();
    loader.load('./models/amf/rook.amf', function (amfobject) {
        scene.add(amfobject);
        render();
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    controls.target.set(0, 0, 2);
    controls.enableZoom = false;
    controls.update();

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();
}

function render() {
    renderer.render(scene, camera);
}
