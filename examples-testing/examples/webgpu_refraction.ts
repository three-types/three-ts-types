import * as THREE from 'three';
import { viewportSafeUV, viewportSharedTexture, viewportUV, texture, uv } from 'three/tsl';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, scene, renderer;

let cameraControls;

let smallSphere;

init();

function init() {
    // scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 75, 160);

    //

    const geometry = new THREE.IcosahedronGeometry(5, 0);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0x7b7b7b, flatShading: true });
    smallSphere = new THREE.Mesh(geometry, material);
    scene.add(smallSphere);

    // textures

    const loader = new THREE.TextureLoader();

    const floorNormal = loader.load('textures/floors/FloorsCheckerboard_S_Normal.jpg');
    floorNormal.wrapS = THREE.RepeatWrapping;
    floorNormal.wrapT = THREE.RepeatWrapping;

    // refractor

    const verticalNormalScale = 0.1;
    const verticalUVOffset = texture(floorNormal, uv().mul(5)).xy.mul(2).sub(1).mul(verticalNormalScale);

    const refractorUV = viewportUV.add(verticalUVOffset);
    const verticalRefractor = viewportSharedTexture(viewportSafeUV(refractorUV));

    const planeGeo = new THREE.PlaneGeometry(100.1, 100.1);

    const planeRefractor = new THREE.Mesh(
        planeGeo,
        new THREE.MeshBasicNodeMaterial({
            backdropNode: verticalRefractor,
        }),
    );
    planeRefractor.material.transparent = true;
    planeRefractor.position.y = 50;
    scene.add(planeRefractor);

    // walls

    const planeTop = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({ color: 0xffffff }));
    planeTop.position.y = 100;
    planeTop.rotateX(Math.PI / 2);
    scene.add(planeTop);

    const planeBottom = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({ color: 0xffffff }));
    planeBottom.rotateX(-Math.PI / 2);
    scene.add(planeBottom);

    const planeBack = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({ color: 0x7f7fff }));
    planeBack.position.z = -50;
    planeBack.position.y = 50;
    scene.add(planeBack);

    const planeRight = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({ color: 0x00ff00 }));
    planeRight.position.x = 50;
    planeRight.position.y = 50;
    planeRight.rotateY(-Math.PI / 2);
    scene.add(planeRight);

    const planeLeft = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({ color: 0xff0000 }));
    planeLeft.position.x = -50;
    planeLeft.position.y = 50;
    planeLeft.rotateY(Math.PI / 2);
    scene.add(planeLeft);

    // lights

    const mainLight = new THREE.PointLight(0xe7e7e7, 2.5, 250, 0);
    mainLight.position.y = 60;
    scene.add(mainLight);

    const greenLight = new THREE.PointLight(0x00ff00, 0.5, 1000, 0);
    greenLight.position.set(550, 50, 0);
    scene.add(greenLight);

    const redLight = new THREE.PointLight(0xff0000, 0.5, 1000, 0);
    redLight.position.set(-550, 50, 0);
    scene.add(redLight);

    const blueLight = new THREE.PointLight(0xbbbbfe, 0.5, 1000, 0);
    blueLight.position.set(0, 50, 550);
    scene.add(blueLight);

    // renderer

    renderer = new THREE.WebGPURenderer(/*{ antialias: true }*/);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    // controls

    cameraControls = new OrbitControls(camera, renderer.domElement);
    cameraControls.target.set(0, 40, 0);
    cameraControls.maxDistance = 400;
    cameraControls.minDistance = 10;
    cameraControls.update();

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    const timer = Date.now() * 0.01;

    smallSphere.position.set(
        Math.cos(timer * 0.1) * 30,
        Math.abs(Math.cos(timer * 0.2)) * 20 + 5,
        Math.sin(timer * 0.1) * 30,
    );
    smallSphere.rotation.y = Math.PI / 2 - timer * 0.1;
    smallSphere.rotation.z = timer * 0.8;

    renderer.render(scene, camera);
}
