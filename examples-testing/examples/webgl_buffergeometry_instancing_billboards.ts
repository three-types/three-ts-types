import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

let container: HTMLDivElement, stats: Stats;

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
let geometry: THREE.InstancedBufferGeometry, material: THREE.RawShaderMaterial, mesh: THREE.Mesh;

init();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = 1400;

    scene = new THREE.Scene();

    const circleGeometry = new THREE.CircleGeometry(1, 6);

    geometry = new THREE.InstancedBufferGeometry();
    geometry.index = circleGeometry.index;
    geometry.attributes = circleGeometry.attributes;

    const particleCount = 75000;

    const translateArray = new Float32Array(particleCount * 3);

    for (let i = 0, i3 = 0, l = particleCount; i < l; i++, i3 += 3) {
        translateArray[i3 + 0] = Math.random() * 2 - 1;
        translateArray[i3 + 1] = Math.random() * 2 - 1;
        translateArray[i3 + 2] = Math.random() * 2 - 1;
    }

    geometry.setAttribute('translate', new THREE.InstancedBufferAttribute(translateArray, 3));

    material = new THREE.RawShaderMaterial({
        uniforms: {
            map: { value: new THREE.TextureLoader().load('textures/sprites/circle.png') },
            time: { value: 0.0 },
        },
        vertexShader: document.getElementById('vshader')!.textContent!,
        fragmentShader: document.getElementById('fshader')!.textContent!,
        depthTest: true,
        depthWrite: true,
    });

    mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(500, 500, 500);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

    window.addEventListener('resize', onWindowResize);

    return true;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    const time = performance.now() * 0.0005;

    material.uniforms['time'].value = time;

    mesh.rotation.x = time * 0.2;
    mesh.rotation.y = time * 0.4;

    renderer.render(scene, camera);

    stats.update();
}
