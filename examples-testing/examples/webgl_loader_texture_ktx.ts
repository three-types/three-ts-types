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
        etc2: renderer.extensions.has('WEBGL_compressed_texture_etc'),
        s3tc: renderer.extensions.has('WEBGL_compressed_texture_s3tc'),
        pvrtc: renderer.extensions.has('WEBGL_compressed_texture_pvrtc'),
    };

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.02);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2, 0, 0);
    pointLight.position.z = -300;
    scene.add(pointLight);

    const geometry = new THREE.BoxGeometry(200, 200, 200);
    let material1, material2, material3;

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
        material3 = new THREE.MeshStandardMaterial({
            normalMap: loader.load('textures/compressed/normal.bc5.ktx'),
        });

        meshes.push(new THREE.Mesh(geometry, material1));
        meshes.push(new THREE.Mesh(geometry, material2));
        meshes.push(new THREE.Mesh(geometry, material3));
    }

    if (formats.etc1) {
        material1 = new THREE.MeshBasicMaterial({
            map: loader.load('textures/compressed/disturb_ETC1.ktx'),
        });

        meshes.push(new THREE.Mesh(geometry, material1));
    }

    if (formats.etc2) {
        material1 = new THREE.MeshStandardMaterial({
            normalMap: loader.load('textures/compressed/normal.eac_rg.ktx'),
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

    let x0 = (-Math.min(4, meshes.length) * 300) / 2 + 150;
    for (let i = 0; i < Math.min(4, meshes.length); ++i, x0 += 300) {
        const mesh = meshes[i];
        mesh.position.x = x0;
        mesh.position.y = 150;
        scene.add(mesh);
    }

    let x1 = (-(meshes.length - 4) * 300) / 2 + 150;
    for (let i = 4; i < meshes.length; ++i, x1 += 300) {
        const mesh = meshes[i];
        mesh.position.x = x1;
        mesh.position.y = -150;
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
