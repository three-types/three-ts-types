import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

let renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera, stats: Stats;

let particles: THREE.Points;

const PARTICLE_SIZE = 20;

let raycaster: THREE.Raycaster, intersects: THREE.Intersection<THREE.Object3D>[];
let pointer: THREE.Vector2, INTERSECTED: number | null;

init();

function init() {
    const container = document.getElementById('container')!;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 250;

    //

    let boxGeometry: THREE.BufferGeometry = new THREE.BoxGeometry(200, 200, 200, 16, 16, 16);

    // if normal and uv attributes are not removed, mergeVertices() can't consolidate identical vertices with different normal/uv data

    boxGeometry.deleteAttribute('normal');
    boxGeometry.deleteAttribute('uv');

    boxGeometry = BufferGeometryUtils.mergeVertices(boxGeometry);

    //

    const positionAttribute = boxGeometry.getAttribute('position');

    const colors: number[] = [];
    const sizes: number[] = [];

    const color = new THREE.Color();

    for (let i = 0, l = positionAttribute.count; i < l; i++) {
        color.setHSL(0.01 + 0.1 * (i / l), 1.0, 0.5);
        color.toArray(colors, i * 3);

        sizes[i] = PARTICLE_SIZE * 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', positionAttribute);
    geometry.setAttribute('customColor', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    //

    const material = new THREE.ShaderMaterial({
        uniforms: {
            color: { value: new THREE.Color(0xffffff) },
            pointTexture: { value: new THREE.TextureLoader().load('textures/sprites/disc.png') },
            alphaTest: { value: 0.9 },
        },
        vertexShader: document.getElementById('vertexshader')!.textContent!,
        fragmentShader: document.getElementById('fragmentshader')!.textContent!,
    });

    //

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    //

    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();

    //

    stats = new Stats();
    container.appendChild(stats.dom);

    //

    window.addEventListener('resize', onWindowResize);
    document.addEventListener('pointermove', onPointerMove);
}

function onPointerMove(event: PointerEvent) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
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
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.001;

    const geometry = particles.geometry;
    const attributes = geometry.attributes;

    raycaster.setFromCamera(pointer, camera);

    intersects = raycaster.intersectObject(particles);

    if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].index) {
            attributes.size.array[INTERSECTED!] = PARTICLE_SIZE;

            INTERSECTED = intersects[0].index!;

            attributes.size.array[INTERSECTED] = PARTICLE_SIZE * 1.25;
            attributes.size.needsUpdate = true;
        }
    } else if (INTERSECTED !== null) {
        attributes.size.array[INTERSECTED] = PARTICLE_SIZE;
        attributes.size.needsUpdate = true;
        INTERSECTED = null;
    }

    renderer.render(scene, camera);
}
