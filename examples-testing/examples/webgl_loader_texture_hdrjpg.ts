import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

import { GainMapLoader, HDRJPGLoader } from '@monogrid/gainmap-js';

const params = {
    envMap: 'HDR JPG',
    roughness: 0.0,
    metalness: 0.0,
    exposure: 1.0,
    debug: false,
};

let container, stats;
let camera, scene, renderer, controls;
let torusMesh, planeMesh;
let hdrJpg, hdrJpgPMREMRenderTarget, hdrJpgEquirectangularMap;
let gainMap, gainMapPMREMRenderTarget, gainMapBackground;
let hdrPMREMRenderTarget, hdrEquirectangularMap;

const fileSizes = {};
const resolutions = {};

init();
animate();

function init() {
    const lbl = document.getElementById('lbl_left');

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 120);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    renderer = new THREE.WebGLRenderer();
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    //

    let geometry = new THREE.TorusKnotGeometry(18, 8, 150, 20);
    // let geometry = new THREE.SphereGeometry( 26, 64, 32 );
    let material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: params.metalness,
        roughness: params.roughness,
    });

    torusMesh = new THREE.Mesh(geometry, material);
    scene.add(torusMesh);

    geometry = new THREE.PlaneGeometry(200, 200);
    material = new THREE.MeshBasicMaterial();

    planeMesh = new THREE.Mesh(geometry, material);
    planeMesh.position.y = -50;
    planeMesh.rotation.x = -Math.PI * 0.5;
    scene.add(planeMesh);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    THREE.DefaultLoadingManager.onLoad = function () {
        pmremGenerator.dispose();
    };

    hdrJpg = new HDRJPGLoader(renderer).load(
        'textures/gainmap/spruit_sunrise_4k.jpg',
        function () {
            resolutions['HDR JPG'] = hdrJpg.width + 'x' + hdrJpg.height;
            displayStats('HDR JPG');

            hdrJpgPMREMRenderTarget = pmremGenerator.fromEquirectangular(hdrJpg.renderTarget.texture);

            hdrJpgEquirectangularMap = hdrJpg.toDataTexture();
            hdrJpgEquirectangularMap.mapping = THREE.EquirectangularReflectionMapping;
            hdrJpgEquirectangularMap.minFilter = THREE.LinearFilter;
            hdrJpgEquirectangularMap.magFilter = THREE.LinearFilter;
            hdrJpgEquirectangularMap.generateMipmaps = false;

            hdrJpgEquirectangularMap.needsUpdate = true;
        },
        function (progress) {
            fileSizes['HDR JPG'] = humanFileSize(progress.total);
        },
    );

    gainMap = new GainMapLoader(renderer).load(
        [
            'textures/gainmap/spruit_sunrise_4k.webp',
            'textures/gainmap/spruit_sunrise_4k-gainmap.webp',
            'textures/gainmap/spruit_sunrise_4k.json',
        ],
        function () {
            resolutions['Webp Gain map (separate)'] = gainMap.width + 'x' + gainMap.height;

            gainMapPMREMRenderTarget = pmremGenerator.fromEquirectangular(gainMap.renderTarget.texture);

            gainMapBackground = gainMap.toDataTexture();
            gainMapBackground.mapping = THREE.EquirectangularReflectionMapping;
            gainMapBackground.minFilter = THREE.LinearFilter;
            gainMapBackground.magFilter = THREE.LinearFilter;
            gainMapBackground.generateMipmaps = false;

            gainMapBackground.needsUpdate = true;
        },
        function (progress) {
            fileSizes['Webp Gain map (separate)'] = humanFileSize(progress.total);
        },
    );

    hdrEquirectangularMap = new RGBELoader().load(
        'textures/gainmap/spruit_sunrise_1k.hdr',
        function () {
            resolutions['HDR'] = hdrEquirectangularMap.image.width + 'x' + hdrEquirectangularMap.image.height;

            hdrPMREMRenderTarget = pmremGenerator.fromEquirectangular(hdrEquirectangularMap);

            hdrEquirectangularMap.mapping = THREE.EquirectangularReflectionMapping;
            hdrEquirectangularMap.minFilter = THREE.LinearFilter;
            hdrEquirectangularMap.magFilter = THREE.LinearFilter;
            hdrEquirectangularMap.needsUpdate = true;
        },
        function (progress) {
            fileSizes['HDR'] = humanFileSize(progress.total);
        },
    );

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 50;
    controls.maxDistance = 300;

    window.addEventListener('resize', onWindowResize);

    const gui = new GUI();

    gui.add(params, 'envMap', ['HDR JPG', 'Webp Gain map (separate)', 'HDR']).onChange(displayStats);
    gui.add(params, 'roughness', 0, 1, 0.01);
    gui.add(params, 'metalness', 0, 1, 0.01);
    gui.add(params, 'exposure', 0, 2, 0.01);
    gui.add(params, 'debug');
    gui.open();

    function displayStats(value) {
        lbl.innerHTML = value + ' size : ' + fileSizes[value] + ', Resolution: ' + resolutions[value];
    }
}

function humanFileSize(bytes, si = true, dp = 1) {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

    return bytes.toFixed(dp) + ' ' + units[u];
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}

function animate() {
    requestAnimationFrame(animate);

    stats.begin();
    render();
    stats.end();
}

function render() {
    torusMesh.material.roughness = params.roughness;
    torusMesh.material.metalness = params.metalness;

    let pmremRenderTarget, equirectangularMap;

    switch (params.envMap) {
        case 'HDR JPG':
            pmremRenderTarget = hdrJpgPMREMRenderTarget;
            equirectangularMap = hdrJpgEquirectangularMap || hdrJpg.renderTarget.texture;
            break;
        case 'Webp Gain map (separate)':
            pmremRenderTarget = gainMapPMREMRenderTarget;
            equirectangularMap = gainMapBackground || gainMap.renderTarget.texture;
            break;
        case 'HDR':
            pmremRenderTarget = hdrPMREMRenderTarget;
            equirectangularMap = hdrEquirectangularMap;
            break;
    }

    const newEnvMap = pmremRenderTarget ? pmremRenderTarget.texture : null;

    if (newEnvMap && newEnvMap !== torusMesh.material.envMap) {
        torusMesh.material.envMap = newEnvMap;
        torusMesh.material.needsUpdate = true;

        planeMesh.material.map = newEnvMap;
        planeMesh.material.needsUpdate = true;
    }

    torusMesh.rotation.y += 0.005;
    planeMesh.visible = params.debug;

    scene.background = equirectangularMap;
    renderer.toneMappingExposure = params.exposure;

    renderer.render(scene, camera);
}
