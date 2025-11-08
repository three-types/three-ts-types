import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let camera, scene, renderer, clock, stats;

let lightingUniformsGroup, lightCenters;

const container = document.getElementById('container');

const pointLightsMax = 300;

const api = {
    count: 200,
};

init();

function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 50, 50);

    scene = new THREE.Scene();
    camera.lookAt(scene.position);

    clock = new THREE.Clock();

    // geometry

    const geometry = new THREE.SphereGeometry();

    // uniforms groups

    lightingUniformsGroup = new THREE.UniformsGroup();
    lightingUniformsGroup.setName('LightingData');

    const data = [];
    const dataColors = [];
    lightCenters = [];

    for (let i = 0; i < pointLightsMax; i++) {
        const col = new THREE.Color(0xffffff * Math.random()).toArray();
        const x = Math.random() * 50 - 25;
        const z = Math.random() * 50 - 25;

        data.push(new THREE.Uniform(new THREE.Vector4(x, 1, z, 0))); // light position
        dataColors.push(new THREE.Uniform(new THREE.Vector4(col[0], col[1], col[2], 0))); // light color

        // Store the center positions
        lightCenters.push({ x, z });
    }

    lightingUniformsGroup.add(data); // light position
    lightingUniformsGroup.add(dataColors); // light position
    lightingUniformsGroup.add(new THREE.Uniform(pointLightsMax)); // light position

    const cameraUniformsGroup = new THREE.UniformsGroup();
    cameraUniformsGroup.setName('ViewData');
    cameraUniformsGroup.add(new THREE.Uniform(camera.projectionMatrix)); // projection matrix
    cameraUniformsGroup.add(new THREE.Uniform(camera.matrixWorldInverse)); // view matrix

    const material = new THREE.RawShaderMaterial({
        uniforms: {
            modelMatrix: { value: null },
            normalMatrix: { value: null },
        },
        // uniformsGroups: [ cameraUniformsGroup, lightingUniformsGroup ],
        name: 'Box',
        defines: {
            POINTLIGHTS_MAX: pointLightsMax,
        },
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
        glslVersion: THREE.GLSL3,
    });

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), material.clone());
    plane.material.uniformsGroups = [cameraUniformsGroup, lightingUniformsGroup];
    plane.material.uniforms.modelMatrix.value = plane.matrixWorld;
    plane.material.uniforms.normalMatrix.value = plane.normalMatrix;
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1;
    scene.add(plane);

    // meshes
    const gridSize = { x: 10, y: 1, z: 10 };
    const spacing = 6;

    for (let i = 0; i < gridSize.x; i++) {
        for (let j = 0; j < gridSize.y; j++) {
            for (let k = 0; k < gridSize.z; k++) {
                const mesh = new THREE.Mesh(geometry, material.clone());
                mesh.name = 'Sphere';
                mesh.material.uniformsGroups = [cameraUniformsGroup, lightingUniformsGroup];
                mesh.material.uniforms.modelMatrix.value = mesh.matrixWorld;
                mesh.material.uniforms.normalMatrix.value = mesh.normalMatrix;
                scene.add(mesh);

                mesh.position.x = i * spacing - (gridSize.x * spacing) / 2;
                mesh.position.y = 0;
                mesh.position.z = k * spacing - (gridSize.z * spacing) / 2;
            }
        }
    }

    //

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

    // controls

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;

    // stats

    stats = new Stats();
    document.body.appendChild(stats.dom);

    // gui
    const gui = new GUI();
    gui.add(api, 'count', 1, pointLightsMax)
        .step(1)
        .onChange(function () {
            lightingUniformsGroup.uniforms[2].value = api.count;
        });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
    const elapsedTime = clock.getElapsedTime();

    const lights = lightingUniformsGroup.uniforms[0];

    // Parameters for circular movement
    const radius = 5; // Smaller radius for individual circular movements
    const speed = 0.5; // Speed of rotation

    // Update each light's position
    for (let i = 0; i < lights.length; i++) {
        const light = lights[i];
        const center = lightCenters[i];

        // Calculate circular movement around the light's center
        const angle = speed * elapsedTime + i * 0.5; // Phase difference for each light
        const x = center.x + Math.sin(angle) * radius;
        const z = center.z + Math.cos(angle) * radius;

        // Update the light's position
        light.value.set(x, 1, z, 0);
    }

    renderer.render(scene, camera);

    stats.update();
}
