import * as THREE from 'three/webgpu';
import { pass } from 'three/tsl';
import { fsr1 } from 'three/addons/tsl/display/FSR1Node.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Inspector } from 'three/addons/inspector/Inspector.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const params = {
    upscaleMethod: 'FSR1',
    resolutionScale: 0.5,
};

let camera, scene, renderer, renderPipeline, controls, mixer, timer;

init();

async function init() {
    camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(-0.5, 0, 12);

    scene = new THREE.Scene();

    timer = new THREE.Timer();
    timer.connect(document);

    // model

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('jsm/libs/draco/');
    dracoLoader.setDecoderConfig({ type: 'js' });
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load('models/gltf/LittlestTokyo.glb', function (gltf) {
        const model = gltf.scene;
        model.scale.set(0.01, 0.01, 0.01);
        scene.add(model);

        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(gltf.animations[0]).play();

        renderer.setAnimationLoop(animate);
    });

    // renderer

    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.inspector = new Inspector();
    document.body.appendChild(renderer.domElement);

    await renderer.init();

    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfe3dd);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

    // controls

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(-0.5, 0, 0);

    // render pipeline

    renderPipeline = new THREE.RenderPipeline(renderer);

    const scenePass = pass(scene, camera).toInspector('Color');
    scenePass.setResolutionScale(params.resolutionScale);

    // FSR 1

    const fsr1Node = fsr1(scenePass).toInspector('FSR1');

    //

    function updatePipeline() {
        if (params.upscaleMethod === 'FSR1') {
            renderPipeline.outputNode = fsr1Node;
        } else {
            renderPipeline.outputNode = scenePass;
        }

        renderPipeline.needsUpdate = true;
    }

    // gui

    const gui = renderer.inspector.createParameters('Settings');
    gui.add(params, 'upscaleMethod', ['Bilinear', 'FSR1']).onChange(updatePipeline);
    gui.add(params, 'resolutionScale', 0.25, 1.0, 0.25).onChange(value => {
        scenePass.setResolutionScale(value);
    });

    updatePipeline();

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    controls.update();

    timer.update();

    const delta = timer.getDelta();

    if (mixer) {
        mixer.update(delta);
    }

    renderPipeline.render();
}
