import * as THREE from 'three/webgpu';
import { pass } from 'three/tsl';
import { bloom } from 'three/addons/tsl/display/BloomNode.js';

import { Inspector } from 'three/addons/inspector/Inspector.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let camera;
let postProcessing, renderer, mixer, clock;

const params = {
    threshold: 0,
    strength: 1,
    radius: 0,
    exposure: 1,
};

init();

async function init() {
    const container = document.getElementById('container');

    clock = new THREE.Clock();

    const scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
    camera.position.set(-5, 2.5, -3.5);
    scene.add(camera);

    scene.add(new THREE.AmbientLight(0xcccccc));

    const pointLight = new THREE.PointLight(0xffffff, 100);
    camera.add(pointLight);

    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync('models/gltf/PrimaryIonDrive.glb');

    const model = gltf.scene;
    scene.add(model);

    mixer = new THREE.AnimationMixer(model);
    const clip = gltf.animations[0];
    mixer.clipAction(clip.optimize()).play();

    //

    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.inspector = new Inspector();
    document.body.appendChild(renderer.domElement);

    //

    postProcessing = new THREE.PostProcessing(renderer);

    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode('output').toInspector('Color');

    const bloomPass = bloom(scenePassColor).toInspector('Bloom');

    postProcessing.outputNode = scenePassColor.add(bloomPass);

    //

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 3;
    controls.maxDistance = 8;

    //

    const gui = renderer.inspector.createParameters('Settings');

    const bloomFolder = gui.addFolder('bloom');

    bloomFolder.add(params, 'threshold', 0.0, 1.0).onChange(function (value) {
        bloomPass.threshold.value = value;
    });

    bloomFolder.add(params, 'strength', 0.0, 3.0).onChange(function (value) {
        bloomPass.strength.value = value;
    });

    gui.add(params, 'radius', 0.0, 1.0)
        .step(0.01)
        .onChange(function (value) {
            bloomPass.radius.value = value;
        });

    const toneMappingFolder = gui.addFolder('tone mapping');

    toneMappingFolder.add(params, 'exposure', 0.1, 2).onChange(function (value) {
        renderer.toneMappingExposure = Math.pow(value, 4.0);
    });

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

    mixer.update(delta);

    postProcessing.render();
}
