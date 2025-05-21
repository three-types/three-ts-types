import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let container, stats;

let camera, scene, renderer;

init();

function init() {
    container = document.getElementById('container');

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10);
    camera.position.z = 2;

    scene = new THREE.Scene();

    // geometry

    const vector = new THREE.Vector4();

    const instances = 50000;

    const positions = [];
    const offsets = [];
    const colors = [];
    const orientationsStart = [];
    const orientationsEnd = [];

    positions.push(0.025, -0.025, 0);
    positions.push(-0.025, 0.025, 0);
    positions.push(0, 0, 0.025);

    // instanced attributes

    for (let i = 0; i < instances; i++) {
        // offsets

        offsets.push(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);

        // colors

        colors.push(Math.random(), Math.random(), Math.random(), Math.random());

        // orientation start

        vector.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
        vector.normalize();

        orientationsStart.push(vector.x, vector.y, vector.z, vector.w);

        // orientation end

        vector.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
        vector.normalize();

        orientationsEnd.push(vector.x, vector.y, vector.z, vector.w);
    }

    const geometry = new THREE.InstancedBufferGeometry();
    geometry.instanceCount = instances; // set so its initialized for dat.GUI, will be set in first draw otherwise

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    geometry.setAttribute('offset', new THREE.InstancedBufferAttribute(new Float32Array(offsets), 3));
    geometry.setAttribute('color', new THREE.InstancedBufferAttribute(new Float32Array(colors), 4));
    geometry.setAttribute(
        'orientationStart',
        new THREE.InstancedBufferAttribute(new Float32Array(orientationsStart), 4),
    );
    geometry.setAttribute('orientationEnd', new THREE.InstancedBufferAttribute(new Float32Array(orientationsEnd), 4));

    // material

    const material = new THREE.RawShaderMaterial({
        uniforms: {
            time: { value: 1.0 },
            sineTime: { value: 1.0 },
        },
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
        side: THREE.DoubleSide,
        forceSinglePass: true,
        transparent: true,
    });

    //

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    //

    const gui = new GUI({ width: 350 });
    gui.add(geometry, 'instanceCount', 0, instances);

    //

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

//

function animate() {
    const time = performance.now();

    const object = scene.children[0];

    object.rotation.y = time * 0.0005;
    object.material.uniforms['time'].value = time * 0.005;
    object.material.uniforms['sineTime'].value = Math.sin(object.material.uniforms['time'].value * 0.05);

    renderer.render(scene, camera);

    stats.update();
}
