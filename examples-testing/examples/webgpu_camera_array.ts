import * as THREE from 'three/webgpu';

import Stats from 'three/addons/libs/stats.module.js';

let camera: THREE.ArrayCamera, scene: THREE.Scene, renderer: THREE.WebGPURenderer;
let mesh: THREE.Mesh;
let stats: Stats;

const AMOUNT = 6;

init();

function init() {
    const subCameras = [];

    for (let i = 0; i < AMOUNT * AMOUNT; i++) {
        const subCamera = new THREE.PerspectiveCamera(40, 1, 0.1, 10);
        subCamera.viewport = new THREE.Vector4();

        subCameras.push(subCamera);
    }

    camera = new THREE.ArrayCamera(subCameras);
    camera.position.z = 3;

    updateCameras();

    scene = new THREE.Scene();

    scene.add(new THREE.AmbientLight(0x999999));

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(0.5, 0.5, 1);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.camera.zoom = 4; // tighter shadow map
    scene.add(light);

    const geometryBackground = new THREE.PlaneGeometry(100, 100);
    const materialBackground = new THREE.MeshPhongMaterial({ color: 0x000066 });

    const background = new THREE.Mesh(geometryBackground, materialBackground);
    background.receiveShadow = true;
    background.position.set(0, 0, -1);
    scene.add(background);

    const geometryCylinder = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    const materialCylinder = new THREE.MeshPhongMaterial({ color: 0xff0000 });

    mesh = new THREE.Mesh(geometryCylinder, materialCylinder);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);

    renderer = new THREE.WebGPURenderer(/*{ forceWebGL: true }*/);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    //

    window.addEventListener('resize', onWindowResize);

    //

    stats = new Stats();
    document.body.appendChild(stats.dom);
}

function updateCameras() {
    const ASPECT_RATIO = window.innerWidth / window.innerHeight;
    const WIDTH = window.innerWidth / AMOUNT;
    const HEIGHT = window.innerHeight / AMOUNT;

    camera.aspect = ASPECT_RATIO;
    camera.updateProjectionMatrix();

    for (let y = 0; y < AMOUNT; y++) {
        for (let x = 0; x < AMOUNT; x++) {
            const subcamera = camera.cameras[AMOUNT * y + x];
            subcamera.copy(camera); // copy fov, aspect ratio, near, far from the root camera

            subcamera.viewport!.set(Math.floor(x * WIDTH), Math.floor(y * HEIGHT), Math.ceil(WIDTH), Math.ceil(HEIGHT));
            subcamera.updateProjectionMatrix();

            subcamera.position.x = x / AMOUNT - 0.5;
            subcamera.position.y = 0.5 - y / AMOUNT;
            subcamera.position.z = 1.5 + (x + y) * 0.5;
            subcamera.position.multiplyScalar(2);

            subcamera.lookAt(0, 0, 0);
            subcamera.updateMatrixWorld();
        }
    }
}

function onWindowResize() {
    updateCameras();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    mesh.rotation.x += 0.005;
    mesh.rotation.z += 0.01;

    renderer.render(scene, camera);

    stats.update();
}
