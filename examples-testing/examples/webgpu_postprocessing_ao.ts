import * as THREE from 'three';
import { pass, mrt, output, transformedNormalView } from 'three/tsl';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import Stats from 'three/addons/libs/stats.module.js';

let camera, scene, renderer, postProcessing, controls, clock, stats, mixer;

init();

async function init() {
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
    camera.position.set(5, 2, 8);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfe3dd);

    clock = new THREE.Clock();

    const hdrloader = new RGBELoader();
    const texture = await hdrloader.loadAsync('textures/equirectangular/quarry_01_1k.hdr');
    texture.mapping = THREE.EquirectangularReflectionMapping;

    scene.environment = texture;

    renderer = new THREE.WebGPURenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.5, 0);
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;

    stats = new Stats();
    document.body.appendChild(stats.dom);

    //

    postProcessing = new THREE.PostProcessing(renderer);

    const scenePass = pass(scene, camera);
    scenePass.setMRT(
        mrt({
            output: output,
            normal: transformedNormalView,
        }),
    );

    const scenePassColor = scenePass.getTextureNode('output');
    const scenePassNormal = scenePass.getTextureNode('normal');
    const scenePassDepth = scenePass.getTextureNode('depth');

    const aoPass = scenePassColor.ao(scenePassDepth, scenePassNormal, camera);

    postProcessing.outputNode = aoPass;

    //

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('jsm/libs/draco/');
    dracoLoader.setDecoderConfig({ type: 'js' });
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.setPath('models/gltf/');

    const gltf = await loader.loadAsync('LittlestTokyo.glb');

    const model = gltf.scene;
    model.position.set(1, 1, 0);
    model.scale.set(0.01, 0.01, 0.01);
    scene.add(model);

    mixer = new THREE.AnimationMixer(model);
    mixer.clipAction(gltf.animations[0]).play();

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}

function animate() {
    const delta = clock.getDelta();

    if (mixer) {
        mixer.update(delta);
    }

    controls.update();

    postProcessing.render();
    stats.update();
}
