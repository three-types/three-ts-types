import * as THREE from 'three/webgpu';
import { pass, mrt, output, emissive } from 'three/tsl';
import { bloom } from 'three/addons/tsl/display/BloomNode.js';

import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { Inspector } from 'three/addons/inspector/Inspector.js';

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGPURenderer;
let postProcessing: THREE.PostProcessing;

init();

function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    //

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
    camera.position.set(-1.8, 0.6, 2.7);

    scene = new THREE.Scene();

    new HDRLoader().setPath('textures/equirectangular/').load('moonless_golf_1k.hdr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;

        scene.background = texture;
        scene.environment = texture;

        // model

        const loader = new GLTFLoader().setPath('models/gltf/DamagedHelmet/glTF/');
        loader.load('DamagedHelmet.gltf', function (gltf) {
            scene.add(gltf.scene);
        });
    });

    //

    renderer = new THREE.WebGPURenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(render);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.inspector = new Inspector();
    container.appendChild(renderer.domElement);

    //

    const scenePass = pass(scene, camera);
    scenePass.setMRT(
        mrt({
            output,
            emissive,
        }),
    );

    const outputPass = scenePass.getTextureNode().toInspector('Color');
    const emissivePass = scenePass.getTextureNode('emissive').toInspector('Emissive');

    const bloomPass = bloom(emissivePass, 2.5, 0.5);

    postProcessing = new THREE.PostProcessing(renderer);
    postProcessing.outputNode = outputPass.add(bloomPass);

    //

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.target.set(0, 0, -0.2);
    controls.update();

    window.addEventListener('resize', onWindowResize);

    //

    const gui = (renderer.inspector as Inspector).createParameters('Settings');

    const bloomFolder = gui.addFolder('Bloom');
    bloomFolder.add(bloomPass.strength, 'value', 0.0, 5.0).name('strength');
    bloomFolder.add(bloomPass.radius, 'value', 0.0, 1.0).name('radius');

    const toneMappingFolder = gui.addFolder('Tone Mapping');
    toneMappingFolder.add(renderer, 'toneMappingExposure', 0.1, 2).name('exposure');
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
