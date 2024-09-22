import * as THREE from 'three';
import { checker, uv, uniform, gaussianBlur, convertToTexture } from 'three/tsl';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let camera, scene, renderer;

init();
render();

function init() {
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0, 2);
    camera.position.z = 1;

    scene = new THREE.Scene();

    // procedural to texture

    const uvScale = uniform(4);
    const blurAmount = uniform(0.5);

    const procedural = checker(uv().mul(uvScale));
    const proceduralToTexture = convertToTexture(procedural, 512, 512); // ( node, width, height )

    const colorNode = gaussianBlur(proceduralToTexture, blurAmount, 10);

    // extra

    //proceduralToTexture.autoUpdate = false; // update just once
    //proceduralToTexture.textureNeedsUpdate = true; // manually update

    // scene

    const material = new THREE.MeshBasicNodeMaterial();
    material.colorNode = colorNode;

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    scene.add(plane);

    // renderer

    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(render);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);

    // gui

    const gui = new GUI();
    gui.add(uvScale, 'value', 1, 10).name('uv scale ( before rtt )');
    gui.add(blurAmount, 'value', 0, 2).name('blur amount ( after rtt )');
    gui.add(proceduralToTexture, 'autoUpdate').name('auto update');
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);

    const aspect = window.innerWidth / window.innerHeight;

    const frustumHeight = camera.top - camera.bottom;

    camera.left = (-frustumHeight * aspect) / 2;
    camera.right = (frustumHeight * aspect) / 2;

    camera.updateProjectionMatrix();
}

function render() {
    renderer.renderAsync(scene, camera);
}
