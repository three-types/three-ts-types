import * as THREE from 'three/webgpu';

import Stats from 'stats-gl';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';

let camera, scene, renderer, stats;
let model;

const options = { static: true };

init();

function setStatic(object, value) {
    object.traverse(child => {
        if (child.isMesh) {
            child.static = value;
        }
    });
}

function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(60, 60, 60);

    scene = new THREE.Scene();

    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    renderer.setAnimationLoop(render);
    container.appendChild(renderer.domElement);

    //

    stats = new Stats({
        precision: 3,
        horizontal: false,
        trackGPU: true,
    });
    stats.init(renderer);

    document.body.appendChild(stats.dom);

    new HDRLoader().setPath('textures/equirectangular/').load('royal_esplanade_1k.hdr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;

        scene.environment = texture;

        // model

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('jsm/libs/draco/gltf/');

        const loader = new GLTFLoader().setPath('models/gltf/');
        loader.setDRACOLoader(dracoLoader);

        loader.load('dungeon_warkarma.glb', async function (gltf) {
            model = gltf.scene;

            // wait until the model can be added to the scene without blocking due to shader compilation

            await renderer.compileAsync(model, camera, scene);

            scene.add(model);

            //

            setStatic(model, options.static);
        });
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 60;
    controls.target.set(0, 0, -0.2);
    controls.update();

    // gui

    const gui = new GUI();
    gui.add(options, 'static').onChange(() => {
        setStatic(model, options.static);
    });

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

//

async function render() {
    await renderer.renderAsync(scene, camera);
    renderer.resolveTimestampsAsync(THREE.TimestampQuery.RENDER);

    stats.update();
}
