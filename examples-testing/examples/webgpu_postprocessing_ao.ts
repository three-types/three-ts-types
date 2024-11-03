import * as THREE from 'three';
import { pass, mrt, output, transformedNormalView, texture } from 'three/tsl';
import { ao } from 'three/addons/tsl/display/GTAONode.js';
import { denoise } from 'three/addons/tsl/display/DenoiseNode.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { SimplexNoise } from 'three/addons/math/SimplexNoise.js';

import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let camera, scene, renderer, postProcessing, controls, clock, stats, mixer;

let aoPass, denoisePass, blendPassAO, blendPassDenoise, scenePassColor;

const params = {
    distanceExponent: 1,
    distanceFallOff: 1,
    radius: 0.25,
    scale: 1,
    thickness: 1,
    denoised: true,
    enabled: true,
    denoiseRadius: 5,
    lumaPhi: 5,
    depthPhi: 5,
    normalPhi: 5,
};

init();

async function init() {
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
    camera.position.set(5, 2, 8);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfe3dd);

    clock = new THREE.Clock();

    const hdrloader = new RGBELoader();
    const envMap = await hdrloader.loadAsync('textures/equirectangular/quarry_01_1k.hdr');
    envMap.mapping = THREE.EquirectangularReflectionMapping;

    scene.environment = envMap;

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

    scenePassColor = scenePass.getTextureNode('output');
    const scenePassNormal = scenePass.getTextureNode('normal');
    const scenePassDepth = scenePass.getTextureNode('depth');

    // ao

    aoPass = ao(scenePassDepth, scenePassNormal, camera);
    blendPassAO = aoPass.getTextureNode().mul(scenePassColor);

    // denoise (optional)

    const noiseTexture = texture(generateNoise());
    denoisePass = denoise(aoPass.getTextureNode(), scenePassDepth, scenePassNormal, noiseTexture, camera);
    blendPassDenoise = denoisePass.mul(scenePassColor);

    postProcessing.outputNode = blendPassDenoise;

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

    //

    const gui = new GUI();
    gui.title('AO settings');
    gui.add(params, 'distanceExponent').min(1).max(4).onChange(updateParameters);
    gui.add(params, 'distanceFallOff').min(0.01).max(1).onChange(updateParameters);
    gui.add(params, 'radius').min(0.01).max(1).onChange(updateParameters);
    gui.add(params, 'scale').min(0.01).max(2).onChange(updateParameters);
    gui.add(params, 'thickness').min(0.01).max(2).onChange(updateParameters);
    gui.add(params, 'denoised').onChange(updatePassChain);
    gui.add(params, 'enabled').onChange(updatePassChain);
    const folder = gui.addFolder('Denoise settings');
    folder.add(params, 'denoiseRadius').min(0.01).max(10).name('radius').onChange(updateParameters);
    folder.add(params, 'lumaPhi').min(0.01).max(10).onChange(updateParameters);
    folder.add(params, 'depthPhi').min(0.01).max(10).onChange(updateParameters);
    folder.add(params, 'normalPhi').min(0.01).max(10).onChange(updateParameters);
}

function updatePassChain() {
    if (params.enabled === true) {
        if (params.denoised === true) {
            postProcessing.outputNode = blendPassDenoise;
        } else {
            postProcessing.outputNode = blendPassAO;
        }
    } else {
        postProcessing.outputNode = scenePassColor;
    }

    postProcessing.needsUpdate = true;
}

function updateParameters() {
    aoPass.distanceExponent.value = params.distanceExponent;
    aoPass.distanceFallOff.value = params.distanceFallOff;
    aoPass.radius.value = params.radius;
    aoPass.scale.value = params.scale;
    aoPass.thickness.value = params.thickness;

    denoisePass.radius.value = params.denoiseRadius;
    denoisePass.lumaPhi.value = params.lumaPhi;
    denoisePass.depthPhi.value = params.depthPhi;
    denoisePass.normalPhi.value = params.normalPhi;
}

function generateNoise(size = 64) {
    const simplex = new SimplexNoise();

    const arraySize = size * size * 4;
    const data = new Uint8Array(arraySize);

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const x = i;
            const y = j;

            data[(i * size + j) * 4] = (simplex.noise(x, y) * 0.5 + 0.5) * 255;
            data[(i * size + j) * 4 + 1] = (simplex.noise(x + size, y) * 0.5 + 0.5) * 255;
            data[(i * size + j) * 4 + 2] = (simplex.noise(x, y + size) * 0.5 + 0.5) * 255;
            data[(i * size + j) * 4 + 3] = (simplex.noise(x + size, y + size) * 0.5 + 0.5) * 255;
        }
    }

    const noiseTexture = new THREE.DataTexture(data, size, size);
    noiseTexture.wrapS = THREE.RepeatWrapping;
    noiseTexture.wrapT = THREE.RepeatWrapping;
    noiseTexture.needsUpdate = true;

    return noiseTexture;
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
