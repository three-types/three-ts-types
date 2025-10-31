import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

let renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera, stats: Stats;

let particleSystem: THREE.Points,
    uniforms: { pointTexture: THREE.IUniform<THREE.Texture> },
    geometry: THREE.BufferGeometry;

const particles = 100000;

init();

function init() {
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 300;

    scene = new THREE.Scene();

    uniforms = {
        pointTexture: { value: new THREE.TextureLoader().load('textures/sprites/spark1.png') },
    };

    const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexshader')!.textContent!,
        fragmentShader: document.getElementById('fragmentshader')!.textContent!,

        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
        vertexColors: true,
    });

    const radius = 200;

    geometry = new THREE.BufferGeometry();

    const positions = [];
    const colors = [];
    const sizes = [];

    const color = new THREE.Color();

    for (let i = 0; i < particles; i++) {
        positions.push((Math.random() * 2 - 1) * radius);
        positions.push((Math.random() * 2 - 1) * radius);
        positions.push((Math.random() * 2 - 1) * radius);

        color.setHSL(i / particles, 1.0, 0.5);

        colors.push(color.r, color.g, color.b);

        sizes.push(20);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1).setUsage(THREE.DynamicDrawUsage));

    particleSystem = new THREE.Points(geometry, shaderMaterial);

    scene.add(particleSystem);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);

    const container = document.getElementById('container')!;
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
    const time = Date.now() * 0.005;

    particleSystem.rotation.z = 0.01 * time;

    const sizes = geometry.attributes.size.array;

    for (let i = 0; i < particles; i++) {
        sizes[i] = 10 * (1 + Math.sin(0.1 * i + time));
    }

    geometry.attributes.size.needsUpdate = true;

    renderer.render(scene, camera);

    stats.update();
}
