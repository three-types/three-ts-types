import * as THREE from 'three';
import { mix, pass, renderOutput, smoothstep, uniform, vec3 } from 'three/tsl';
import { gaussianBlur } from 'three/addons/tsl/display/GaussianBlurNode.js';
import { fxaa } from 'three/addons/tsl/display/FXAANode.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { UltraHDRLoader } from 'three/addons/loaders/UltraHDRLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import TWEEN from 'three/addons/libs/tween.module.js';

let camera, scene, timer, renderer, model, mixer, raycaster, postProcessing;

const pointerCoords = new THREE.Vector2();
const focusPoint = new THREE.Vector3(1, 1.75, -0.4);
const focusPointView = uniform(vec3());

init();

async function init() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(-5, 4, 5);
    camera.lookAt(0, 1.5, 0);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x90d5ff);

    raycaster = new THREE.Raycaster();

    timer = new THREE.Timer();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('jsm/libs/draco/gltf/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    const gltf = await loader.loadAsync('models/gltf/bath_day.glb');

    model = gltf.scene;
    scene.add(model);

    mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(gltf.animations[0]);
    action.play();

    //

    const hdrLoader = new UltraHDRLoader();
    hdrLoader.setDataType(THREE.HalfFloatType);
    const envMap = await hdrLoader.loadAsync('textures/equirectangular/spruit_sunrise_2k.hdr.jpg');
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.environmentRotation.y = Math.PI * 0.5;
    scene.environment = envMap;

    // renderer

    renderer = new THREE.WebGPURenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.toneMapping = THREE.NeutralToneMapping;
    document.body.appendChild(renderer.domElement);

    // post processing

    postProcessing = new THREE.PostProcessing(renderer);
    postProcessing.outputColorTransform = false;

    // DOF uniforms

    const maxBlur = uniform(2); // maximum amount of blur
    const minDistance = uniform(1); // all positions at or below minDistance will be completely in focus.
    const maxDistance = uniform(3); // all positions at or beyond maxDistance will be completely out of focus.

    // beauty and blur/out-of-focus pass

    const scenePass = pass(scene, camera);
    const scenePassViewZ = scenePass.getViewZNode();
    const scenePassBlurred = gaussianBlur(scenePass, maxBlur);

    // simple DOF from https://lettier.github.io/3d-game-shaders-for-beginners/depth-of-field.html

    const blur = smoothstep(minDistance, maxDistance, scenePassViewZ.sub(focusPointView.z).abs());
    const dofPass = mix(scenePass, scenePassBlurred, blur);

    const outputPass = renderOutput(dofPass);
    const fxaaPass = fxaa(outputPass);

    postProcessing.outputNode = fxaaPass;

    // GUI

    const gui = new GUI();
    gui.add(minDistance, 'value', 0, 3).name('min distance');
    gui.add(maxDistance, 'value', 0, 5).name('max distance');
    gui.add(maxBlur, 'value', 0, 5).name('max blur');

    //

    renderer.domElement.addEventListener('pointerdown', onPointerDown);

    window.addEventListener('resize', onWindowResize);
}

function onPointerDown(event) {
    pointerCoords.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);

    raycaster.setFromCamera(pointerCoords, camera);

    const intersects = raycaster.intersectObject(model);

    if (intersects.length > 0) {
        TWEEN.removeAll();

        new TWEEN.Tween(focusPoint).to(intersects[0].point, 500).easing(TWEEN.Easing.Cubic.InOut).start();
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    TWEEN.update();

    timer.update();

    mixer.update(timer.getDelta());

    // since the focus point is expressed in view space, it must be updated on every
    // camera change. for simplicity, do this every frame.

    camera.updateMatrixWorld();
    focusPointView.value.copy(focusPoint).applyMatrix4(camera.matrixWorldInverse);

    postProcessing.render();
}
