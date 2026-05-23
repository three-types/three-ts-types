import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';
import { useNeedleProgressive } from '@needle-tools/gltf-progressive';

let camera, scene, renderer, mixer;
let airshipModel;

init();

function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 40);
    camera.position.set(-9, 2, -13);

    const fog = new THREE.Fog('#131055', 15, 50);
    scene.fog = fog;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 0.1;
    controls.maxDistance = 20;
    controls.target.set(-1, 2.1, 0);
    controls.update();

    new HDRLoader().setPath('textures/equirectangular/').load('quarry_01_1k.hdr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;

        scene.background = new THREE.Color('#192022');
        scene.backgroundBlurriness = 0.5;
        scene.environment = texture;
        scene.environmentRotation = new THREE.Euler(0, Math.PI / -2, 0, 'XYZ');
    });

    mixer = new THREE.AnimationMixer(scene);

    const loader = new GLTFLoader();

    useNeedleProgressive(loader, renderer);

    loader.load('https://cloud.needle.tools/-/assets/Z23hmXBZ2sPRdk-world/file', function (gltf) {
        const model = gltf.scene;

        model.scale.multiplyScalar(0.1);

        scene.add(model);

        const animations = gltf.animations;
        if (animations && animations.length) {
            for (const animation of animations) {
                mixer.clipAction(animation).play();
            }
        }
    });

    loader.load('https://cloud.needle.tools/-/assets/Z23hmXBZnlceI-ZnlceI-world/file', function (gltf) {
        const model = gltf.scene;

        model.scale.multiplyScalar(0.0005);

        model.position.set(1.6, 6, 7);

        model.rotation.set(0, Math.PI * 1.4, 0);

        scene.add(model);

        airshipModel = model;

        const animations = gltf.animations;

        if (animations && animations.length) {
            for (const animation of animations) {
                mixer.clipAction(animation).play();
            }
        }
    });

    loader.load('https://cloud.needle.tools/-/assets/Z23hmXBZ21QnG-Z21QnG-product/file', function (gltf) {
        const model = gltf.scene;

        model.scale.multiplyScalar(0.5);

        model.position.set(2, 5.15, 2.3);

        model.rotation.set(0, Math.PI * 1, 0);

        scene.add(model);

        const animations = gltf.animations;
        if (animations && animations.length) {
            for (const animation of animations) {
                mixer.clipAction(animation).play();
            }
        }
    });

    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

//

const timer = new THREE.Timer();
timer.connect(document);
let time = 0;

function animate() {
    timer.update();

    const dt = timer.getDelta();
    time += dt;

    mixer.update(dt);

    if (airshipModel) {
        airshipModel.position.y += Math.sin(time) * 0.002;
    }

    renderer.render(scene, camera);

    window.requestAnimationFrame(animate);
}

animate();
