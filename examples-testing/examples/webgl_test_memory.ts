import * as THREE from 'three';

let camera, scene, renderer;

init();

function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 200;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);
}

function createImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;

    const context = canvas.getContext('2d');
    context.fillStyle =
        'rgb(' +
        Math.floor(Math.random() * 256) +
        ',' +
        Math.floor(Math.random() * 256) +
        ',' +
        Math.floor(Math.random() * 256) +
        ')';
    context.fillRect(0, 0, 256, 256);

    return canvas;
}

//

function animate() {
    const geometry = new THREE.SphereGeometry(50, Math.random() * 64, Math.random() * 32);

    const texture = new THREE.CanvasTexture(createImage());

    const material = new THREE.MeshBasicMaterial({ map: texture, wireframe: true });

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    renderer.render(scene, camera);

    scene.remove(mesh);

    // clean up

    geometry.dispose();
    material.dispose();
    texture.dispose();
}
