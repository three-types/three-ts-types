import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TiltLoader } from "three/addons/loaders/TiltLoader.js";

let camera, scene, renderer;

init();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 500);

    camera.position.y = 43;
    camera.position.z = 100;

    scene.add(camera);

    const grid = new THREE.GridHelper(50, 50, 0xffffff, 0x555555);
    scene.add(grid);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const loader = new TiltLoader();
    loader.load("./models/tilt/BRUSH_DOME.tilt", function (object) {
        // console.log( object.children.length );
        scene.add(object);
        render();
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", render);
    controls.target.y = camera.position.y;
    controls.update();

    window.addEventListener("resize", onWindowResize);
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
