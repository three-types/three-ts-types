import * as THREE from 'three';
import { Fn, vec2, vec4, texture, uv, textureBicubic, rangeFogFactor, reflector, time } from 'three/tsl';

import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import Stats from 'three/addons/libs/stats.module.js';

let camera, scene, renderer;
let controls;
let stats;

init();

async function init() {
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.25, 30);
    camera.position.set(-4, 2, 4);
    camera.lookAt(0, 0.4, 0);

    scene = new THREE.Scene();

    //

    new RGBELoader().setPath('textures/equirectangular/').load('moonless_golf_1k.hdr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;

        scene.background = texture;
        scene.environment = texture;
    });

    // textures

    const textureLoader = new THREE.TextureLoader();

    const uvMap = textureLoader.load('textures/uv_grid_directx.jpg');
    uvMap.colorSpace = THREE.SRGBColorSpace;

    const perlinMap = textureLoader.load('./textures/noises/perlin/rgb-256x256.png');
    perlinMap.wrapS = THREE.RepeatWrapping;
    perlinMap.wrapT = THREE.RepeatWrapping;
    perlinMap.colorSpace = THREE.SRGBColorSpace;

    // uv map for debugging

    const uvMaterial = new THREE.MeshStandardNodeMaterial({
        map: uvMap,
        emissiveMap: uvMap,
        emissive: 0xffffff,
        side: THREE.DoubleSide,
    });

    const uvMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), uvMaterial);
    uvMesh.position.set(0, 1, 0);
    scene.add(uvMesh);

    // reflection

    const reflection = reflector({ resolution: 0.5, bounces: false, generateMipmaps: true }); // 0.5 is half of the rendering view
    reflection.target.rotateX(-Math.PI / 2);
    scene.add(reflection.target);

    const animatedUV = uv()
        .mul(10)
        .add(vec2(time.mul(0.1), 0));
    const roughness = texture(perlinMap, animatedUV).r.mul(2).saturate();

    const floorMaterial = new THREE.MeshStandardNodeMaterial();
    floorMaterial.transparent = true;
    floorMaterial.metalness = 1;
    floorMaterial.roughnessNode = roughness.mul(0.2);
    floorMaterial.colorNode = Fn(() => {
        // blur reflection using textureBicubic()
        const dirtyReflection = textureBicubic(reflection, roughness.mul(0.9)).rgb;

        // falloff opacity by distance like an opacity-fog
        const opacity = rangeFogFactor(7, 25).oneMinus();

        return vec4(dirtyReflection.rgb, opacity);
    })();

    const floor = new THREE.Mesh(new THREE.BoxGeometry(50, 0.001, 50), floorMaterial);
    floor.position.set(0, 0, 0);
    scene.add(floor);

    // renderer

    renderer = new THREE.WebGPURenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 2;
    document.body.appendChild(renderer.domElement);

    stats = new Stats();
    document.body.appendChild(stats.dom);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2;
    controls.autoRotate = true;
    controls.autoRotateSpeed = -0.1;
    controls.target.set(0, 0.5, 0);
    controls.update();

    // events

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

    renderer.render(scene, camera);
}
