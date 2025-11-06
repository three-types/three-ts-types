import * as THREE from 'three/webgpu';
import { pass, color, rangeFogFactor } from 'three/tsl';

import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let camera, scene, renderer;
let postProcessing;

init();

function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
    camera.position.set(-1.8, 0.6, 2.7);

    scene = new THREE.Scene();

    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.toneMapping = THREE.NoToneMapping; // apply tone mapping in post processing, instead
    document.body.appendChild(renderer.domElement);

    // post processing

    // render scene pass
    const scenePass = pass(scene, camera);
    const scenePassViewZ = scenePass.getViewZNode();

    // fog color
    const fogColor = color(0x4080cc); // in sRGB color space

    // get fog factor from the scene pass context
    // equivalent to: scene.fog = new THREE.Fog( 0x4080cc, 2.7, 4 );
    const fogFactor = rangeFogFactor(2.7, 4).context({ getViewZ: () => scenePassViewZ });

    // tone-mapped scene pass
    const scenePassTM = scenePass.toneMapping(THREE.ACESFilmicToneMapping, 1);

    // mix fog using fog factor and fog color
    const compose = fogFactor.mix(scenePassTM, fogColor);

    postProcessing = new THREE.PostProcessing(renderer);
    postProcessing.outputColorTransform = true; // no tone mapping will be applied, only the default color space transform
    postProcessing.outputNode = compose;

    //

    new HDRLoader().setPath('textures/equirectangular/').load('royal_esplanade_1k.hdr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;

        // model

        const loader = new GLTFLoader().setPath('models/gltf/DamagedHelmet/glTF/');
        loader.load('DamagedHelmet.gltf', function (gltf) {
            scene.add(gltf.scene);
        });
    });

    //

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 5;
    controls.target.set(0, -0.1, -0.2);
    controls.update();

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
    postProcessing.render();
}
