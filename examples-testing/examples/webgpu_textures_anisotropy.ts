import * as THREE from 'three/webgpu';

import Stats from 'three/addons/libs/stats.module.js';

let container: HTMLDivElement, stats: Stats;

let camera: THREE.PerspectiveCamera, scene1: THREE.Scene, scene2: THREE.Scene, renderer: THREE.WebGPURenderer;

let mouseX = 0,
    mouseY = 0;

init();

function init() {
    const SCREEN_WIDTH = window.innerWidth;
    const SCREEN_HEIGHT = window.innerHeight;

    container = document.createElement('div');
    document.body.appendChild(container);

    renderer = new THREE.WebGPURenderer({ antialias: true, forceWebGL: false });

    // RENDERER

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.setAnimationLoop(animate);
    renderer.autoClear = false;

    renderer.domElement.style.position = 'relative';
    container.appendChild(renderer.domElement);

    //

    camera = new THREE.PerspectiveCamera(35, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 25000);
    camera.position.z = 1500;

    scene1 = new THREE.Scene();
    scene1.fog = new THREE.Fog(0xf2f7ff, 1, 25000);

    scene2 = new THREE.Scene();
    scene2.fog = new THREE.Fog(0xf2f7ff, 1, 25000);

    scene1.add(new THREE.AmbientLight(0xeef0ff, 3));
    scene2.add(new THREE.AmbientLight(0xeef0ff, 3));

    const light1 = new THREE.DirectionalLight(0xffffff, 6);
    light1.position.set(1, 1, 1);
    scene1.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 6);
    light2.position.set(1, 1, 1);
    scene2.add(light2);

    // GROUND

    const textureLoader = new THREE.TextureLoader();

    const maxAnisotropy = renderer.getMaxAnisotropy();

    const texture1 = textureLoader.load('textures/crate.gif');
    const material1 = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture1 });

    texture1.colorSpace = THREE.SRGBColorSpace;
    texture1.anisotropy = renderer.getMaxAnisotropy();
    texture1.wrapS = texture1.wrapT = THREE.RepeatWrapping;
    texture1.repeat.set(512, 512);

    const texture2 = textureLoader.load('textures/crate.gif');
    const material2 = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture2 });

    texture2.colorSpace = THREE.SRGBColorSpace;
    texture2.anisotropy = 1;
    texture2.wrapS = texture2.wrapT = THREE.RepeatWrapping;
    texture2.repeat.set(512, 512);

    if (maxAnisotropy > 0) {
        document.getElementById('val_left')!.innerHTML = texture1.anisotropy.toString();
        document.getElementById('val_right')!.innerHTML = texture2.anisotropy.toString();
    } else {
        document.getElementById('val_left')!.innerHTML = 'not supported';
        document.getElementById('val_right')!.innerHTML = 'not supported';
    }

    //

    const geometry = new THREE.PlaneGeometry(100, 100);

    const mesh1 = new THREE.Mesh(geometry, material1);
    mesh1.rotation.x = -Math.PI / 2;
    mesh1.scale.set(1000, 1000, 1000);

    const mesh2 = new THREE.Mesh(geometry, material2);
    mesh2.rotation.x = -Math.PI / 2;
    mesh2.scale.set(1000, 1000, 1000);

    scene1.add(mesh1);
    scene2.add(mesh2);

    // STATS1

    stats = new Stats();
    container.appendChild(stats.dom);

    document.addEventListener('mousemove', onDocumentMouseMove);

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event: MouseEvent) {
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

function animate() {
    render();
    stats.update();
}

function render() {
    const SCREEN_WIDTH = window.innerWidth;
    const SCREEN_HEIGHT = window.innerHeight;

    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y = THREE.MathUtils.clamp(
        camera.position.y + (-(mouseY - 200) - camera.position.y) * 0.05,
        50,
        1000,
    );

    camera.lookAt(scene1.position);
    renderer.clear();

    renderer.setScissorTest(true);

    renderer.setScissor(0, 0, SCREEN_WIDTH / 2 - 2, SCREEN_HEIGHT);
    renderer.render(scene1, camera);

    renderer.setScissorTest(true);

    renderer.setScissor(SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2 - 2, SCREEN_HEIGHT);
    renderer.render(scene2, camera);

    renderer.setScissorTest(false);
}
