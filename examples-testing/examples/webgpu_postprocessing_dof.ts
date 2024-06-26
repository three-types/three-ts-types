import * as THREE from 'three';

import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js';
import PostProcessing from 'three/addons/renderers/common/PostProcessing.js';
import { MeshBasicNodeMaterial, cubeTexture } from 'three/nodes';
import { pass } from 'three/nodes';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import Stats from 'three/addons/libs/stats.module.js';

//

let camera, scene, renderer, mesh, stats;

let mouseX = 0,
    mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

let width = window.innerWidth;
let height = window.innerHeight;

let postProcessing;

const color = new THREE.Color();

init();

function init() {
    camera = new THREE.PerspectiveCamera(70, width / height, 1, 3000);
    camera.position.z = 200;

    scene = new THREE.Scene();

    const path = 'textures/cube/SwedishRoyalCastle/';
    const format = '.jpg';
    const urls = [
        path + 'px' + format,
        path + 'nx' + format,
        path + 'py' + format,
        path + 'ny' + format,
        path + 'pz' + format,
        path + 'nz' + format,
    ];

    const textureCube = new THREE.CubeTextureLoader().load(urls);
    const cubeTextureNode = cubeTexture(textureCube);

    const geometry = new THREE.SphereGeometry(60, 20, 10);
    const material = new MeshBasicNodeMaterial();
    material.colorNode = cubeTextureNode;

    const xgrid = 14,
        ygrid = 9,
        zgrid = 14;
    const count = xgrid * ygrid * zgrid;

    mesh = new THREE.InstancedMesh(geometry, material, count);
    scene.add(mesh);

    const matrix = new THREE.Matrix4();

    let index = 0;

    for (let i = 0; i < xgrid; i++) {
        for (let j = 0; j < ygrid; j++) {
            for (let k = 0; k < zgrid; k++) {
                const x = 200 * (i - xgrid / 2);
                const y = 200 * (j - ygrid / 2);
                const z = 200 * (k - zgrid / 2);

                mesh.setMatrixAt(index, matrix.identity().setPosition(x, y, z));
                mesh.setColorAt(index, color);
                index++;
            }
        }
    }

    // renderer

    renderer = new WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    // post processing

    postProcessing = new PostProcessing(renderer);

    const scenePass = pass(scene, camera);

    const scenePassColor = scenePass.getTextureNode();
    const scenePassViewZ = scenePass.getViewZNode();

    const dofPass = scenePassColor.dof(scenePassViewZ);

    postProcessing.outputNode = dofPass;

    // controls

    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.addEventListener('pointermove', onPointerMove);

    window.addEventListener('resize', onWindowResize);

    // stats

    stats = new Stats();
    document.body.appendChild(stats.dom);

    // gui

    const effectController = {
        focus: 500.0,
        aperture: 5,
        maxblur: 0.01,
    };

    function updateEffect() {
        dofPass.focus.value = effectController.focus;
        dofPass.aperture.value = effectController.aperture * 0.00001;
        dofPass.maxblur.value = effectController.maxblur;
    }

    const gui = new GUI();
    gui.add(effectController, 'focus', 10.0, 3000.0, 10).onChange(updateEffect);
    gui.add(effectController, 'aperture', 0, 10, 0.1).onChange(updateEffect);
    gui.add(effectController, 'maxblur', 0.0, 0.01, 0.001).onChange(updateEffect);

    updateEffect();
}

function onPointerMove(event) {
    if (event.isPrimary === false) return;

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    width = window.innerWidth;
    height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}

function animate() {
    render();
    stats.update();
}

function render() {
    const time = Date.now() * 0.00005;

    camera.position.x += (mouseX - camera.position.x) * 0.036;
    camera.position.y += (-mouseY - camera.position.y) * 0.036;

    camera.lookAt(scene.position);

    for (let i = 0; i < mesh.count; i++) {
        const h = ((360 * (i / mesh.count + time)) % 360) / 360;
        color.setHSL(h, 1, 0.5);
        mesh.setColorAt(i, color);
    }

    mesh.instanceColor.needsUpdate = true;

    postProcessing.render();
}
