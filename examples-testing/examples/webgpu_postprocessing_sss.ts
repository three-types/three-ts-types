import * as THREE from 'three/webgpu';
import { pass, vec3, vec4, mrt, output, velocity } from 'three/tsl';
import { sss } from 'three/addons/tsl/display/SSSNode.js';
import { traa } from 'three/addons/tsl/display/TRAANode.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { Inspector } from 'three/addons/inspector/Inspector.js';

let camera, scene, renderer, postProcessing, controls;

init();

async function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(1, 2.5, -3.5);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
    scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);

    // lights

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 2);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(-3, 10, -10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 4;
    dirLight.shadow.camera.bottom = -4;
    dirLight.shadow.camera.left = -4;
    dirLight.shadow.camera.right = 4;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    dirLight.shadow.bias = -0.001;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    // scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

    // ground

    const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false }),
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);

    //

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('jsm/libs/draco/gltf/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load('models/gltf/nemetona.glb', function (gltf) {
        const model = gltf.scene;
        model.rotation.y = Math.PI;
        model.scale.setScalar(10);
        model.position.y = 0.45;

        scene.add(model);

        model.traverse(function (object) {
            if (object.isMesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.aoMap = null; // remove AO to better see the effect of shadows
            }
        });
    });

    //

    renderer = new THREE.WebGPURenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.inspector = new Inspector();
    document.body.appendChild(renderer.domElement);

    postProcessing = new THREE.PostProcessing(renderer);

    const scenePass = pass(scene, camera);
    scenePass.setMRT(
        mrt({
            output: output,
            velocity: velocity,
        }),
    );

    const scenePassColor = scenePass.getTextureNode('output');
    const scenePassVelocity = scenePass.getTextureNode('velocity');
    const scenePassDepth = scenePass.getTextureNode('depth');

    // sss

    const sssPass = sss(scenePassDepth, camera, dirLight);
    sssPass.shadowIntensity.value = 0.3;
    sssPass.maxDistance.value = 0.2;
    sssPass.useTemporalFiltering = true;

    // composite

    const compositePass = vec4(scenePassColor.rgb.mul(sssPass.r), scenePassColor.a);
    compositePass.name = 'Composite';

    // traa

    const traaPass = traa(compositePass, scenePassDepth, scenePassVelocity, camera);
    postProcessing.outputNode = traaPass;

    //

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 20;
    controls.target.set(0, 2, 0);
    controls.enableDamping = true;
    controls.update();

    //

    const params = {
        output: 0,
    };

    const types = { 'Scene with Shadow Maps + SSS': 0, 'Scene with Shadow Maps': 1, SSS: 2 };

    const gui = renderer.inspector.createParameters('SSS settings');
    gui.add(params, 'output', types).onChange(updatePostprocessing);
    gui.add(sssPass.shadowIntensity, 'value', 0, 1).name('shadow intensity');
    gui.add(sssPass.maxDistance, 'value', 0.01, 1).name('max ray distance');
    gui.add(sssPass.quality, 'value', 0, 1).name('quality');
    gui.add(sssPass.thickness, 'value', 0.01, 0.1).name('thickness');
    gui.add(sssPass, 'useTemporalFiltering').name('temporal filtering').onChange(updatePostprocessing);

    function updatePostprocessing() {
        if (params.output === 1) {
            postProcessing.outputNode = scenePassColor;
        } else if (params.output === 2) {
            postProcessing.outputNode = vec4(vec3(sssPass.r), 1);
        } else {
            postProcessing.outputNode = sssPass.useTemporalFiltering ? traaPass : compositePass;
        }

        postProcessing.needsUpdate = true;
    }

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
    controls.update();

    postProcessing.render();
}
