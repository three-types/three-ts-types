import * as THREE from 'three';
import { tslFn, vec4 } from 'three/tsl';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let camera, scene, renderer;

init().then(render);

async function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 40);
    camera.position.set(-4, 2, 6);

    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(render);
    renderer.toneMapping = THREE.AgXToneMapping;
    renderer.toneMappingExposure = 1.5;
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x9e9eff);

    // light + shadow

    const hemi = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(hemi);

    const dirLight = new THREE.DirectionalLight(0x6666ff, 10);
    dirLight.position.set(3, 5, 17);
    dirLight.castShadow = true;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 50;
    dirLight.shadow.camera.right = 5;
    dirLight.shadow.camera.left = -5;
    dirLight.shadow.camera.top = 5;
    dirLight.shadow.camera.bottom = -5;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.radius = 4;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    //

    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync('models/gltf/DragonAttenuation.glb');
    gltf.scene.position.set(0, 0, -0.5);

    const floor = gltf.scene.children[0];
    floor.scale.x += 4;
    floor.scale.y += 4;

    const dragon = gltf.scene.children[1];
    dragon.position.set(-1.5, -0.8, 1);

    const dragon2 = dragon.clone();
    dragon2.material = dragon.material.clone();
    dragon2.material.attenuationColor = new THREE.Color(0xff0000);
    dragon2.position.x += 4;
    gltf.scene.add(dragon2);

    // shadow node

    const customShadow = tslFn(([color, opacity = 0.8]) => {
        return vec4(color, opacity);
    });

    // apply shadow

    floor.receiveShadow = true;

    dragon.castShadow = dragon2.castShadow = true;
    dragon.receiveShadow = dragon2.receiveShadow = true;

    dragon.material.shadowNode = customShadow(dragon.material.attenuationColor);
    dragon2.material.shadowNode = customShadow(dragon2.material.attenuationColor);

    //

    scene.add(gltf.scene);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 0.1;
    controls.maxDistance = 10;
    controls.target.set(0, 0, 0);
    controls.update();

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function render() {
    renderer.render(scene, camera);
}
