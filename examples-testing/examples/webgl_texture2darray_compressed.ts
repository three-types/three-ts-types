import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';

let camera, scene, mesh, renderer, stats, clock;

const planeWidth = 50;
const planeHeight = 25;

let depthStep = 1;

init();

function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 70;

    scene = new THREE.Scene();

    //
    clock = new THREE.Clock();

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    //

    const ktx2Loader = new KTX2Loader();
    ktx2Loader.setTranscoderPath('jsm/libs/basis/');
    ktx2Loader.detectSupport(renderer);

    ktx2Loader.load('textures/spiritedaway.ktx2', function (texturearray) {
        const material = new THREE.ShaderMaterial({
            uniforms: {
                diffuse: { value: texturearray },
                depth: { value: 55 },
                size: { value: new THREE.Vector2(planeWidth, planeHeight) },
            },
            vertexShader: document.getElementById('vs').textContent.trim(),
            fragmentShader: document.getElementById('fs').textContent.trim(),
            glslVersion: THREE.GLSL3,
        });

        const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);

        mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh);
    });

    stats = new Stats();
    container.appendChild(stats.dom);

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

        mesh.material.uniforms['depth'].value = value;
    }

    render();
    stats.update();
}

function render() {
    renderer.render(scene, camera);
}
