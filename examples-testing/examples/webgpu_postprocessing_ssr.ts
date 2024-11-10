import * as THREE from 'three';
import { pass, mrt, output, transformedNormalView, metalness, vec4 /*, uniform*/ } from 'three/tsl';
import { ssr } from 'three/addons/tsl/display/SSRNode.js';

import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import Stats from 'three/addons/libs/stats.module.js';

const params = {
    maxDistance: 0.1,
    opacity: 1,
    thickness: 0.018,
    enabled: true,
    autoRotate: false,
};

let camera, scene, renderer, postProcessing, ssrPass;
let gui, stats, controls;

// Configure and create Draco decoder.
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('jsm/libs/draco/');
dracoLoader.setDecoderConfig({ type: 'js' });

init();

async function init() {
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 15);
    camera.position.set(0.1, 0.2, 0.5);

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x666666, 1, 4);

    // Ground
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(8, 8),
        new THREE.MeshStandardNodeMaterial({ color: 0xcbcbcb }),
    );

    // any node material can write custom MRT metalness values for controlling SSR

    // plane.material.mrtNode = mrt( {
    // 	output: output,
    // 	normal: transformedNormalView,
    // 	metalness: uniform( 0.5 )
    // } );

    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.0001;
    scene.add(plane);

    dracoLoader.load('models/draco/bunny.drc', function (geometry) {
        geometry.computeVertexNormals();

        const material = new THREE.MeshStandardNodeMaterial({ color: 0xa5a5a5, metalness: 1 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = -0.0365;
        scene.add(mesh);

        dracoLoader.dispose();
    });

    let geometry, material, mesh;

    geometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
    material = new THREE.MeshStandardNodeMaterial({ color: 'green', metalness: 0.3 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-0.12, 0.025, 0.015);
    scene.add(mesh);

    geometry = new THREE.IcosahedronGeometry(0.025, 4);
    material = new THREE.MeshStandardNodeMaterial({ color: 'cyan', metalness: 0.5 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-0.05, 0.025, 0.08);
    scene.add(mesh);

    geometry = new THREE.ConeGeometry(0.025, 0.05, 64);
    material = new THREE.MeshStandardNodeMaterial({ color: 'yellow', metalness: 0.4 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-0.05, 0.025, -0.055);
    scene.add(mesh);

    //

    renderer = new THREE.WebGPURenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    await renderer.init();

    const environment = new RoomEnvironment();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    scene.background = new THREE.Color(0x666666);
    scene.environment = pmremGenerator.fromScene(environment).texture;
    scene.environmentIntensity = 0.75;
    pmremGenerator.dispose();

    //

    postProcessing = new THREE.PostProcessing(renderer);

    const scenePass = pass(scene, camera, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter });
    scenePass.setMRT(
        mrt({
            output: output,
            normal: transformedNormalView,
            metalness: metalness,
        }),
    );

    const scenePassColor = scenePass.getTextureNode('output');
    const scenePassNormal = scenePass.getTextureNode('normal');
    const scenePassDepth = scenePass.getTextureNode('depth');
    const scenePassMetalness = scenePass.getTextureNode('metalness');

    ssrPass = ssr(scenePassColor, scenePassDepth, scenePassNormal, scenePassMetalness, camera);

    // blend SSR over beauty

    const outputNode = vec4(scenePass.rgb.mul(ssrPass.a.oneMinus()).add(ssrPass.rgb.mul(ssrPass.a)), scenePass.a);

    postProcessing.outputNode = outputNode;

    //

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 0.05, 0);
    controls.update();

    // stats

    stats = new Stats();
    document.body.appendChild(stats.dom);

    window.addEventListener('resize', onWindowResize);

    // GUI

    gui = new GUI();
    gui.add(params, 'maxDistance').min(0).max(1).onChange(updateParameters);
    gui.add(params, 'opacity').min(0).max(1).onChange(updateParameters);
    gui.add(params, 'thickness').min(0).max(0.1).onChange(updateParameters);
    gui.add(params, 'enabled').onChange(() => {
        if (params.enabled === true) {
            postProcessing.outputNode = outputNode;
        } else {
            postProcessing.outputNode = scenePass;
        }

        postProcessing.needsUpdate = true;
    });
    gui.add(params, 'autoRotate');

    updateParameters();
}

function updateParameters() {
    ssrPass.maxDistance.value = params.maxDistance;
    ssrPass.opacity.value = params.opacity;
    ssrPass.thickness.value = params.thickness;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    stats.begin();

    controls.autoRotate = params.autoRotate;

    controls.update();

    postProcessing.render();

    stats.end();
}
