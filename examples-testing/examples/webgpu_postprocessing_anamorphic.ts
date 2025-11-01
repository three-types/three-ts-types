import * as THREE from 'three/webgpu';
import { pass, cubeTexture, screenUV, grayscale, uniform } from 'three/tsl';
import { anamorphic } from 'three/addons/tsl/display/AnamorphicNode.js';

import { HDRCubeTextureLoader } from 'three/addons/loaders/HDRCubeTextureLoader.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { Inspector } from 'three/addons/inspector/Inspector.js';

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGPURenderer;
let postProcessing: THREE.PostProcessing;

const params = {
    resolutionScale: 0.2,
};

init();

async function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
    camera.position.set(-1.8, -0.6, 2.7);

    scene = new THREE.Scene();

    const hdrUrls = ['px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr'];
    const cube1Texture = await new HDRCubeTextureLoader().setPath('./textures/cube/pisaHDR/').loadAsync(hdrUrls);

    scene.environment = cube1Texture;
    scene.backgroundNode = grayscale(
        cubeTexture(cube1Texture).mul(screenUV.distance(0.5).oneMinus().remapClamp(0.1, 4)),
    );

    const loader = new GLTFLoader().setPath('models/gltf/DamagedHelmet/glTF/');
    loader.load('DamagedHelmet.gltf', function (gltf) {
        scene.add(gltf.scene);
    });

    renderer = new THREE.WebGPURenderer({ antialias: true });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.inspector = new Inspector();
    renderer.setAnimationLoop(render);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 10;

    // post-processing

    const scenePass = pass(scene, camera);

    const threshold = uniform(1.4);
    const scaleNode = uniform(5);
    const intensity = uniform(1);
    const samples = 64;

    const anamorphicPass = anamorphic(
        scenePass.getTextureNode().toInspector('Color'),
        threshold,
        scaleNode,
        samples,
    ).toInspector('Anamorphic');
    anamorphicPass.resolutionScale = params.resolutionScale; // 1 = full resolution

    postProcessing = new THREE.PostProcessing(renderer);
    postProcessing.outputNode = scenePass.add(anamorphicPass.mul(intensity));
    //postProcessing.outputNode = scenePass.add( anamorphicPass.getTextureNode().gaussianBlur() );

    // gui

    const gui = (renderer.inspector as Inspector).createParameters('Settings');
    gui.add(intensity, 'value', 0, 4, 0.1).name('intensity');
    gui.add(threshold, 'value', 0.8, 3, 0.001).name('threshold');
    gui.add(scaleNode, 'value', 1, 10, 0.1).name('scale');
    gui.add(params, 'resolutionScale', 0.1, 1, 0.1)
        .name('resolution scale')
        .onChange(value => (anamorphicPass.resolutionScale = value));

    //

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function render() {
    postProcessing.render();
}
