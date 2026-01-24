import * as THREE from 'three/webgpu';
import * as TSL from 'three/tsl';

import Transpiler from 'three/addons/transpiler/Transpiler.js';
import ShaderToyDecoder from 'three/addons/transpiler/ShaderToyDecoder.js';
import TSLEncoder from 'three/addons/transpiler/TSLEncoder.js';

class ShaderToyNode extends THREE.Node {
    constructor() {
        super('vec4');

        this.mainImage = null;
    }

    transpile(glsl, iife = false) {
        const decoder = new ShaderToyDecoder();

        const encoder = new TSLEncoder();
        encoder.iife = iife;

        const jsCode = new Transpiler(decoder, encoder).parse(glsl);

        return jsCode;
    }

    parse(glsl) {
        const jsCode = this.transpile(glsl, true);

        const { mainImage } = eval(jsCode)(TSL);

        this.mainImage = mainImage;
    }

    async parseAsync(glsl) {
        const jsCode = this.transpile(glsl);

        const { mainImage } = await import(`data:text/javascript,${encodeURIComponent(jsCode)}`);

        this.mainImage = mainImage;
    }

    setup(builder) {
        if (this.mainImage === null) {
            throw new Error('ShaderToyNode: .parse() must be called first.');
        }

        return this.mainImage();
    }
}

let renderer, camera, scene;
const dpr = window.devicePixelRatio;

init();

function init() {
    const example1Code = document.getElementById('example1').textContent;
    const example2Code = document.getElementById('example2').textContent;

    const shaderToy1Node = new ShaderToyNode();
    shaderToy1Node.parse(example1Code);

    const shaderToy2Node = new ShaderToyNode();
    shaderToy2Node.parse(example2Code);

    //

    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    scene = new THREE.Scene();

    const geometry = new THREE.PlaneGeometry(2, 2);

    const material = new THREE.MeshBasicNodeMaterial();
    material.colorNode = TSL.oscSine(TSL.time.mul(0.3)).mix(shaderToy1Node, shaderToy2Node);

    const quad = new THREE.Mesh(geometry, material);
    scene.add(quad);

    //

    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.render(scene, camera);
}
