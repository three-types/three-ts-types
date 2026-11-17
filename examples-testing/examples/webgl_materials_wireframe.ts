import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const API = {
    thickness: 1,
};

let renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    mesh2: THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>;

init();

function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.z = 200;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render); // use if there is no animation loop
    controls.enablePan = false;
    controls.enableZoom = false;

    new THREE.BufferGeometryLoader().load('models/json/WaltHeadLo_buffergeometry.json', function (geometry) {
        geometry.deleteAttribute('normal');
        geometry.deleteAttribute('uv');

        setupAttributes(geometry);

        // left

        const material1 = new THREE.MeshBasicMaterial({
            color: 0xe0e0ff,
            wireframe: true,
        });

        const mesh1 = new THREE.Mesh(geometry, material1);
        mesh1.position.set(-40, 0, 0);

        scene.add(mesh1);

        // right

        const material2 = new THREE.ShaderMaterial({
            uniforms: { thickness: { value: API.thickness } },
            vertexShader: document.getElementById('vertexShader')!.textContent!,
            fragmentShader: document.getElementById('fragmentShader')!.textContent!,
            side: THREE.DoubleSide,
            alphaToCoverage: true, // only works when WebGLRenderer's "antialias" is set to "true"
        });

        mesh2 = new THREE.Mesh(geometry, material2);
        mesh2.position.set(40, 0, 0);

        scene.add(mesh2);

        //

        render();
    });

    //

    const gui = new GUI();

    gui.add(API, 'thickness', 0, 4).onChange(function () {
        mesh2.material.uniforms.thickness.value = API.thickness;
        render();
    });

    gui.open();

    //

    window.addEventListener('resize', onWindowResize);
}

function setupAttributes(geometry: THREE.BufferGeometry) {
    const vectors = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)];

    const position = geometry.attributes.position;
    const centers = new Float32Array(position.count * 3);

    for (let i = 0, l = position.count; i < l; i++) {
        vectors[i % 3].toArray(centers, i * 3);
    }

    geometry.setAttribute('center', new THREE.BufferAttribute(centers, 3));
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
    renderer.render(scene, camera);
}
