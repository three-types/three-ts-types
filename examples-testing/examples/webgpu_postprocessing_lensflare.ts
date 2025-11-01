import * as THREE from 'three/webgpu';
import { pass, mrt, output, emissive, uniform } from 'three/tsl';
import { bloom } from 'three/addons/tsl/display/BloomNode.js';
import { lensflare } from 'three/addons/tsl/display/LensflareNode.js';
import { gaussianBlur } from 'three/addons/tsl/display/GaussianBlurNode.js';

import { UltraHDRLoader } from 'three/addons/loaders/UltraHDRLoader.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { Inspector } from 'three/addons/inspector/Inspector.js';

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGPURenderer, controls: OrbitControls;
let postProcessing: THREE.PostProcessing;

init();

async function init() {
    //

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0.5, -0.5);

    scene = new THREE.Scene();

    const texture = await new UltraHDRLoader().loadAsync('textures/equirectangular/ice_planet_close.jpg');

    texture.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = texture;
    scene.environment = texture;

    scene.backgroundIntensity = 2;
    scene.environmentIntensity = 15;

    // model

    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync('models/gltf/space_ship_hallway.glb');

    const object = gltf.scene;

    const aabb = new THREE.Box3().setFromObject(object);
    const center = aabb.getCenter(new THREE.Vector3());

    object.position.x += object.position.x - center.x;
    object.position.y += object.position.y - center.y;
    object.position.z += object.position.z - center.z;

    scene.add(object);

    //

    renderer = new THREE.WebGPURenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(render);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.inspector = new Inspector();
    document.body.appendChild(renderer.domElement);

    //

    const scenePass = pass(scene, camera);
    scenePass.setMRT(
        mrt({
            output,
            emissive,
        }),
    );

    const outputPass = scenePass.getTextureNode().toInspector('Color');
    const emissivePass = scenePass.getTextureNode('emissive').toInspector('Emissive');

    const bloomPass = bloom(emissivePass, 1, 1).toInspector('Bloom');

    const threshold = uniform(0.5);
    const ghostAttenuationFactor = uniform(25);
    const ghostSpacing = uniform(0.25);

    const flarePass = lensflare(bloomPass, {
        threshold,
        ghostAttenuationFactor,
        ghostSpacing,
    });

    const blurPass = gaussianBlur(flarePass, 8); // optional (blurring produces better flare quality but also adds some overhead)

    postProcessing = new THREE.PostProcessing(renderer);
    postProcessing.outputNode = outputPass.add(bloomPass).add(blurPass);

    //

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.target.copy(camera.position);
    controls.target.z -= 0.01;
    controls.update();

    window.addEventListener('resize', onWindowResize);

    //

    const gui = (renderer.inspector as Inspector).createParameters('Settings');

    const bloomFolder = gui.addFolder('bloom');
    bloomFolder.add(bloomPass.strength, 'value', 0.0, 2.0).name('strength');
    bloomFolder.add(bloomPass.radius, 'value', 0.0, 1.0).name('radius');

    const lensflareFolder = gui.addFolder('lensflare');
    lensflareFolder.add(threshold, 'value', 0.0, 1.0).name('threshold');
    lensflareFolder.add(ghostAttenuationFactor, 'value', 10.0, 50.0).name('attenuation');
    lensflareFolder.add(ghostSpacing, 'value', 0.0, 0.3).name('spacing');

    const toneMappingFolder = gui.addFolder('tone mapping');
    toneMappingFolder.add(renderer, 'toneMappingExposure', 0.1, 2).name('exposure');
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function render() {
    controls.update();

    postProcessing.render();
}
