import * as THREE from 'three';
import { texture, textureStore, tslFn, instanceIndex, float, uvec2, vec4, MeshBasicNodeMaterial } from 'three/nodes';

import WebGPU from 'three/addons/capabilities/WebGPU.js';
import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js';
import StorageTexture from 'three/addons/renderers/common/StorageTexture.js';

let camera, scene, renderer;

init();
render();

function init() {
    if (WebGPU.isAvailable() === false) {
        document.body.appendChild(WebGPU.getErrorMessage());

        throw new Error('No WebGPU support');
    }

    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0, 2);
    camera.position.z = 1;

    scene = new THREE.Scene();

    // texture

    const width = 512,
        height = 512;

    const storageTexture = new StorageTexture(width, height);
    //storageTexture.minFilter = THREE.LinearMipMapLinearFilter;

    // create function

    const computeTexture = tslFn(({ storageTexture }) => {
        const posX = instanceIndex.remainder(width);
        const posY = instanceIndex.div(width);
        const indexUV = uvec2(posX, posY);

        // https://www.shadertoy.com/view/Xst3zN

        const x = float(posX).div(50.0);
        const y = float(posY).div(50.0);

        const v1 = x.sin();
        const v2 = y.sin();
        const v3 = x.add(y).sin();
        const v4 = x.mul(x).add(y.mul(y)).sqrt().add(5.0).sin();
        const v = v1.add(v2, v3, v4);

        const r = v.sin();
        const g = v.add(Math.PI).sin();
        const b = v.add(Math.PI).sub(0.5).sin();

        textureStore(storageTexture, indexUV, vec4(r, g, b, 1));
    });

    // compute

    const computeNode = computeTexture({ storageTexture }).compute(width * height);

    const material = new MeshBasicNodeMaterial({ color: 0x00ff00 });
    material.colorNode = texture(storageTexture);

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    scene.add(plane);

    renderer = new WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // compute texture
    renderer.compute(computeNode);

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);

    const aspect = window.innerWidth / window.innerHeight;

    const frustumHeight = camera.top - camera.bottom;

    camera.left = (-frustumHeight * aspect) / 2;
    camera.right = (frustumHeight * aspect) / 2;

    camera.updateProjectionMatrix();

    render();
}

function render() {
    renderer.render(scene, camera);
}
