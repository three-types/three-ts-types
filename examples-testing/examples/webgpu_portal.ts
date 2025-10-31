import * as THREE from 'three/webgpu';
import {
    pass,
    color,
    mx_worley_noise_float,
    time,
    screenUV,
    vec2,
    uv,
    normalWorld,
    mx_fractal_noise_vec3,
} from 'three/tsl';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { Inspector } from 'three/addons/inspector/Inspector.js';

let camera: THREE.PerspectiveCamera, sceneMain: THREE.Scene, scenePortal: THREE.Scene, renderer: THREE.WebGPURenderer;
let clock: THREE.Clock;

const mixers: THREE.AnimationMixer[] = [];

init();

function init() {
    //

    sceneMain = new THREE.Scene();
    sceneMain.background = new THREE.Color(0x222222);
    sceneMain.backgroundNode = normalWorld.y.mix(color(0x0066ff), color(0xff0066));

    scenePortal = new THREE.Scene();
    scenePortal.backgroundNode = mx_worley_noise_float(normalWorld.mul(20).add(vec2(0, time.oneMinus()))).mul(
        color(0x0066ff),
    );
    scenePortal.name = 'Portal Scene';

    //

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 30);
    camera.position.set(2.5, 1, 3);
    camera.position.multiplyScalar(0.8);
    camera.lookAt(0, 1, 0);

    clock = new THREE.Clock();

    // lights

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(0, 1, 5);
    light.power = 17000;

    sceneMain.add(new THREE.HemisphereLight(0xff0066, 0x0066ff, 7));
    sceneMain.add(light);
    scenePortal.add(light.clone());

    // models

    const loader = new GLTFLoader();
    loader.load('models/gltf/Xbot.glb', function (gltf) {
        const createModel = (colorNode: THREE.Node | null = null) => {
            let object;

            if (mixers.length === 0) {
                object = gltf.scene;
            } else {
                object = gltf.scene.clone();

                const children = object.children[0].children;

                const applyFX = (index: number) => {
                    (children[index] as THREE.SkinnedMesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>).material =
                        (
                            children[index] as THREE.SkinnedMesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>
                        ).material.clone();
                    (
                        children[index] as THREE.SkinnedMesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>
                    ).material.colorNode = colorNode;
                    (
                        children[index] as THREE.SkinnedMesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>
                    ).material.wireframe = true;
                };

                applyFX(0);
                applyFX(1);
            }

            const mixer = new THREE.AnimationMixer(object);

            const action = mixer.clipAction(gltf.animations[6]);
            action.play();

            mixers.push(mixer);

            return object;
        };

        const colorNode = mx_fractal_noise_vec3(uv().mul(20).add(time));

        const modelMain = createModel();
        const modelPortal = createModel(colorNode);

        // model portal

        sceneMain.add(modelMain);
        scenePortal.add(modelPortal);
    });

    // portal

    const geometry = new THREE.PlaneGeometry(1.7, 2);

    const material = new THREE.MeshBasicNodeMaterial();
    material.colorNode = pass(scenePortal, camera).context({ getUV: () => screenUV });
    material.opacityNode = uv().distance(0.5).remapClamp(0.3, 0.5).oneMinus();
    material.side = THREE.DoubleSide;
    material.transparent = true;

    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(0, 1, 0.8);
    sceneMain.add(plane);

    // renderer

    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 0.15;
    renderer.inspector = new Inspector();
    document.body.appendChild(renderer.domElement);

    //

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
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

    for (const mixer of mixers) {
        mixer.update(delta);
    }

    renderer.render(sceneMain, camera);
}
