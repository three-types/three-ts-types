import * as THREE from 'three';
import { color, lights, toneMapping, MeshStandardNodeMaterial, PointsNodeMaterial, LightingModel } from 'three/nodes';

import WebGPU from 'three/addons/capabilities/WebGPU.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

class CustomLightingModel extends LightingModel {
    direct({ lightColor, reflectedLight }) {
        reflectedLight.directDiffuse.addAssign(lightColor);
    }
}

let camera, scene, renderer;

let light1, light2, light3;

init();

function init() {
    if (WebGPU.isAvailable() === false && WebGL.isWebGL2Available() === false) {
        document.body.appendChild(WebGPU.getErrorMessage());

        throw new Error('No WebGPU or WebGL2 support');
    }

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10);
    camera.position.z = 2;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);

    // lights

    const sphereGeometry = new THREE.SphereGeometry(0.02, 16, 8);

    const addLight = (hexColor, intensity = 2, distance = 1) => {
        const material = new MeshStandardNodeMaterial();
        material.colorNode = color(hexColor);
        material.lightsNode = lights(); // ignore scene lights

        const mesh = new THREE.Mesh(sphereGeometry, material);

        const light = new THREE.PointLight(hexColor, intensity, distance);
        light.add(mesh);

        scene.add(light);

        return light;
    };

    light1 = addLight(0xffaa00);
    light2 = addLight(0x0040ff);
    light3 = addLight(0x80ff80);

    //light nodes ( selective lights )

    const allLightsNode = lights([light1, light2, light3]);

    // points

    const points = [];

    for (let i = 0; i < 3000; i++) {
        const point = new THREE.Vector3().random().subScalar(0.5).multiplyScalar(2);
        points.push(point);
    }

    const geometryPoints = new THREE.BufferGeometry().setFromPoints(points);
    const materialPoints = new PointsNodeMaterial();

    // custom lighting model

    const lightingModel = new CustomLightingModel();
    const lightingModelContext = allLightsNode.context({ lightingModel });

    materialPoints.lightsNode = lightingModelContext;

    //

    const pointCloud = new THREE.Points(geometryPoints, materialPoints);
    scene.add(pointCloud);

    //

    renderer = new WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.toneMappingNode = toneMapping(THREE.LinearToneMapping, 1);
    document.body.appendChild(renderer.domElement);

    // controls

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 0;
    controls.maxDistance = 4;

    // events

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    const time = Date.now() * 0.0005;
    const scale = 0.5;

    light1.position.x = Math.sin(time * 0.7) * scale;
    light1.position.y = Math.cos(time * 0.5) * scale;
    light1.position.z = Math.cos(time * 0.3) * scale;

    light2.position.x = Math.cos(time * 0.3) * scale;
    light2.position.y = Math.sin(time * 0.5) * scale;
    light2.position.z = Math.sin(time * 0.7) * scale;

    light3.position.x = Math.sin(time * 0.7) * scale;
    light3.position.y = Math.cos(time * 0.3) * scale;
    light3.position.z = Math.sin(time * 0.5) * scale;

    renderer.render(scene, camera);
}
