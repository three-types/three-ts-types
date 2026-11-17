import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';

const params = {
    envMap: 'EXR',
    roughness: 0.0,
    metalness: 0.0,
    exposure: 1.0,
    debug: false,
};

let container: HTMLDivElement, stats: Stats;
let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer, controls: OrbitControls;
let torusMesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>,
    planeMesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
let pngCubeRenderTarget: THREE.WebGLRenderTarget, exrCubeRenderTarget: THREE.WebGLRenderTarget;
let pngBackground: THREE.Texture, exrBackground: THREE.DataTexture;

init();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 120);

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);

    container.appendChild(renderer.domElement);

    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    //

    let geometry: THREE.BufferGeometry = new THREE.TorusKnotGeometry(18, 8, 150, 20);
    let material: THREE.MeshStandardMaterial | THREE.MeshBasicMaterial = new THREE.MeshStandardMaterial({
        metalness: params.metalness,
        roughness: params.roughness,
        envMapIntensity: 1.0,
    });

    torusMesh = new THREE.Mesh(geometry, material);
    scene.add(torusMesh);

    geometry = new THREE.PlaneGeometry(200, 200);
    material = new THREE.MeshBasicMaterial();

    planeMesh = new THREE.Mesh(geometry, material);
    planeMesh.position.y = -50;
    planeMesh.rotation.x = -Math.PI * 0.5;
    scene.add(planeMesh);

    THREE.DefaultLoadingManager.onLoad = function () {
        pmremGenerator.dispose();
    };

    new EXRLoader().load('textures/piz_compressed.exr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;

        exrCubeRenderTarget = pmremGenerator.fromEquirectangular(texture);
        exrBackground = texture;
    });

    new THREE.TextureLoader().load('textures/equirectangular.png', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        texture.colorSpace = THREE.SRGBColorSpace;

        pngCubeRenderTarget = pmremGenerator.fromEquirectangular(texture);
        pngBackground = texture;
    });

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    stats = new Stats();
    container.appendChild(stats.dom);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 50;
    controls.maxDistance = 300;

    window.addEventListener('resize', onWindowResize);

    const gui = new GUI();

    gui.add(params, 'envMap', ['EXR', 'PNG']);
    gui.add(params, 'roughness', 0, 1, 0.01);
    gui.add(params, 'metalness', 0, 1, 0.01);
    gui.add(params, 'exposure', 0, 2, 0.01);
    gui.add(params, 'debug');
    gui.open();
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}

function animate() {
    stats.begin();
    render();
    stats.end();
}

function render() {
    torusMesh.material.roughness = params.roughness;
    torusMesh.material.metalness = params.metalness;

    let newEnvMap = torusMesh.material.envMap;
    let background = scene.background;

    switch (params.envMap) {
        case 'EXR':
            newEnvMap = exrCubeRenderTarget ? exrCubeRenderTarget.texture : null;
            background = exrBackground;
            break;
        case 'PNG':
            newEnvMap = pngCubeRenderTarget ? pngCubeRenderTarget.texture : null;
            background = pngBackground;
            break;
    }

    if (newEnvMap !== torusMesh.material.envMap) {
        torusMesh.material.envMap = newEnvMap;
        torusMesh.material.needsUpdate = true;

        planeMesh.material.map = newEnvMap;
        planeMesh.material.needsUpdate = true;
    }

    torusMesh.rotation.y += 0.005;
    planeMesh.visible = params.debug;

    scene.background = background;
    renderer.toneMappingExposure = params.exposure;

    renderer.render(scene, camera);
}
