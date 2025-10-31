import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer, stats: Stats;
let geometry: THREE.BufferGeometry, mesh: THREE.LineSegments;
const numLat = 100;
const numLng = 200;
let numLinesCulled = 0;

init();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 3.5;

    stats = new Stats();
    document.body.appendChild(stats.dom);

    window.addEventListener('resize', onWindowResize);

    addLines(1.0);

    const hideLinesButton = document.getElementById('hideLines')!;
    hideLinesButton.addEventListener('click', hideLines);

    const showAllLinesButton = document.getElementById('showAllLines')!;
    showAllLinesButton.addEventListener('click', showAllLines);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);
}

function addLines(radius: number) {
    geometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(numLat * numLng * 3 * 2);
    const lineColors = new Float32Array(numLat * numLng * 3 * 2);
    const visible = new Float32Array(numLat * numLng * 2);

    for (let i = 0; i < numLat; ++i) {
        for (let j = 0; j < numLng; ++j) {
            const lat = (Math.random() * Math.PI) / 50.0 + (i / numLat) * Math.PI;
            const lng = (Math.random() * Math.PI) / 50.0 + (j / numLng) * 2 * Math.PI;

            const index = i * numLng + j;

            linePositions[index * 6 + 0] = 0;
            linePositions[index * 6 + 1] = 0;
            linePositions[index * 6 + 2] = 0;
            linePositions[index * 6 + 3] = radius * Math.sin(lat) * Math.cos(lng);
            linePositions[index * 6 + 4] = radius * Math.cos(lat);
            linePositions[index * 6 + 5] = radius * Math.sin(lat) * Math.sin(lng);

            const color = new THREE.Color(0xffffff);

            color.setHSL(lat / Math.PI, 1.0, 0.2);
            lineColors[index * 6 + 0] = color.r;
            lineColors[index * 6 + 1] = color.g;
            lineColors[index * 6 + 2] = color.b;

            color.setHSL(lat / Math.PI, 1.0, 0.7);
            lineColors[index * 6 + 3] = color.r;
            lineColors[index * 6 + 4] = color.g;
            lineColors[index * 6 + 5] = color.b;

            // non-0 is visible
            visible[index * 2 + 0] = 1.0;
            visible[index * 2 + 1] = 1.0;
        }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    geometry.setAttribute('vertColor', new THREE.BufferAttribute(lineColors, 3));
    geometry.setAttribute('visible', new THREE.BufferAttribute(visible, 1));

    geometry.computeBoundingSphere();

    const shaderMaterial = new THREE.ShaderMaterial({
        vertexShader: document.getElementById('vertexshader')!.textContent!,
        fragmentShader: document.getElementById('fragmentshader')!.textContent!,
    });

    mesh = new THREE.LineSegments(geometry, shaderMaterial);
    scene.add(mesh);

    updateCount();
}

function updateCount() {
    const str =
        '1 draw call, ' +
        numLat * numLng +
        ' lines, ' +
        numLinesCulled +
        ' culled (<a target="_blank" href="http://callum.com">author</a>)';
    document.getElementById('title')!.innerHTML = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function hideLines() {
    for (let i = 0; i < geometry.attributes.visible.array.length; i += 2) {
        if (Math.random() > 0.75) {
            if (geometry.attributes.visible.array[i + 0]) {
                ++numLinesCulled;
            }

            geometry.attributes.visible.array[i + 0] = 0;
            geometry.attributes.visible.array[i + 1] = 0;
        }
    }

    geometry.attributes.visible.needsUpdate = true;

    updateCount();
}

function showAllLines() {
    numLinesCulled = 0;

    for (let i = 0; i < geometry.attributes.visible.array.length; i += 2) {
        geometry.attributes.visible.array[i + 0] = 1;
        geometry.attributes.visible.array[i + 1] = 1;
    }

    geometry.attributes.visible.needsUpdate = true;

    updateCount();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    const time = Date.now() * 0.001;

    mesh.rotation.x = time * 0.25;
    mesh.rotation.y = time * 0.5;

    renderer.render(scene, camera);

    stats.update();
}
