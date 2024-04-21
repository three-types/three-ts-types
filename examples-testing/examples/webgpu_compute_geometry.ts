import * as THREE from 'three';
import { vec3, cos, sin, mat3, storage, tslFn, instanceIndex, timerLocal } from 'three/nodes';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import StorageBufferAttribute from 'three/addons/renderers/common/StorageBufferAttribute.js';

let camera, scene, renderer;
let computeUpdate;

init();

function init() {
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10);
    camera.position.set(0, 0, 1);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333);

    new GLTFLoader().load('models/gltf/LeePerrySmith/LeePerrySmith.glb', function (gltf) {
        const mesh = gltf.scene.children[0];
        mesh.scale.setScalar(0.1);
        mesh.material = new THREE.MeshNormalMaterial();
        scene.add(mesh);

        //

        const positionBaseAttribute = mesh.geometry.attributes.position;
        const normalBaseAttribute = mesh.geometry.attributes.normal;

        // replace geometry attributes for storage buffer attributes

        const positionStorageBufferAttribute = new StorageBufferAttribute(positionBaseAttribute.count, 4);
        const normalStorageBufferAttribute = new StorageBufferAttribute(normalBaseAttribute.count, 4);

        mesh.geometry.setAttribute('position', positionStorageBufferAttribute);
        mesh.geometry.setAttribute('normal', normalStorageBufferAttribute);

        // compute shader

        const computeFn = tslFn(() => {
            const positionAttribute = storage(positionBaseAttribute, 'vec3', positionBaseAttribute.count);
            const normalAttribute = storage(normalBaseAttribute, 'vec3', normalBaseAttribute.count);

            const positionStorageAttribute = storage(
                positionStorageBufferAttribute,
                'vec4',
                positionStorageBufferAttribute.count,
            );
            const normalStorageAttribute = storage(
                normalStorageBufferAttribute,
                'vec4',
                normalStorageBufferAttribute.count,
            );

            const time = timerLocal(1);
            const scale = 0.3;

            //

            const position = vec3(positionAttribute.element(instanceIndex));
            const normal = vec3(normalAttribute.element(instanceIndex));

            const theta = sin(time.add(position.y)).mul(scale);

            const c = cos(theta);
            const s = sin(theta);

            const m = mat3(c, 0, s, 0, 1, 0, s.negate(), 0, c);

            const transformed = position.mul(m);
            const transformedNormal = normal.mul(m);

            positionStorageAttribute.element(instanceIndex).assign(transformed);
            normalStorageAttribute.element(instanceIndex).assign(transformedNormal);
        });

        computeUpdate = computeFn().compute(positionBaseAttribute.count);
    });

    // renderer

    renderer = new WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 0.7;
    controls.maxDistance = 2;

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

async function animate() {
    if (computeUpdate) await renderer.computeAsync(computeUpdate);

    renderer.render(scene, camera);
}
