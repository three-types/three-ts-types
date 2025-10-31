import * as THREE from 'three/webgpu';
import { pass, mix, range, color, oscSine, time } from 'three/tsl';
import { gaussianBlur } from 'three/addons/tsl/display/GaussianBlurNode.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGPURenderer;
let postProcessing: THREE.PostProcessing;

let mixer: THREE.AnimationMixer, clock: THREE.Clock;

init();

function init() {
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 40);
    camera.position.set(1, 2, 3);

    scene = new THREE.Scene();
    camera.lookAt(0, 1, 0);

    clock = new THREE.Clock();

    // lights

    const centerLight = new THREE.PointLight(0xff9900, 1, 100);
    centerLight.position.y = 4.5;
    centerLight.position.z = -2;
    centerLight.power = 400;
    scene.add(centerLight);

    const cameraLight = new THREE.PointLight(0x0099ff, 1, 100);
    cameraLight.power = 400;
    camera.add(cameraLight);
    scene.add(camera);

    const geometry = new THREE.PlaneGeometry(1000, 1000);
    geometry.rotateX(-Math.PI / 2);

    const plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x000000, visible: true }));
    scene.add(plane);

    const loader = new GLTFLoader();
    loader.load('models/gltf/Michelle.glb', function (gltf) {
        const object = gltf.scene;

        mixer = new THREE.AnimationMixer(object);

        const action = mixer.clipAction(gltf.animations[0]);
        action.play();

        const instanceCount = 30;
        const dummy = new THREE.Object3D();

        object.traverse(child => {
            if ((child as THREE.Mesh).isMesh) {
                const oscNode = oscSine(time.mul(0.1));

                // random colors between instances from 0x000000 to 0xFFFFFF
                const randomColors = range(new THREE.Color(0x000000), new THREE.Color(0xffffff));

                // random [ 0, 1 ] values between instances
                const randomMetalness = range(0, 1);

                (child as THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardNodeMaterial>).material =
                    new THREE.MeshStandardNodeMaterial();
                (child as THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardNodeMaterial>).material.roughness = 0.1;
                (child as THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardNodeMaterial>).material.metalnessNode =
                    mix(0.0, randomMetalness, oscNode);
                (child as THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardNodeMaterial>).material.colorNode = mix(
                    color(0xffffff),
                    randomColors,
                    oscNode,
                );

                (child as { isInstancedMesh?: boolean }).isInstancedMesh = true;
                (child as THREE.InstancedMesh<THREE.BufferGeometry, THREE.MeshStandardNodeMaterial>).instanceMatrix =
                    new THREE.InstancedBufferAttribute(new Float32Array(instanceCount * 16), 16);
                child.count = instanceCount;

                for (let i = 0; i < instanceCount; i++) {
                    dummy.position.x = -200 + (i % 5) * 70;
                    dummy.position.y = Math.floor(i / 5) * -200;

                    dummy.updateMatrix();

                    dummy.matrix.toArray(
                        (child as THREE.InstancedMesh<THREE.BufferGeometry, THREE.MeshStandardNodeMaterial>)
                            .instanceMatrix.array,
                        i * 16,
                    );
                }
            }
        });

        scene.add(object);
    });

    // renderer

    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    // post processing

    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode();
    const scenePassDepth = scenePass.getLinearDepthNode().remapClamp(0.15, 0.3);

    const scenePassColorBlurred = gaussianBlur(scenePassColor);
    scenePassColorBlurred.directionNode = scenePassDepth;

    postProcessing = new THREE.PostProcessing(renderer);
    postProcessing.outputNode = scenePassColorBlurred;

    // events

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

    postProcessing.render();
}
