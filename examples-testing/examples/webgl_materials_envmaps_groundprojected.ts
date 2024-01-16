import * as THREE from 'three';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GroundProjectedSkybox } from 'three/addons/objects/GroundProjectedSkybox.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

const params = {
    height: 20,
    radius: 440,
};

let camera, scene, renderer, skybox;

init().then(render);

async function init() {
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(-20, 7, 20);
    camera.lookAt(0, 4, 0);

    scene = new THREE.Scene();

    const hdrLoader = new RGBELoader();
    const envMap = await hdrLoader.loadAsync('textures/equirectangular/blouberg_sunrise_2_1k.hdr');
    envMap.mapping = THREE.EquirectangularReflectionMapping;

    skybox = new GroundProjectedSkybox(envMap);
    skybox.scale.setScalar(100);
    scene.add(skybox);

    scene.environment = envMap;

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('jsm/libs/draco/gltf/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    const shadow = new THREE.TextureLoader().load('models/gltf/ferrari_ao.png');

    loader.load('models/gltf/ferrari.glb', function (gltf) {
        const bodyMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x000000,
            metalness: 1.0,
            roughness: 0.8,
            clearcoat: 1.0,
            clearcoatRoughness: 0.2,
        });

        const detailsMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 1.0,
            roughness: 0.5,
        });

        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.25,
            roughness: 0,
            transmission: 1.0,
        });

        const carModel = gltf.scene.children[0];
        carModel.scale.multiplyScalar(4);
        carModel.rotation.y = Math.PI;

        carModel.getObjectByName('body').material = bodyMaterial;

        carModel.getObjectByName('rim_fl').material = detailsMaterial;
        carModel.getObjectByName('rim_fr').material = detailsMaterial;
        carModel.getObjectByName('rim_rr').material = detailsMaterial;
        carModel.getObjectByName('rim_rl').material = detailsMaterial;
        carModel.getObjectByName('trim').material = detailsMaterial;

        carModel.getObjectByName('glass').material = glassMaterial;

        // shadow
        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(0.655 * 4, 1.3 * 4),
            new THREE.MeshBasicMaterial({
                map: shadow,
                blending: THREE.MultiplyBlending,
                toneMapped: false,
                transparent: true,
            }),
        );
        mesh.rotation.x = -Math.PI / 2;
        mesh.renderOrder = 2;
        carModel.add(mesh);

        scene.add(carModel);

        render();
    });

    //

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    //

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    controls.target.set(0, 2, 0);
    controls.maxPolarAngle = THREE.MathUtils.degToRad(90);
    controls.maxDistance = 80;
    controls.minDistance = 20;
    controls.enablePan = false;
    controls.update();

    const gui = new GUI();
    gui.add(params, 'height', 20, 50, 0.1).name('Skybox height').onChange(render);
    gui.add(params, 'radius', 200, 600, 0.1).name('Skybox radius').onChange(render);

    //

    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();
}

function render() {
    renderer.render(scene, camera);

    skybox.radius = params.radius;
    skybox.height = params.height;
}
