import * as THREE from 'three/webgpu';

import { GUI, NumberController } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

let mesh: THREE.Object3D,
    renderer: THREE.WebGPURenderer,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    controls: OrbitControls;
let gui: GUI,
    guiExposure: NumberController<Params, 'exposure'> | null = null;

type ToneMapping = 'None' | 'Linear' | 'Reinhard' | 'Cineon' | 'ACESFilmic' | 'AgX' | 'Neutral';

interface Params {
    exposure: number;
    toneMapping: ToneMapping;
    blurriness: number;
    intensity: number;
}

const params: Params = {
    exposure: 1.0,
    toneMapping: 'AgX',
    blurriness: 0.3,
    intensity: 1.0,
};

const toneMappingOptions: { [Key in ToneMapping]: THREE.ToneMapping } = {
    None: THREE.NoToneMapping,
    Linear: THREE.LinearToneMapping,
    Reinhard: THREE.ReinhardToneMapping,
    Cineon: THREE.CineonToneMapping,
    ACESFilmic: THREE.ACESFilmicToneMapping,
    AgX: THREE.AgXToneMapping,
    Neutral: THREE.NeutralToneMapping,
};

init().catch(function (err) {
    console.error(err);
});

async function init() {
    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    renderer.toneMapping = toneMappingOptions[params.toneMapping];
    renderer.toneMappingExposure = params.exposure;

    scene = new THREE.Scene();
    scene.backgroundBlurriness = params.blurriness;

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
    camera.position.set(-1.8, 0.6, 2.7);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.target.set(0, 0, -0.2);
    controls.update();

    const rgbeLoader = new RGBELoader().setPath('textures/equirectangular/');

    const gltfLoader = new GLTFLoader().setPath('models/gltf/DamagedHelmet/glTF/');

    const [texture, gltf] = await Promise.all([
        rgbeLoader.loadAsync('venice_sunset_1k.hdr'),
        gltfLoader.loadAsync('DamagedHelmet.gltf'),
    ]);

    // environment

    texture.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = texture;
    scene.environment = texture;

    // model

    mesh = gltf.scene.getObjectByName('node_damagedHelmet_-6514')!;
    scene.add(mesh);

    window.addEventListener('resize', onWindowResize);

    gui = new GUI();
    const toneMappingFolder = gui.addFolder('Tone Mapping');

    toneMappingFolder
        .add(params, 'toneMapping', Object.keys(toneMappingOptions) as ToneMapping[])

        .name('type')
        .onChange(function () {
            updateGUI(toneMappingFolder);

            renderer.toneMapping = toneMappingOptions[params.toneMapping];
        });

    guiExposure = toneMappingFolder
        .add(params, 'exposure', 0, 2)

        .onChange(function (value) {
            renderer.toneMappingExposure = value;
        });

    const backgroundFolder = gui.addFolder('Background');

    backgroundFolder
        .add(params, 'blurriness', 0, 1)

        .onChange(function (value) {
            scene.backgroundBlurriness = value;
        });

    backgroundFolder
        .add(params, 'intensity', 0, 1)

        .onChange(function (value) {
            scene.backgroundIntensity = value;
        });

    updateGUI(toneMappingFolder);

    gui.open();
}

function updateGUI(folder: GUI) {
    if (params.toneMapping === 'None') {
        guiExposure!.hide();
    } else {
        guiExposure!.show();
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.render(scene, camera);
}
