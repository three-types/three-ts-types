import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let camera, scene, renderer, controls;
let renderTarget;
let postScene, postCamera;

const parameters = {
    samples: 4,
    wireframe: false,
};

const gui = new GUI();
gui.add(parameters, 'samples', 0, 4).step(1);
gui.add(parameters, 'wireframe');
gui.onChange(render);

init();

function init() {
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create a multi render target with Float buffers

    renderTarget = new THREE.WebGLRenderTarget(
        window.innerWidth * window.devicePixelRatio,
        window.innerHeight * window.devicePixelRatio,
        {
            count: 2,
            minFilter: THREE.NearestFilter,
            magFilter: THREE.NearestFilter,
        },
    );

    // Name our G-Buffer attachments for debugging

    renderTarget.textures[0].name = 'diffuse';
    renderTarget.textures[1].name = 'normal';

    // Scene setup

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 50);
    camera.position.z = 4;

    const loader = new THREE.TextureLoader();

    const diffuse = loader.load('textures/hardwood2_diffuse.jpg', render);
    diffuse.wrapS = THREE.RepeatWrapping;
    diffuse.wrapT = THREE.RepeatWrapping;
    diffuse.colorSpace = THREE.SRGBColorSpace;

    scene.add(
        new THREE.Mesh(
            new THREE.TorusKnotGeometry(1, 0.3, 128, 32),
            new THREE.RawShaderMaterial({
                name: 'G-Buffer Shader',
                vertexShader: document.querySelector('#gbuffer-vert').textContent.trim(),
                fragmentShader: document.querySelector('#gbuffer-frag').textContent.trim(),
                uniforms: {
                    tDiffuse: { value: diffuse },
                    repeat: { value: new THREE.Vector2(5, 0.5) },
                },
                glslVersion: THREE.GLSL3,
            }),
        ),
    );

    // PostProcessing setup

    postScene = new THREE.Scene();
    postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    postScene.add(
        new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2),
            new THREE.RawShaderMaterial({
                name: 'Post-FX Shader',
                vertexShader: document.querySelector('#render-vert').textContent.trim(),
                fragmentShader: document.querySelector('#render-frag').textContent.trim(),
                uniforms: {
                    tDiffuse: { value: renderTarget.textures[0] },
                    tNormal: { value: renderTarget.textures[1] },
                },
                glslVersion: THREE.GLSL3,
            }),
        ),
    );

    // Controls

    controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    const dpr = renderer.getPixelRatio();
    renderTarget.setSize(window.innerWidth * dpr, window.innerHeight * dpr);

    render();
}

function render() {
    renderTarget.samples = parameters.samples;

    scene.traverse(function (child) {
        if (child.material !== undefined) {
            child.material.wireframe = parameters.wireframe;
        }
    });

    // render scene into target
    renderer.setRenderTarget(renderTarget);
    renderer.render(scene, camera);

    // render post FX
    renderer.setRenderTarget(null);
    renderer.render(postScene, postCamera);
}
