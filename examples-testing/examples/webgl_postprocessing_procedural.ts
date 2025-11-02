import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let postCamera, postScene, renderer;
let postMaterial, noiseRandom1DMaterial, noiseRandom2DMaterial, noiseRandom3DMaterial, postQuad;
let stats;

const params = { procedure: 'noiseRandom3D' };

init();

function init() {
    const container = document.getElementById('container');

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

    // Setup post processing stage
    postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    noiseRandom1DMaterial = new THREE.ShaderMaterial({
        vertexShader: document.querySelector('#procedural-vert').textContent.trim(),
        fragmentShader: document.querySelector('#noiseRandom1D-frag').textContent.trim(),
    });
    noiseRandom2DMaterial = new THREE.ShaderMaterial({
        vertexShader: document.querySelector('#procedural-vert').textContent.trim(),
        fragmentShader: document.querySelector('#noiseRandom2D-frag').textContent.trim(),
    });
    noiseRandom3DMaterial = new THREE.ShaderMaterial({
        vertexShader: document.querySelector('#procedural-vert').textContent.trim(),
        fragmentShader: document.querySelector('#noiseRandom3D-frag').textContent.trim(),
    });
    postMaterial = noiseRandom3DMaterial;
    const postPlane = new THREE.PlaneGeometry(2, 2);
    postQuad = new THREE.Mesh(postPlane, postMaterial);
    postScene = new THREE.Scene();
    postScene.add(postQuad);

    window.addEventListener('resize', onWindowResize);

    //

    const gui = new GUI();
    gui.add(params, 'procedure', ['noiseRandom1D', 'noiseRandom2D', 'noiseRandom3D']);
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    switch (params.procedure) {
        case 'noiseRandom1D':
            postMaterial = noiseRandom1DMaterial;
            break;
        case 'noiseRandom2D':
            postMaterial = noiseRandom2DMaterial;
            break;
        case 'noiseRandom3D':
            postMaterial = noiseRandom3DMaterial;
            break;
    }

    postQuad.material = postMaterial;

    // render post FX
    renderer.render(postScene, postCamera);

    stats.update();
}
