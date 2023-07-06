import * as THREE from 'three';

import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { Controller, GUI } from 'three/addons/libs/lil-gui.module.min.js';

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;

let scene2: THREE.Scene, renderer2: CSS3DRenderer;

let controls: TrackballControls;

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(200, 200, 200);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    scene2 = new THREE.Scene();

    const material = new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true,
        wireframeLinewidth: 1,
        side: THREE.DoubleSide,
    });

    //

    for (let i = 0; i < 10; i++) {
        const element = document.createElement('div');
        element.style.width = '100px';
        element.style.height = '100px';
        element.style.opacity = `${i < 5 ? 0.5 : 1}`;
        element.style.background = new THREE.Color(Math.random() * 0xffffff).getStyle();

        const object = new CSS3DObject(element);
        object.position.x = Math.random() * 200 - 100;
        object.position.y = Math.random() * 200 - 100;
        object.position.z = Math.random() * 200 - 100;
        object.rotation.x = Math.random();
        object.rotation.y = Math.random();
        object.rotation.z = Math.random();
        object.scale.x = Math.random() + 0.5;
        object.scale.y = Math.random() + 0.5;
        scene2.add(object);

        const geometry = new THREE.PlaneGeometry(100, 100);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(object.position);
        mesh.rotation.copy(object.rotation);
        mesh.scale.copy(object.scale);
        scene.add(mesh);
    }

    //

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    renderer2 = new CSS3DRenderer();
    renderer2.setSize(window.innerWidth, window.innerHeight);
    renderer2.domElement.style.position = 'absolute';
    renderer2.domElement.style.top = '0';
    document.body.appendChild(renderer2.domElement);

    controls = new TrackballControls(camera, renderer2.domElement);

    window.addEventListener('resize', onWindowResize);
    createPanel();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer2.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
    renderer2.render(scene2, camera);
}

function createPanel() {
    const panel = new GUI();
    const folder1 = panel.addFolder('camera setViewOffset').close();

    const settings = {
        setViewOffset() {
            (folder1.children[1] as Controller).enable().setValue(window.innerWidth);
            (folder1.children[2] as Controller).enable().setValue(window.innerHeight);
            (folder1.children[3] as Controller).enable().setValue(0);
            (folder1.children[4] as Controller).enable().setValue(0);
            (folder1.children[5] as Controller).enable().setValue(window.innerWidth);
            (folder1.children[6] as Controller).enable().setValue(window.innerHeight);
        },
        fullWidth: 0,
        fullHeight: 0,
        offsetX: 0,
        offsetY: 0,
        width: 0,
        height: 0,
        clearViewOffset() {
            (folder1.children[1] as Controller).setValue(0).disable();
            (folder1.children[2] as Controller).setValue(0).disable();
            (folder1.children[3] as Controller).setValue(0).disable();
            (folder1.children[4] as Controller).setValue(0).disable();
            (folder1.children[5] as Controller).setValue(0).disable();
            (folder1.children[6] as Controller).setValue(0).disable();
            camera.clearViewOffset();
        },
    };

    folder1.add(settings, 'setViewOffset');
    folder1
        .add(settings, 'fullWidth', window.screen.width / 4, window.screen.width * 2, 1)
        .onChange((val: number) => updateCameraViewOffset({ fullWidth: val }))
        .disable();
    folder1
        .add(settings, 'fullHeight', window.screen.height / 4, window.screen.height * 2, 1)
        .onChange((val: number) => updateCameraViewOffset({ fullHeight: val }))
        .disable();
    folder1
        .add(settings, 'offsetX', 0, 256, 1)
        .onChange((val: number) => updateCameraViewOffset({ x: val }))
        .disable();
    folder1
        .add(settings, 'offsetY', 0, 256, 1)
        .onChange((val: number) => updateCameraViewOffset({ y: val }))
        .disable();
    folder1
        .add(settings, 'width', window.screen.width / 4, window.screen.width * 2, 1)
        .onChange((val: number) => updateCameraViewOffset({ width: val }))
        .disable();
    folder1
        .add(settings, 'height', window.screen.height / 4, window.screen.height * 2, 1)
        .onChange((val: number) => updateCameraViewOffset({ height: val }))
        .disable();
    folder1.add(settings, 'clearViewOffset');
}

function updateCameraViewOffset({
    fullWidth,
    fullHeight,
    x,
    y,
    width,
    height,
}: {
    fullWidth?: number;
    fullHeight?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}) {
    if (!camera.view) {
        camera.setViewOffset(
            fullWidth || window.innerWidth,
            fullHeight || window.innerHeight,
            x || 0,
            y || 0,
            width || window.innerWidth,
            height || window.innerHeight,
        );
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    } else {
        camera.setViewOffset(
            fullWidth || camera.view.fullWidth,
            fullHeight || camera.view.fullHeight,
            x || camera.view.offsetX,
            y || camera.view.offsetY,
            width || camera.view.width,
            height || camera.view.height,
        );
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
}
