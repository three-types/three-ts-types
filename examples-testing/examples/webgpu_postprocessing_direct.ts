import * as THREE from 'three/webgpu';
import { output, saturation, uniform, vec4 } from 'three/tsl';

import { Inspector } from 'three/addons/inspector/Inspector.js';

let camera, scene, renderer, renderPipeline;
let object;

init();

function init() {
    renderer = new THREE.WebGPURenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.inspector = new Inspector();
    document.body.appendChild(renderer.domElement);

    //

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    object = new THREE.Object3D();
    scene.add(object);

    const geometry = new THREE.SphereGeometry(1, 4, 4);

    for (let i = 0; i < 100; i++) {
        const material = new THREE.MeshPhongMaterial({ color: Math.random() * 0xffffff, flatShading: true });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
        mesh.position.multiplyScalar(Math.random() * 400);
        mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
        mesh.scale.setScalar(Math.random() * 50);
        object.add(mesh);
    }

    scene.add(new THREE.AmbientLight(0xcccccc));

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(1, 1, 1);
    scene.add(light);

    // direct post-processing

    const saturationFactor = uniform(0);

    renderPipeline = new THREE.DirectRenderPipeline(renderer);
    renderPipeline.outputNode = vec4(saturation(output.rgb, saturationFactor), output.a);

    // GUI

    const gui = renderer.inspector.createParameters('Settings');
    gui.add(saturationFactor, 'value', 0, 1, 0.01).name('Saturation');

    //

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    object.rotation.x += 0.005;
    object.rotation.y += 0.01;

    renderPipeline.render(scene, camera);
}
