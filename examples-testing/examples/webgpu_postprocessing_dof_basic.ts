import * as THREE from 'three/webgpu';
import { mix, pass, renderOutput, smoothstep, uniform, vec3 } from 'three/tsl';
import { boxBlur } from 'three/addons/tsl/display/boxBlur.js';
import { fxaa } from 'three/addons/tsl/display/FXAANode.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { UltraHDRLoader } from 'three/addons/loaders/UltraHDRLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

import { Inspector } from 'three/addons/inspector/Inspector.js';
import TWEEN from 'three/addons/libs/tween.module.js';

let camera: THREE.PerspectiveCamera,
    controls: OrbitControls,
    scene: THREE.Scene,
    timer: THREE.Timer,
    renderer: THREE.WebGPURenderer,
    model: THREE.Group,
    mixer: THREE.AnimationMixer,
    raycaster: THREE.Raycaster,
    postProcessing: THREE.PostProcessing;

const pointerCoords = new THREE.Vector2();
const focusPoint = new THREE.Vector3(1, 1.75, -0.4);
const focusPointView = uniform(vec3());

init();

async function init() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(-6, 5, 6);

    controls = new OrbitControls(camera);
    controls.target.set(0, 2, 0);
    controls.enableDamping = true;
    controls.update();

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
    renderer.inspector = new Inspector();
    renderer.toneMapping = THREE.NeutralToneMapping;
    document.body.appendChild(renderer.domElement);

    // post processing

    postProcessing = new THREE.PostProcessing(renderer);
    postProcessing.outputColorTransform = false;

    // DOF uniforms

    const blurSize = uniform(2); // determines the kernel size of the blur
    const blurSpread = uniform(4); // determines how far the blur is spread
    const minDistance = uniform(1); // all positions at or below minDistance will be completely in focus.
    const maxDistance = uniform(3); // all positions at or beyond maxDistance will be completely out of focus.

    // beauty and blur/out-of-focus pass

    const scenePass = pass(scene, camera);

    const scenePassColor = scenePass.getTextureNode().toInspector('Color');
    const scenePassViewZ = scenePass.getViewZNode();
    const scenePassBlurred = boxBlur(scenePassColor, { size: blurSize, separation: blurSpread });

    // simple DOF from https://lettier.github.io/3d-game-shaders-for-beginners/depth-of-field.html

    const blur = smoothstep(minDistance, maxDistance, scenePassViewZ.sub(focusPointView.z).abs());
    const dofPass = mix(scenePassColor, scenePassBlurred, blur);

    const outputPass = renderOutput(dofPass);
    const fxaaPass = fxaa(outputPass);

    postProcessing.outputNode = fxaaPass;

    // GUI

    const gui = (renderer.inspector as Inspector).createParameters('Settings');
    gui.add(minDistance, 'value', 0, 3).name('min distance');
    gui.add(maxDistance, 'value', 0, 5).name('max distance');
    gui.add(blurSize, 'value', 1, 3, 1).name('blur size');
    gui.add(blurSpread, 'value', 1, 7, 1).name('blur spread');

    //

    controls.connect(renderer.domElement);

    renderer.domElement.addEventListener('pointerdown', onPointerDown);

    window.addEventListener('resize', onWindowResize);
}

function onPointerDown(event: PointerEvent) {
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

    controls.update();

    timer.update();

    mixer.update(timer.getDelta());

    // since the focus point is expressed in view space, it must be updated on every
    // camera change. for simplicity, do this every frame.

    camera.updateMatrixWorld();
    focusPointView.value.copy(focusPoint).applyMatrix4(camera.matrixWorldInverse);

    postProcessing.render();
}
