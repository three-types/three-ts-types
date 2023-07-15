import * as THREE from 'three';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let camera, renderer, group, container;

let composer1, composer2;

const params = {
    animate: true,
};

init();

function init() {
    if (WebGL.isWebGL2Available() === false) {
        document.body.appendChild(WebGL.getWebGL2ErrorMessage());
        return;
    }

    container = document.getElementById('container');

    camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 10, 2000);
    camera.position.z = 500;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.fog = new THREE.Fog(0xcccccc, 100, 1500);

    //

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x222222, 5);
    hemiLight.position.set(1, 1, 1);
    scene.add(hemiLight);

    //

    group = new THREE.Group();

    const geometry = new THREE.SphereGeometry(10, 64, 40);
    const material = new THREE.MeshLambertMaterial({
        color: 0xee0808,
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1,
    });
    const material2 = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });

    for (let i = 0; i < 50; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 600 - 300;
        mesh.position.y = Math.random() * 600 - 300;
        mesh.position.z = Math.random() * 600 - 300;
        mesh.rotation.x = Math.random();
        mesh.rotation.z = Math.random();
        mesh.scale.setScalar(Math.random() * 5 + 5);
        group.add(mesh);

        const mesh2 = new THREE.Mesh(geometry, material2);
        mesh2.position.copy(mesh.position);
        mesh2.rotation.copy(mesh.rotation);
        mesh2.scale.copy(mesh.scale);
        group.add(mesh2);
    }

    scene.add(group);

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.autoClear = false;
    renderer.useLegacyLights = false;
    container.appendChild(renderer.domElement);

    //

    const size = renderer.getDrawingBufferSize(new THREE.Vector2());
    const renderTarget = new THREE.WebGLRenderTarget(size.width, size.height, { samples: 4 });

    const renderPass = new RenderPass(scene, camera);
    const outputPass = new OutputPass();

    //

    composer1 = new EffectComposer(renderer);
    composer1.addPass(renderPass);
    composer1.addPass(outputPass);

    //

    composer2 = new EffectComposer(renderer, renderTarget);
    composer2.addPass(renderPass);
    composer2.addPass(outputPass);

    //

    const gui = new GUI();
    gui.add(params, 'animate');

    //

    window.addEventListener('resize', onWindowResize);

    animate();
}

function onWindowResize() {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.offsetWidth, container.offsetHeight);
    composer1.setSize(container.offsetWidth, container.offsetHeight);
    composer2.setSize(container.offsetWidth, container.offsetHeight);
}

function animate() {
    requestAnimationFrame(animate);

    const halfWidth = container.offsetWidth / 2;

    if (params.animate) {
        group.rotation.y += 0.002;
    }

    renderer.setScissorTest(true);

    renderer.setScissor(0, 0, halfWidth - 1, container.offsetHeight);
    composer1.render();

    renderer.setScissor(halfWidth, 0, halfWidth, container.offsetHeight);
    composer2.render();

    renderer.setScissorTest(false);
}
