import * as THREE from 'three';
import {
    MeshStandardNodeMaterial,
    NodeUpdateType,
    Node,
    nodeObject,
    uniform,
    attribute,
    cubeTexture,
} from 'three/nodes';

import WebGPU from 'three/addons/capabilities/WebGPU.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { TeapotGeometry } from 'three/addons/geometries/TeapotGeometry.js';

import Stats from 'three/addons/libs/stats.module.js';

class InstanceUniformNode extends Node {
    constructor() {
        super('vec3');

        this.updateType = NodeUpdateType.OBJECT;

        this.uniformNode = uniform(new THREE.Color());
    }

    update(frame) {
        const mesh = frame.object;

        const meshColor = mesh.color;

        this.uniformNode.value.copy(meshColor);
    }

    setup(/*builder*/) {
        return this.uniformNode;
    }
}

let stats;

let camera, scene, renderer;
let controls;

const objects = [];

init();

function init() {
    if (WebGPU.isAvailable() === false && WebGL.isWebGL2Available() === false) {
        document.body.appendChild(WebGPU.getErrorMessage());

        throw new Error('No WebGPU or WebGL2 support');
    }

    const container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4000);
    camera.position.set(0, 200, 1200);

    scene = new THREE.Scene();

    // Grid

    const helper = new THREE.GridHelper(1000, 40, 0x303030, 0x303030);
    helper.material.colorNode = attribute('color');
    helper.position.y = -75;
    scene.add(helper);

    // CubeMap

    const path = 'textures/cube/SwedishRoyalCastle/';
    const format = '.jpg';
    const urls = [
        path + 'px' + format,
        path + 'nx' + format,
        path + 'py' + format,
        path + 'ny' + format,
        path + 'pz' + format,
        path + 'nz' + format,
    ];

    const cTexture = new THREE.CubeTextureLoader().load(urls);

    // Materials

    const instanceUniform = nodeObject(new InstanceUniformNode());
    const cubeTextureNode = cubeTexture(cTexture);

    const material = new MeshStandardNodeMaterial();
    material.colorNode = instanceUniform.add(cubeTextureNode);
    material.emissiveNode = instanceUniform.mul(cubeTextureNode);

    // Geometry

    const geometry = new TeapotGeometry(50, 18);

    for (let i = 0, l = 12; i < l; i++) {
        addMesh(geometry, material);
    }

    //

    renderer = new WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    //

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 400;
    controls.maxDistance = 2000;

    //

    stats = new Stats();
    container.appendChild(stats.dom);

    //

    window.addEventListener('resize', onWindowResize);
}

function addMesh(geometry, material) {
    const mesh = new THREE.Mesh(geometry, material);

    mesh.color = new THREE.Color(Math.random() * 0xffffff);

    mesh.position.x = (objects.length % 4) * 200 - 300;
    mesh.position.z = Math.floor(objects.length / 4) * 200 - 200;

    mesh.rotation.x = Math.random() * 200 - 100;
    mesh.rotation.y = Math.random() * 200 - 100;
    mesh.rotation.z = Math.random() * 200 - 100;

    objects.push(mesh);

    scene.add(mesh);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
    for (let i = 0, l = objects.length; i < l; i++) {
        const object = objects[i];

        object.rotation.x += 0.01;
        object.rotation.y += 0.005;
    }

    renderer.render(scene, camera);

    stats.update();
}
