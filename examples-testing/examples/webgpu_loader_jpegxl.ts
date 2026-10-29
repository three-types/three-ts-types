import * as THREE from 'three/webgpu';

import { Inspector } from 'three/addons/inspector/Inspector.js';
import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';
import { JXLLoader } from 'three/addons/loaders/JXLLoader.js';

const renderer = new THREE.WebGPURenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.inspector = new Inspector();
document.body.appendChild(renderer.domElement);
await renderer.init();

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x17191e);
const camera = new THREE.OrthographicCamera(-4, 4, 2, -2, 0.1, 10);
camera.position.z = 2;
const geometry = new THREE.PlaneGeometry(2.8, 1.4);
const labels: { label: HTMLDivElement; x: number; y: number }[] = [];

const gui = (renderer.inspector as Inspector).createParameters('JPEG XL');
gui.add(renderer, 'toneMapping', {
    Linear: THREE.LinearToneMapping,
    Reinhard: THREE.ReinhardToneMapping,
    Cineon: THREE.CineonToneMapping,
    ACES: THREE.ACESFilmicToneMapping,
    AgX: THREE.AgXToneMapping,
    Neutral: THREE.NeutralToneMapping,
}).name('Tone mapping');
gui.add(renderer, 'toneMappingExposure', 0, 2, 0.01).name('Exposure');

await Promise.all([
    addImage(new HDRLoader(), 'Radiance HDR (source)', 'textures/equirectangular/venice_sunset_1k.hdr', -1.55),
    addImage(new JXLLoader(), 'JPEG XL', 'textures/hdr-native/venice_sunset_512.jxl', 1.55),
]);
window.addEventListener('resize', onWindowResize);
onWindowResize();
renderer.setAnimationLoop(animate);

function animate() {
    renderer.render(scene, camera);
}

async function addImage(loader: THREE.Loader<THREE.DataTexture>, name: string, url: string, x: number) {
    const material = new THREE.MeshStandardNodeMaterial({ color: 0x000000, emissive: 0xffffff });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name + ' HDR';
    mesh.position.x = x;
    scene.add(mesh);

    addLabel(name, x, 0.85);

    try {
        material.emissiveMap = await loader.loadAsync(url);
    } catch (error) {
        material.emissive.set(0x252830);
        material.toneMapped = false;
        addLabel('Not supported: ' + (error as Error).message.replace(/^\w+Loader: /, ''), x, 0).style.fontSize =
            '12px';
        console.warn(name + ' HDR not supported:', error);
    }

    material.needsUpdate = true;
}

function addLabel(text: string, x: number, y: number) {
    const label = document.createElement('div');
    label.className = 'lbl';
    label.textContent = text;
    document.body.appendChild(label);
    labels.push({ label, x, y });
    return label;
}

function onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;
    const width = Math.max(7, aspect * 3.6);
    camera.left = -width / 2;
    camera.right = width / 2;
    camera.top = width / aspect / 2;
    camera.bottom = -camera.top;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    for (const { label, x, y } of labels) {
        const position = new THREE.Vector3(x, y, 0).project(camera);
        label.style.left = ((position.x + 1) / 2) * window.innerWidth + 'px';
        label.style.top = ((1 - position.y) / 2) * window.innerHeight + 'px';
    }
}
