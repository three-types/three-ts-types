import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { InteractionManager } from 'three/addons/interaction/InteractionManager.js';

let camera, scene, renderer, mesh, interactions;

init();

function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });

    if (renderer.getContext().texElementImage2D === undefined) {
        info.innerHTML +=
            '<br>This browser does not support the <a href="https://github.com/WICG/html-in-canvas" target="_blank">HTML-in-Canvas API</a>.';
    }

    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 500;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xaaaaaa);
    scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.02).texture;

    // HTML element

    const element = document.createElement('div');
    element.id = 'draw_element';
    element.innerHTML = `
					Hello world!<br>I'm multi-line, <b>formatted</b>,
					rotated text with emoji (&#128512;), RTL text
					<span dir=rtl>من فارسی صحبت میکنم</span>,
					vertical text,
					<p style="writing-mode: vertical-rl;">
					这是垂直文本
					</p>
					an inline image (<img width="150" src="textures/758px-Canestra_di_frutta_(Caravaggio).jpg">), and
					<svg width="50" height="50">
					<circle cx="25" cy="25" r="20" fill="green" />
					<text x="25" y="30" font-size="15" text-anchor="middle" fill="#fff">
						SVG
					</text>
					</svg>!
					<br>
					<input type="text" placeholder="Type here...">
					<button>Click me</button>
				`;

    const geometry = new RoundedBoxGeometry(200, 200, 200, 10, 10);

    const material = new THREE.MeshStandardMaterial({ roughness: 0, metalness: 0.5 });
    material.map = new THREE.HTMLTexture(element);

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Interaction

    interactions = new InteractionManager();
    interactions.connect(renderer, camera);
    interactions.add(mesh);

    // Button click handler

    element.querySelector('button').addEventListener('click', function () {
        this.textContent = 'Clicked!';
    });

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(time) {
    mesh.rotation.x = Math.sin(time * 0.0005) * 0.5;
    mesh.rotation.y = Math.cos(time * 0.0008) * 0.5;

    interactions.update();

    renderer.render(scene, camera);
}
