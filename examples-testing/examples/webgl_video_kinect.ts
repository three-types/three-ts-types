import * as THREE from 'three';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let scene, camera, renderer;
let geometry, mesh, material;
let mouse, center;

init();

function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const info = document.createElement('div');
    info.id = 'info';
    info.innerHTML = '<a href="https://threejs.org" target="_blank" rel="noopener">three.js</a> - kinect';
    document.body.appendChild(info);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 500);

    scene = new THREE.Scene();
    center = new THREE.Vector3();
    center.z = -1000;

    const video = document.getElementById('video');

    const texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.NearestFilter;

    const width = 640,
        height = 480;
    const nearClipping = 850,
        farClipping = 4000;

    geometry = new THREE.BufferGeometry();

    const vertices = new Float32Array(width * height * 3);

    for (let i = 0, j = 0, l = vertices.length; i < l; i += 3, j++) {
        vertices[i] = j % width;
        vertices[i + 1] = Math.floor(j / width);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    material = new THREE.ShaderMaterial({
        uniforms: {
            map: { value: texture },
            width: { value: width },
            height: { value: height },
            nearClipping: { value: nearClipping },
            farClipping: { value: farClipping },

            pointSize: { value: 2 },
            zOffset: { value: 1000 },
        },
        vertexShader: document.getElementById('vs').textContent,
        fragmentShader: document.getElementById('fs').textContent,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
        transparent: true,
    });

    mesh = new THREE.Points(geometry, material);
    scene.add(mesh);

    const gui = new GUI();
    gui.add(material.uniforms.nearClipping, 'value', 1, 10000, 1.0).name('nearClipping');
    gui.add(material.uniforms.farClipping, 'value', 1, 10000, 1.0).name('farClipping');
    gui.add(material.uniforms.pointSize, 'value', 1, 10, 1.0).name('pointSize');
    gui.add(material.uniforms.zOffset, 'value', 0, 4000, 1.0).name('zOffset');

    video.play();

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    mouse = new THREE.Vector3(0, 0, 1);

    document.addEventListener('mousemove', onDocumentMouseMove);

    //

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouse.x = (event.clientX - window.innerWidth / 2) * 8;
    mouse.y = (event.clientY - window.innerHeight / 2) * 8;
}

function animate() {
    camera.position.x += (mouse.x - camera.position.x) * 0.05;
    camera.position.y += (-mouse.y - camera.position.y) * 0.05;
    camera.lookAt(center);

    renderer.render(scene, camera);
}
