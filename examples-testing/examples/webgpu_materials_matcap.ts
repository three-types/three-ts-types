import * as THREE from 'three/webgpu';

import { Inspector } from 'three/addons/inspector/Inspector.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';

let mesh, renderer, scene, camera;

const API = {
    color: 0xffffff, // sRGB
    exposure: 1.0,
};

init();

function init() {
    // renderer
    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.inspector = new Inspector();
    document.body.appendChild(renderer.domElement);

    // tone mapping
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = API.exposure;

    // scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
    camera.position.set(0, 0, 13);

    // controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;

    // matcap
    const loaderEXR = new EXRLoader();
    const matcap = loaderEXR.load('textures/matcaps/040full.exr');

    // normalmap
    const loader = new THREE.TextureLoader();

    const normalmap = loader.load('models/gltf/LeePerrySmith/Infinite-Level_02_Tangent_SmoothUV.jpg');

    // model
    new GLTFLoader().load('models/gltf/LeePerrySmith/LeePerrySmith.glb', function (gltf) {
        mesh = gltf.scene.children[0];
        mesh.position.y = -0.25;

        mesh.material = new THREE.MeshMatcapNodeMaterial({
            color: new THREE.Color().setHex(API.color),
            matcap: matcap,
            normalMap: normalmap,
        });

        scene.add(mesh);
    });

    // gui
    const gui = renderer.inspector.createParameters('Parameters');

    gui.addColor(API, 'color')
        .listen()
        .onChange(function () {
            mesh.material.color.set(API.color);
        });

    gui.add(API, 'exposure', 0, 2)
        .listen()
        .onChange(function () {
            renderer.toneMappingExposure = API.exposure;
        });

    // drag 'n drop
    initDragAndDrop();

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function animate() {
    renderer.render(scene, camera);
}

//
// drag and drop anywhere in document
//

function updateMatcap(texture) {
    if (mesh.material.matcap) {
        mesh.material.matcap.dispose();
    }

    mesh.material.matcap = texture;

    texture.needsUpdate = true;

    mesh.material.needsUpdate = true; // because the color space can change
}

function handleJPG(event) {
    // PNG, WebP, AVIF, too

    function imgCallback(event) {
        const texture = new THREE.Texture(event.target);

        texture.colorSpace = THREE.SRGBColorSpace;

        updateMatcap(texture);
    }

    const img = new Image();

    img.onload = imgCallback;

    img.src = event.target.result;
}

function handleEXR(event) {
    const contents = event.target.result;

    const loader = new EXRLoader();

    loader.setDataType(THREE.HalfFloatType);

    const texData = loader.parse(contents);

    const texture = new THREE.DataTexture();

    texture.image.width = texData.width;
    texture.image.height = texData.height;
    texture.image.data = texData.data;

    texture.format = texData.format;
    texture.type = texData.type;
    texture.colorSpace = THREE.LinearSRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.flipY = false;

    updateMatcap(texture);
}

function loadFile(file) {
    const filename = file.name;
    const extension = filename.split('.').pop().toLowerCase();

    if (extension === 'exr') {
        const reader = new FileReader();

        reader.addEventListener('load', function (event) {
            handleEXR(event);
        });

        reader.readAsArrayBuffer(file);
    } else {
        // 'jpg', 'png'

        const reader = new FileReader();

        reader.addEventListener('load', function (event) {
            handleJPG(event);
        });

        reader.readAsDataURL(file);
    }
}

function initDragAndDrop() {
    document.addEventListener('dragover', function (event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    });

    document.addEventListener('drop', function (event) {
        event.preventDefault();

        loadFile(event.dataTransfer.files[0]);
    });
}
