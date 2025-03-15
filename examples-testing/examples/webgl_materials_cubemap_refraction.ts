import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';

let container: HTMLDivElement, stats: Stats;

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;

let mouseX = 0,
    mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

init();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100000);
    camera.position.z = -4000;

    //

    const r = 'textures/cube/Park3Med/';

    const urls = [r + 'px.jpg', r + 'nx.jpg', r + 'py.jpg', r + 'ny.jpg', r + 'pz.jpg', r + 'nz.jpg'];

    const textureCube = new THREE.CubeTextureLoader().load(urls);
    textureCube.mapping = THREE.CubeRefractionMapping;

    scene = new THREE.Scene();
    scene.background = textureCube;

    // LIGHTS

    const ambient = new THREE.AmbientLight(0xffffff, 3.5);
    scene.add(ambient);

    // material samples

    const cubeMaterial3 = new THREE.MeshPhongMaterial({
        color: 0xccddff,
        envMap: textureCube,
        refractionRatio: 0.98,
        reflectivity: 0.9,
    });
    const cubeMaterial2 = new THREE.MeshPhongMaterial({ color: 0xccfffd, envMap: textureCube, refractionRatio: 0.985 });
    const cubeMaterial1 = new THREE.MeshPhongMaterial({ color: 0xffffff, envMap: textureCube, refractionRatio: 0.98 });

    //

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

    const loader = new PLYLoader();
    loader.load('models/ply/binary/Lucy100k.ply', function (geometry) {
        createScene(geometry, cubeMaterial1, cubeMaterial2, cubeMaterial3);
    });

    document.addEventListener('mousemove', onDocumentMouseMove);

    //

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function createScene(
    geometry: THREE.BufferGeometry,
    m1: THREE.MeshPhongMaterial,
    m2: THREE.MeshPhongMaterial,
    m3: THREE.MeshPhongMaterial,
) {
    geometry.computeVertexNormals();

    const s = 1.5;

    let mesh = new THREE.Mesh(geometry, m1);
    mesh.scale.x = mesh.scale.y = mesh.scale.z = s;
    scene.add(mesh);

    mesh = new THREE.Mesh(geometry, m2);
    mesh.position.x = -1500;
    mesh.scale.x = mesh.scale.y = mesh.scale.z = s;
    scene.add(mesh);

    mesh = new THREE.Mesh(geometry, m3);
    mesh.position.x = 1500;
    mesh.scale.x = mesh.scale.y = mesh.scale.z = s;
    scene.add(mesh);
}

function onDocumentMouseMove(event: MouseEvent) {
    mouseX = (event.clientX - windowHalfX) * 4;
    mouseY = (event.clientY - windowHalfY) * 4;
}

//

function animate() {
    render();
    stats.update();
}

function render() {
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;

    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}
