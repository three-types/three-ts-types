import * as THREE from 'three';

import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { TDSLoader } from 'three/addons/loaders/TDSLoader.js';

let container: HTMLDivElement, controls: TrackballControls;
let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;

init();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10);
    camera.position.z = 2;

    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff, 3));

    const directionalLight = new THREE.DirectionalLight(0xffeedd, 3);
    directionalLight.position.set(0, 0, 2);
    scene.add(directionalLight);

    //3ds files dont store normal maps
    const normal = new THREE.TextureLoader().load('models/3ds/portalgun/textures/normal.jpg');

    const loader = new TDSLoader();
    loader.setResourcePath('models/3ds/portalgun/textures/');
    loader.load('models/3ds/portalgun/portalgun.3ds', function (object) {
        object.traverse(function (child) {
            if ((child as THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhongMaterial>).isMesh) {
                (child as THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhongMaterial>).material.specular.setScalar(0.1);
                (child as THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhongMaterial>).material.normalMap = normal;
            }
        });

        scene.add(object);
    });

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    controls = new TrackballControls(camera, renderer.domElement);

    window.addEventListener('resize', resize);
}

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    controls.update();
    renderer.render(scene, camera);
}
