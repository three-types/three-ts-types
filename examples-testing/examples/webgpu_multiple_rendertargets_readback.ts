import * as THREE from 'three/webgpu';
import { mix, step, texture, screenUV, mrt, output, normalWorld, uv, vec2 } from 'three/tsl';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { Inspector } from 'three/addons/inspector/Inspector.js';

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGPURenderer, torus: THREE.Mesh;
let quadMesh: THREE.QuadMesh,
    sceneMRT: THREE.MRTNode,
    renderTarget: THREE.RenderTarget,
    readbackTarget: THREE.RenderTarget,
    material: THREE.NodeMaterial,
    readbackMaterial: THREE.MeshBasicNodeMaterial,
    pixelBuffer: Uint8Array,
    pixelBufferTexture: THREE.DataTexture;

const options = {
    selection: 'mrt',
};

init();

function init() {
    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(render);
    document.body.appendChild(renderer.domElement);

    //

    renderer.inspector = new Inspector();

    //

    const gui = (renderer.inspector as Inspector).createParameters('Settings');
    gui.add(options, 'selection', ['mrt', 'diffuse', 'normal']);

    // Create a multi render target with Float buffers

    renderTarget = new THREE.RenderTarget(
        window.innerWidth * window.devicePixelRatio,
        window.innerHeight * window.devicePixelRatio,
        { count: 2, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter },
    );

    // Name our G-Buffer attachments for debugging

    renderTarget.textures[0].name = 'output';
    renderTarget.textures[1].name = 'normal';

    // Init readback render target, readback data texture, readback material
    // Be careful with the size! 512 is already big. Reading data back from the GPU is computationally intensive

    const size = 512;

    readbackTarget = new THREE.RenderTarget(size, size, { count: 2 });

    pixelBuffer = new Uint8Array(size ** 2 * 4).fill(0);
    pixelBufferTexture = new THREE.DataTexture(pixelBuffer, size, size);
    pixelBufferTexture.type = THREE.UnsignedByteType;
    pixelBufferTexture.format = THREE.RGBAFormat;

    readbackMaterial = new THREE.MeshBasicNodeMaterial();
    readbackMaterial.colorNode = texture(pixelBufferTexture);

    // MRT

    sceneMRT = mrt({
        output: output,
        normal: normalWorld,
    });

    // Scene

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 50);
    camera.position.z = 4;

    const loader = new THREE.TextureLoader();

    const diffuse = loader.load('textures/hardwood2_diffuse.jpg');
    diffuse.colorSpace = THREE.SRGBColorSpace;
    diffuse.wrapS = THREE.RepeatWrapping;
    diffuse.wrapT = THREE.RepeatWrapping;

    const torusMaterial = new THREE.NodeMaterial();
    torusMaterial.colorNode = texture(diffuse, uv().mul(vec2(10, 4)));

    torus = new THREE.Mesh(new THREE.TorusKnotGeometry(1, 0.3, 128, 32), torusMaterial);
    scene.add(torus);

    // Output

    material = new THREE.NodeMaterial();
    material.colorNode = mix(
        texture(renderTarget.textures[0]),
        texture(renderTarget.textures[1]),
        step(0.5, screenUV.x),
    );

    quadMesh = new THREE.QuadMesh(material);

    // Controls

    new OrbitControls(camera, renderer.domElement);

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    const dpr = renderer.getPixelRatio();
    renderTarget.setSize(window.innerWidth * dpr, window.innerHeight * dpr);
}

async function render(time: number) {
    const selection = options.selection;

    torus.rotation.y = (time / 1000) * 0.4;

    const isMRT = selection === 'mrt';

    // render scene into target
    renderer.setMRT(isMRT ? sceneMRT : null);
    renderer.setRenderTarget(isMRT ? renderTarget : readbackTarget);
    renderer.render(scene, camera);

    // render post FX
    renderer.setMRT(null);
    renderer.setRenderTarget(null);

    if (isMRT) {
        quadMesh.material = material;
    } else {
        quadMesh.material = readbackMaterial;

        await readback();
    }

    quadMesh.render(renderer);
}

async function readback() {
    const width = readbackTarget.width;
    const height = readbackTarget.height;

    const selection = options.selection;

    if (selection === 'diffuse') {
        pixelBuffer = (await renderer.readRenderTargetPixelsAsync(
            readbackTarget,
            0,
            0,
            width,
            height,
            0,
        )) as Uint8Array; // zero is optional

        pixelBufferTexture.image.data = pixelBuffer;
        pixelBufferTexture.needsUpdate = true;
    } else if (selection === 'normal') {
        pixelBuffer = (await renderer.readRenderTargetPixelsAsync(
            readbackTarget,
            0,
            0,
            width,
            height,
            1,
        )) as Uint8Array;

        pixelBufferTexture.image.data = pixelBuffer;
        pixelBufferTexture.needsUpdate = true;
    }
}
