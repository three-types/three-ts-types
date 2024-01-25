import * as THREE from 'three';
import { MeshPhongNodeMaterial, color, pass, reflector, normalWorld, texture, uv, viewportTopLeft } from 'three/nodes';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import WebGPU from 'three/addons/capabilities/WebGPU.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js';
import PostProcessing from 'three/addons/renderers/common/PostProcessing.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import Stats from 'three/addons/libs/stats.module.js';

let camera, scene, renderer;
let model, mixer, clock;
let postProcessing;
let controls;
let stats;

init();

function init() {
    if (WebGPU.isAvailable() === false && WebGL.isWebGL2Available() === false) {
        document.body.appendChild(WebGPU.getErrorMessage());

        throw new Error('No WebGPU or WebGL2 support');
    }

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.25, 30);
    camera.position.set(2, 2.5, 3);

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0487e2, 7, 25);
    scene.backgroundNode = normalWorld.y.mix(color(0x0487e2), color(0x0066ff));
    camera.lookAt(0, 1, 0);

    const sunLight = new THREE.DirectionalLight(0xffe499, 5);
    sunLight.castShadow = true;
    sunLight.shadow.camera.near = 0.1;
    sunLight.shadow.camera.far = 5;
    sunLight.shadow.camera.right = 2;
    sunLight.shadow.camera.left = -2;
    sunLight.shadow.camera.top = 2;
    sunLight.shadow.camera.bottom = -2;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.bias = -0.001;
    sunLight.position.set(0.5, 3, 0.5);

    const waterAmbientLight = new THREE.HemisphereLight(0x333366, 0x74ccf4, 5);
    const skyAmbientLight = new THREE.HemisphereLight(0x74ccf4, 0, 1);

    scene.add(sunLight);
    scene.add(skyAmbientLight);
    scene.add(waterAmbientLight);

    clock = new THREE.Clock();

    // animated model

    const loader = new GLTFLoader();
    loader.load('models/gltf/Michelle.glb', function (gltf) {
        model = gltf.scene;
        model.children[0].children[0].castShadow = true;

        mixer = new THREE.AnimationMixer(model);

        const action = mixer.clipAction(gltf.animations[0]);
        action.play();

        scene.add(model);
    });

    // textures

    const textureLoader = new THREE.TextureLoader();

    const floorColor = textureLoader.load('textures/floors/FloorsCheckerboard_S_Diffuse.jpg');
    floorColor.wrapS = THREE.RepeatWrapping;
    floorColor.wrapT = THREE.RepeatWrapping;
    floorColor.colorSpace = THREE.SRGBColorSpace;

    const floorNormal = textureLoader.load('textures/floors/FloorsCheckerboard_S_Normal.jpg');
    floorNormal.wrapS = THREE.RepeatWrapping;
    floorNormal.wrapT = THREE.RepeatWrapping;

    // floor

    const floorUV = uv().mul(15);
    const floorNormalOffset = texture(floorNormal, floorUV).xy.mul(2).sub(1).mul(0.02);

    const reflection = reflector({ resolution: 0.5 }); // 0.5 is half of the rendering view
    reflection.target.rotateX(-Math.PI / 2);
    reflection.uvNode = reflection.uvNode.add(floorNormalOffset);
    scene.add(reflection.target);

    const floorMaterial = new MeshPhongNodeMaterial();
    floorMaterial.colorNode = texture(floorColor, floorUV).add(reflection);

    const floor = new THREE.Mesh(new THREE.BoxGeometry(50, 0.001, 50), floorMaterial);
    floor.position.set(0, 0, 0);
    scene.add(floor);

    // renderer

    renderer = new WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    stats = new Stats();
    document.body.appendChild(stats.dom);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controls.target.set(0, 0.5, 0);
    controls.update();

    // post-processing

    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode();
    const scenePassDepth = scenePass.getDepthNode().remapClamp(0.3, 0.5);

    const scenePassColorBlurred = scenePassColor.gaussianBlur();
    scenePassColorBlurred.directionNode = scenePassDepth;

    const vignet = viewportTopLeft.distance(0.5).mul(1.35).clamp().oneMinus();

    postProcessing = new PostProcessing(renderer);
    postProcessing.outputNode = scenePassColorBlurred.mul(vignet);

    //

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    stats.update();

    controls.update();

    const delta = clock.getDelta();

    if (model) {
        mixer.update(delta);
    }

    postProcessing.render();
}
