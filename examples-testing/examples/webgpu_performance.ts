import * as THREE from 'three/webgpu';

import { Inspector } from 'three/addons/inspector/Inspector.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGPURenderer;
let model: THREE.Group;

const options = { static: true };

init();

function setStatic(object: THREE.Group, value: boolean) {
    object.traverse(child => {
        if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).static = value;
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
    renderer.inspector = new Inspector();
    renderer.setAnimationLoop(render);
    container.appendChild(renderer.domElement);

    //

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

    const gui = (renderer.inspector as Inspector).createParameters('Settings');
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

function render() {
    renderer.render(scene, camera);
}
