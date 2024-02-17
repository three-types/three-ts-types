import * as THREE from 'three';
import { storageObject, vec3, uv, uint, float, tslFn, instanceIndex, MeshBasicNodeMaterial } from 'three/nodes';

import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js';
import StorageBufferAttribute from 'three/addons/renderers/common/StorageBufferAttribute.js';

// WebGPU Backend
init();

// WebGL Backend
init(true);

function init(forceWebGL = false) {
    const aspect = window.innerWidth / 2 / window.innerHeight;
    const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0, 2);
    camera.position.z = 1;

    const scene = new THREE.Scene();

    // texture

    const typeSize = 1; // 1:'float', 2:'vec2', 4:'vec4' -> use power of 2
    const size = 1024;

    const array = new Array(size * typeSize).fill(0);

    const type = ['float', 'vec2', 'vec3', 'vec4'][typeSize - 1];

    const arrayBuffer = new StorageBufferAttribute(new Float32Array(array), typeSize);

    const arrayBufferNode = storageObject(arrayBuffer, type, size);

    const computeInitOrder = tslFn(() => {
        arrayBufferNode.element(instanceIndex).assign(uint(instanceIndex.div(typeSize)));
    });

    const computeInvertOrder = tslFn(() => {
        const invertIndex = arrayBufferNode.element(float(size).sub(instanceIndex));
        arrayBufferNode.element(instanceIndex).assign(invertIndex);
    });

    // compute

    const computeInit = computeInitOrder().compute(size);

    const compute = computeInvertOrder().compute(size);

    const material = new MeshBasicNodeMaterial({ color: 0x00ff00 });

    material.colorNode = tslFn(() => {
        const index = uint(uv().x.mul(float(size)));
        const indexValue = arrayBufferNode.element(index).toVar();
        const value = float(indexValue).div(float(size)).mul(20).floor().div(20);

        return vec3(value, value, value);
    })();

    //

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    scene.add(plane);

    const renderer = new WebGPURenderer({ antialias: false, forceWebGL: forceWebGL });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth / 2, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '50%';
    renderer.domElement.style.height = '100%';

    if (forceWebGL) {
        renderer.domElement.style.left = '50%';

        scene.background = new THREE.Color(0x212121);
    } else {
        scene.background = new THREE.Color(0x313131);
    }

    // Init Positions
    renderer.compute(computeInit);

    const stepAnimation = async function () {
        await renderer.computeAsync(compute);
        await renderer.renderAsync(scene, camera);

        setTimeout(stepAnimation, 1000);
    };

    stepAnimation();

    window.addEventListener('resize', onWindowResize);

    function onWindowResize() {
        renderer.setSize(window.innerWidth / 2, window.innerHeight);

        const aspect = window.innerWidth / 2 / window.innerHeight;

        const frustumHeight = camera.top - camera.bottom;

        camera.left = (-frustumHeight * aspect) / 2;
        camera.right = (frustumHeight * aspect) / 2;

        camera.updateProjectionMatrix();

        renderer.render(scene, camera);
    }
}
