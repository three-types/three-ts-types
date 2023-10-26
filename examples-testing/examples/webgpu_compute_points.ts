import * as THREE from 'three';
import {
    tslFn,
    uniform,
    storage,
    attribute,
    float,
    vec2,
    vec3,
    color,
    instanceIndex,
    PointsNodeMaterial,
} from 'three/nodes';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import WebGPU from 'three/addons/capabilities/WebGPU.js';
import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js';

let camera, scene, renderer;
let computeNode;

const pointerVector = new THREE.Vector2(-10.0, -10.0); // Out of bounds first
const scaleVector = new THREE.Vector2(1, 1);

init();

function init() {
    if (WebGPU.isAvailable() === false) {
        document.body.appendChild(WebGPU.getErrorMessage());

        throw new Error('No WebGPU support');
    }

    camera = new THREE.OrthographicCamera(-1.0, 1.0, 1.0, -1.0, 0, 1);
    camera.position.z = 1;

    scene = new THREE.Scene();

    // initialize particles

    const particleNum = 300000;
    const particleSize = 2; // vec2

    const particleArray = new Float32Array(particleNum * particleSize);
    const velocityArray = new Float32Array(particleNum * particleSize);

    // create buffers

    const particleBuffer = new THREE.InstancedBufferAttribute(particleArray, 2);
    const velocityBuffer = new THREE.InstancedBufferAttribute(velocityArray, 2);

    const particleBufferNode = storage(particleBuffer, 'vec2', particleNum);
    const velocityBufferNode = storage(velocityBuffer, 'vec2', particleNum);

    // create function

    const computeShaderFn = tslFn(stack => {
        const particle = particleBufferNode.element(instanceIndex);
        const velocity = velocityBufferNode.element(instanceIndex);

        const pointer = uniform(pointerVector);
        const limit = uniform(scaleVector);

        const position = particle.add(velocity);

        stack.assign(velocity.x, position.x.abs().greaterThanEqual(limit.x).cond(velocity.x.negate(), velocity.x));
        stack.assign(velocity.y, position.y.abs().greaterThanEqual(limit.y).cond(velocity.y.negate(), velocity.y));

        stack.assign(position, position.min(limit).max(limit.negate()));

        const pointerSize = 0.1;
        const distanceFromPointer = pointer.sub(position).length();

        stack.assign(particle, distanceFromPointer.lessThanEqual(pointerSize).cond(vec3(), position));
    });

    // compute

    computeNode = computeShaderFn().compute(particleNum);
    computeNode.onInit = ({ renderer }) => {
        const precomputeShaderNode = tslFn(stack => {
            const particleIndex = float(instanceIndex);

            const randomAngle = particleIndex.mul(0.005).mul(Math.PI * 2);
            const randomSpeed = particleIndex.mul(0.00000001).add(0.0000001);

            const velX = randomAngle.sin().mul(randomSpeed);
            const velY = randomAngle.cos().mul(randomSpeed);

            const velocity = velocityBufferNode.element(instanceIndex);

            stack.assign(velocity.xy, vec2(velX, velY));
        });

        renderer.compute(precomputeShaderNode().compute(particleNum));
    };

    // use a compute shader to animate the point cloud's vertex data.

    const particleNode = attribute('particle', 'vec2');

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(3), 3)); // single vertex ( not triangle )
    pointsGeometry.setAttribute('particle', particleBuffer); // dummy the position points as instances
    pointsGeometry.drawRange.count = 1; // force render points as instances ( not triangle )

    const pointsMaterial = new PointsNodeMaterial();
    pointsMaterial.colorNode = particleNode.add(color(0xffffff));
    pointsMaterial.positionNode = particleNode;

    const mesh = new THREE.Points(pointsGeometry, pointsMaterial);
    mesh.isInstancedMesh = true;
    mesh.count = particleNum;
    scene.add(mesh);

    renderer = new WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove);

    // gui

    const gui = new GUI();

    gui.add(scaleVector, 'x', 0, 1, 0.01);
    gui.add(scaleVector, 'y', 0, 1, 0.01);
}

function onWindowResize() {
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
    const x = event.clientX;
    const y = event.clientY;

    const width = window.innerWidth;
    const height = window.innerHeight;

    pointerVector.set((x / width - 0.5) * 2.0, (-y / height + 0.5) * 2.0);
}

function animate() {
    renderer.compute(computeNode);
    renderer.render(scene, camera);
}
