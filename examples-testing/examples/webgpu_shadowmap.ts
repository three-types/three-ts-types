import * as THREE from 'three';

import WebGPU from 'three/addons/capabilities/WebGPU.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { vec4, tslFn, vertexIndex, MeshPhongNodeMaterial } from 'three/nodes';
let camera, scene, renderer, clock;
let dirLight, spotLight;
let torusKnot, dirGroup;

init();

function init() {
    if (WebGPU.isAvailable() === false && WebGL.isWebGL2Available() === false) {
        document.body.appendChild(WebGPU.getErrorMessage());

        throw new Error('No WebGPU or WebGL2 support');
    }

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 10, 20);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222244);
    scene.fog = new THREE.Fog(0x222244, 50, 100);

    // lights

    scene.add(new THREE.AmbientLight(0x444444, 2));

    spotLight = new THREE.SpotLight(0xff8888, 400);
    spotLight.angle = Math.PI / 5;
    spotLight.penumbra = 0.3;
    spotLight.position.set(8, 10, 5);
    spotLight.castShadow = true;
    spotLight.shadow.camera.near = 8;
    spotLight.shadow.camera.far = 200;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    spotLight.shadow.bias = -0.002;
    spotLight.shadow.radius = 4;
    scene.add(spotLight);

    dirLight = new THREE.DirectionalLight(0x8888ff, 3);
    dirLight.position.set(3, 12, 17);
    dirLight.castShadow = true;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 500;
    dirLight.shadow.camera.right = 17;
    dirLight.shadow.camera.left = -17;
    dirLight.shadow.camera.top = 17;
    dirLight.shadow.camera.bottom = -17;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.radius = 4;
    dirLight.shadow.bias = -0.0005;

    dirGroup = new THREE.Group();
    dirGroup.add(dirLight);
    scene.add(dirGroup);

    // geometry

    const geometry = new THREE.TorusKnotGeometry(25, 8, 75, 80);
    const material = new MeshPhongNodeMaterial({
        color: 0x999999,
        shininess: 0,
        specular: 0x222222,
    });

    const materialCustomShadow = material.clone();
    materialCustomShadow.transparent = true;

    const materialColor = vec4(1, 0, 1, 0.5);

    const discardNode = vertexIndex.hash().greaterThan(0.5);

    materialCustomShadow.colorNode = tslFn(() => {
        discardNode.discard();

        return materialColor;
    })();

    materialCustomShadow.shadowNode = tslFn(() => {
        discardNode.discard();

        return materialColor;
    })();

    torusKnot = new THREE.Mesh(geometry, materialCustomShadow);
    torusKnot.scale.multiplyScalar(1 / 18);
    torusKnot.position.y = 3;
    torusKnot.castShadow = true;
    torusKnot.receiveShadow = true;
    scene.add(torusKnot);

    const cylinderGeometry = new THREE.CylinderGeometry(0.75, 0.75, 7, 32);

    const pillar1 = new THREE.Mesh(cylinderGeometry, material);
    pillar1.position.set(8, 3.5, 8);
    pillar1.castShadow = true;
    pillar1.receiveShadow = true;

    const pillar2 = pillar1.clone();
    pillar2.position.set(8, 3.5, -8);
    const pillar3 = pillar1.clone();
    pillar3.position.set(-8, 3.5, 8);
    const pillar4 = pillar1.clone();
    pillar4.position.set(-8, 3.5, -8);

    scene.add(pillar1);
    scene.add(pillar2);
    scene.add(pillar3);
    scene.add(pillar4);

    const planeGeometry = new THREE.PlaneGeometry(200, 200);
    const planeMaterial = new THREE.MeshPhongMaterial({
        color: 0x999999,
        shininess: 0,
        specular: 0x111111,
    });

    const ground = new THREE.Mesh(planeGeometry, planeMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.scale.multiplyScalar(3);
    ground.castShadow = true;
    ground.receiveShadow = true;
    scene.add(ground);

    // renderer

    renderer = new WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    document.body.appendChild(renderer.domElement);

    // Mouse control
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 2, 0);
    controls.minDistance = 7;
    controls.maxDistance = 40;
    controls.update();

    clock = new THREE.Clock();

    window.addEventListener('resize', resize);
}

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(time) {
    const delta = clock.getDelta();

    torusKnot.rotation.x += 0.25 * delta;
    torusKnot.rotation.y += 0.5 * delta;
    torusKnot.rotation.z += 1 * delta;

    dirGroup.rotation.y += 0.7 * delta;
    dirLight.position.z = 17 + Math.sin(time * 0.001) * 5;

    renderer.render(scene, camera);
}
