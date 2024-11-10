import * as THREE from 'three';
import { pass, texture3D, uniform, renderOutput } from 'three/tsl';
import { lut3D } from 'three/addons/tsl/display/Lut3DNode.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { LUTCubeLoader } from 'three/addons/loaders/LUTCubeLoader.js';
import { LUT3dlLoader } from 'three/addons/loaders/LUT3dlLoader.js';
import { LUTImageLoader } from 'three/addons/loaders/LUTImageLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const params = {
    lut: 'Bourbon 64.CUBE',
    intensity: 1,
};

const lutMap = {
    'Bourbon 64.CUBE': null,
    'Chemical 168.CUBE': null,
    'Clayton 33.CUBE': null,
    'Cubicle 99.CUBE': null,
    'Remy 24.CUBE': null,
    'Presetpro-Cinematic.3dl': null,
    NeutralLUT: null,
    'B&WLUT': null,
    NightLUT: null,
};

let gui;
let camera, scene, renderer;
let postProcessing, lutPass;

init();

async function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
    camera.position.set(-1.8, 0.6, 2.7);

    scene = new THREE.Scene();

    new RGBELoader().setPath('textures/equirectangular/').load('royal_esplanade_1k.hdr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;

        scene.background = texture;
        scene.environment = texture;

        // model

        const loader = new GLTFLoader().setPath('models/gltf/DamagedHelmet/glTF/');
        loader.load('DamagedHelmet.gltf', function (gltf) {
            scene.add(gltf.scene);
        });
    });

    const lutCubeLoader = new LUTCubeLoader();
    const lutImageLoader = new LUTImageLoader();
    const lut3dlLoader = new LUT3dlLoader();

    for (const name in lutMap) {
        if (/\.CUBE$/i.test(name)) {
            lutMap[name] = lutCubeLoader.loadAsync('luts/' + name);
        } else if (/\LUT$/i.test(name)) {
            lutMap[name] = lutImageLoader.loadAsync(`luts/${name}.png`);
        } else {
            lutMap[name] = lut3dlLoader.loadAsync('luts/' + name);
        }
    }

    const pendings = Object.values(lutMap);
    await Promise.all(pendings);

    for (const name in lutMap) {
        lutMap[name] = await lutMap[name];
    }

    renderer = new THREE.WebGPURenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // post processing

    postProcessing = new THREE.PostProcessing(renderer);

    // ignore default output color transform ( toneMapping and outputColorSpace )
    // use renderOutput() for control the sequence

    postProcessing.outputColorTransform = false;

    // scene pass

    const scenePass = pass(scene, camera);
    const outputPass = renderOutput(scenePass);

    const lut = lutMap[params.lut];
    lutPass = lut3D(outputPass, texture3D(lut.texture3D), lut.texture3D.image.width, uniform(1));

    postProcessing.outputNode = lutPass;

    //

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.target.set(0, 0, -0.2);
    controls.update();

    gui = new GUI();
    gui.add(params, 'lut', Object.keys(lutMap));
    gui.add(params, 'intensity').min(0).max(1);

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
    lutPass.intensityNode.value = params.intensity;

    if (lutMap[params.lut]) {
        const lut = lutMap[params.lut];
        lutPass.lutNode.value = lut.texture3D;
        lutPass.size.value = lut.texture3D.image.width;
    }

    postProcessing.render();
}
