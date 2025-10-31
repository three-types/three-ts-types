import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VOXLoader, VOXMesh } from 'three/addons/loaders/VOXLoader.js';

let camera: THREE.PerspectiveCamera, controls: OrbitControls, scene: THREE.Scene, renderer: THREE.WebGLRenderer;

init();

function init() {
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.set(0.175, 0.075, 0.175);

    scene = new THREE.Scene();
    scene.add(camera);

    // light

    const hemiLight = new THREE.HemisphereLight(0xcccccc, 0x444444, 3);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(1.5, 3, 2.5);
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight2.position.set(-1.5, -3, -2.5);
    scene.add(dirLight2);

    const loader = new VOXLoader();
    loader.load('models/vox/monu10.vox', function (chunks) {
        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];

            // displayPalette( chunk.palette );

            const mesh = new VOXMesh(chunk);
            mesh.scale.setScalar(0.0015);
            scene.add(mesh);
        }
    });

    // renderer

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    // controls

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 0.1;
    controls.maxDistance = 0.5;

    //

    window.addEventListener('resize', onWindowResize);
}

/*
			function displayPalette( palette ) {

				const canvas = document.createElement( 'canvas' );
				canvas.width = 8;
				canvas.height = 32;
				canvas.style.position = 'absolute';
				canvas.style.top = '0';
				canvas.style.width = '100px';
				canvas.style.imageRendering = 'pixelated';
				document.body.appendChild( canvas );

				const context = canvas.getContext( '2d' );

				for ( let c = 0; c < 256; c ++ ) {

					const x = c % 8;
					const y = Math.floor( c / 8 );

					const hex = palette[ c + 1 ];
					const r = hex >> 0 & 0xff;
					const g = hex >> 8 & 0xff;
					const b = hex >> 16 & 0xff;
					context.fillStyle = `rgba(${r},${g},${b},1)`;
					context.fillRect( x, 31 - y, 1, 1 );

				}

			}
			*/

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    controls.update();

    renderer.render(scene, camera);
}
