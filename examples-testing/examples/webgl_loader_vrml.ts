import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRMLLoader } from 'three/addons/loaders/VRMLLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let camera: THREE.PerspectiveCamera,
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer,
    stats: Stats,
    controls: OrbitControls,
    loader: VRMLLoader;

const params = {
    asset: 'house',
};

const assets = [
    'creaseAngle',
    'crystal',
    'house',
    'elevationGrid1',
    'elevationGrid2',
    'extrusion1',
    'extrusion2',
    'extrusion3',
    'lines',
    'linesTransparent',
    'meshWithLines',
    'meshWithTexture',
    'pixelTexture',
    'points',
];

let vrmlScene: THREE.Scene;

init();

function init() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1e10);
    camera.position.set(-10, 5, 10);

    scene = new THREE.Scene();
    scene.add(camera);

    // light

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(200, 200, 200);
    scene.add(dirLight);

    loader = new VRMLLoader();
    loadAsset(params.asset);

    // renderer

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    // controls

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 200;
    controls.enableDamping = true;

    //

    stats = new Stats();
    document.body.appendChild(stats.dom);

    //

    window.addEventListener('resize', onWindowResize);

    //

    const gui = new GUI();
    gui.add(params, 'asset', assets).onChange(function (value) {
        if (vrmlScene) {
            vrmlScene.traverse(function (object) {
                if ((object as THREE.Mesh).material)
                    (object as THREE.Mesh<THREE.BufferGeometry, THREE.Material>).material.dispose();
                if (
                    (object as THREE.Mesh).material &&
                    (object as THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhongMaterial>).material.map
                )
                    (object as THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhongMaterial>).material.map!.dispose();
                if ((object as THREE.Mesh).geometry) (object as THREE.Mesh).geometry.dispose();
            });

            scene.remove(vrmlScene);
        }

        loadAsset(value);
    });
}

function loadAsset(asset: string) {
    loader.load('models/vrml/' + asset + '.wrl', function (object) {
        vrmlScene = object;
        scene.add(object);
        controls.reset();
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    controls.update(); // to support damping

    renderer.render(scene, camera);

    stats.update();
}
