import * as THREE from 'three';

import { MDDLoader } from 'three/addons/loaders/MDDLoader.js';

let camera, scene, renderer, mixer, clock;

init();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(8, 8, 8);
    camera.lookAt(scene.position);

    clock = new THREE.Clock();

    //

    const loader = new MDDLoader();
    loader.load('models/mdd/cube.mdd', function (result) {
        const morphTargets = result.morphTargets;
        const clip = result.clip;
        // clip.optimize(); // optional

        const geometry = new THREE.BoxGeometry();
        geometry.morphAttributes.position = morphTargets; // apply morph targets

        const material = new THREE.MeshNormalMaterial();

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        mixer = new THREE.AnimationMixer(mesh);
        mixer.clipAction(clip).play(); // use clip
    });

    //

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
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
