import * as THREE from 'three/webgpu';
import { pass, luminance, saturation } from 'three/tsl';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { Inspector } from 'three/addons/inspector/Inspector.js';

const params = {
    speed: 0,
};

let camera, renderer, postProcessing;
let timer, mesh, controls;

init();

function init() {
    renderer = new THREE.WebGPURenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.inspector = new Inspector();
    renderer.toneMapping = THREE.NeutralToneMapping;
    document.body.appendChild(renderer.domElement);

    //

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100);
    camera.position.set(1, 2, 3);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0487e2, 7, 25);
    scene.background = new THREE.Color(0x0487e2);

    timer = new THREE.Timer();
    timer.connect(document);

    const texture = new THREE.TextureLoader().load('textures/crate.gif');
    texture.colorSpace = THREE.SRGBColorSpace;

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ map: texture });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // post processing

    postProcessing = new THREE.PostProcessing(renderer);

    const scenePass = pass(scene, camera);

    const currentTexture = scenePass.getTextureNode();
    const previousTexture = scenePass.getPreviousTextureNode();

    const frameDiff = previousTexture.sub(currentTexture).abs();

    const saturationAmount = luminance(frameDiff).mul(1000).clamp(0, 3);

    postProcessing.outputNode = saturation(currentTexture, saturationAmount);

    //

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.enableDamping = true;
    controls.dampingFactor = 0.01;

    window.addEventListener('resize', onWindowResize);

    //

    const gui = renderer.inspector.createParameters('Settings');
    gui.add(params, 'speed', 0, 2);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    timer.update();

    controls.update();

    mesh.rotation.y += timer.getDelta() * 5 * params.speed;

    postProcessing.render();
}
