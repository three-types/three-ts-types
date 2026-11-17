import * as THREE from 'three';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BloomPass } from 'three/addons/postprocessing/BloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

let camera, renderer, composer, timer;

let uniforms, mesh;

init();

function init() {
    const container = document.getElementById('container');

    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 4;

    const scene = new THREE.Scene();

    timer = new THREE.Timer();
    timer.connect(document);

    const textureLoader = new THREE.TextureLoader();

    const cloudTexture = textureLoader.load('textures/lava/cloud.png');
    const lavaTexture = textureLoader.load('textures/lava/lavatile.jpg');

    lavaTexture.colorSpace = THREE.SRGBColorSpace;

    cloudTexture.wrapS = cloudTexture.wrapT = THREE.RepeatWrapping;
    lavaTexture.wrapS = lavaTexture.wrapT = THREE.RepeatWrapping;

    uniforms = {
        fogDensity: { value: 0.45 },
        fogColor: { value: new THREE.Vector3(0, 0, 0) },
        time: { value: 1.0 },
        uvScale: { value: new THREE.Vector2(3.0, 1.0) },
        texture1: { value: cloudTexture },
        texture2: { value: lavaTexture },
    };

    const size = 0.65;

    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
    });

    mesh = new THREE.Mesh(new THREE.TorusGeometry(size, 0.3, 30, 30), material);
    mesh.rotation.x = 0.3;
    scene.add(mesh);

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.autoClear = false;
    container.appendChild(renderer.domElement);

    //

    const renderModel = new RenderPass(scene, camera);
    const effectBloom = new BloomPass(1.25);
    const outputPass = new OutputPass();

    composer = new EffectComposer(renderer);

    composer.addPass(renderModel);
    composer.addPass(effectBloom);
    composer.addPass(outputPass);

    //

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
    timer.update();

    const delta = 5 * timer.getDelta();

    uniforms['time'].value += 0.2 * delta;

    mesh.rotation.y += 0.0125 * delta;
    mesh.rotation.x += 0.05 * delta;

    renderer.clear();
    composer.render(0.01);
}
