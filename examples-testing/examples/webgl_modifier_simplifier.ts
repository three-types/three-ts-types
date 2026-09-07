import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { SimplifyModifier } from 'three/addons/modifiers/SimplifyModifier.js';

let renderer, scene, camera;

init();

function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 15;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render); // use if there is no animation loop
    controls.enablePan = false;
    controls.enableZoom = false;

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const light = new THREE.PointLight(0xffffff, 400);
    camera.add(light);
    scene.add(camera);

    new GLTFLoader().load('models/gltf/LeePerrySmith/LeePerrySmith.glb', function (gltf) {
        const mesh = gltf.scene.children[0];
        mesh.position.x = -3;
        mesh.rotation.y = Math.PI / 2;
        scene.add(mesh);

        const modifier = new SimplifyModifier();

        const simplified = mesh.clone();
        simplified.material = simplified.material.clone();
        simplified.material.flatShading = true;

        simplified.position.x = 3;
        simplified.rotation.y = -Math.PI / 2;
        scene.add(simplified);

        const params = { ratio: 0.125 };

        async function simplify() {
            const count = Math.floor(mesh.geometry.attributes.position.count * (1 - params.ratio)); // number of vertices to remove

            const geometry = await modifier.modify(mesh.geometry, count);

            if (simplified.geometry !== mesh.geometry) simplified.geometry.dispose();

            simplified.geometry = geometry;

            render();
        }

        simplify();

        const gui = new GUI();
        gui.add(params, 'ratio', 0.01, 1, 0.01).onChange(simplify);
    });

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    render();
}

function render() {
    renderer.render(scene, camera);
}
