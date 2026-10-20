import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

let renderer, scene, camera, stats;

let sphere, uniforms;

let displacement, noise;

init();

function init() {
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 300;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);

    uniforms = {
        amplitude: { value: 1.0 },
        color: { value: new THREE.Color(0xff2200) },
        colorTexture: { value: new THREE.TextureLoader().load('textures/water.jpg') },
    };

    uniforms['colorTexture'].value.wrapS = uniforms['colorTexture'].value.wrapT = THREE.RepeatWrapping;

    const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent,
    });

    const radius = 50,
        segments = 128,
        rings = 64;

    const geometry = new THREE.SphereGeometry(radius, segments, rings);

    displacement = new Float32Array(geometry.attributes.position.count);
    noise = new Float32Array(geometry.attributes.position.count);

    for (let i = 0; i < displacement.length; i++) {
        noise[i] = Math.random() * 5;
    }

    geometry.setAttribute('displacement', new THREE.BufferAttribute(displacement, 1));

    sphere = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(sphere);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);

    const container = document.getElementById('container');
    container.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

    //

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    render();
    stats.update();
}

function render() {
    const time = Date.now() * 0.01;

    sphere.rotation.y = sphere.rotation.z = 0.01 * time;

    uniforms['amplitude'].value = 2.5 * Math.sin(sphere.rotation.y * 0.125);
    uniforms['color'].value.offsetHSL(0.0005, 0, 0);

    for (let i = 0; i < displacement.length; i++) {
        displacement[i] = Math.sin(0.1 * i + time);

        noise[i] += 0.5 * (0.5 - Math.random());
        noise[i] = THREE.MathUtils.clamp(noise[i], -5, 5);

        displacement[i] += noise[i];
    }

    sphere.geometry.attributes.displacement.needsUpdate = true;

    renderer.render(scene, camera);
}
