import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let container: HTMLElement, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, controls: OrbitControls;
let sceneL: THREE.Scene, sceneR: THREE.Scene;

let sliderPos = window.innerWidth / 2;

init();

function init() {
    container = document.querySelector('.container')!;

    sceneL = new THREE.Scene();
    sceneL.background = new THREE.Color(0xbcd48f);

    sceneR = new THREE.Scene();
    sceneR.background = new THREE.Color(0x8fbcd4);

    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 6;

    controls = new OrbitControls(camera, container);

    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 3);
    light.position.set(-2, 2, 2);
    sceneL.add(light.clone());
    sceneR.add(light.clone());

    initMeshes();
    initSlider();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setScissorTest(true);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);
}

function initMeshes() {
    const geometry = new THREE.IcosahedronGeometry(1, 3);

    const meshL = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    sceneL.add(meshL);

    const meshR = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ wireframe: true }));
    sceneR.add(meshR);
}

function initSlider() {
    const slider = document.querySelector('.slider') as HTMLElement;

    function onPointerDown(event: PointerEvent) {
        if (event.isPrimary === false) return;

        controls.enabled = false;

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
    }

    function onPointerUp() {
        controls.enabled = true;

        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
    }

    function onPointerMove(event: PointerEvent) {
        if (event.isPrimary === false) return;

        sliderPos = Math.max(0, Math.min(window.innerWidth, event.pageX));

        slider.style.left = sliderPos - slider.offsetWidth / 2 + 'px';
    }

    slider.style.touchAction = 'none'; // disable touch scroll
    slider.addEventListener('pointerdown', onPointerDown);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.setScissor(0, 0, sliderPos, window.innerHeight);
    renderer.render(sceneL, camera);

    renderer.setScissor(sliderPos, 0, window.innerWidth, window.innerHeight);
    renderer.render(sceneR, camera);
}
