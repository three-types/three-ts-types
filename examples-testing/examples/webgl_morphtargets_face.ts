import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let camera: THREE.PerspectiveCamera,
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer,
    stats: Stats,
    mixer: THREE.AnimationMixer,
    clock: THREE.Clock,
    controls: OrbitControls;

init();

function init() {
    clock = new THREE.Clock();

    const container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 20);
    camera.position.set(-1.8, 0.8, 3);

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    container.appendChild(renderer.domElement);

    const ktx2Loader = new KTX2Loader().setTranscoderPath('jsm/libs/basis/').detectSupport(renderer);

    new GLTFLoader()
        .setKTX2Loader(ktx2Loader)
        .setMeshoptDecoder(MeshoptDecoder)
        .load('models/gltf/facecap.glb', gltf => {
            const mesh = gltf.scene.children[0];

            scene.add(mesh);

            mixer = new THREE.AnimationMixer(mesh);

            mixer.clipAction(gltf.animations[0]).play();

            // GUI

            const head = mesh.getObjectByName('mesh_2') as THREE.Mesh;
            const influences = head.morphTargetInfluences!;

            const gui = new GUI();
            gui.close();

            for (const [key, value] of Object.entries(head.morphTargetDictionary!)) {
                gui.add(influences, value, 0, 1, 0.01).name(key.replace('blendShape1.', '')).listen();
            }
        });

    const environment = new RoomEnvironment();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    scene.background = new THREE.Color(0x666666);
    scene.environment = pmremGenerator.fromScene(environment).texture;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 2.5;
    controls.maxDistance = 5;
    controls.minAzimuthAngle = -Math.PI / 2;
    controls.maxAzimuthAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 1.8;
    controls.target.set(0, 0.15, -0.2);

    stats = new Stats();
    container.appendChild(stats.dom);

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    const delta = clock.getDelta();

    if (mixer) {
        mixer.update(delta);
    }

    renderer.render(scene, camera);

    controls.update();

    stats.update();
}
