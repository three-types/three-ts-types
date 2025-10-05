import * as THREE from 'three/webgpu';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, scene, renderer;

init();

async function init() {
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 20);
    camera.position.set(2, 2, 2);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    //lights

    const light = new THREE.PointLight(0xffffff);
    light.power = 1300;
    camera.add(light);
    scene.add(camera);

    //renderer

    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1;
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 3;
    controls.maxDistance = 6;
    controls.update();

    const ktx2Loader = await new KTX2Loader().setTranscoderPath('jsm/libs/basis/').detectSupportAsync(renderer);

    const loader = new GLTFLoader();
    loader.setKTX2Loader(ktx2Loader);
    loader.setMeshoptDecoder(MeshoptDecoder);
    loader.load('models/gltf/coffeemat.glb', function (gltf) {
        const gltfScene = gltf.scene;
        gltfScene.position.y = -0.8;
        gltfScene.scale.setScalar(0.01);

        scene.add(gltfScene);
    });

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.render(scene, camera);
}
