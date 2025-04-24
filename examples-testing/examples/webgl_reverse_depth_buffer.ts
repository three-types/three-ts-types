// https://webgpu.github.io/webgpu-samples/?sample=reversedZ
import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

let stats, camera, scene;
let normalRenderer, logarithmicRenderer, reverseRenderer;
let normalComposer, logarithmicComposer, reverseComposer;
const meshes = [];

const renderTarget = new THREE.WebGLRenderTarget();
renderTarget.type = THREE.UnsignedByteType;
renderTarget.depthTexture = new THREE.DepthTexture();
renderTarget.depthTexture.type = THREE.FloatType;

init();
animate();

function init() {
    const container = document.getElementById('container');

    stats = new Stats();
    container.appendChild(stats.dom);

    camera = new THREE.PerspectiveCamera(72, (0.33 * window.innerWidth) / window.innerHeight, 5, 9999);
    camera.position.z = 12;

    scene = new THREE.Scene();

    const xCount = 1;
    const yCount = 5;
    const numInstances = xCount * yCount;

    const d = 0.0001; // half distance between two planes
    const o = 0.5; // half x offset to shift planes so they are only partially overlapping

    const positions = new Float32Array([
        -1 - o,
        -1,
        d,
        1 - o,
        -1,
        d,
        -1 - o,
        1,
        d,
        1 - o,
        -1,
        d,
        1 - o,
        1,
        d,
        -1 - o,
        1,
        d,

        -1 + o,
        -1,
        -d,
        1 + o,
        -1,
        -d,
        -1 + o,
        1,
        -d,
        1 + o,
        -1,
        -d,
        1 + o,
        1,
        -d,
        -1 + o,
        1,
        -d,
    ]);

    const colors = new Float32Array([
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,

        0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
    ]);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.MeshBasicMaterial({ vertexColors: true });

    for (let i = 0; i < numInstances; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        meshes.push(mesh);
        scene.add(mesh);
    }

    let i = 0;
    for (let x = 0; x < xCount; x++) {
        for (let y = 0; y < yCount; y++) {
            const z = -800 * i;
            const s = 1 + 50 * i;

            const mesh = meshes[i];
            mesh.position.set(x - xCount / 2 + 0.5, (4.0 - 0.2 * z) * (y - yCount / 2 + 1.0), z);
            mesh.scale.setScalar(s);

            i++;
        }
    }

    const normalContainer = document.getElementById('container_normal');
    normalRenderer = new THREE.WebGLRenderer();
    normalRenderer.setPixelRatio(window.devicePixelRatio);
    normalRenderer.setSize(0.33 * window.innerWidth, window.innerHeight);
    normalRenderer.domElement.style.position = 'relative';
    normalContainer.appendChild(normalRenderer.domElement);

    normalComposer = new EffectComposer(normalRenderer, renderTarget);
    normalComposer.addPass(new RenderPass(scene, camera));
    normalComposer.addPass(new OutputPass());

    const logarithmicContainer = document.getElementById('container_logarithmic');
    logarithmicRenderer = new THREE.WebGLRenderer({ logarithmicDepthBuffer: true });
    logarithmicRenderer.setPixelRatio(window.devicePixelRatio);
    logarithmicRenderer.setSize(0.33 * window.innerWidth, window.innerHeight);
    logarithmicRenderer.domElement.style.position = 'relative';
    logarithmicContainer.appendChild(logarithmicRenderer.domElement);

    logarithmicComposer = new EffectComposer(logarithmicRenderer, renderTarget);
    logarithmicComposer.addPass(new RenderPass(scene, camera));
    logarithmicComposer.addPass(new OutputPass());

    const reverseContainer = document.getElementById('container_reverse');
    reverseRenderer = new THREE.WebGLRenderer({ reverseDepthBuffer: true });
    reverseRenderer.setPixelRatio(window.devicePixelRatio);
    reverseRenderer.setSize(0.33 * window.innerWidth, window.innerHeight);
    reverseRenderer.domElement.style.position = 'relative';
    reverseContainer.appendChild(reverseRenderer.domElement);

    reverseComposer = new EffectComposer(reverseRenderer, renderTarget);
    reverseComposer.addPass(new RenderPass(scene, camera));
    reverseComposer.addPass(new OutputPass());

    window.addEventListener('resize', onWindowResize);
    onWindowResize();
}

function animate() {
    requestAnimationFrame(animate);

    const now = performance.now() / 1000;

    for (let i = 0; i < meshes.length; i++) {
        const angle = THREE.MathUtils.degToRad(30);
        const axis = new THREE.Vector3(Math.sin(now), Math.cos(now), 0);
        meshes[i].quaternion.setFromAxisAngle(axis, angle);
    }

    render();
}

function render() {
    normalComposer.render();
    logarithmicComposer.render();
    reverseComposer.render();

    stats.update();
}

function onWindowResize() {
    const width = 0.33 * window.innerWidth;
    const height = window.innerHeight;
    const dpr = window.devicePixelRatio;

    normalComposer.setSize(width * dpr, height * dpr);
    logarithmicComposer.setSize(width * dpr, height * dpr);
    reverseComposer.setSize(width * dpr, height * dpr);

    normalRenderer.setSize(width, height);
    logarithmicRenderer.setSize(width, height);
    reverseRenderer.setSize(width, height);

    camera.aspect = (0.33 * window.innerWidth) / window.innerHeight;
    camera.updateProjectionMatrix();
}
