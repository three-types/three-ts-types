import * as THREE from 'three/webgpu';
import {
    uv,
    float,
    vec3,
    hash,
    mx_noise_vec3,
    mx_worley_noise_vec3,
    mx_cell_noise_float,
    mx_fractal_noise_vec3,
} from 'three/tsl';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let MESH_COUNT = 256;
let GRID_SIZE = 16;
const ADD_DELAY = 1000;

let camera, scene, renderer;
let sphere;
let gui;

// Frame timing
let lastFrameTime = 0;
let longestFrameTime = 0;
let isTracking = false;
let shouldStartTracking = false;
let sphereStartTime = 0;
let currentMode = '';
let framesAfterComplete = 0;
let testDone = false;
let meshGroup = null;

const longestFrameEl = document.getElementById('longestFrame');
const meshCountEl = document.getElementById('meshCount');
const compileModeEl = document.getElementById('compileMode');

const params = {
    withoutCompile: function () {
        window.location.href = window.location.pathname + '?mode=no-compile';
    },
    withCompileAsync: function () {
        window.location.href = window.location.pathname + '?mode=compile-async';
    },
};

init();

async function init() {
    // GUI
    gui = new GUI();
    gui.add(params, 'withoutCompile').name('Build on render');
    gui.add(params, 'withCompileAsync').name('Pre-build (compileAsync)');

    window.addEventListener('resize', onWindowResize);

    // Orthographic camera
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 20;
    camera = new THREE.OrthographicCamera(
        (frustumSize * aspect) / -2,
        (frustumSize * aspect) / 2,
        frustumSize / 2,
        frustumSize / -2,
        0.1,
        100,
    );
    camera.position.set(0, 0, 20);
    camera.lookAt(0, 0, 0);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    // Create animated sphere
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMaterial = new THREE.MeshNormalMaterial();
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Renderer
    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    await renderer.init();

    // Reduce mesh count for WebGL (slower compilation)
    if (renderer.backend.isWebGLBackend) {
        MESH_COUNT = 64;
        GRID_SIZE = 8;
        document.getElementById('materialCount').textContent = '64';
        meshCountEl.textContent = '0 / 64';
    }

    // Get mode from URL
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode') || 'compile-async';

    const modeLabel = mode === 'compile-async' ? 'Pre-build (compileAsync)' : 'Build on render';
    compileModeEl.textContent = modeLabel;

    // Start sphere animation
    sphereStartTime = performance.now();

    // Schedule mesh addition after delay
    setTimeout(() => addMeshes(mode), ADD_DELAY);
}

function createUniqueMaterial(index) {
    const material = new THREE.MeshBasicNodeMaterial();

    const seed = float(index * 0.1 + 1.0);
    const scale = float((index % 5) + 2.0);
    const uvNode = uv()
        .mul(scale)
        .add(hash(float(index)));

    const noiseType = index % 4;
    let colorNode;

    switch (noiseType) {
        case 0:
            colorNode = mx_noise_vec3(uvNode.mul(seed)).mul(0.5).add(0.5);
            break;

        case 1:
            colorNode = mx_worley_noise_vec3(uvNode.mul(seed.mul(0.5)));
            break;

        case 2:
            const cellNoise = mx_cell_noise_float(uvNode.mul(seed));
            colorNode = vec3(cellNoise, cellNoise.mul(0.7), cellNoise.mul(0.4));
            break;

        case 3:
            colorNode = mx_fractal_noise_vec3(uvNode.mul(seed.mul(0.3)), float(3), float(2.0), float(0.5))
                .mul(0.5)
                .add(0.5);
            break;
    }

    const tintR = hash(float(index * 3));
    const tintG = hash(float(index * 3 + 1));
    const tintB = hash(float(index * 3 + 2));
    const tint = vec3(tintR, tintG, tintB).mul(0.3).add(0.7);

    material.colorNode = colorNode.mul(tint);

    return material;
}

async function addMeshes(mode) {
    const geometry = new THREE.PlaneGeometry(0.9, 0.9);
    const startX = -(GRID_SIZE - 1) / 2;
    const startY = -(GRID_SIZE - 1) / 2;

    meshGroup = new THREE.Group();

    for (let i = 0; i < MESH_COUNT; i++) {
        const material = createUniqueMaterial(i);
        const mesh = new THREE.Mesh(geometry, material);

        const col = i % GRID_SIZE;
        const row = Math.floor(i / GRID_SIZE);

        mesh.position.x = startX + col;
        mesh.position.y = startY + row;

        meshGroup.add(mesh);
    }

    currentMode = mode;

    if (mode === 'compile-async') {
        // Pre-compile all meshes before adding to scene
        // Start tracking BEFORE compile to measure longest frame during compile
        shouldStartTracking = true;

        await renderer.compileAsync(meshGroup, camera, scene);

        // Add all meshes at once (already compiled - should render instantly)
        scene.add(meshGroup);
        testDone = true;
    } else {
        // Add all meshes at once - renderer compiles on-demand
        // Meshes appear progressively as they compile
        scene.add(meshGroup);

        // Start tracking on next animate() frame
        shouldStartTracking = true;
        testDone = true;
    }
}

function finishTest() {
    isTracking = false;

    longestFrameEl.textContent = longestFrameTime.toFixed(1) + ' ms';
    longestFrameEl.className = longestFrameTime > 100 ? 'value bad' : 'value';
}

function onWindowResize() {
    if (!renderer || !camera) return;

    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 12;

    camera.left = (frustumSize * aspect) / -2;
    camera.right = (frustumSize * aspect) / 2;
    camera.top = frustumSize / 2;
    camera.bottom = frustumSize / -2;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    const now = performance.now();

    // Initialize tracking on first frame after meshes added
    if (shouldStartTracking) {
        shouldStartTracking = false;
        isTracking = true;
        lastFrameTime = now;
        longestFrameTime = 0;
        framesAfterComplete = 0;
    }

    // Track longest frame during test
    if (isTracking && lastFrameTime > 0 && lastFrameTime !== now) {
        const frameTime = now - lastFrameTime;
        if (frameTime > longestFrameTime) {
            longestFrameTime = frameTime;
        }
    }

    lastFrameTime = now;

    // Animate sphere left to right
    if (sphere && sphereStartTime > 0) {
        const elapsed = (now - sphereStartTime) / 1000;
        sphere.position.x = Math.sin(elapsed * 2) * 8;
    }

    renderer.render(scene, camera);

    // Update mesh count display
    if (meshGroup) {
        meshCountEl.textContent = meshGroup.children.length + ' / ' + MESH_COUNT;
    }

    // Finish test - wait a few frames after testDone to capture frame times
    if (isTracking && testDone) {
        framesAfterComplete++;

        // Wait longer for deferred mode (meshes compile progressively)
        const framesToWait = currentMode === 'compile-async' ? 2 : 60;

        if (framesAfterComplete >= framesToWait) {
            finishTest();
        }
    }
}
