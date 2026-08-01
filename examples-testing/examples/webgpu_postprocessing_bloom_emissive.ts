import * as THREE from 'three/webgpu';
import { pass, mrt, output, emissive, vec4, uniform } from 'three/tsl';
import { bloom } from 'three/addons/tsl/display/BloomNode.js';
import { dualKawaseBloom } from 'three/addons/tsl/display/DualKawaseBloomNode.js';

import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { Inspector } from 'three/addons/inspector/Inspector.js';

let camera, scene, renderer;
let renderPipeline;

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

    // set up MRT with emissive

    const mrtNode = mrt({
        output: output,
        emissive: vec4(emissive, output.a),
    });

    mrtNode.setBlendMode('emissive', new THREE.BlendMode(THREE.NormalBlending));

    scenePass.setMRT(mrtNode);

    // optimize the bandwidth

    const emissiveTexture = scenePass.getTexture('emissive');
    emissiveTexture.type = THREE.UnsignedByteType;

    //

    const outputPass = scenePass.getTextureNode().toInspector('Color');
    const emissivePass = scenePass.getTextureNode('emissive').toInspector('Emissive');

    const params = { type: 'Gaussian' };

    const strength = uniform(2.5);
    const radius = uniform(0.5);

    const bloomPasses = {
        Gaussian: bloom(emissivePass, strength, radius),
        'Dual Kawase': dualKawaseBloom(emissivePass, strength, radius),
    };

    renderPipeline = new THREE.RenderPipeline(renderer);

    function updateBloom() {
        renderPipeline.outputNode = outputPass.add(bloomPasses[params.type]);
        renderPipeline.needsUpdate = true;
    }

    updateBloom();

    //

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.target.set(0, 0, -0.2);
    controls.update();

    window.addEventListener('resize', onWindowResize);

    //

    const gui = renderer.inspector.createParameters('Settings');

    const bloomFolder = gui.addFolder('Bloom');
    bloomFolder.add(params, 'type', ['Gaussian', 'Dual Kawase']).onChange(updateBloom);
    bloomFolder.add(strength, 'value', 0.0, 5.0).name('strength');
    bloomFolder.add(radius, 'value', 0.0, 1.0).name('radius');

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
    renderPipeline.render();
}
