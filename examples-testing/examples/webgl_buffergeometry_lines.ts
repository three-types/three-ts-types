import * as THREE from 'three';

import { Timer } from 'three/addons/misc/Timer.js';
import Stats from 'three/addons/libs/stats.module.js';

let container: HTMLElement, stats: Stats, timer: Timer;

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;

let line: THREE.Line;

const segments = 10000;
const r = 800;
let t = 0;

init();

function init() {
    container = document.getElementById('container')!;

    //

    camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 1, 4000);
    camera.position.z = 2750;

    scene = new THREE.Scene();

    timer = new Timer();
    timer.connect(document);

    const geometry = new THREE.BufferGeometry();
    const material = new THREE.LineBasicMaterial({ vertexColors: true });

    const positions = [];
    const colors = [];

    for (let i = 0; i < segments; i++) {
        const x = Math.random() * r - r / 2;
        const y = Math.random() * r - r / 2;
        const z = Math.random() * r - r / 2;

        // positions

        positions.push(x, y, z);

        // colors

        colors.push(x / r + 0.5);
        colors.push(y / r + 0.5);
        colors.push(z / r + 0.5);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    generateMorphTargets(geometry);

    geometry.computeBoundingSphere();

    line = new THREE.Line(geometry, material);
    scene.add(line);

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);

    container.appendChild(renderer.domElement);

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

//

function animate() {
    timer.update();

    const delta = timer.getDelta();
    const time = timer.getElapsed();

    line.rotation.x = time * 0.25;
    line.rotation.y = time * 0.5;

    t += delta * 0.5;
    line.morphTargetInfluences![0] = Math.abs(Math.sin(t));

    renderer.render(scene, camera);

    stats.update();
}

function generateMorphTargets(geometry: THREE.BufferGeometry) {
    const data = [];

    for (let i = 0; i < segments; i++) {
        const x = Math.random() * r - r / 2;
        const y = Math.random() * r - r / 2;
        const z = Math.random() * r - r / 2;

        data.push(x, y, z);
    }

    const morphTarget = new THREE.Float32BufferAttribute(data, 3);
    morphTarget.name = 'target1';

    geometry.morphAttributes.position = [morphTarget];
}
