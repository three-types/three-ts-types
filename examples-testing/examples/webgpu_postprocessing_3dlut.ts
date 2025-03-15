import * as THREE from 'three/webgpu';
import {
    mix,
    mul,
    oneMinus,
    positionLocal,
    smoothstep,
    texture,
    time,
    rotateUV,
    Fn,
    uv,
    vec2,
    vec3,
    vec4,
    pass,
    texture3D,
    uniform,
    renderOutput,
    ShaderNodeObject,
} from 'three/tsl';
import Lut3DNode, { lut3D } from 'three/addons/tsl/display/Lut3DNode.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { LUTCubeLoader, LUTCubeResult } from 'three/addons/loaders/LUTCubeLoader.js';
import { LUT3dlLoader, LUT3dlResult } from 'three/addons/loaders/LUT3dlLoader.js';
import { LUTImageLoader, LUTImageResult } from 'three/addons/loaders/LUTImageLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const params: { lut: keyof typeof lutMap; intensity: number } = {
    lut: 'Bourbon 64.CUBE',
    intensity: 1,
};

const lutMap: {
    'Bourbon 64.CUBE': LUTCubeResult | Promise<LUTCubeResult> | null;
    'Chemical 168.CUBE': LUTCubeResult | Promise<LUTCubeResult> | null;
    'Clayton 33.CUBE': LUTCubeResult | Promise<LUTCubeResult> | null;
    'Cubicle 99.CUBE': LUTCubeResult | Promise<LUTCubeResult> | null;
    'Remy 24.CUBE': LUTCubeResult | Promise<LUTCubeResult> | null;
    'Presetpro-Cinematic.3dl': LUT3dlResult | Promise<LUT3dlResult> | null;
    NeutralLUT: LUTImageResult | Promise<LUTImageResult> | null;
    'B&WLUT': LUTImageResult | Promise<LUTImageResult> | null;
    NightLUT: LUTImageResult | Promise<LUTImageResult> | null;
} = {
    'Bourbon 64.CUBE': null,
    'Chemical 168.CUBE': null,
    'Clayton 33.CUBE': null,
    'Cubicle 99.CUBE': null,
    'Remy 24.CUBE': null,
    'Presetpro-Cinematic.3dl': null,
    NeutralLUT: null,
    'B&WLUT': null,
    NightLUT: null,
};

let camera: THREE.PerspectiveCamera,
    scene: THREE.Scene,
    renderer: THREE.WebGPURenderer,
    postProcessing: THREE.PostProcessing,
    controls: OrbitControls,
    lutPass: ShaderNodeObject<Lut3DNode>;

init();

async function init() {
    camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(8, 10, 12);

    scene = new THREE.Scene();

    // Loaders

    const gltfLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    // LUTs

    const lutCubeLoader = new LUTCubeLoader();
    const lutImageLoader = new LUTImageLoader();
    const lut3dlLoader = new LUT3dlLoader();

    for (const name in lutMap) {
        if (/\.CUBE$/i.test(name)) {
            (lutMap as unknown as Record<string, Promise<LUTCubeResult>>)[name] = lutCubeLoader.loadAsync(
                'luts/' + name,
            );
        } else if (/\LUT$/i.test(name)) {
            (lutMap as Record<string, Promise<LUTImageResult>>)[name] = lutImageLoader.loadAsync(`luts/${name}.png`);
        } else {
            (lutMap as Record<string, Promise<LUT3dlResult>>)[name] = lut3dlLoader.loadAsync('luts/' + name);
        }
    }

    const pendings = Object.values(lutMap);
    await Promise.all(pendings);

    for (const name in lutMap) {
        (lutMap as Record<string, LUTCubeResult | LUT3dlResult | LUTImageResult>)[name] = await (
            lutMap as Record<string, Promise<LUTCubeResult | LUT3dlResult | LUTImageResult>>
        )[name];
    }

    // baked model

    gltfLoader.load('./models/gltf/coffeeMug.glb', gltf => {
        (
            gltf.scene.getObjectByName('baked') as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>
        ).material.map!.anisotropy = 8;
        scene.add(gltf.scene);
    });

    // geometry

    const smokeGeometry = new THREE.PlaneGeometry(1, 1, 16, 64);
    smokeGeometry.translate(0, 0.5, 0);
    smokeGeometry.scale(1.5, 6, 1.5);

    // texture

    const noiseTexture = textureLoader.load('./textures/noises/perlin/128x128.png');
    noiseTexture.wrapS = THREE.RepeatWrapping;
    noiseTexture.wrapT = THREE.RepeatWrapping;

    // material

    const smokeMaterial = new THREE.MeshBasicNodeMaterial({
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
    });

    // position

    smokeMaterial.positionNode = Fn(() => {
        // twist

        const twistNoiseUv = vec2(0.5, uv().y.mul(0.2).sub(time.mul(0.005)).mod(1));
        const twist = texture(noiseTexture, twistNoiseUv).r.mul(10);
        positionLocal.xz.assign(rotateUV(positionLocal.xz, twist, vec2(0)));

        // wind

        const windOffset = vec2(
            texture(noiseTexture, vec2(0.25, time.mul(0.01)).mod(1)).r.sub(0.5),
            texture(noiseTexture, vec2(0.75, time.mul(0.01)).mod(1)).r.sub(0.5),
        ).mul(uv().y.pow(2).mul(10));
        positionLocal.addAssign(windOffset);

        return positionLocal;
    })();

    // color

    smokeMaterial.colorNode = Fn(() => {
        // alpha

        const alphaNoiseUv = uv()
            .mul(vec2(0.5, 0.3))
            .add(vec2(0, time.mul(0.03).negate()));
        const alpha = mul(
            // pattern
            texture(noiseTexture, alphaNoiseUv).r.smoothstep(0.4, 1),

            // edges fade
            smoothstep(0, 0.1, uv().x),
            smoothstep(0, 0.1, oneMinus(uv().x)),
            smoothstep(0, 0.1, uv().y),
            smoothstep(0, 0.1, oneMinus(uv().y)),
        );

        // color

        const finalColor = mix(vec3(0.6, 0.3, 0.2), vec3(1, 1, 1), alpha.pow(3));

        return vec4(finalColor, alpha);
    })();

    // mesh

    const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial);
    smoke.position.y = 1.83;
    scene.add(smoke);

    // renderer

    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    // post processing

    postProcessing = new THREE.PostProcessing(renderer);

    // ignore default output color transform ( toneMapping and outputColorSpace )
    // use renderOutput() for control the sequence

    postProcessing.outputColorTransform = false;

    // scene pass

    const scenePass = pass(scene, camera);
    const outputPass = renderOutput(scenePass);

    const lut = lutMap[params.lut] as LUTCubeResult | LUT3dlResult | LUTImageResult;
    lutPass = lut3D(outputPass, texture3D(lut.texture3D), lut.texture3D.image.width, uniform(1));

    postProcessing.outputNode = lutPass;

    // controls

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 0.1;
    controls.maxDistance = 50;
    controls.target.y = 3;

    // gui

    const gui = new GUI();
    gui.add(params, 'lut', Object.keys(lutMap) as (keyof typeof lutMap)[]);
    gui.add(params, 'intensity').min(0).max(1);

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

async function animate() {
    controls.update();

    lutPass.intensityNode.value = params.intensity;

    if (lutMap[params.lut]) {
        const lut = lutMap[params.lut] as LUTCubeResult | LUT3dlResult | LUTImageResult;
        lutPass.lutNode.value = lut.texture3D;
        lutPass.size.value = lut.texture3D.image.width;
    }

    postProcessing.render();
}
