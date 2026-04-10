import * as THREE from 'three/webgpu';
import { pass, uv, uniform } from 'three/tsl';
import WebGPU from 'three/addons/capabilities/WebGPU.js';
import { afterImage } from 'three/addons/tsl/display/AfterImageNode.js';
import { Inspector } from 'three/addons/inspector/Inspector.js';

import { ExtendedSRGBColorSpace, ExtendedSRGBColorSpaceImpl } from 'three/addons/math/ColorSpaces.js';

const params = {
    intensity: uniform(4.0, 'float').setName('intensity'),
    hardness: uniform(0.4, 'float').setName('hardness'),
    radius: uniform(0.5, 'float').setName('radius'),
    afterImageDecay: uniform(0.985, 'float').setName('afterImageDecay'),
};

const hdrMediaQuery = window.matchMedia('(dynamic-range: high)');

function updateHDRWarning() {
    const displayIsHDR = hdrMediaQuery.matches;
    document.querySelector('#no-hdr').style.display = displayIsHDR ? 'none' : '';
}

hdrMediaQuery.addEventListener('change', updateHDRWarning);
updateHDRWarning();

if (WebGPU.isAvailable() === false) {
    document.body.appendChild(WebGPU.getErrorMessage());
    throw new Error('No WebGPU support');
}

// Enable Extended sRGB output color space for HDR presentation
THREE.ColorManagement.define({ [ExtendedSRGBColorSpace]: ExtendedSRGBColorSpaceImpl });

// Renderer (HalfFloat output + Extended sRGB)
const renderer = new THREE.WebGPURenderer({
    antialias: true,
    outputType: THREE.HalfFloatType,
});

renderer.outputColorSpace = ExtendedSRGBColorSpace;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.inspector = new Inspector();
document.body.appendChild(renderer.domElement);

const camera = new THREE.OrthographicCamera(0, window.innerWidth, window.innerHeight, 0, 1, 2);
camera.position.z = 1;

// Brush scene (rendered into drawTarget)
const brushScene = new THREE.Scene();

brushScene.background = new THREE.Color(0xffffff);
const brushMat = new THREE.MeshBasicNodeMaterial();
brushMat.transparent = true;
brushMat.depthTest = false;
brushMat.depthWrite = false;
brushMat.blending = THREE.AdditiveBlending; // additive to build HDR energy

const renderPipeline = new THREE.RenderPipeline(renderer);
const brushPass = pass(brushScene, camera, { type: THREE.HalfFloatType });
brushPass.renderTarget.texture.colorSpace = ExtendedSRGBColorSpace;

renderPipeline.outputNode = afterImage(brushPass, params.afterImageDecay);

// HDR brush uniforms
const uColor = params.intensity;
const uHard = params.hardness;
const uRadius = params.radius;

// Radial falloff in TSL
const d = uv().sub(0.5).length();
const t = d.div(uRadius);
const a = t.clamp().oneMinus().pow(uHard.mul(8.0).add(1.0));

brushMat.colorNode = uColor.mul(a);
brushMat.opacityNode = a; // premultiplied style with additive blending

const brushMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), brushMat);
brushMesh.scale.set(300, 300, 1); // ~300px default brush size
brushScene.add(brushMesh);

function onPointerMove(e) {
    const rect = renderer.domElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // camera has origin at bottom-left (0,0)
    brushMesh.position.set(x, window.innerHeight - y, 0);
}

window.addEventListener('pointermove', onPointerMove, { passive: false });

// Prevent mobile scroll on touch
renderer.domElement.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
renderer.domElement.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
renderer.domElement.addEventListener('touchend', e => e.preventDefault(), { passive: false });

// GUI setup
const gui = renderer.inspector.createParameters('Settings');

const colorFolder = gui.addFolder('HDR');
colorFolder.add(params.intensity, 'value', 0, 10, 0.1).name('Intensity');

const brushFolder = gui.addFolder('Brush Settings');
brushFolder.add(params.hardness, 'value', 0, 0.99, 0.01).name('Hardness');
brushFolder.add(params.radius, 'value', 0.1, 2.0, 0.01).name('Radius');

const effectFolder = gui.addFolder('Effects');
effectFolder.add(params.afterImageDecay, 'value', 0.9, 0.999, 0.001).name('After Image Decay');

// Resize handling
function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.right = window.innerWidth;
    camera.top = window.innerHeight;
    camera.updateProjectionMatrix();
}

window.addEventListener('resize', onResize);

// Main loop
renderer.setAnimationLoop(async () => {
    renderPipeline.render();
});
