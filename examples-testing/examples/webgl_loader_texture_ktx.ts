import * as THREE from 'three';

import { KTXLoader } from 'three/addons/loaders/KTXLoader.js';

/*
	This is how compressed textures are supposed to be used:

	best for desktop:
	BC1(DXT1) - opaque textures
	BC3(DXT5) - transparent textures with full alpha range

	best for iOS:
	PVR2, PVR4 - opaque textures or alpha

	best for Android:
	ETC1 - opaque textures
	ASTC_4x4, ASTC8x8 - transparent textures with full alpha range
	*/

let camera, scene, renderer;
const meshes = [];

init();

function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    const formats = {
        astc: renderer.extensions.has('WEBGL_compressed_texture_astc'),
        etc1: renderer.extensions.has('WEBGL_compressed_texture_etc1'),
        s3tc: renderer.extensions.has('WEBGL_compressed_texture_s3tc'),
        pvrtc: renderer.extensions.has('WEBGL_compressed_texture_pvrtc'),
    };

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(200, 200, 200);
    let material1, material2;

    // TODO: add cubemap support
    const loader = new KTXLoader();

    if (formats.pvrtc) {
        material1 = new THREE.MeshBasicMaterial({
            map: loader.load('textures/compressed/disturb_PVR2bpp.ktx'),
        });
        material1.map.colorSpace = THREE.SRGBColorSpace;
        material2 = new THREE.MeshBasicMaterial({
            map: loader.load('textures/compressed/lensflare_PVR4bpp.ktx'),
            depthTest: false,
            transparent: true,
            side: THREE.DoubleSide,
        });
        material2.map.colorSpace = THREE.SRGBColorSpace;

        meshes.push(new THREE.Mesh(geometry, material1));
        meshes.push(new THREE.Mesh(geometry, material2));
    }

    if (formats.s3tc) {
        material1 = new THREE.MeshBasicMaterial({
            map: loader.load('textures/compressed/disturb_BC1.ktx'),
        });
        material1.map.colorSpace = THREE.SRGBColorSpace;
        material2 = new THREE.MeshBasicMaterial({
            map: loader.load('textures/compressed/lensflare_BC3.ktx'),
            depthTest: false,
            transparent: true,
            side: THREE.DoubleSide,
        });
        material2.map.colorSpace = THREE.SRGBColorSpace;

        meshes.push(new THREE.Mesh(geometry, material1));
        meshes.push(new THREE.Mesh(geometry, material2));
    }

    if (formats.etc1) {
        material1 = new THREE.MeshBasicMaterial({
            map: loader.load('textures/compressed/disturb_ETC1.ktx'),
        });

        meshes.push(new THREE.Mesh(geometry, material1));
    }

    if (formats.astc) {
        material1 = new THREE.MeshBasicMaterial({
            map: loader.load('textures/compressed/disturb_ASTC4x4.ktx'),
        });
        material1.map.colorSpace = THREE.SRGBColorSpace;
        material2 = new THREE.MeshBasicMaterial({
            map: loader.load('textures/compressed/lensflare_ASTC8x8.ktx'),
            depthTest: false,
            transparent: true,
            side: THREE.DoubleSide,
        });
        material2.map.colorSpace = THREE.SRGBColorSpace;

        meshes.push(new THREE.Mesh(geometry, material1));
        meshes.push(new THREE.Mesh(geometry, material2));
    }

    let x = (-meshes.length / 2) * 150;
    for (let i = 0; i < meshes.length; ++i, x += 300) {
        const mesh = meshes[i];
        mesh.position.x = x;
        mesh.position.y = 0;
        scene.add(mesh);
    }

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    const time = Date.now() * 0.001;

    for (let i = 0; i < meshes.length; i++) {
        const mesh = meshes[i];
        mesh.rotation.x = time;
        mesh.rotation.y = time;
    }

    renderer.render(scene, camera);
}
