import * as THREE from 'three/webgpu';
import {
    float,
    vec3,
    color,
    viewportSharedTexture,
    hue,
    blendOverlay,
    posterize,
    grayscale,
    saturation,
    viewportSafeUV,
    screenUV,
    checker,
    uv,
    time,
    oscSine,
    output,
} from 'three/tsl';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, scene, renderer;
let portals,
    rotate = true;
let mixer, timer;

init();

function init() {
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 100);
    camera.position.set(1, 2, 3);

    scene = new THREE.Scene();
    scene.backgroundNode = screenUV.y.mix(color(0x66bbff), color(0x4466ff));
    camera.lookAt(0, 1, 0);

    timer = new THREE.Timer();
    timer.connect(document);

    // lights

    const light = new THREE.SpotLight(0xffffff, 1);
    light.power = 2000;
    camera.add(light);
    scene.add(camera);

    const loader = new GLTFLoader();
    loader.load('models/gltf/Michelle.glb', function (gltf) {
        const object = gltf.scene;
        mixer = new THREE.AnimationMixer(object);

        const material = object.children[0].children[0].material;
        material.outputNode = oscSine(time.mul(0.1)).mix(output, posterize(output.add(0.1), 4).mul(2));

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

        const material = new THREE.MeshStandardNodeMaterial({ color: 0x0066ff });
        material.roughnessNode = float(0.2);
        material.metalnessNode = float(0);
        material.backdropNode = backdropNode;
        material.backdropAlphaNode = backdropAlphaNode;
        material.transparent = true;

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(Math.cos(rotation) * distance, 1, Math.sin(rotation) * distance);

        portals.add(mesh);
    }

    addBackdropSphere(hue(viewportSharedTexture().bgr, oscSine().mul(Math.PI)));
    addBackdropSphere(viewportSharedTexture().rgb.oneMinus());
    addBackdropSphere(grayscale(viewportSharedTexture().rgb));
    addBackdropSphere(saturation(viewportSharedTexture().rgb, 10), oscSine());
    addBackdropSphere(blendOverlay(viewportSharedTexture().rgb, checker(uv().mul(10))));
    addBackdropSphere(viewportSharedTexture(viewportSafeUV(screenUV.mul(40).floor().div(40))));
    addBackdropSphere(viewportSharedTexture(viewportSafeUV(screenUV.mul(80).floor().div(80))).add(color(0x0033ff)));
    addBackdropSphere(vec3(0, 0, viewportSharedTexture().b));

    // renderer

    renderer = new THREE.WebGPURenderer({ antialias: false });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 0.3;
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
    timer.update();

    const delta = timer.getDelta();

    if (mixer) mixer.update(delta);

    if (rotate) portals.rotation.y += delta * 0.5;

    renderer.render(scene, camera);
}
