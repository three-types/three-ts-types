import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let dolly, camera, scene, renderer;
let geometry, material, mesh;
let stats, clock;

const canvas = document.querySelector('#canvas');

const config = {
    saveImage: function () {
        renderer.render(scene, camera);
        window.open(canvas.toDataURL());
    },
    resolution: '512',
};

init();

function init() {
    renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(parseInt(config.resolution), parseInt(config.resolution));
    renderer.setAnimationLoop(animate);

    window.addEventListener('resize', onWindowResize);

    // THREE.Scene
    scene = new THREE.Scene();

    dolly = new THREE.Group();
    scene.add(dolly);

    clock = new THREE.Clock();

    camera = new THREE.PerspectiveCamera(60, canvas.width / canvas.height, 1, 2000);
    camera.position.z = 4;
    dolly.add(camera);

    geometry = new THREE.PlaneGeometry(2.0, 2.0);
    material = new THREE.RawShaderMaterial({
        uniforms: {
            resolution: { value: new THREE.Vector2(canvas.width, canvas.height) },
            cameraWorldMatrix: { value: camera.matrixWorld },
            cameraProjectionMatrixInverse: { value: camera.projectionMatrixInverse.clone() },
        },
        vertexShader: document.getElementById('vertex_shader').textContent,
        fragmentShader: document.getElementById('fragment_shader').textContent,
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    scene.add(mesh);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableZoom = false;

    // GUI
    const gui = new GUI();
    gui.add(config, 'saveImage').name('Save Image');
    gui.add(config, 'resolution', ['256', '512', '800', 'full']).name('Resolution').onChange(onWindowResize);

    stats = new Stats();
    document.body.appendChild(stats.dom);
}

function onWindowResize() {
    if (config.resolution === 'full') {
        renderer.setSize(window.innerWidth, window.innerHeight);
    } else {
        renderer.setSize(parseInt(config.resolution), parseInt(config.resolution));
    }

    camera.aspect = canvas.width / canvas.height;
    camera.updateProjectionMatrix();

    material.uniforms.resolution.value.set(canvas.width, canvas.height);
    material.uniforms.cameraProjectionMatrixInverse.value.copy(camera.projectionMatrixInverse);
}

function animate() {
    stats.begin();

    const elapsedTime = clock.getElapsedTime();

    dolly.position.z = -elapsedTime;

    renderer.render(scene, camera);

    stats.end();
}
