import * as THREE from 'three';
import { ARButton } from 'three/addons/webxr/ARButton.js';

const clock = new THREE.Clock();

let camera, scene, renderer;
let cube;

init();

async function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

    const defaultLight = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 3);
    defaultLight.position.set(0.5, 1, 0.25);
    scene.add(defaultLight);

    //

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);

    //

    document.body.appendChild(ARButton.createButton(renderer, { requiredFeatures: ['camera-access'] }));

    //

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const boxMaterial = new THREE.MeshStandardMaterial();
    cube = new THREE.Mesh(boxGeometry, boxMaterial);
    cube.position.z = -3;

    scene.add(cube);

    //

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function setCameraTexture() {
    if (!renderer.xr.getSession()) {
        if (cube.material.map) {
            cube.material.map = null;
            cube.material.needsUpdate = true;
        }

        return;
    }

    const frame = renderer.xr.getFrame();
    const referenceSpace = renderer.xr.getReferenceSpace();

    if (!frame || !referenceSpace) return;

    const viewerPose = frame.getViewerPose(referenceSpace);

    if (!viewerPose) return;

    const view = viewerPose.views.find(view => view.camera);

    const cameraTexture = renderer.xr.getCameraTexture(view.camera);

    if (cube.material.map === cameraTexture) return;

    cube.material.map = cameraTexture;
    cube.material.needsUpdate = true;
}

function animate() {
    const delta = clock.getDelta();

    setCameraTexture();

    cube.rotation.x += delta;
    cube.rotation.y += delta;

    renderer.render(scene, camera);
}
