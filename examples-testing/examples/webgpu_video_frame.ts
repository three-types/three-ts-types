import * as THREE from 'three';

import { MP4Demuxer } from 'three/addons/libs/demuxer_mp4.js';

let camera, scene, renderer;

init();

function init() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.25, 10);
    camera.position.set(0, 0, 1);

    scene = new THREE.Scene();

    const geometry = new THREE.PlaneGeometry();

    const videoTexture = new THREE.VideoFrameTexture();
    videoTexture.colorSpace = THREE.SRGBColorSpace;

    // eslint-disable-next-line compat/compat
    const decoder = new VideoDecoder({
        output(frame) {
            videoTexture.setFrame(frame);
        },
        error(e) {
            console.error('VideoDecoder:', e);
        },
    });

    new MP4Demuxer('./textures/sintel.mp4', {
        onConfig(config) {
            decoder.configure(config);
        },
        onChunk(chunk) {
            decoder.decode(chunk);
        },
        setStatus(s) {
            console.info('MP4Demuxer:', s);
        },
    });

    const material = new THREE.MeshBasicMaterial({ map: videoTexture });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGPURenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    //

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
