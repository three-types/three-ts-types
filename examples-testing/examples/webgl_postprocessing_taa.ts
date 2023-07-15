import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { TAARenderPass } from 'three/addons/postprocessing/TAARenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

let camera, scene, renderer, composer, taaRenderPass, renderPass;
let gui, stats;
let index = 0;

const param = { TAAEnabled: '1', TAASampleLevel: 0 };

init();
animate();

clearGui();

function clearGui() {
    if (gui) gui.destroy();

    gui = new GUI();

    gui.add(param, 'TAAEnabled', {
        Disabled: '0',
        Enabled: '1',
    }).onFinishChange(function () {
        if (taaRenderPass) {
            taaRenderPass.enabled = param.TAAEnabled === '1';
            renderPass.enabled = param.TAAEnabled !== '1';
        }
    });

    gui.add(param, 'TAASampleLevel', {
        'Level 0: 1 Sample': 0,
        'Level 1: 2 Samples': 1,
        'Level 2: 4 Samples': 2,
        'Level 3: 8 Samples': 3,
        'Level 4: 16 Samples': 4,
        'Level 5: 32 Samples': 5,
    }).onFinishChange(function () {
        if (taaRenderPass) {
            taaRenderPass.sampleLevel = param.TAASampleLevel;
        }
    });

    gui.open();
}

function init() {
    const container = document.getElementById('container');

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.useLegacyLights = false;
    document.body.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

    //

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 300;

    scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(120, 120, 120);
    const material1 = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });

    const mesh1 = new THREE.Mesh(geometry, material1);
    mesh1.position.x = -100;
    scene.add(mesh1);

    const texture = new THREE.TextureLoader().load('textures/brick_diffuse.jpg');
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.anisotropy = 1;
    texture.generateMipmaps = false;
    texture.colorSpace = THREE.SRGBColorSpace;

    const material2 = new THREE.MeshBasicMaterial({ map: texture });

    const mesh2 = new THREE.Mesh(geometry, material2);
    mesh2.position.x = 100;
    scene.add(mesh2);

    // postprocessing

    composer = new EffectComposer(renderer);

    taaRenderPass = new TAARenderPass(scene, camera);
    taaRenderPass.unbiased = false;
    composer.addPass(taaRenderPass);

    renderPass = new RenderPass(scene, camera);
    renderPass.enabled = false;
    composer.addPass(renderPass);

    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    composer.setSize(width, height);
}

function animate() {
    requestAnimationFrame(animate);

    index++;

    if (Math.round(index / 200) % 2 === 0) {
        for (let i = 0; i < scene.children.length; i++) {
            const child = scene.children[i];

            child.rotation.x += 0.005;
            child.rotation.y += 0.01;
        }

        if (taaRenderPass) taaRenderPass.accumulate = false;
    } else {
        if (taaRenderPass) taaRenderPass.accumulate = true;
    }

    composer.render();

    stats.update();
}
