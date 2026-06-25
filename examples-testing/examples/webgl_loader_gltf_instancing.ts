import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { UltraHDRLoader } from 'three/addons/loaders/UltraHDRLoader.js';

let camera, scene, renderer;

init();
render();

function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
    camera.position.set(-0.9, 0.41, -0.89);

    scene = new THREE.Scene();

    new UltraHDRLoader().setPath('textures/equirectangular/').load('royal_esplanade_2k.hdr.jpg', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;

        scene.background = texture;
        scene.environment = texture;

        render();

        // model

        const loader = new GLTFLoader().setPath('models/gltf/DamagedHelmet/glTF-instancing/');
        loader.load('DamagedHelmetGpuInstancing.gltf', function (gltf) {
            scene.add(gltf.scene);

            render();
        });
    });

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render); // use if there is no animation loop
    controls.minDistance = 0.2;
    controls.maxDistance = 10;
    controls.target.set(0, 0.25, 0);
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
