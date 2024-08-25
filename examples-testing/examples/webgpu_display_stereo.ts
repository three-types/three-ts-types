import * as THREE from 'three';

import { stereoPass } from 'three/tsl';

let camera, scene, renderer, postProcessing;

let mesh, dummy;

let mouseX = 0,
    mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

const position = new THREE.Vector3();

init();

function init() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 3;

    scene = new THREE.Scene();
    scene.background = new THREE.CubeTextureLoader()
        .setPath('textures/cube/Park3Med/')
        .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

    const geometry = new THREE.SphereGeometry(0.1, 32, 16);

    const textureCube = new THREE.CubeTextureLoader()
        .setPath('textures/cube/Park3Med/')
        .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
    textureCube.mapping = THREE.CubeRefractionMapping;

    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, envMap: textureCube, refractionRatio: 0.95 });

    mesh = new THREE.InstancedMesh(geometry, material, 500);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    dummy = new THREE.Mesh();

    for (let i = 0; i < 500; i++) {
        dummy.position.x = Math.random() * 10 - 5;
        dummy.position.y = Math.random() * 10 - 5;
        dummy.position.z = Math.random() * 10 - 5;
        dummy.scale.x = dummy.scale.y = dummy.scale.z = Math.random() * 3 + 1;

        dummy.updateMatrix();

        mesh.setMatrixAt(i, dummy.matrix);
    }

    scene.add(mesh);

    //

    renderer = new THREE.WebGPURenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    postProcessing = new THREE.PostProcessing(renderer);
    const pass = stereoPass(scene, camera);
    postProcessing.outputNode = pass;

    //

    window.addEventListener('resize', onWindowResize);

    document.addEventListener('mousemove', onDocumentMouseMove);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.01;
    mouseY = (event.clientY - windowHalfY) * 0.01;
}

function extractPosition(matrix, position) {
    position.x = matrix.elements[12];
    position.y = matrix.elements[13];
    position.z = matrix.elements[14];
}

//

function animate() {
    const timer = 0.0001 * Date.now();

    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    for (let i = 0; i < mesh.count; i++) {
        mesh.getMatrixAt(i, dummy.matrix);

        extractPosition(dummy.matrix, position);

        position.x = 5 * Math.cos(timer + i);
        position.y = 5 * Math.sin(timer + i * 1.1);

        dummy.matrix.setPosition(position);

        mesh.setMatrixAt(i, dummy.matrix);

        mesh.instanceMatrix.needsUpdate = true;
    }

    postProcessing.render();
}
