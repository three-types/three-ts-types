import * as THREE from 'three/webgpu';

import { Inspector } from 'three/addons/inspector/Inspector.js';
import { ParametersGroup } from 'three/addons/inspector/tabs/Parameters.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';

type ToneMapping = 'None' | 'Linear' | 'Reinhard' | 'Cineon' | 'ACESFilmic' | 'AgX' | 'Neutral';

interface Params {
    exposure: number;
    toneMapping: ToneMapping;
    blurriness: number;
    intensity: number;
}

let renderer: THREE.WebGPURenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera, controls: OrbitControls;
let gui: ParametersGroup;

const params: Params = {
    exposure: 1.0,
    toneMapping: 'Neutral',
    blurriness: 0.3,
    intensity: 1.0,
};

const toneMappingOptions: { [K in ToneMapping]: THREE.ToneMapping } = {
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
    renderer.inspector = new Inspector();
    document.body.appendChild(renderer.domElement);

    renderer.toneMapping = toneMappingOptions[params.toneMapping];
    renderer.toneMappingExposure = params.exposure;

    scene = new THREE.Scene();
    scene.backgroundBlurriness = params.blurriness;

    const light = new THREE.DirectionalLight(0xfff3ee, 3); // simulate sun
    light.position.set(1, 0.05, 0.7);
    scene.add(light);

    // scene.add( new THREE.DirectionalLightHelper( light, 1, 0x000000 ) );

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.set(-0.02, 0.03, 0.05);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.minDistance = 0.03;
    controls.maxDistance = 0.2;
    controls.target.set(0, 0.03, 0);
    controls.update();

    const hdrLoader = new HDRLoader().setPath('textures/equirectangular/');

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('jsm/libs/draco/gltf/');

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);
    gltfLoader.setPath('models/gltf/');

    const [texture, gltf] = await Promise.all([
        hdrLoader.loadAsync('venice_sunset_1k.hdr'),
        gltfLoader.loadAsync('venice_mask.glb'),
    ]);

    // environment

    texture.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = texture;
    scene.environment = texture;

    // model

    scene.add(gltf.scene);

    window.addEventListener('resize', onWindowResize);

    //

    gui = (renderer.inspector as Inspector).createParameters('Settings');
    const toneMappingFolder = gui.addFolder('Tone Mapping');

    toneMappingFolder
        .add(params, 'toneMapping', Object.keys(toneMappingOptions) as ToneMapping[])

        .name('type')
        .onChange(function () {
            renderer.toneMapping = toneMappingOptions[params.toneMapping];
        });

    toneMappingFolder
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
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    controls.update();

    renderer.render(scene, camera);
}
