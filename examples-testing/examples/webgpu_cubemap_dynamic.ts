import * as THREE from 'three';
import * as Nodes from 'three/nodes';

import WebGPU from 'three/addons/capabilities/WebGPU.js';
import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBMLoader } from 'three/addons/loaders/RGBMLoader.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import Stats from 'three/addons/libs/stats.module.js';

let camera, scene, renderer, stats;
let cube, sphere, torus, material;

let cubeCamera, cubeRenderTarget;

let controls;

init();

function init() {
    if (WebGPU.isAvailable() === false) {
        document.body.appendChild(WebGPU.getErrorMessage());

        throw new Error('No WebGPU support');
    }

    renderer = new WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResized);

    stats = new Stats();
    document.body.appendChild(stats.dom);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 75;

    scene = new THREE.Scene();

    const uvTexture = new THREE.TextureLoader().load('./textures/uv_grid_opengl.jpg');

    const rgbmUrls = ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'];
    const texture = new RGBMLoader().setMaxRange(16).setPath('./textures/cube/pisaRGBM16/').loadCubemap(rgbmUrls);

    texture.name = 'pisaRGBM16';
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;

    scene.background = texture;
    scene.environment = texture;

    //

    cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
    cubeRenderTarget.texture.type = THREE.HalfFloatType;
    cubeRenderTarget.texture.minFilter = THREE.LinearMipmapLinearFilter;
    cubeRenderTarget.texture.magFilter = THREE.LinearFilter;
    cubeRenderTarget.texture.generateMipmaps = true;

    cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);

    //

    material = new Nodes.MeshStandardNodeMaterial({
        envMap: cubeRenderTarget.texture,
        roughness: 0.05,
        metalness: 1,
    });

    const gui = new GUI();
    gui.add(material, 'roughness', 0, 1);
    gui.add(material, 'metalness', 0, 1);
    gui.add(renderer, 'toneMappingExposure', 0, 2).name('exposure');

    sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(15, 8), material);
    scene.add(sphere);

    const material2 = new THREE.MeshStandardMaterial({
        map: uvTexture,
        roughness: 0.1,
        metalness: 0,
    });

    cube = new THREE.Mesh(new THREE.BoxGeometry(15, 15, 15), material2);
    scene.add(cube);

    torus = new THREE.Mesh(new THREE.TorusKnotGeometry(8, 3, 128, 16), material2);
    scene.add(torus);

    //

    controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
}

function onWindowResized() {
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function animation(msTime) {
    const time = msTime / 1000;

    cube.position.x = Math.cos(time) * 30;
    cube.position.y = Math.sin(time) * 30;
    cube.position.z = Math.sin(time) * 30;

    cube.rotation.x += 0.02;
    cube.rotation.y += 0.03;

    torus.position.x = Math.cos(time + 10) * 30;
    torus.position.y = Math.sin(time + 10) * 30;
    torus.position.z = Math.sin(time + 10) * 30;

    torus.rotation.x += 0.02;
    torus.rotation.y += 0.03;

    material.visible = false;

    cubeCamera.update(renderer, scene);

    material.visible = true;

    controls.update();

    renderer.render(scene, camera);

    stats.update();
}
