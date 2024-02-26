import * as THREE from 'three';
import { MeshStandardNodeMaterial, Node, NodeUpdateType, nodeObject, uniform, cubeTexture } from 'three/nodes';

import Stats from 'three/addons/libs/stats.module.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { nodeFrame } from 'three/addons/renderers/webgl-legacy/nodes/WebGLNodes.js';

class InstanceUniformNode extends Node {
    constructor() {
        super('vec3');

        this.updateType = NodeUpdateType.OBJECT;

        this.uniformNode = uniform(new THREE.Color());
    }

    update(frame) {
        this.uniformNode.value.copy(frame.object.color);
    }

    generate(builder, output) {
        return this.uniformNode.build(builder, output);
    }
}

let stats;

let camera, scene, renderer;
let controls;
let pointLight;

const objects = [];

init();
animate();

function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 400);
    camera.position.set(0, 20, 120);

    scene = new THREE.Scene();

    // Grid

    const helper = new THREE.GridHelper(100, 40, 0x303030, 0x303030);
    helper.position.y = -7.5;
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

    const cubeMap = new THREE.CubeTextureLoader().load(urls);

    // Material

    const instanceUniform = nodeObject(new InstanceUniformNode());
    const cubeTextureNode = cubeTexture(cubeMap);

    const material = new MeshStandardNodeMaterial();
    material.colorNode = instanceUniform.add(cubeTextureNode);
    material.emissiveNode = instanceUniform.mul(cubeTextureNode);

    // Spheres geometry

    const geometry = new THREE.SphereGeometry(7, 32, 16);

    for (let i = 0, l = 12; i < l; i++) {
        addMesh(geometry, material);
    }

    // Lights

    scene.add(new THREE.AmbientLight(0x444444));

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);

    directionalLight.position.x = Math.random() - 0.5;
    directionalLight.position.y = Math.random() - 0.5;
    directionalLight.position.z = Math.random() - 0.5;
    directionalLight.position.normalize();

    scene.add(directionalLight);

    pointLight = new THREE.PointLight(0xffffff, 1000);
    scene.add(pointLight);

    pointLight.add(
        new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff })),
    );

    //

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    //

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 40;
    controls.maxDistance = 200;

    //

    stats = new Stats();
    container.appendChild(stats.dom);

    //

    window.addEventListener('resize', onWindowResize);
}

function addMesh(geometry, material) {
    const mesh = new THREE.Mesh(geometry, material);

    mesh.color = new THREE.Color(Math.random() * 0xffffff);

    mesh.position.x = (objects.length % 4) * 20 - 30;
    mesh.position.z = Math.floor(objects.length / 4) * 20 - 20;

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
    requestAnimationFrame(animate);

    nodeFrame.update();

    render();
    stats.update();
}

function render() {
    const timer = 0.0001 * Date.now();

    for (let i = 0, l = objects.length; i < l; i++) {
        const object = objects[i];

        object.rotation.x += 0.01;
        object.rotation.y += 0.005;
    }

    pointLight.position.x = Math.sin(timer * 7) * 30;
    pointLight.position.y = Math.cos(timer * 5) * 40;
    pointLight.position.z = Math.cos(timer * 3) * 30;

    renderer.render(scene, camera);
}
