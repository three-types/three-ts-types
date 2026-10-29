import * as THREE from 'three';

import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
let start: number,
    heroTime = 'loading',
    backgroundCount = 0;

const backgroundPriority = new URLSearchParams(location.search).get('background') === 'auto' ? 'auto' : 'low';

const models = [
    'BoomBox.glb',
    'coffeeMug.glb',
    'Stork.glb',
    'Flamingo.glb',
    'Parrot.glb',
    'RobotExpressive/RobotExpressive.glb',
    'DiffuseRoughnessParameterSweep.glb',
    'godrays_demo.glb',
    'collision-world.glb',
    'ShadowmappableMesh.glb',
    'ShaderBall.glb',
    'DispersionTest.glb',
];

init();

function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(3, 2, 3);
    camera.zoom = 3.4;
    camera.updateProjectionMatrix();

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 3));

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(2, 4, 3);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);

    window.addEventListener('resize', onWindowResize);

    start = performance.now();

    const background = new GLTFLoader().setPriority(backgroundPriority).setCache('reload');

    for (const model of models) {
        background.load('models/gltf/' + model, onBackgroundLoad, undefined, onError);
    }

    const hero = new GLTFLoader().setCache('reload');
    hero.load('models/gltf/Horse.glb', onHeroLoad, undefined, onError);

    updateStatus();
    render();
}

function onBackgroundLoad(gltf: GLTF) {
    // Background models are downloaded and parsed, but only the critical model is displayed.

    const textures = new Set<THREE.Texture>();

    gltf.scene.traverse(object => {
        if (!(object as THREE.Mesh).isMesh) return;
        const mesh = object as THREE.Mesh;

        mesh.geometry.dispose();

        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

        for (const material of materials) {
            for (const value of Object.values(material)) {
                if (value && (value as THREE.Texture).isTexture) textures.add(value as THREE.Texture);
            }

            material.dispose();
        }
    });

    for (const texture of textures) texture.dispose();

    backgroundCount++;
    updateStatus();
}

function onHeroLoad(gltf: GLTF) {
    heroTime = (performance.now() - start).toFixed(0) + ' ms';

    const model = gltf.scene;

    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    model.scale.setScalar(2 / Math.max(size.x, size.y, size.z));

    box.setFromObject(model);
    model.position.sub(box.getCenter(new THREE.Vector3()));

    scene.add(model);

    updateStatus();
    render();
}

function updateStatus() {
    document.getElementById('status')!.textContent =
        `Main asset (auto): ${heroTime}; background assets (${backgroundPriority}): ${backgroundCount} / ${models.length}`;
}

function onError(error: unknown) {
    console.error(error);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();
}

function render() {
    renderer.render(scene, camera);
}
