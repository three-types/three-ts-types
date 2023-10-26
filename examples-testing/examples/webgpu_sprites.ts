import * as THREE from 'three';
import { texture, uv, userData, rangeFog, color, SpriteNodeMaterial } from 'three/nodes';

import WebGPU from 'three/addons/capabilities/WebGPU.js';
import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js';

let camera, scene, renderer;

let map;

let group;

let imageWidth = 1,
    imageHeight = 1;

init();

function init() {
    if (WebGPU.isAvailable() === false) {
        document.body.appendChild(WebGPU.getErrorMessage());

        throw new Error('No WebGPU support');
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    camera = new THREE.PerspectiveCamera(60, width / height, 1, 2100);
    camera.position.z = 1500;

    scene = new THREE.Scene();
    scene.fogNode = rangeFog(color(0x0000ff), 1500, 2100);

    // create sprites

    const amount = 200;
    const radius = 500;

    const textureLoader = new THREE.TextureLoader();

    map = textureLoader.load('textures/sprite1.png', map => {
        imageWidth = map.image.width;
        imageHeight = map.image.height;
    });

    group = new THREE.Group();

    const textureNode = texture(map);

    const material = new SpriteNodeMaterial();
    material.colorNode = textureNode.mul(uv()).mul(2);
    material.opacityNode = textureNode.a;
    material.rotationNode = userData('rotation', 'float'); // get value of: sprite.userData.rotation
    material.transparent = true;

    for (let a = 0; a < amount; a++) {
        const x = Math.random() - 0.5;
        const y = Math.random() - 0.5;
        const z = Math.random() - 0.5;

        const sprite = new THREE.Sprite(material);

        sprite.position.set(x, y, z);
        sprite.position.normalize();
        sprite.position.multiplyScalar(radius);

        // individual rotation per sprite
        sprite.userData.rotation = 0;

        group.add(sprite);
    }

    scene.add(group);

    //

    renderer = new WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(render);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
    const time = Date.now() / 1000;

    for (let i = 0, l = group.children.length; i < l; i++) {
        const sprite = group.children[i];
        const scale = Math.sin(time + sprite.position.x * 0.01) * 0.3 + 1.0;

        sprite.userData.rotation += 0.1 * (i / l);
        sprite.scale.set(scale * imageWidth, scale * imageHeight, 1.0);
    }

    group.rotation.x = time * 0.5;
    group.rotation.y = time * 0.75;
    group.rotation.z = time * 1.0;

    renderer.render(scene, camera);
}
