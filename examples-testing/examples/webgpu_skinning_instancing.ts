import * as THREE from 'three';
import { mix, range, color, oscSine, timerLocal, toneMapping, MeshStandardNodeMaterial } from 'three/nodes';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import WebGPU from 'three/addons/capabilities/WebGPU.js';
import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js';

let camera, scene, renderer;

let mixer, clock;

init();

function init() {
    if (WebGPU.isAvailable() === false) {
        document.body.appendChild(WebGPU.getErrorMessage());

        throw new Error('No WebGPU support');
    }

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 100);
    camera.position.set(1, 2, 3);

    scene = new THREE.Scene();
    camera.lookAt(0, 1, 0);

    clock = new THREE.Clock();

    //lights

    const centerLight = new THREE.PointLight(0xff9900, 1, 100);
    centerLight.position.y = 4.5;
    centerLight.position.z = -2;
    centerLight.power = 1700;
    scene.add(centerLight);

    const cameraLight = new THREE.PointLight(0x0099ff, 1, 100);
    cameraLight.power = 1700;
    camera.add(cameraLight);
    scene.add(camera);

    const loader = new GLTFLoader();
    loader.load('models/gltf/Michelle.glb', function (gltf) {
        const object = gltf.scene;

        mixer = new THREE.AnimationMixer(object);

        const action = mixer.clipAction(gltf.animations[0]);
        action.play();

        const instanceCount = 30;
        const dummy = new THREE.Object3D();

        object.traverse(child => {
            if (child.isMesh) {
                const oscNode = oscSine(timerLocal(0.1));

                // random colors between instances from 0x000000 to 0xFFFFFF
                const randomColors = range(new THREE.Color(0x000000), new THREE.Color(0xffffff));

                // random [ 0, 1 ] values between instances
                const randomMetalness = range(0, 1);

                child.material = new MeshStandardNodeMaterial();
                child.material.roughness = 0.1;
                child.material.metalnessNode = mix(0.0, randomMetalness, oscNode);
                child.material.colorNode = mix(color(0xffffff), randomColors, oscNode);

                child.isInstancedMesh = true;
                child.instanceMatrix = new THREE.InstancedBufferAttribute(new Float32Array(instanceCount * 16), 16);
                child.count = instanceCount;

                for (let i = 0; i < instanceCount; i++) {
                    dummy.position.x = -200 + (i % 5) * 70;
                    dummy.position.y = Math.floor(i / 5) * -200;

                    dummy.updateMatrix();

                    dummy.matrix.toArray(child.instanceMatrix.array, i * 16);
                }
            }
        });

        scene.add(object);
    });

    //renderer

    renderer = new WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.toneMappingNode = toneMapping(THREE.LinearToneMapping, 0.17);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    const delta = clock.getDelta();

    if (mixer) mixer.update(delta);

    renderer.render(scene, camera);
}
