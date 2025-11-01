import * as THREE from 'three/webgpu';
import { pass, mrt, output, normalView, velocity, vec3, vec4 } from 'three/tsl';
import { ao } from 'three/addons/tsl/display/GTAONode.js';
import { traa } from 'three/addons/tsl/display/TRAANode.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { Inspector } from 'three/addons/inspector/Inspector.js';

let camera, scene, renderer, postProcessing, controls;

let aoPass, traaPass, blendPassAO, scenePassColor;

const params = {
    samples: 16,
    distanceExponent: 1,
    distanceFallOff: 1,
    radius: 0.25,
    scale: 1,
    thickness: 1,
    aoOnly: false,
};

init();

async function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 50);
    camera.position.set(1, 1.3, 5);

    scene = new THREE.Scene();

    renderer = new THREE.WebGPURenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.inspector = new Inspector();
    document.body.appendChild(renderer.domElement);

    await renderer.init();

    const environment = new RoomEnvironment();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    scene.background = new THREE.Color(0x666666);
    scene.environment = pmremGenerator.fromScene(environment).texture;
    environment.dispose();
    pmremGenerator.dispose();

    //

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.5, -1);
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.minDistance = 2;
    controls.maxDistance = 8;

    //

    postProcessing = new THREE.PostProcessing(renderer);

    const scenePass = pass(scene, camera);
    scenePass.setMRT(
        mrt({
            output: output,
            normal: normalView,
            velocity: velocity,
        }),
    );

    scenePassColor = scenePass.getTextureNode('output').toInspector('Color');
    const scenePassDepth = scenePass.getTextureNode('depth').toInspector('Depth', () => {
        return scenePass.getLinearDepthNode();
    });
    const scenePassNormal = scenePass.getTextureNode('normal').toInspector('Normal');
    const scenePassVelocity = scenePass.getTextureNode('velocity').toInspector('Velocity');

    // ao

    aoPass = ao(scenePassDepth, scenePassNormal, camera).toInspector('AO');
    aoPass.resolutionScale = 0.5; // running AO in half resolution is often sufficient
    aoPass.useTemporalFiltering = true;
    blendPassAO = vec4(scenePassColor.rgb.mul(aoPass.r), scenePassColor.a); // the AO is stored only in the red channel

    // traa

    traaPass = traa(blendPassAO, scenePassDepth, scenePassVelocity, camera);
    postProcessing.outputNode = traaPass;

    //

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('jsm/libs/draco/');
    dracoLoader.setDecoderConfig({ type: 'js' });
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.setPath('models/gltf/');

    const gltf = await loader.loadAsync('minimalistic_modern_bedroom.glb');

    const model = gltf.scene;
    model.position.set(0, 1, 0);
    scene.add(model);

    model.traverse(o => {
        // Transparent objects (e.g. loaded via GLTFLoader) might have "depthWrite" set to "false".
        // This is wanted when rendering the beauty pass however it produces wrong results when computing
        // AO since depth and normal data are out of sync. Computing normals from depth by not using MRT
        // can mitigate the issue although the depth information (and thus the normals) are not correct in
        // first place. Besides, normal estimation is computationally more expensive than just sampling a
        // normal texture. So depending on your scene, consider to enable "depthWrite" for all transparent objects.

        if (o.material) o.material.depthWrite = true;
    });

    window.addEventListener('resize', onWindowResize);

    //

    const gui = renderer.inspector.createParameters('Settings');
    gui.add(params, 'samples', 4, 32, 1).onChange(updateParameters);
    gui.add(params, 'distanceExponent', 1, 2).onChange(updateParameters);
    gui.add(params, 'distanceFallOff', 0.01, 1).onChange(updateParameters);
    gui.add(params, 'radius', 0.1, 1).onChange(updateParameters);
    gui.add(params, 'scale', 0.01, 2).onChange(updateParameters);
    gui.add(params, 'thickness', 0.01, 2).onChange(updateParameters);
    gui.add(aoPass, 'useTemporalFiltering').name('temporal filtering');
    gui.add(params, 'aoOnly').onChange(value => {
        if (value === true) {
            postProcessing.outputNode = vec4(vec3(aoPass.r), 1);
        } else {
            postProcessing.outputNode = traaPass;
        }

        postProcessing.needsUpdate = true;
    });
}

function updateParameters() {
    aoPass.samples.value = params.samples;
    aoPass.distanceExponent.value = params.distanceExponent;
    aoPass.distanceFallOff.value = params.distanceFallOff;
    aoPass.radius.value = params.radius;
    aoPass.scale.value = params.scale;
    aoPass.thickness.value = params.thickness;
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}

function animate() {
    controls.update();

    postProcessing.render();
}
