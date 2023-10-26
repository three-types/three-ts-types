import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

let container, stats;

let cameraRTT, camera, sceneRTT, sceneScreen, scene, renderer, zmesh1, zmesh2;

let mouseX = 0,
    mouseY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

let rtTexture, material, quad;

let delta = 0.01;

init();
animate();

function init() {
    container = document.getElementById('container');

    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 100;

    cameraRTT = new THREE.OrthographicCamera(
        window.innerWidth / -2,
        window.innerWidth / 2,
        window.innerHeight / 2,
        window.innerHeight / -2,
        -10000,
        10000,
    );
    cameraRTT.position.z = 100;

    //

    scene = new THREE.Scene();
    sceneRTT = new THREE.Scene();
    sceneScreen = new THREE.Scene();

    let light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(0, 0, 1).normalize();
    sceneRTT.add(light);

    light = new THREE.DirectionalLight(0xffd5d5, 4.5);
    light.position.set(0, 0, -1).normalize();
    sceneRTT.add(light);

    rtTexture = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);

    material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0.0 } },
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragment_shader_pass_1').textContent,
    });

    const materialScreen = new THREE.ShaderMaterial({
        uniforms: { tDiffuse: { value: rtTexture.texture } },
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragment_shader_screen').textContent,

        depthWrite: false,
    });

    const plane = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);

    quad = new THREE.Mesh(plane, material);
    quad.position.z = -100;
    sceneRTT.add(quad);

    const torusGeometry = new THREE.TorusGeometry(100, 25, 15, 30);

    const mat1 = new THREE.MeshPhongMaterial({ color: 0x9c9c9c, specular: 0xffaa00, shininess: 5 });
    const mat2 = new THREE.MeshPhongMaterial({ color: 0x9c0000, specular: 0xff2200, shininess: 5 });

    zmesh1 = new THREE.Mesh(torusGeometry, mat1);
    zmesh1.position.set(0, 0, 100);
    zmesh1.scale.set(1.5, 1.5, 1.5);
    sceneRTT.add(zmesh1);

    zmesh2 = new THREE.Mesh(torusGeometry, mat2);
    zmesh2.position.set(0, 150, 100);
    zmesh2.scale.set(0.75, 0.75, 0.75);
    sceneRTT.add(zmesh2);

    quad = new THREE.Mesh(plane, materialScreen);
    quad.position.z = -100;
    sceneScreen.add(quad);

    const n = 5,
        geometry = new THREE.SphereGeometry(10, 64, 32),
        material2 = new THREE.MeshBasicMaterial({ color: 0xffffff, map: rtTexture.texture });

    for (let j = 0; j < n; j++) {
        for (let i = 0; i < n; i++) {
            const mesh = new THREE.Mesh(geometry, material2);

            mesh.position.x = (i - (n - 1) / 2) * 20;
            mesh.position.y = (j - (n - 1) / 2) * 20;
            mesh.position.z = 0;

            mesh.rotation.y = -Math.PI / 2;

            scene.add(mesh);
        }
    }

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;

    container.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

    document.addEventListener('mousemove', onDocumentMouseMove);
}

function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

//

function animate() {
    requestAnimationFrame(animate);

    render();
    stats.update();
}

function render() {
    const time = Date.now() * 0.0015;

    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;

    camera.lookAt(scene.position);

    if (zmesh1 && zmesh2) {
        zmesh1.rotation.y = -time;
        zmesh2.rotation.y = -time + Math.PI / 2;
    }

    if (material.uniforms['time'].value > 1 || material.uniforms['time'].value < 0) {
        delta *= -1;
    }

    material.uniforms['time'].value += delta;

    // Render first scene into texture

    renderer.setRenderTarget(rtTexture);
    renderer.clear();
    renderer.render(sceneRTT, cameraRTT);

    // Render full screen quad with generated texture

    renderer.setRenderTarget(null);
    renderer.clear();
    renderer.render(sceneScreen, cameraRTT);

    // Render second scene to screen
    // (using first scene as regular texture)

    renderer.render(scene, camera);
}
