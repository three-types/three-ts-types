import * as THREE from "three";

import WebGL from "three/addons/capabilities/WebGL.js";

let container, camera, renderer, loader;
let sceneL, sceneR, textureL, textureR;

let sliderPos = window.innerWidth / 2;

const isP3Context = WebGL.isColorSpaceAvailable(THREE.DisplayP3ColorSpace);

if (isP3Context) {
    THREE.ColorManagement.workingColorSpace = THREE.LinearDisplayP3ColorSpace;
}

init();

function init() {
    container = document.querySelector(".container");

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
    renderer.setScissorTest(true);
    renderer.setAnimationLoop(render);
    container.appendChild(renderer.domElement);

    if (isP3Context && window.matchMedia("( color-gamut: p3 )").matches) {
        renderer.outputColorSpace = THREE.DisplayP3ColorSpace;
    }

    window.addEventListener("resize", onWindowResize);
    window.matchMedia("( color-gamut: p3 )").addEventListener("change", onGamutChange);
}

async function initTextures() {
    const path = "textures/wide_gamut/logo_{colorSpace}.png";

    textureL = await loader.loadAsync(path.replace("{colorSpace}", "srgb"));
    textureR = await loader.loadAsync(path.replace("{colorSpace}", "p3"));

    textureL.colorSpace = THREE.SRGBColorSpace;
    textureR.colorSpace = THREE.DisplayP3ColorSpace;

    sceneL.background = containTexture(window.innerWidth / window.innerHeight, textureL);
    sceneR.background = containTexture(window.innerWidth / window.innerHeight, textureR);
}

function initSlider() {
    const slider = document.querySelector(".slider");

    function onPointerDown() {
        if (event.isPrimary === false) return;

        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
    }

    function onPointerUp() {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
    }

    function onPointerMove(e) {
        if (event.isPrimary === false) return;

        sliderPos = Math.max(0, Math.min(window.innerWidth, e.pageX));

        slider.style.left = sliderPos - (slider.offsetWidth / 2) + "px";
    }

    slider.style.touchAction = "none"; // disable touch scroll
    slider.addEventListener("pointerdown", onPointerDown);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    containTexture(window.innerWidth / window.innerHeight, sceneL.background);
    containTexture(window.innerWidth / window.innerHeight, sceneR.background);
}

function onGamutChange({ matches }) {
    renderer.outputColorSpace = isP3Context && matches ? THREE.DisplayP3ColorSpace : THREE.SRGBColorSpace;

    textureL.needsUpdate = true;
    textureR.needsUpdate = true;
}

function containTexture(aspect, target) {
    // Sets the matrix uv transform so the texture image is contained in a region having the specified aspect ratio,
    // and does so without distortion. Akin to CSS object-fit: contain.
    // Source: https://github.com/mrdoob/three.js/pull/17199

    var imageAspect = (target.image && target.image.width) ? target.image.width / target.image.height : 1;

    if (aspect > imageAspect) {
        target.matrix.setUvTransform(0, 0, aspect / imageAspect, 1, 0, 0.5, 0.5);
    } else {
        target.matrix.setUvTransform(0, 0, 1, imageAspect / aspect, 0, 0.5, 0.5);
    }

    target.matrixAutoUpdate = false;

    return target;
}

function render() {
    renderer.setScissor(0, 0, sliderPos, window.innerHeight);
    renderer.render(sceneL, camera);

    renderer.setScissor(sliderPos, 0, window.innerWidth, window.innerHeight);
    renderer.render(sceneR, camera);
}
