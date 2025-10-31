import * as THREE from 'three';

import { XYZLoader } from 'three/addons/loaders/XYZLoader.js';

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer, clock: THREE.Clock;

let points: THREE.Points;

init();

function init() {
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(10, 7, 10);

    scene = new THREE.Scene();
    scene.add(camera);
    camera.lookAt(scene.position);

    clock = new THREE.Clock();

    const loader = new XYZLoader();
    loader.load('models/xyz/helix_201.xyz', function (geometry) {
        geometry.center();

        const vertexColors = geometry.hasAttribute('color') === true;

        const material = new THREE.PointsMaterial({ size: 0.1, vertexColors: vertexColors });

        points = new THREE.Points(geometry, material);
        scene.add(points);
    });

    //

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    //

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    const delta = clock.getDelta();

    if (points) {
        points.rotation.x += delta * 0.2;
        points.rotation.y += delta * 0.5;
    }

    renderer.render(scene, camera);
}
