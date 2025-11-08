import * as THREE from 'three';

import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, scene, renderer;

init();

async function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
    camera.position.set(0, 0, 8);

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(render);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.update();

    new HDRLoader().setPath('textures/equirectangular/').load('royal_esplanade_1k.hdr', function (map) {
        map.mapping = THREE.EquirectangularReflectionMapping;

        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        const envMap = pmremGenerator.fromEquirectangular(map).texture;

        scene.background = envMap;
        scene.backgroundBlurriness = 0.5;

        pmremGenerator.dispose();

        const geometry = new THREE.SphereGeometry(0.4, 64, 64);

        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 5; j++) {
                const material = new THREE.MeshPhysicalMaterial({
                    roughness: i / 5,
                    metalness: j / 4,
                    envMap: envMap,
                });

                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.x = i - 2.5;
                mesh.position.y = j - 2;
                scene.add(mesh);
            }
        }
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
