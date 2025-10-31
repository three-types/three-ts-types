import * as THREE from 'three/webgpu';
import { color, screenUV } from 'three/tsl';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGPURenderer;

let mixer: THREE.AnimationMixer, clock: THREE.Clock;

init();

function init() {
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 100);
    camera.position.set(1, 2, 3);

    scene = new THREE.Scene();
    scene.backgroundNode = screenUV.y.mix(color(0x66bbff), color(0x4466ff));
    camera.lookAt(0, 1, 0);

    clock = new THREE.Clock();

    //lights

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.power = 2500;
    camera.add(light);
    scene.add(camera);

    const ambient = new THREE.AmbientLight(0x4466ff, 1);
    scene.add(ambient);

    const loader = new GLTFLoader();
    loader.load('models/gltf/Michelle.glb', function (gltf) {
        const object = gltf.scene;
        mixer = new THREE.AnimationMixer(object);

        const action = mixer.clipAction(gltf.animations[0]);
        action.play();

        scene.add(object);
    });

    //renderer

    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 0.4;
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    const delta = clock.getDelta();

    if (mixer) mixer.update(delta);

    renderer.render(scene, camera);
}
