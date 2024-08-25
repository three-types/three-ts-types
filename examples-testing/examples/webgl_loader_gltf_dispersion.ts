import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

let camera, scene, renderer;

init().then(render);

async function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 5);
    camera.position.set(0.1, 0.05, 0.15);

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1;
    container.appendChild(renderer.domElement);

    const environment = new RoomEnvironment();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    scene = new THREE.Scene();
    scene.backgroundBlurriness = 0.5;

    const env = pmremGenerator.fromScene(environment).texture;
    scene.background = env;
    scene.environment = env;
    environment.dispose();

    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync('models/gltf/DispersionTest.glb');

    scene.add(gltf.scene);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render); // use if there is no animation loop
    controls.minDistance = 0.1;
    controls.maxDistance = 10;
    controls.target.set(0, 0, 0);
    controls.update();

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();
}

//

function render() {
    renderer.render(scene, camera);
}
