import * as THREE from 'three';

import WebGL from 'three/addons/capabilities/WebGL.js';

let container, camera, renderer, loader;
let sceneL, sceneR, textureL, textureR;

let sliderPos = window.innerWidth / 2;

const isP3Context = WebGL.isColorSpaceAvailable(THREE.DisplayP3ColorSpace);

if (isP3Context) {
    THREE.ColorManagement.workingColorSpace = THREE.LinearDisplayP3ColorSpace;
}

init();

function init() {
    container = document.querySelector('.container');

    sceneL = new THREE.Scene();
    sceneR = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 6;

    loader = new THREE.TextureLoader();

    initTextures();
    initSlider();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.setScissorTest(true);
    container.appendChild(renderer.domElement);

    if (isP3Context && window.matchMedia('( color-gamut: p3 )').matches) {
        renderer.outputColorSpace = THREE.DisplayP3ColorSpace;
    }

    window.addEventListener('resize', onWindowResize);
    window.matchMedia('( color-gamut: p3 )').addEventListener('change', onGamutChange);
}

async function initTextures() {
    const path = 'textures/wide_gamut/logo_{colorSpace}.png';

    textureL = await loader.loadAsync(path.replace('{colorSpace}', 'srgb'));
    textureR = await loader.loadAsync(path.replace('{colorSpace}', 'p3'));

    textureL.colorSpace = THREE.SRGBColorSpace;
    textureR.colorSpace = THREE.DisplayP3ColorSpace;

    sceneL.background = THREE.TextureUtils.contain(textureL, window.innerWidth / window.innerHeight);
    sceneR.background = THREE.TextureUtils.contain(textureR, window.innerWidth / window.innerHeight);
}

function initSlider() {
    const slider = document.querySelector('.slider');

    function onPointerDown() {
        if (event.isPrimary === false) return;

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
    }

    function onPointerUp() {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
    }

    function onPointerMove(e) {
        if (event.isPrimary === false) return;

        sliderPos = Math.max(0, Math.min(window.innerWidth, e.pageX));

        slider.style.left = sliderPos - slider.offsetWidth / 2 + 'px';
    }

    slider.style.touchAction = 'none'; // disable touch scroll
    slider.addEventListener('pointerdown', onPointerDown);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    THREE.TextureUtils.contain(sceneL.background, window.innerWidth / window.innerHeight);
    THREE.TextureUtils.contain(sceneR.background, window.innerWidth / window.innerHeight);
}

function onGamutChange({ matches }) {
    renderer.outputColorSpace = isP3Context && matches ? THREE.DisplayP3ColorSpace : THREE.SRGBColorSpace;

    textureL.needsUpdate = true;
    textureR.needsUpdate = true;
}

function animate() {
    renderer.setScissor(0, 0, sliderPos, window.innerHeight);
    renderer.render(sceneL, camera);

    renderer.setScissor(sliderPos, 0, window.innerWidth, window.innerHeight);
    renderer.render(sceneR, camera);
}
