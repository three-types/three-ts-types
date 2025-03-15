import * as THREE from 'three/webgpu';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let controls, camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGPURenderer;
let textureEquirec: THREE.Texture, textureCube: THREE.CubeTexture;
let sphereMesh: THREE.Mesh<THREE.IcosahedronGeometry, THREE.MeshBasicMaterial>,
    sphereMaterial: THREE.MeshBasicMaterial,
    params: {
        Cube: () => void;
        Equirectangular: () => void;
        Refraction: boolean;
        backgroundRotationX: boolean;
        backgroundRotationY: boolean;
        backgroundRotationZ: boolean;
        syncMaterial: boolean;
    };

init();

function init() {
    // CAMERAS

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 2.5);

    // SCENE

    scene = new THREE.Scene();

    // Textures

    const loader = new THREE.CubeTextureLoader();
    loader.setPath('textures/cube/Bridge2/');

    textureCube = loader.load(['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg']);

    const textureLoader = new THREE.TextureLoader();

    textureEquirec = textureLoader.load('textures/2294472375_24a3b8ef46_o.jpg');
    textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
    textureEquirec.colorSpace = THREE.SRGBColorSpace;

    scene.background = textureCube;

    //

    const geometry = new THREE.IcosahedronGeometry(1, 15);
    sphereMaterial = new THREE.MeshBasicMaterial({ envMap: textureCube });
    sphereMesh = new THREE.Mesh(geometry, sphereMaterial);
    scene.add(sphereMesh);

    //

    renderer = new THREE.WebGPURenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    //

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 1.5;
    controls.maxDistance = 6;

    //

    params = {
        Cube: function () {
            scene.background = textureCube;

            sphereMaterial.envMap = textureCube;
            sphereMaterial.needsUpdate = true;
        },
        Equirectangular: function () {
            scene.background = textureEquirec;

            sphereMaterial.envMap = textureEquirec;
            sphereMaterial.needsUpdate = true;
        },
        Refraction: false,
        backgroundRotationX: false,
        backgroundRotationY: false,
        backgroundRotationZ: false,
        syncMaterial: false,
    };

    const gui = new GUI({ width: 300 });
    gui.add(params, 'Cube');
    gui.add(params, 'Equirectangular');
    gui.add(params, 'Refraction').onChange(function (value) {
        if (value) {
            textureEquirec.mapping = THREE.EquirectangularRefractionMapping;
            textureCube.mapping = THREE.CubeRefractionMapping;
        } else {
            textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
            textureCube.mapping = THREE.CubeReflectionMapping;
        }

        sphereMaterial.needsUpdate = true;
    });
    gui.add(params, 'backgroundRotationX');
    gui.add(params, 'backgroundRotationY');
    gui.add(params, 'backgroundRotationZ');
    gui.add(params, 'syncMaterial');
    gui.open();

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
    if (params.backgroundRotationX) {
        scene.backgroundRotation.x += 0.001;
    }

    if (params.backgroundRotationY) {
        scene.backgroundRotation.y += 0.001;
    }

    if (params.backgroundRotationZ) {
        scene.backgroundRotation.z += 0.001;
    }

    if (params.syncMaterial) {
        sphereMesh.material.envMapRotation.copy(scene.backgroundRotation);
    }

    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}
