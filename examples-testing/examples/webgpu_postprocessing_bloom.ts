import * as THREE from 'three/webgpu';
import { pass, uniform } from 'three/tsl';
import { bloom } from 'three/addons/tsl/display/BloomNode.js';
import { dualKawaseBloom } from 'three/addons/tsl/display/DualKawaseBloomNode.js';

import { Inspector } from 'three/addons/inspector/Inspector.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let camera;
let renderPipeline, renderer, mixer, timer;

const params = {
    type: 'Gaussian',
    exposure: 1,
};

init();

async function init() {
    timer = new THREE.Timer();
    timer.connect(document);

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

    renderPipeline = new THREE.RenderPipeline(renderer);

    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode('output').toInspector('Color');

    const strength = uniform(1);
    const radius = uniform(0);
    const threshold = uniform(0);

    const bloomPasses = {
        Gaussian: bloom(scenePassColor, strength, radius, threshold),
        'Dual Kawase': dualKawaseBloom(scenePassColor, strength, radius, threshold),
    };

    function updateBloom() {
        renderPipeline.outputNode = scenePassColor.add(bloomPasses[params.type]);
        renderPipeline.needsUpdate = true;
    }

    updateBloom();

    //

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 3;
    controls.maxDistance = 8;

    //

    const gui = renderer.inspector.createParameters('Settings');

    const bloomFolder = gui.addFolder('bloom');

    bloomFolder.add(params, 'type', ['Gaussian', 'Dual Kawase']).onChange(updateBloom);

    bloomFolder.add(threshold, 'value', 0.0, 1.0).name('threshold');

    bloomFolder.add(strength, 'value', 0.0, 3.0).name('strength');

    bloomFolder.add(radius, 'value', 0.0, 1.0, 0.01).name('radius');

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
    timer.update();

    const delta = timer.getDelta();

    mixer.update(delta);

    renderPipeline.render();
}
