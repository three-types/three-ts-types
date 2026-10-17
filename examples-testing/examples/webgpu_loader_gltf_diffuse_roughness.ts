import * as THREE from 'three/webgpu';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let camera, scene, renderer, controls;
let model;

const lightSettings = {
    azimuth: 0,
    elevation: 0,
    intensity: 3,
};

init();

async function init() {
    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.toneMapping = THREE.NeutralToneMapping;
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x202124);

    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 1);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const light = new THREE.DirectionalLight(0xffffff, lightSettings.intensity);
    scene.add(light);
    scene.add(light.target);

    function updateLight() {
        light.position.setFromSphericalCoords(
            10,
            THREE.MathUtils.degToRad(90 - lightSettings.elevation),
            THREE.MathUtils.degToRad(lightSettings.azimuth),
        );
        light.intensity = lightSettings.intensity;
    }

    updateLight();

    const gui = new GUI();
    gui.add(lightSettings, 'azimuth', -180, 180, 1).onChange(updateLight);
    gui.add(lightSettings, 'elevation', -10, 90, 1).onChange(updateLight);
    gui.add(lightSettings, 'intensity', 0, 6, 0.1).onChange(updateLight);
    if (camera.aspect < 0.75) gui.close();

    const gltf = await new GLTFLoader().setPath('models/gltf/').loadAsync('DiffuseRoughnessParameterSweep.glb');
    model = gltf.scene;

    // The draft sample asset currently uses clockwise triangle winding.
    const geometries = new Set();

    model.traverse(function (object) {
        const geometry = object.geometry;

        if (geometry === undefined) return;

        if (geometries.has(geometry)) return;

        const index = geometry.index;

        for (let i = 0; i < index.count; i += 3) {
            const second = index.getX(i + 1);
            index.setX(i + 1, index.getX(i + 2));
            index.setX(i + 2, second);
        }

        index.needsUpdate = true;
        geometries.add(geometry);
    });

    scene.add(model);

    frameModel();
    light.target.position.copy(controls.target);

    window.addEventListener('resize', onWindowResize);
}

function frameModel() {
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const halfFov = THREE.MathUtils.degToRad(camera.fov * 0.5);
    const distance =
        1.4 * Math.max((size.y * 0.5) / Math.tan(halfFov), (size.x * 0.5) / (Math.tan(halfFov) * camera.aspect));

    const direction = camera.position.clone().sub(controls.target);
    if (direction.lengthSq() === 0) direction.set(0, 0, 1);

    controls.target.copy(center);
    camera.position.copy(center).add(direction.normalize().multiplyScalar(distance));
    camera.near = distance / 100;
    camera.far = distance * 100;
    camera.updateProjectionMatrix();

    controls.minDistance = distance * 0.35;
    controls.maxDistance = distance * 3;
    controls.update();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;

    renderer.setSize(window.innerWidth, window.innerHeight);

    frameModel();
}

function animate() {
    controls.update();
    renderer.render(scene, camera);
}
