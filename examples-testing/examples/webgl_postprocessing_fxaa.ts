import * as THREE from 'three';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';

let camera, scene, renderer, clock, group, container;

let composer1, composer2, fxaaPass;

init();

function init() {
    container = document.getElementById('container');

    camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 1, 2000);
    camera.position.z = 500;

    scene = new THREE.Scene();

    clock = new THREE.Clock();

    //

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d);
    hemiLight.position.set(0, 1000, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(-3000, 1000, -1000);
    scene.add(dirLight);

    //

    group = new THREE.Group();

    const geometry = new THREE.TetrahedronGeometry(10);
    const material = new THREE.MeshStandardMaterial({ color: 0xf73232, flatShading: true });

    for (let i = 0; i < 100; i++) {
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.x = Math.random() * 500 - 250;
        mesh.position.y = Math.random() * 500 - 250;
        mesh.position.z = Math.random() * 500 - 250;

        mesh.scale.setScalar(Math.random() * 2 + 1);

        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        mesh.rotation.z = Math.random() * Math.PI;

        group.add(mesh);
    }

    scene.add(group);

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setAnimationLoop(animate);
    renderer.autoClear = false;
    container.appendChild(renderer.domElement);

    //

    const renderPass = new RenderPass(scene, camera);
    renderPass.clearAlpha = 0;

    //

    fxaaPass = new ShaderPass(FXAAShader);

    const outputPass = new OutputPass();

    composer1 = new EffectComposer(renderer);
    composer1.addPass(renderPass);
    composer1.addPass(outputPass);

    //

    const pixelRatio = renderer.getPixelRatio();

    fxaaPass.material.uniforms['resolution'].value.x = 1 / (container.offsetWidth * pixelRatio);
    fxaaPass.material.uniforms['resolution'].value.y = 1 / (container.offsetHeight * pixelRatio);

    composer2 = new EffectComposer(renderer);
    composer2.addPass(renderPass);
    composer2.addPass(outputPass);

    // FXAA is engineered to be applied towards the end of engine post processing after conversion to low dynamic range and conversion to the sRGB color space for display.

    composer2.addPass(fxaaPass);

    //

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.offsetWidth, container.offsetHeight);
    composer1.setSize(container.offsetWidth, container.offsetHeight);
    composer2.setSize(container.offsetWidth, container.offsetHeight);

    const pixelRatio = renderer.getPixelRatio();

    fxaaPass.material.uniforms['resolution'].value.x = 1 / (container.offsetWidth * pixelRatio);
    fxaaPass.material.uniforms['resolution'].value.y = 1 / (container.offsetHeight * pixelRatio);
}

function animate() {
    const halfWidth = container.offsetWidth / 2;

    group.rotation.y += clock.getDelta() * 0.1;

    renderer.setScissorTest(true);

    renderer.setScissor(0, 0, halfWidth - 1, container.offsetHeight);
    composer1.render();

    renderer.setScissor(halfWidth, 0, halfWidth, container.offsetHeight);
    composer2.render();

    renderer.setScissorTest(false);
}
