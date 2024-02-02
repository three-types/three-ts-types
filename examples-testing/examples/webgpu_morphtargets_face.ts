import * as THREE from 'three';

import WebGPU from 'three/addons/capabilities/WebGPU.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js';

import Stats from 'three/addons/libs/stats.module.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

init();

async function init() {
    if (WebGPU.isAvailable() === false && WebGL.isWebGL2Available() === false) {
        document.body.appendChild(WebGPU.getErrorMessage());

        throw new Error('No WebGPU or WebGL2 support');
    }

    let mixer;

    const clock = new THREE.Clock();

    const container = document.createElement('div');
    document.body.appendChild(container);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 20);
    camera.position.set(-1.8, 0.8, 3);

    const scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight(0xffffff, 0x443333, 2));

    const renderer = new WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.setAnimationLoop(animate);

    container.appendChild(renderer.domElement);

    const ktx2Loader = await new KTX2Loader().setTranscoderPath('jsm/libs/basis/').detectSupportAsync(renderer);

    new GLTFLoader()
        .setKTX2Loader(ktx2Loader)
        .setMeshoptDecoder(MeshoptDecoder)
        .load('models/gltf/facecap.glb', gltf => {
            const mesh = gltf.scene.children[0];

            scene.add(mesh);

            mixer = new THREE.AnimationMixer(mesh);

            mixer.clipAction(gltf.animations[0]).play();

            // GUI

            const head = mesh.getObjectByName('mesh_2');
            const influences = head.morphTargetInfluences;

            //head.morphTargetInfluences = null;

            // WebGPURenderer: Unsupported texture format. 33776
            head.material.map = null;

            const gui = new GUI();
            gui.close();

            for (const [key, value] of Object.entries(head.morphTargetDictionary)) {
                gui.add(influences, value, 0, 1, 0.01).name(key.replace('blendShape1.', '')).listen();
            }
        });

    scene.background = new THREE.Color(0x666666);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 2.5;
    controls.maxDistance = 5;
    controls.minAzimuthAngle = -Math.PI / 2;
    controls.maxAzimuthAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 1.8;
    controls.target.set(0, 0.15, -0.2);

    const stats = new Stats();
    container.appendChild(stats.dom);

    function animate() {
        const delta = clock.getDelta();

        if (mixer) {
            mixer.update(delta);
        }

        renderer.render(scene, camera);

        controls.update();

        stats.update();
    }

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
