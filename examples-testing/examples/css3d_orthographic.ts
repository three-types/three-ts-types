import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { Controller } from 'lil-gui';

let camera: THREE.OrthographicCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;

let scene2: THREE.Scene, renderer2: CSS3DRenderer;

const frustumSize = 500;

init();
animate();

function init() {
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera(
        (frustumSize * aspect) / -2,
        (frustumSize * aspect) / 2,
        frustumSize / 2,
        frustumSize / -2,
        1,
        1000,
    );

    camera.position.set(-200, 200, 200);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    scene2 = new THREE.Scene();

    const material = new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true,
        wireframeLinewidth: 1,
        side: THREE.DoubleSide,
    });

    // left
    createPlane(
        100,
        100,
        'chocolate',
        new THREE.Vector3(-50, 0, 0),
        new THREE.Euler(0, -90 * THREE.MathUtils.DEG2RAD, 0),
    );
    // right
    createPlane(100, 100, 'saddlebrown', new THREE.Vector3(0, 0, 50), new THREE.Euler(0, 0, 0));
    // top
    createPlane(
        100,
        100,
        'yellowgreen',
        new THREE.Vector3(0, 50, 0),
        new THREE.Euler(-90 * THREE.MathUtils.DEG2RAD, 0, 0),
    );
    // bottom
    createPlane(
        300,
        300,
        'seagreen',
        new THREE.Vector3(0, -50, 0),
        new THREE.Euler(-90 * THREE.MathUtils.DEG2RAD, 0, 0),
    );

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    renderer2 = new CSS3DRenderer();
    renderer2.setSize(window.innerWidth, window.innerHeight);
    renderer2.domElement.style.position = 'absolute';
    renderer2.domElement.style.top = '0';
    document.body.appendChild(renderer2.domElement);

    const controls = new OrbitControls(camera, renderer2.domElement);
    controls.minZoom = 0.5;
    controls.maxZoom = 2;

    function createPlane(width: number, height: number, cssColor: string, pos: THREE.Vector3, rot: THREE.Euler) {
        const element = document.createElement('div');
        element.style.width = width + 'px';
        element.style.height = height + 'px';
        element.style.opacity = '0.75';
        element.style.background = cssColor;

        const object = new CSS3DObject(element);
        object.position.copy(pos);
        object.rotation.copy(rot);
        scene2.add(object);

        const geometry = new THREE.PlaneGeometry(width, height);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(object.position);
        mesh.rotation.copy(object.rotation);
        scene.add(mesh);
    }

    window.addEventListener('resize', onWindowResize);
    createPanel();
}

function onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;

    camera.left = (-frustumSize * aspect) / 2;
    camera.right = (frustumSize * aspect) / 2;
    camera.top = frustumSize / 2;
    camera.bottom = -frustumSize / 2;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer2.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

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
    } else {
        camera.setViewOffset(
            fullWidth || camera.view.fullWidth,
            fullHeight || camera.view.fullHeight,
            x || camera.view.offsetX,
            y || camera.view.offsetY,
            width || camera.view.width,
            height || camera.view.height,
        );
    }
}
