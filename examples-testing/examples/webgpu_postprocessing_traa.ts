import * as THREE from 'three';
import { mrt, output, velocity } from 'three/tsl';
import { traaPass } from 'three/addons/tsl/display/TRAAPassNode.js';

import Stats from 'three/addons/libs/stats.module.js';

let camera, scene, renderer, postProcessing;
let stats;
let index = 0;

init();

function init() {
    renderer = new THREE.WebGPURenderer({ forceWebGL: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    stats = new Stats();
    document.body.appendChild(stats.dom);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10);
    camera.position.z = 2.5;

    scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry();
    const material1 = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });

    const mesh1 = new THREE.Mesh(geometry, material1);
    mesh1.position.x = -1;
    scene.add(mesh1);

    const texture = new THREE.TextureLoader().load('textures/brick_diffuse.jpg');
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.generateMipmaps = false;
    texture.colorSpace = THREE.SRGBColorSpace;

    const material2 = new THREE.MeshBasicMaterial({ map: texture });

    const mesh2 = new THREE.Mesh(geometry, material2);
    mesh2.position.x = 1;
    scene.add(mesh2);

    // postprocessing

    postProcessing = new THREE.PostProcessing(renderer);
    const scenePass = traaPass(scene, camera);
    scenePass.setMRT(
        mrt({
            output: output,
            velocity: velocity,
        }),
    );

    postProcessing.outputNode = scenePass;

    //

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}

function animate() {
    index++;

    if (Math.round(index / 200) % 2 === 0) {
        for (let i = 0; i < scene.children.length; i++) {
            const child = scene.children[i];

            child.rotation.x += 0.005;
            child.rotation.y += 0.01;
        }
    }

    postProcessing.render();

    stats.update();
}
