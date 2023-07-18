import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, scene, renderer, controls, stats;
let target;
let postScene, postCamera, postMaterial;
let supportsExtension = true;

const params = {
    format: THREE.DepthFormat,
    type: THREE.UnsignedShortType,
};

const formats = { DepthFormat: THREE.DepthFormat, DepthStencilFormat: THREE.DepthStencilFormat };
const types = {
    UnsignedShortType: THREE.UnsignedShortType,
    UnsignedIntType: THREE.UnsignedIntType,
    UnsignedInt248Type: THREE.UnsignedInt248Type,
};

init();
animate();

function init() {
    renderer = new THREE.WebGLRenderer();

    if (renderer.capabilities.isWebGL2 === false && renderer.extensions.has('WEBGL_depth_texture') === false) {
        supportsExtension = false;
        document.querySelector('#error').style.display = 'block';
        return;
    }

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.useLegacyLights = false;
    document.body.appendChild(renderer.domElement);

    //

    stats = new Stats();
    document.body.appendChild(stats.dom);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 50);
    camera.position.z = 4;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Create a render target with depth texture
    setupRenderTarget();

    // Our scene
    setupScene();

    // Setup post-processing step
    setupPost();

    onWindowResize();
    window.addEventListener('resize', onWindowResize);

    //
    const gui = new GUI({ width: 300 });

    gui.add(params, 'format', formats).onChange(setupRenderTarget);
    gui.add(params, 'type', types).onChange(setupRenderTarget);
    gui.open();
}

function setupRenderTarget() {
    if (target) target.dispose();

    const format = parseFloat(params.format);
    const type = parseFloat(params.type);

    target = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
    target.texture.minFilter = THREE.NearestFilter;
    target.texture.magFilter = THREE.NearestFilter;
    target.stencilBuffer = format === THREE.DepthStencilFormat ? true : false;
    target.depthTexture = new THREE.DepthTexture();
    target.depthTexture.format = format;
    target.depthTexture.type = type;
}

function setupPost() {
    // Setup post processing stage
    postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    postMaterial = new THREE.ShaderMaterial({
        vertexShader: document.querySelector('#post-vert').textContent.trim(),
        fragmentShader: document.querySelector('#post-frag').textContent.trim(),
        uniforms: {
            cameraNear: { value: camera.near },
            cameraFar: { value: camera.far },
            tDiffuse: { value: null },
            tDepth: { value: null },
        },
    });
    const postPlane = new THREE.PlaneGeometry(2, 2);
    const postQuad = new THREE.Mesh(postPlane, postMaterial);
    postScene = new THREE.Scene();
    postScene.add(postQuad);
}

function setupScene() {
    scene = new THREE.Scene();

    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 64);
    const material = new THREE.MeshBasicMaterial({ color: 'blue' });

    const count = 50;
    const scale = 5;

    for (let i = 0; i < count; i++) {
        const r = Math.random() * 2.0 * Math.PI;
        const z = Math.random() * 2.0 - 1.0;
        const zScale = Math.sqrt(1.0 - z * z) * scale;

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(Math.cos(r) * zScale, Math.sin(r) * zScale, z * scale);
        mesh.rotation.set(Math.random(), Math.random(), Math.random());
        scene.add(mesh);
    }
}

function onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();

    const dpr = renderer.getPixelRatio();
    target.setSize(window.innerWidth * dpr, window.innerHeight * dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    if (!supportsExtension) return;

    requestAnimationFrame(animate);

    // render scene into target
    renderer.setRenderTarget(target);
    renderer.render(scene, camera);

    // render post FX
    postMaterial.uniforms.tDiffuse.value = target.texture;
    postMaterial.uniforms.tDepth.value = target.depthTexture;

    renderer.setRenderTarget(null);
    renderer.render(postScene, postCamera);

    controls.update(); // required because damping is enabled

    stats.update();
}
