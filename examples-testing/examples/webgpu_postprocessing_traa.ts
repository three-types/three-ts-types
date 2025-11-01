import * as THREE from 'three/webgpu';
import { mrt, output, pass, velocity } from 'three/tsl';
import { traa } from 'three/addons/tsl/display/TRAANode.js';

import { Inspector } from 'three/addons/inspector/Inspector.js';

let camera: THREE.PerspectiveCamera,
    scene: THREE.Scene,
    renderer: THREE.WebGPURenderer,
    postProcessing: THREE.PostProcessing;
let index = 0;

init();

function init() {
    renderer = new THREE.WebGPURenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.inspector = new Inspector();
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10);
    camera.position.z = 2.5;

    scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry();
    const material1 = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });

    const mesh1 = new THREE.Mesh(geometry, material1);
    mesh1.position.x = -1;
    scene.add(mesh1);

    const texture = new THREE.TextureLoader().load('textures/brick_diffuse.jpg');
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.generateMipmaps = false;
    texture.colorSpace = THREE.SRGBColorSpace;

    const material2 = new THREE.MeshBasicMaterial({ map: texture });

    const mesh2 = new THREE.Mesh(geometry, material2);
    mesh2.position.x = 1;
    scene.add(mesh2);

    // postprocessing

    postProcessing = new THREE.PostProcessing(renderer);
    const scenePass = pass(scene, camera);
    scenePass.setMRT(
        mrt({
            output: output,
            velocity: velocity,
        }),
    );

    const scenePassColor = scenePass.getTextureNode('output').toInspector('Color');
    const scenePassDepth = scenePass.getTextureNode('depth').toInspector('Depth', () => {
        return scenePass.getLinearDepthNode();
    });
    const scenePassVelocity = scenePass.getTextureNode('velocity').toInspector('Velocity');

    const traaNode = traa(scenePassColor, scenePassDepth, scenePassVelocity, camera);

    postProcessing.outputNode = traaNode;

    //

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}

function animate() {
    index++;

    if (Math.round(index / 200) % 2 === 0) {
        for (let i = 0; i < scene.children.length; i++) {
            const child = scene.children[i];

            child.rotation.x += 0.005;
            child.rotation.y += 0.01;
        }
    }

    postProcessing.render();
}
