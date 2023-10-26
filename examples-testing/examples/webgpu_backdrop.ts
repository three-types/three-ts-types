import * as THREE from 'three';
import {
    float,
    vec3,
    color,
    toneMapping,
    viewportSharedTexture,
    viewportTopLeft,
    checker,
    uv,
    timerLocal,
    oscSine,
    output,
    MeshStandardNodeMaterial,
} from 'three/nodes';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import WebGPU from 'three/addons/capabilities/WebGPU.js';
import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, scene, renderer;
let portals,
    rotate = true;
let mixer, clock;

init();

function init() {
    if (WebGPU.isAvailable() === false) {
        document.body.appendChild(WebGPU.getErrorMessage());

        throw new Error('No WebGPU support');
    }

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 100);
    camera.position.set(1, 2, 3);

    scene = new THREE.Scene();
    scene.background = new THREE.Color('lightblue');
    camera.lookAt(0, 1, 0);

    clock = new THREE.Clock();

    //lights

    const light = new THREE.SpotLight(0xffffff, 1);
    light.power = 2000;
    camera.add(light);
    scene.add(camera);

    const loader = new GLTFLoader();
    loader.load('models/gltf/Michelle.glb', function (gltf) {
        const object = gltf.scene;
        mixer = new THREE.AnimationMixer(object);

        const material = object.children[0].children[0].material;

        // output material effect ( better using hsv )
        // ignore output.sRGBToLinear().linearTosRGB() for now

        material.outputNode = oscSine(timerLocal(0.1)).mix(output, output.add(0.1).posterize(4).mul(2));

        const action = mixer.clipAction(gltf.animations[0]);
        action.play();

        scene.add(object);
    });

    // portals

    const geometry = new THREE.SphereGeometry(0.3, 32, 16);

    portals = new THREE.Group();
    scene.add(portals);

    function addBackdropSphere(backdropNode, backdropAlphaNode = null) {
        const distance = 1;
        const id = portals.children.length;
        const rotation = THREE.MathUtils.degToRad(id * 45);

        const material = new MeshStandardNodeMaterial({ color: 0x0066ff });
        material.roughnessNode = float(0.2);
        material.metalnessNode = float(0);
        material.backdropNode = backdropNode;
        material.backdropAlphaNode = backdropAlphaNode;
        material.transparent = true;

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(Math.cos(rotation) * distance, 1, Math.sin(rotation) * distance);

        portals.add(mesh);
    }

    addBackdropSphere(viewportSharedTexture().bgr.hue(oscSine().mul(Math.PI)));
    addBackdropSphere(viewportSharedTexture().rgb.oneMinus());
    addBackdropSphere(viewportSharedTexture().rgb.saturation(0));
    addBackdropSphere(viewportSharedTexture().rgb.saturation(10), oscSine());
    addBackdropSphere(viewportSharedTexture().rgb.overlay(checker(uv().mul(10))));
    addBackdropSphere(viewportSharedTexture(viewportTopLeft.mul(40).floor().div(40)));
    addBackdropSphere(viewportSharedTexture(viewportTopLeft.mul(80).floor().div(80)).add(color(0x0033ff)));
    addBackdropSphere(vec3(0, 0, viewportSharedTexture().b));

    //renderer

    renderer = new WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.toneMappingNode = toneMapping(THREE.LinearToneMapping, 0.15);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.addEventListener('start', () => (rotate = false));
    controls.addEventListener('end', () => (rotate = true));
    controls.update();

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

    if (rotate) portals.rotation.y += delta * 0.5;

    renderer.render(scene, camera);
}
