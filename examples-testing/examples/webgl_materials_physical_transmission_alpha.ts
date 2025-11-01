import * as THREE from 'three';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const params = {
    color: 0xffffff,
    transmission: 1,
    opacity: 1,
    metalness: 0,
    roughness: 0,
    ior: 1.5,
    thickness: 0.01,
    attenuationColor: 0xffffff,
    attenuationDistance: 1,
    specularIntensity: 1,
    specularColor: 0xffffff,
    envMapIntensity: 1,
    lightIntensity: 1,
    exposure: 1,
};

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;

let mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial>, material: THREE.MeshPhysicalMaterial;

const hdrEquirect = new HDRLoader().setPath('textures/equirectangular/').load('royal_esplanade_1k.hdr', function () {
    hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;

    new GLTFLoader().setPath('models/gltf/').load('DragonAttenuation.glb', function (gltf) {
        gltf.scene.traverse(function (child) {
            if (
                (child as THREE.Mesh).isMesh &&
                (child as THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial>).material.isMeshPhysicalMaterial
            ) {
                mesh = child as THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial>;
                material = mesh.material;

                const color = new THREE.Color();

                params.color = color.copy(mesh.material.color).getHex();
                params.roughness = mesh.material.roughness;
                params.metalness = mesh.material.metalness;

                params.ior = mesh.material.ior;
                params.specularIntensity = mesh.material.specularIntensity;

                params.transmission = mesh.material.transmission;
                params.thickness = mesh.material.thickness;
                params.attenuationColor = color.copy(mesh.material.attenuationColor).getHex();
                params.attenuationDistance = mesh.material.attenuationDistance;
            }
        });

        init();

        scene.add(gltf.scene);

        scene.environment = hdrEquirect;
        //scene.background = hdrEquirect;

        render();
    });
});

function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = params.exposure;

    // accommodate CSS table
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(-5, 0.5, 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render); // use if there is no animation loop
    controls.minDistance = 5;
    controls.maxDistance = 20;
    controls.target.y = 0.5;
    controls.update();

    window.addEventListener('resize', onWindowResize);

    //

    const gui = new GUI();

    gui.addColor(params, 'color').onChange(function () {
        material.color.set(params.color);
        render();
    });

    gui.add(params, 'transmission', 0, 1, 0.01).onChange(function () {
        material.transmission = params.transmission;
        render();
    });

    gui.add(params, 'opacity', 0, 1, 0.01).onChange(function () {
        material.opacity = params.opacity;
        const transparent = params.opacity < 1;

        if (transparent !== material.transparent) {
            material.transparent = transparent;
            material.needsUpdate = true;
        }

        render();
    });

    gui.add(params, 'metalness', 0, 1, 0.01).onChange(function () {
        material.metalness = params.metalness;
        render();
    });

    gui.add(params, 'roughness', 0, 1, 0.01).onChange(function () {
        material.roughness = params.roughness;
        render();
    });

    gui.add(params, 'ior', 1, 2, 0.01).onChange(function () {
        material.ior = params.ior;
        render();
    });

    gui.add(params, 'thickness', 0, 5, 0.01).onChange(function () {
        material.thickness = params.thickness;
        render();
    });

    gui.addColor(params, 'attenuationColor')
        .name('attenuation color')
        .onChange(function () {
            material.attenuationColor.set(params.attenuationColor);
            render();
        });

    gui.add(params, 'attenuationDistance', 0, 1, 0.01).onChange(function () {
        material.attenuationDistance = params.attenuationDistance;
        render();
    });

    gui.add(params, 'specularIntensity', 0, 1, 0.01).onChange(function () {
        material.specularIntensity = params.specularIntensity;
        render();
    });

    gui.addColor(params, 'specularColor').onChange(function () {
        material.specularColor.set(params.specularColor);
        render();
    });

    gui.add(params, 'envMapIntensity', 0, 1, 0.01)
        .name('envMap intensity')
        .onChange(function () {
            material.envMapIntensity = params.envMapIntensity;
            render();
        });

    gui.add(params, 'exposure', 0, 1, 0.01).onChange(function () {
        renderer.toneMappingExposure = params.exposure;
        render();
    });

    gui.open();
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

    render();
}

//

function render() {
    renderer.render(scene, camera);
}
