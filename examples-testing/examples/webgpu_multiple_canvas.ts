import * as THREE from 'three/webgpu';
import { color } from 'three/tsl';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import WebGPU from 'three/addons/capabilities/WebGPU.js';

//

if (WebGPU.isAvailable() === false) {
    document.body.appendChild(WebGPU.getErrorMessage());

    throw new Error('No WebGPU support');
}

//

let renderer: THREE.WebGPURenderer;

const scenes: THREE.Scene[] = [];

init();

function init() {
    const geometries = [
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.SphereGeometry(0.5, 12, 8),
        new THREE.DodecahedronGeometry(0.5),
        new THREE.CylinderGeometry(0.5, 0.5, 1, 12),
    ];

    const content = document.getElementById('content')!;

    for (let i = 0; i < 40; i++) {
        const scene = new THREE.Scene();
        scene.backgroundNode = color(0xeeeeee);

        // make a list item
        const element = document.createElement('div');
        element.className = 'list-item';

        const sceneCanvas = document.createElement('canvas');
        element.appendChild(sceneCanvas);

        const descriptionElement = document.createElement('div');
        descriptionElement.innerText = 'Scene ' + (i + 1);
        element.appendChild(descriptionElement);

        const canvasTarget = new THREE.CanvasTarget(sceneCanvas);
        canvasTarget.setPixelRatio(window.devicePixelRatio);
        canvasTarget.setSize(200, 200);

        // the element that represents the area we want to render the scene
        scene.userData.canvasTarget = canvasTarget;
        content.appendChild(element);

        const camera = new THREE.PerspectiveCamera(50, 1, 1, 10);
        camera.position.z = 2;
        scene.userData.camera = camera;

        const controls = new OrbitControls(scene.userData.camera, scene.userData.canvasTarget.domElement);
        controls.minDistance = 2;
        controls.maxDistance = 5;
        controls.enablePan = false;
        controls.enableZoom = false;
        scene.userData.controls = controls;

        // add one random mesh to each scene
        const geometry = geometries[(geometries.length * Math.random()) | 0];

        const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(Math.random(), 1, 0.75, THREE.SRGBColorSpace),
            roughness: 0.5,
            metalness: 0,
            flatShading: true,
        });

        scene.add(new THREE.Mesh(geometry, material));

        scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444, 3));

        const light = new THREE.DirectionalLight(0xffffff, 1.5);
        light.position.set(1, 1, 1);
        scene.add(light);

        scenes.push(scene);
    }

    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setClearColor(0xffffff, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setAnimationLoop(animate);
}

function animate() {
    scenes.forEach(function (scene) {
        // so something moves
        //scene.children[ 0 ].rotation.y = Date.now() * 0.001;

        // get the canvas and camera for this scene
        const { canvasTarget, camera } = scene.userData;

        //camera.aspect = width / height; // not changing in this example
        //camera.updateProjectionMatrix();

        //scene.userData.controls.update();

        renderer.setCanvasTarget(canvasTarget);
        renderer.render(scene, camera);
    });
}
