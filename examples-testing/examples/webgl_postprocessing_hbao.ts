import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { HBAOPass } from 'three/addons/postprocessing/HBAOPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

let mixer;

const clock = new THREE.Clock();
const container = document.createElement('div');
document.body.appendChild(container);

const stats = new Stats();
container.appendChild(stats.dom);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const pmremGenerator = new THREE.PMREMGenerator(renderer);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfe3dd);
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(renderer), 0.04).texture;

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
camera.position.set(5, 2, 8);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.5, 0);
controls.update();
controls.enablePan = false;
controls.enableDamping = true;

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('jsm/libs/draco/gltf/');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
loader.load(
    'models/gltf/LittlestTokyo.glb',
    function (gltf) {
        const model = gltf.scene;
        model.position.set(1, 1, 0);
        model.scale.set(0.01, 0.01, 0.01);
        scene.add(model);

        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(gltf.animations[0]).play();

        animate();
    },
    undefined,
    function (e) {
        console.error(e);
    },
);

const width = window.innerWidth;
const height = window.innerHeight;
const pixelRatio = renderer.getPixelRatio();
const maxSamples = renderer.capabilities.maxSamples;

const renderTarget = new THREE.WebGLRenderTarget(width * pixelRatio, height * pixelRatio, {
    type: THREE.HalfFloatType,
    samples: maxSamples,
});
renderTarget.texture.name = 'EffectComposer.rt1';
const composer = new EffectComposer(renderer, renderTarget);

const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const hbaoPass = new HBAOPass(scene, camera, width, height);
hbaoPass.output = HBAOPass.OUTPUT.Denoise;
composer.addPass(hbaoPass);

const outputPass = new OutputPass();
composer.addPass(outputPass);

// Init gui
const gui = new GUI();

gui.add(hbaoPass, 'output', {
    Default: HBAOPass.OUTPUT.Default,
    Diffuse: HBAOPass.OUTPUT.Diffuse,
    'HBAO Only': HBAOPass.OUTPUT.HBAO,
    'HBAO Only + Denoise': HBAOPass.OUTPUT.Denoise,
    Depth: HBAOPass.OUTPUT.Depth,
    Normal: HBAOPass.OUTPUT.Normal,
}).onChange(function (value) {
    hbaoPass.output = value;
});

const hbaoParameters = {
    radius: 2,
    distanceExponent: 1,
    bias: 0.01,
    samples: 16,
};
const pdParameters = {
    lumaPhi: 10,
    depthPhi: 2,
    normalPhi: 3,
    radius: 10,
    rings: 4,
    samples: 16,
};
hbaoPass.updateHbaoMaterial(hbaoParameters);
hbaoPass.updatePdMaterial(pdParameters);
gui.add(hbaoParameters, 'radius')
    .min(0.01)
    .max(10)
    .step(0.01)
    .onChange(() => hbaoPass.updateHbaoMaterial(hbaoParameters));
gui.add(hbaoParameters, 'distanceExponent')
    .min(1)
    .max(4)
    .step(0.01)
    .onChange(() => hbaoPass.updateHbaoMaterial(hbaoParameters));
gui.add(hbaoParameters, 'bias')
    .min(0)
    .max(0.1)
    .step(0.001)
    .onChange(() => hbaoPass.updateHbaoMaterial(hbaoParameters));
gui.add(hbaoParameters, 'samples')
    .min(1)
    .max(32)
    .step(1)
    .onChange(() => hbaoPass.updateHbaoMaterial(hbaoParameters));
gui.add(pdParameters, 'lumaPhi')
    .min(0)
    .max(20)
    .step(0.01)
    .onChange(() => hbaoPass.updatePdMaterial(pdParameters));
gui.add(pdParameters, 'depthPhi')
    .min(0.01)
    .max(20)
    .step(0.01)
    .onChange(() => hbaoPass.updatePdMaterial(pdParameters));
gui.add(pdParameters, 'normalPhi')
    .min(0.01)
    .max(20)
    .step(0.01)
    .onChange(() => hbaoPass.updatePdMaterial(pdParameters));
gui.add(pdParameters, 'radius')
    .min(0)
    .max(32)
    .step(1)
    .onChange(() => hbaoPass.updatePdMaterial(pdParameters));
gui.add(pdParameters, 'rings')
    .min(0)
    .max(16)
    .step(0.125)
    .onChange(() => hbaoPass.updatePdMaterial(pdParameters));
gui.add(pdParameters, 'samples')
    .min(1)
    .max(32)
    .step(1)
    .onChange(() => hbaoPass.updatePdMaterial(pdParameters));

window.addEventListener('resize', onWindowResize);

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    composer.setSize(width, height);
}

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    mixer.update(delta);

    controls.update();

    stats.begin();
    composer.render();
    stats.end();
}
