import * as THREE from 'three/webgpu';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let container;

let camera, scene, renderer;

init();

// load customized cube texture
async function loadCubeTextureWithMipmaps() {
    const path = 'textures/cube/angus/';
    const format = '.jpg';
    const mipmaps = [];
    const maxLevel = 8;

    async function loadCubeTexture(urls) {
        return new Promise(function (resolve) {
            new THREE.CubeTextureLoader().load(urls, function (cubeTexture) {
                resolve(cubeTexture);
            });
        });
    }

    // load mipmaps
    const pendings = [];

    for (let level = 0; level <= maxLevel; ++level) {
        const urls = [];

        for (let face = 0; face < 6; ++face) {
            urls.push(path + 'cube_m0' + level + '_c0' + face + format);
        }

        const mipmapLevel = level;

        pendings.push(
            loadCubeTexture(urls).then(function (cubeTexture) {
                mipmaps[mipmapLevel] = cubeTexture;
            }),
        );
    }

    await Promise.all(pendings);

    const customizedCubeTexture = mipmaps.shift();
    customizedCubeTexture.mipmaps = mipmaps;
    customizedCubeTexture.colorSpace = THREE.SRGBColorSpace;
    customizedCubeTexture.minFilter = THREE.LinearMipMapLinearFilter;
    customizedCubeTexture.magFilter = THREE.LinearFilter;
    customizedCubeTexture.generateMipmaps = false;
    customizedCubeTexture.needsUpdate = true;

    return customizedCubeTexture;
}

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 500;

    scene = new THREE.Scene();

    loadCubeTextureWithMipmaps().then(function (cubeTexture) {
        // model
        const sphere = new THREE.SphereGeometry(100, 128, 128);

        // manual mipmaps
        let material = new THREE.MeshBasicMaterial({ color: 0xffffff, envMap: cubeTexture });
        material.name = 'manual mipmaps';

        let mesh = new THREE.Mesh(sphere, material);
        mesh.position.set(100, 0, 0);
        scene.add(mesh);

        // auto mipmaps
        material = material.clone();
        material.name = 'auto mipmaps';

        const autoCubeTexture = cubeTexture.clone();
        autoCubeTexture.mipmaps = [];
        autoCubeTexture.generateMipmaps = true;
        autoCubeTexture.needsUpdate = true;

        material.envMap = autoCubeTexture;

        mesh = new THREE.Mesh(sphere, material);
        mesh.position.set(-100, 0, 0);
        scene.add(mesh);
    });

    //renderer
    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    //controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 1.5;

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.render(scene, camera);
}
