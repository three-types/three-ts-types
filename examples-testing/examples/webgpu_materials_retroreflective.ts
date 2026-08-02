import * as THREE from 'three/webgpu';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import WebGPU from 'three/addons/capabilities/WebGPU.js';

let camera, scene, renderer;
let frontLight, bandMaterial;

const params = {
    retroreflectivity: true,
    retroreflective: 1.0,
    frontLightIntensity: 5.0,
};

init();

function init() {
    if (WebGPU.isAvailable() === false) {
        document.body.appendChild(WebGPU.getErrorMessage());

        throw new Error('No WebGPU support');
    }

    const container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(4, 2.5, 6);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x11151d);
    scene.add(camera);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x223344, 0.8));

    frontLight = new THREE.PointLight(0xffffff, params.frontLightIntensity, 18, 1.4);
    camera.add(frontLight);

    createCone();

    const grid = new THREE.GridHelper(8, 16, 0x344055, 0x202838);
    scene.add(grid);

    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(render);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1.5, 0);
    controls.update();

    const gui = new GUI();
    gui.add(params, 'retroreflectivity').name('retroreflectivity').onChange(updateMaterial);
    gui.add(params, 'retroreflective', 0, 1, 0.01).name('retroreflective').onChange(updateMaterial);
    gui.add(params, 'frontLightIntensity', 0, 30, 0.1).name('front light intensity').onChange(updateMaterial);

    window.addEventListener('resize', onWindowResize);

    updateMaterial();
}

function createCone() {
    const cone = new THREE.Group();
    scene.add(cone);

    const orangeMaterial = new THREE.MeshPhysicalNodeMaterial({
        color: 0xff6a00,
        roughness: 0.45,
        metalness: 0.0,
    });

    bandMaterial = new THREE.MeshPhysicalNodeMaterial({
        color: 0xf7f0d6,
        roughness: 0.22,
        metalness: 0.0,
        retroreflective: params.retroreflective,
    });

    const base = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.24, 2.6), orangeMaterial);
    base.position.y = 0.12;
    cone.add(base);

    const bodyHeight = 3.2;
    const bodyBottom = 0.24;
    const bodyRadiusBottom = 1.0;
    const bodyRadiusTop = 0.18;

    const body = new THREE.Mesh(
        new THREE.CylinderGeometry(bodyRadiusTop, bodyRadiusBottom, bodyHeight, 96, 1, false),
        orangeMaterial,
    );
    body.position.y = bodyBottom + bodyHeight * 0.5;
    cone.add(body);

    const bandHeight = 0.48;
    const bandCenter = bodyBottom + bodyHeight * 0.52;
    const bandBottom = bandCenter - bandHeight * 0.5;
    const bandTop = bandCenter + bandHeight * 0.5;
    const bandRadiusBottom = radiusAtHeight(bandBottom, bodyBottom, bodyHeight, bodyRadiusBottom, bodyRadiusTop) * 1.01;
    const bandRadiusTop = radiusAtHeight(bandTop, bodyBottom, bodyHeight, bodyRadiusBottom, bodyRadiusTop) * 1.01;

    const band = new THREE.Mesh(
        new THREE.CylinderGeometry(bandRadiusTop, bandRadiusBottom, bandHeight, 96, 1, true),
        bandMaterial,
    );
    band.position.y = bandCenter;
    cone.add(band);
}

function radiusAtHeight(y, bodyBottom, bodyHeight, radiusBottom, radiusTop) {
    const t = THREE.MathUtils.clamp((y - bodyBottom) / bodyHeight, 0, 1);
    return THREE.MathUtils.lerp(radiusBottom, radiusTop, t);
}

function updateMaterial() {
    bandMaterial.retroreflective = params.retroreflectivity ? params.retroreflective : 0;
    frontLight.intensity = params.frontLightIntensity;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
    renderer.render(scene, camera);
}
