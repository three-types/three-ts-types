import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Rhino3dmLoader } from 'three/addons/loaders/3DMLoader.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
let controls: OrbitControls, gui: GUI;

init();

function init() {
    THREE.Object3D.DEFAULT_UP.set(0, 0, 1);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(26, -40, 5);

    scene = new THREE.Scene();

    const directionalLight = new THREE.DirectionalLight(0xffffff, 6);
    directionalLight.position.set(0, 0, 2);
    scene.add(directionalLight);

    const loader = new Rhino3dmLoader();
    //generally, use this for the Library Path: https://cdn.jsdelivr.net/npm/rhino3dm@8.0.1
    loader.setLibraryPath('jsm/libs/rhino3dm/');
    loader.load(
        'models/3dm/Rhino_Logo.3dm',
        function (object) {
            scene.add(object);
            initGUI(object.userData.layers);

            // hide spinner
            document.getElementById('loader')!.style.display = 'none';
        },
        function (progress) {
            console.log((progress.loaded / progress.total) * 100 + '%');
        },
        function (error) {
            console.log(error);
        },
    );

    controls = new OrbitControls(camera, renderer.domElement);

    window.addEventListener('resize', resize);
}

function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}

function animate() {
    controls.update();
    renderer.render(scene, camera);
}

function initGUI(layers: { name: string; visible: boolean }[]) {
    gui = new GUI({ title: 'layers' });

    for (let i = 0; i < layers.length; i++) {
        const layer = layers[i];
        gui.add(layer, 'visible')
            .name(layer.name)
            .onChange(function (val) {
                const name = this.object.name;

                scene.traverse(function (child) {
                    if (child.userData.hasOwnProperty('attributes')) {
                        if ('layerIndex' in child.userData.attributes) {
                            const layerName = layers[child.userData.attributes.layerIndex].name;

                            if (layerName === name) {
                                child.visible = val;
                                layer.visible = val;
                            }
                        }
                    }
                });
            });
    }
}
