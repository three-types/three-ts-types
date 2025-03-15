import * as THREE from 'three/webgpu';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { SkyMesh } from 'three/addons/objects/SkyMesh.js';

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGPURenderer;

let sky: SkyMesh, sun: THREE.Vector3;

init();

function initSky() {
    // Add Sky
    sky = new SkyMesh();
    sky.scale.setScalar(450000);
    scene.add(sky);

    sun = new THREE.Vector3();

    /// GUI

    const effectController = {
        turbidity: 10,
        rayleigh: 3,
        mieCoefficient: 0.005,
        mieDirectionalG: 0.7,
        elevation: 2,
        azimuth: 180,
        exposure: renderer.toneMappingExposure,
    };

    function guiChanged() {
        sky.turbidity.value = effectController.turbidity;
        sky.rayleigh.value = effectController.rayleigh;
        sky.mieCoefficient.value = effectController.mieCoefficient;
        sky.mieDirectionalG.value = effectController.mieDirectionalG;

        const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
        const theta = THREE.MathUtils.degToRad(effectController.azimuth);

        sun.setFromSphericalCoords(1, phi, theta);

        sky.sunPosition.value.copy(sun);

        renderer.toneMappingExposure = effectController.exposure;
    }

    const gui = new GUI();

    gui.add(effectController, 'turbidity', 0.0, 20.0, 0.1).onChange(guiChanged);
    gui.add(effectController, 'rayleigh', 0.0, 4, 0.001).onChange(guiChanged);
    gui.add(effectController, 'mieCoefficient', 0.0, 0.1, 0.001).onChange(guiChanged);
    gui.add(effectController, 'mieDirectionalG', 0.0, 1, 0.001).onChange(guiChanged);
    gui.add(effectController, 'elevation', 0, 90, 0.1).onChange(guiChanged);
    gui.add(effectController, 'azimuth', -180, 180, 0.1).onChange(guiChanged);
    gui.add(effectController, 'exposure', 0, 1, 0.0001).onChange(guiChanged);

    guiChanged();
}

function init() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 100, 2000000);
    camera.position.set(0, 100, 2000);

    scene = new THREE.Scene();

    renderer = new THREE.WebGPURenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    //controls.maxPolarAngle = Math.PI / 2;
    controls.enableZoom = false;
    controls.enablePan = false;

    initSky();

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.render(scene, camera);
}
