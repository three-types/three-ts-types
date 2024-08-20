import * as THREE from 'three';
import {
    color,
    linearDepth,
    viewportLinearDepth,
    viewportSharedTexture,
    viewportMipTexture,
    viewportTopLeft,
    checker,
    uv,
    modelScale,
} from 'three/tsl';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, scene, renderer;
let mixer, clock;

init();

function init() {
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.25, 25);
    camera.position.set(3, 2, 3);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x777777);
    camera.lookAt(0, 1, 0);

    clock = new THREE.Clock();

    const light = new THREE.PointLight(0xffffff, 50);
    camera.add(light);
    scene.add(camera);

    const ambient = new THREE.AmbientLight(0x4466ff, 1);
    scene.add(ambient);

    // model

    const loader = new GLTFLoader();
    loader.load('models/gltf/Michelle.glb', function (gltf) {
        const object = gltf.scene;
        mixer = new THREE.AnimationMixer(object);

        const action = mixer.clipAction(gltf.animations[0]);
        action.play();

        scene.add(object);
    });

    // volume

    // compare depth from viewportLinearDepth with linearDepth() to create a distance field
    // viewportLinearDepth return the linear depth of the scene
    // linearDepth() returns the linear depth of the mesh
    const depthDistance = viewportLinearDepth.distance(linearDepth());

    const depthAlphaNode = depthDistance.oneMinus().smoothstep(0.9, 2).mul(10).saturate();
    const depthBlurred = viewportMipTexture().bicubic(
        depthDistance
            .smoothstep(0, 0.6)
            .mul(40 * 5)
            .clamp(0, 5),
    );

    const blurredBlur = new THREE.MeshBasicNodeMaterial();
    blurredBlur.backdropNode = depthBlurred.add(depthAlphaNode.mix(color(0x0066ff), 0));
    blurredBlur.transparent = true;
    blurredBlur.side = THREE.DoubleSide;

    const volumeMaterial = new THREE.MeshBasicNodeMaterial();
    volumeMaterial.colorNode = color(0x0066ff);
    volumeMaterial.backdropNode = viewportSharedTexture();
    volumeMaterial.backdropAlphaNode = depthAlphaNode;
    volumeMaterial.transparent = true;
    volumeMaterial.side = THREE.DoubleSide;

    const depthMaterial = new THREE.MeshBasicNodeMaterial();
    depthMaterial.backdropNode = depthAlphaNode;
    depthMaterial.transparent = true;
    depthMaterial.side = THREE.DoubleSide;

    const bicubicMaterial = new THREE.MeshBasicNodeMaterial();
    bicubicMaterial.backdropNode = viewportMipTexture().bicubic(5); // @TODO: Move to alpha value [ 0, 1 ]
    bicubicMaterial.backdropAlphaNode = checker(uv().mul(3).mul(modelScale.xy));
    bicubicMaterial.opacityNode = bicubicMaterial.backdropAlphaNode;
    bicubicMaterial.transparent = true;
    bicubicMaterial.side = THREE.DoubleSide;

    const pixelMaterial = new THREE.MeshBasicNodeMaterial();
    pixelMaterial.backdropNode = viewportSharedTexture(viewportTopLeft.mul(100).floor().div(100));
    pixelMaterial.transparent = true;

    // box / floor

    const box = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), volumeMaterial);
    box.position.set(0, 1, 0);
    scene.add(box);

    const floor = new THREE.Mesh(
        new THREE.BoxGeometry(1.99, 0.01, 1.99),
        new THREE.MeshBasicNodeMaterial({ color: 0x333333 }),
    );
    floor.position.set(0, 0, 0);
    scene.add(floor);

    // renderer

    renderer = new THREE.WebGPURenderer(/*{ antialias: true }*/);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 0.2;
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.update();

    window.addEventListener('resize', onWindowResize);

    // gui

    const materials = {
        blurred: blurredBlur,
        volume: volumeMaterial,
        depth: depthMaterial,
        bicubic: bicubicMaterial,
        pixel: pixelMaterial,
    };

    const gui = new GUI();
    const options = { material: 'blurred' };

    box.material = materials[options.material];

    gui.add(box.scale, 'x', 0.1, 2, 0.01);
    gui.add(box.scale, 'z', 0.1, 2, 0.01);
    gui.add(options, 'material', Object.keys(materials)).onChange(name => {
        box.material = materials[name];
    });
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
