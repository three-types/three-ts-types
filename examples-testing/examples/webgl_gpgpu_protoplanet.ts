import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GPUComputationRenderer, Variable } from 'three/addons/misc/GPUComputationRenderer.js';

// Texture width for simulation (each texel is a debris particle)
const WIDTH = 64;

let container: HTMLDivElement, stats: Stats;
let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer, geometry: THREE.BufferGeometry;

const PARTICLES = WIDTH * WIDTH;

let gpuCompute: GPUComputationRenderer;
let velocityVariable: Variable;
let positionVariable: Variable;
let velocityUniforms: Record<string, THREE.IUniform>;
let particleUniforms: Record<string, THREE.IUniform>;
let effectController: {
    gravityConstant: number;
    density: number;
    radius: number;
    height: number;
    exponent: number;
    maxMass: number;
    velocity: number;
    velocityExponent: number;
    randVelocity: number;
};

init();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 5, 15000);
    camera.position.y = 120;
    camera.position.z = 400;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 100;
    controls.maxDistance = 1000;

    effectController = {
        // Can be changed dynamically
        gravityConstant: 100.0,
        density: 0.45,

        // Must restart simulation
        radius: 300,
        height: 8,
        exponent: 0.4,
        maxMass: 15.0,
        velocity: 70,
        velocityExponent: 0.2,
        randVelocity: 0.001,
    };

    initComputeRenderer();

    stats = new Stats();
    container.appendChild(stats.dom);

    window.addEventListener('resize', onWindowResize);

    initGUI();

    initProtoplanets();

    dynamicValuesChanger();
}

function initComputeRenderer() {
    gpuCompute = new GPUComputationRenderer(WIDTH, WIDTH, renderer);

    const dtPosition = gpuCompute.createTexture();
    const dtVelocity = gpuCompute.createTexture();

    fillTextures(dtPosition, dtVelocity);

    velocityVariable = gpuCompute.addVariable(
        'textureVelocity',
        document.getElementById('computeShaderVelocity')!.textContent!,
        dtVelocity,
    );
    positionVariable = gpuCompute.addVariable(
        'texturePosition',
        document.getElementById('computeShaderPosition')!.textContent!,
        dtPosition,
    );

    gpuCompute.setVariableDependencies(velocityVariable, [positionVariable, velocityVariable]);
    gpuCompute.setVariableDependencies(positionVariable, [positionVariable, velocityVariable]);

    velocityUniforms = velocityVariable.material.uniforms;

    velocityUniforms['gravityConstant'] = { value: 0.0 };
    velocityUniforms['density'] = { value: 0.0 };

    const error = gpuCompute.init();

    if (error !== null) {
        console.error(error);
    }
}

function restartSimulation() {
    const dtPosition = gpuCompute.createTexture();
    const dtVelocity = gpuCompute.createTexture();

    fillTextures(dtPosition, dtVelocity);

    gpuCompute.renderTexture(dtPosition, positionVariable.renderTargets[0]);
    gpuCompute.renderTexture(dtPosition, positionVariable.renderTargets[1]);
    gpuCompute.renderTexture(dtVelocity, velocityVariable.renderTargets[0]);
    gpuCompute.renderTexture(dtVelocity, velocityVariable.renderTargets[1]);
}

function initProtoplanets() {
    geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(PARTICLES * 3);
    let p = 0;

    for (let i = 0; i < PARTICLES; i++) {
        positions[p++] = (Math.random() * 2 - 1) * effectController.radius;
        positions[p++] = 0; //( Math.random() * 2 - 1 ) * effectController.radius;
        positions[p++] = (Math.random() * 2 - 1) * effectController.radius;
    }

    const uvs = new Float32Array(PARTICLES * 2);
    p = 0;

    for (let j = 0; j < WIDTH; j++) {
        for (let i = 0; i < WIDTH; i++) {
            uvs[p++] = i / (WIDTH - 1);
            uvs[p++] = j / (WIDTH - 1);
        }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

    particleUniforms = {
        texturePosition: { value: null },
        textureVelocity: { value: null },
        cameraConstant: { value: getCameraConstant(camera) },
        density: { value: 0.0 },
    };

    // THREE.ShaderMaterial
    const material = new THREE.ShaderMaterial({
        uniforms: particleUniforms,
        vertexShader: document.getElementById('particleVertexShader')!.textContent!,
        fragmentShader: document.getElementById('particleFragmentShader')!.textContent!,
    });

    const particles = new THREE.Points(geometry, material);
    particles.matrixAutoUpdate = false;
    particles.updateMatrix();

    scene.add(particles);
}

function fillTextures(texturePosition: THREE.DataTexture, textureVelocity: THREE.DataTexture) {
    const posArray = texturePosition.image.data as Float32Array;
    const velArray = textureVelocity.image.data as Float32Array;

    const radius = effectController.radius;
    const height = effectController.height;
    const exponent = effectController.exponent;
    const maxMass = (effectController.maxMass * 1024) / PARTICLES;
    const maxVel = effectController.velocity;
    const velExponent = effectController.velocityExponent;
    const randVel = effectController.randVelocity;

    for (let k = 0, kl = posArray.length; k < kl; k += 4) {
        // Position
        let x, z, rr;

        do {
            x = Math.random() * 2 - 1;
            z = Math.random() * 2 - 1;
            rr = x * x + z * z;
        } while (rr > 1);

        rr = Math.sqrt(rr);

        const rExp = radius * Math.pow(rr, exponent);

        // Velocity
        const vel = maxVel * Math.pow(rr, velExponent);

        const vx = vel * z + (Math.random() * 2 - 1) * randVel;
        const vy = (Math.random() * 2 - 1) * randVel * 0.05;
        const vz = -vel * x + (Math.random() * 2 - 1) * randVel;

        x *= rExp;
        z *= rExp;
        const y = (Math.random() * 2 - 1) * height;

        const mass = Math.random() * maxMass + 1;

        // Fill in texture values
        posArray[k + 0] = x;
        posArray[k + 1] = y;
        posArray[k + 2] = z;
        posArray[k + 3] = 1;

        velArray[k + 0] = vx;
        velArray[k + 1] = vy;
        velArray[k + 2] = vz;
        velArray[k + 3] = mass;
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    particleUniforms['cameraConstant'].value = getCameraConstant(camera);
}

function dynamicValuesChanger() {
    velocityUniforms['gravityConstant'].value = effectController.gravityConstant;
    velocityUniforms['density'].value = effectController.density;
    particleUniforms['density'].value = effectController.density;
}

function initGUI() {
    const gui = new GUI({ width: 280 });

    const folder1 = gui.addFolder('Dynamic parameters');

    folder1.add(effectController, 'gravityConstant', 0.0, 1000.0, 0.05).onChange(dynamicValuesChanger);
    folder1.add(effectController, 'density', 0.0, 10.0, 0.001).onChange(dynamicValuesChanger);

    const folder2 = gui.addFolder('Static parameters');

    folder2.add(effectController, 'radius', 10.0, 1000.0, 1.0);
    folder2.add(effectController, 'height', 0.0, 50.0, 0.01);
    folder2.add(effectController, 'exponent', 0.0, 2.0, 0.001);
    folder2.add(effectController, 'maxMass', 1.0, 50.0, 0.1);
    folder2.add(effectController, 'velocity', 0.0, 150.0, 0.1);
    folder2.add(effectController, 'velocityExponent', 0.0, 1.0, 0.01);
    folder2.add(effectController, 'randVelocity', 0.0, 50.0, 0.1);

    const buttonRestart = {
        restartSimulation: function () {
            restartSimulation();
        },
    };

    folder2.add(buttonRestart, 'restartSimulation');

    folder1.open();
    folder2.open();
}

function getCameraConstant(camera: THREE.PerspectiveCamera) {
    return window.innerHeight / (Math.tan(THREE.MathUtils.DEG2RAD * 0.5 * camera.fov) / camera.zoom);
}

function animate() {
    render();
    stats.update();
}

function render() {
    gpuCompute.compute();

    particleUniforms['texturePosition'].value = gpuCompute.getCurrentRenderTarget(positionVariable).texture;
    particleUniforms['textureVelocity'].value = gpuCompute.getCurrentRenderTarget(velocityVariable).texture;

    renderer.render(scene, camera);
}
