import * as THREE from 'three';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, scene, renderer;

const params = {
    clipIntersection: true,
    planeConstant: 0,
    showHelpers: false,
    alphaToCoverage: true,
};

const clipPlanes = [
    new THREE.Plane(new THREE.Vector3(1, 0, 0), 0),
    new THREE.Plane(new THREE.Vector3(0, -1, 0), 0),
    new THREE.Plane(new THREE.Vector3(0, 0, -1), 0),
];

init();
render();

function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.localClippingEnabled = true;
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 200);

    camera.position.set(-1.5, 2.5, 3.0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render); // use only if there is no animation loop
    controls.minDistance = 1;
    controls.maxDistance = 10;
    controls.enablePan = false;

    const light = new THREE.HemisphereLight(0xffffff, 0x080808, 4.5);
    light.position.set(-1.25, 1, 1.25);
    scene.add(light);

    //

    const group = new THREE.Group();

    for (let i = 1; i <= 30; i += 2) {
        const geometry = new THREE.SphereGeometry(i / 30, 48, 24);

        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color().setHSL(Math.random(), 0.5, 0.5, THREE.SRGBColorSpace),
            side: THREE.DoubleSide,
            clippingPlanes: clipPlanes,
            clipIntersection: params.clipIntersection,
            alphaToCoverage: true,
        });

        group.add(new THREE.Mesh(geometry, material));
    }

    scene.add(group);

    // helpers

    const helpers = new THREE.Group();
    helpers.add(new THREE.PlaneHelper(clipPlanes[0], 2, 0xff0000));
    helpers.add(new THREE.PlaneHelper(clipPlanes[1], 2, 0x00ff00));
    helpers.add(new THREE.PlaneHelper(clipPlanes[2], 2, 0x0000ff));
    helpers.visible = false;
    scene.add(helpers);

    // gui

    const gui = new GUI();

    gui.add(params, 'alphaToCoverage').onChange(function (value) {
        group.children.forEach(c => {
            c.material.alphaToCoverage = Boolean(value);
            c.material.needsUpdate = true;
        });

        render();
    });

    gui.add(params, 'clipIntersection')
        .name('clip intersection')
        .onChange(function (value) {
            const children = group.children;

            for (let i = 0; i < children.length; i++) {
                children[i].material.clipIntersection = value;
            }

            render();
        });

    gui.add(params, 'planeConstant', -1, 1)
        .step(0.01)
        .name('plane constant')
        .onChange(function (value) {
            for (let j = 0; j < clipPlanes.length; j++) {
                clipPlanes[j].constant = value;
            }

            render();
        });

    gui.add(params, 'showHelpers')
        .name('show helpers')
        .onChange(function (value) {
            helpers.visible = value;

            render();
        });

    //

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();
}

function render() {
    renderer.render(scene, camera);
}
