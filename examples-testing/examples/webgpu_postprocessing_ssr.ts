import * as THREE from 'three/webgpu';
import {
    pass,
    mrt,
    output,
    normalView,
    metalness,
    roughness,
    blendColor,
    screenUV,
    color,
    sample,
    directionToColor,
    colorToDirection,
    vec2,
} from 'three/tsl';
import SSRNode, { ssr } from 'three/addons/tsl/display/SSRNode.js';
import { smaa } from 'three/addons/tsl/display/SMAANode.js';

import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Inspector } from 'three/addons/inspector/Inspector.js';

const params = {
    quality: 0.5,
    blurQuality: 2,
    maxDistance: 0.5,
    opacity: 1,
    thickness: 0.015,
    roughness: 1,
    enabled: true,
};

let camera: THREE.PerspectiveCamera,
    scene: THREE.Scene,
    model: THREE.Group,
    renderer: THREE.WebGPURenderer,
    postProcessing: THREE.PostProcessing,
    ssrPass: SSRNode;
let controls: OrbitControls;

init();

async function init() {
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 50);
    camera.position.set(3, 2, 3);

    scene = new THREE.Scene();
    scene.backgroundNode = screenUV.distance(0.5).remap(0, 0.5).mix(color(0x888877), color(0x776666));

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('jsm/libs/draco/');
    dracoLoader.setDecoderConfig({ type: 'js' });

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load('models/gltf/steampunk_camera.glb', function (gltf) {
        model = gltf.scene;

        model.traverse(function (object) {
            if ((object as THREE.Mesh<THREE.BufferGeometry, THREE.Material>).material) {
                if ((object as THREE.Mesh<THREE.BufferGeometry, THREE.Material>).material.name === 'Lense_Casing') {
                    (object as THREE.Mesh<THREE.BufferGeometry, THREE.Material>).material.transparent = true;
                }
                // Avoid overdrawing
                (object as THREE.Mesh<THREE.BufferGeometry, THREE.Material>).material.side = THREE.FrontSide;
            }
        });

        model.position.y = 0.1;
        scene.add(model);
    });

    //

    renderer = new THREE.WebGPURenderer();
    // renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.inspector = new Inspector();
    document.body.appendChild(renderer.domElement);

    await renderer.init();

    const environment = new RoomEnvironment();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    scene.environment = pmremGenerator.fromScene(environment).texture;
    scene.environmentIntensity = 1.25;
    pmremGenerator.dispose();

    //

    postProcessing = new THREE.PostProcessing(renderer);

    const scenePass = pass(scene, camera);
    scenePass.setMRT(
        mrt({
            output: output,
            normal: directionToColor(normalView),
            metalrough: vec2(metalness, roughness), // pack metalness and roughness into a single attachment
        }),
    );

    const scenePassColor = scenePass.getTextureNode('output').toInspector('Color');
    const scenePassNormal = scenePass.getTextureNode('normal').toInspector('Normal');
    const scenePassDepth = scenePass.getTextureNode('depth').toInspector('Depth', () => {
        return scenePass.getLinearDepthNode();
    });
    const scenePassMetalRough = scenePass.getTextureNode('metalrough').toInspector('Metalness-Roughness');

    // optional: optimize bandwidth by reducing the texture precision for normals and metal/roughness

    const normalTexture = scenePass.getTexture('normal');
    normalTexture.type = THREE.UnsignedByteType;

    const metalRoughTexture = scenePass.getTexture('metalrough');
    metalRoughTexture.type = THREE.UnsignedByteType;

    const sceneNormal = sample(uv => {
        return colorToDirection(scenePassNormal.sample(uv));
    });

    //

    ssrPass = ssr(
        scenePassColor,
        scenePassDepth,
        sceneNormal,
        scenePassMetalRough.r,
        scenePassMetalRough.g,
    ).toInspector('SSR');

    // blend SSR over beauty

    const outputNode = smaa(blendColor(scenePassColor, ssrPass));

    postProcessing.outputNode = outputNode;

    //

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.update();

    window.addEventListener('resize', onWindowResize);

    // GUI

    const gui = (renderer.inspector as Inspector).createParameters('Settings');
    const ssrFolder = gui.addFolder('SSR');
    ssrFolder.add(params, 'quality', 0, 1).onChange(updateParameters);
    ssrFolder.add(params, 'blurQuality', 1, 3, 1).onChange(updateParameters);
    ssrFolder.add(params, 'maxDistance', 0, 1).onChange(updateParameters);
    ssrFolder.add(params, 'opacity', 0, 1).onChange(updateParameters);
    ssrFolder.add(params, 'thickness', 0, 0.05).onChange(updateParameters);
    ssrFolder.add(params, 'enabled').onChange(() => {
        if (params.enabled === true) {
            postProcessing.outputNode = outputNode;
        } else {
            postProcessing.outputNode = scenePass;
        }

        postProcessing.needsUpdate = true;
    });
    const modelFolder = gui.addFolder('Model');
    modelFolder.add(params, 'roughness', 0, 1).onChange(value => {
        model.traverse(function (object) {
            if ((object as THREE.Mesh).material) {
                (object as THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>).material.roughness = value;
            }
        });
    });

    updateParameters();
}

function updateParameters() {
    ssrPass.quality.value = params.quality;
    ssrPass.blurQuality.value = params.blurQuality;
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
    controls.update();

    postProcessing.render();
}
