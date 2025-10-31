import * as THREE from 'three/webgpu';
import { color, mix, normalWorld, output, Fn, uniform, vec4, rotate, screenCoordinate, screenSize } from 'three/tsl';

import { Inspector } from 'three/addons/inspector/Inspector.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

interface HalftoneSettings {
    count: number;
    color: string;
    direction: THREE.Vector3;
    start: number;
    end: number;
    mixLow: number;
    mixHigh: number;
    radius: number;

    uniforms?: Uniforms;
}

interface Uniforms {
    count: THREE.UniformNode<number>;
    color: THREE.UniformNode<THREE.Color>;
    direction: THREE.UniformNode<THREE.Vector3>;
    start: THREE.UniformNode<number>;
    end: THREE.UniformNode<number>;
    mixLow: THREE.UniformNode<number>;
    mixHigh: THREE.UniformNode<number>;
    radius: THREE.UniformNode<number>;
}

let camera: THREE.PerspectiveCamera,
    scene: THREE.Scene,
    renderer: THREE.WebGPURenderer,
    controls: OrbitControls,
    clock: THREE.Clock,
    halftoneSettings: HalftoneSettings[];

init();

function init() {
    camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(6, 3, 10);

    scene = new THREE.Scene();

    clock = new THREE.Clock();

    // renderer

    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.setClearColor('#000000');
    document.body.appendChild(renderer.domElement);

    // inspector/gui

    renderer.inspector = new Inspector();

    const gui = (renderer.inspector as Inspector).createParameters('Parameters');

    // lights

    const ambientLight = new THREE.AmbientLight('#ffffff', 3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight('#ffffff', 8);
    directionalLight.position.set(4, 3, 1);
    scene.add(directionalLight);

    const lightsFolder = gui.addFolder('💡 lights');
    lightsFolder.add(ambientLight, 'intensity', 0, 10, 0.001).name('ambient intensity');
    lightsFolder.add(directionalLight, 'intensity', 0, 20, 0.001).name('directional intensity');

    // halftone settings

    halftoneSettings = [
        // purple shade

        {
            count: 140,
            color: '#fb00ff',
            direction: new THREE.Vector3(-0.4, -1, 0.5),
            start: 1,
            end: 0,
            mixLow: 0,
            mixHigh: 0.5,
            radius: 0.8,
        },

        // cyan highlight

        {
            count: 180,
            color: '#94ffd1',
            direction: new THREE.Vector3(0.5, 0.5, -0.2),
            start: 0.55,
            end: 0.2,
            mixLow: 0.5,
            mixHigh: 1,
            radius: 0.8,
        },
    ];

    for (const index in halftoneSettings) {
        const settings = halftoneSettings[index];

        // uniforms

        const uniforms = {} as Uniforms;

        uniforms.count = uniform(settings.count);
        uniforms.color = uniform(color(settings.color));
        uniforms.direction = uniform(settings.direction);
        uniforms.start = uniform(settings.start);
        uniforms.end = uniform(settings.end);
        uniforms.mixLow = uniform(settings.mixLow);
        uniforms.mixHigh = uniform(settings.mixHigh);
        uniforms.radius = uniform(settings.radius);

        settings.uniforms = uniforms;

        // debug

        const folder = gui.addFolder(`⚪️ halftone ${index}`);

        folder.addColor({ color: uniforms.color.value }, 'color');
        folder.add(uniforms.count, 'value', 1, 200, 1).name('count');
        folder.add(uniforms.direction.value, 'x', -1, 1, 0.01).listen();
        folder.add(uniforms.direction.value, 'y', -1, 1, 0.01).listen();
        folder.add(uniforms.direction.value, 'z', -1, 1, 0.01).listen();
        folder.add(uniforms.start, 'value', -1, 1, 0.01).name('start');
        folder.add(uniforms.end, 'value', -1, 1, 0.01).name('end');
        folder.add(uniforms.mixLow, 'value', 0, 1, 0.01).name('mix low');
        folder.add(uniforms.mixHigh, 'value', 0, 1, 0.01).name('mix high');
        folder.add(uniforms.radius, 'value', 0, 1, 0.01).name('radius');
    }

    // halftone functions

    const halftone = Fn<
        [THREE.Node, THREE.Node, THREE.Node, THREE.Node, THREE.Node, THREE.Node, THREE.Node, THREE.Node]
    >(([count, color, direction, start, end, radius, mixLow, mixHigh]) => {
        // grid pattern

        let gridUv = screenCoordinate.xy.div(screenSize.yy).mul(count);
        gridUv = rotate(gridUv, Math.PI * 0.25).mod(1);

        // orientation strength

        const orientationStrength = normalWorld.dot(direction.normalize()).remapClamp(end, start, 0, 1);

        // mask

        const mask = orientationStrength
            .mul(radius)
            .mul(0.5)
            .step(gridUv.sub(0.5).length())
            .mul(mix(mixLow, mixHigh, orientationStrength));

        return vec4(color, mask);
    });

    const halftones = Fn<[THREE.Node]>(([input]) => {
        const halftonesOutput = input;

        for (const settings of halftoneSettings) {
            const halfToneOutput = halftone(
                settings.uniforms!.count,
                settings.uniforms!.color,
                settings.uniforms!.direction,
                settings.uniforms!.start,
                settings.uniforms!.end,
                settings.uniforms!.radius,
                settings.uniforms!.mixLow,
                settings.uniforms!.mixHigh,
            );
            halftonesOutput.rgb.assign(mix(halftonesOutput.rgb, halfToneOutput.rgb, halfToneOutput.a));
        }

        return halftonesOutput;
    });

    // default material

    const defaultMaterial = new THREE.MeshStandardNodeMaterial({ color: '#ff622e' });
    defaultMaterial.outputNode = halftones(output);

    const folder = gui.addFolder('🎨 default material');
    folder.addColor({ color: defaultMaterial.color }, 'color');

    // objects

    const torusKnot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.6, 0.25, 128, 32), defaultMaterial);
    torusKnot.position.x = 3;
    scene.add(torusKnot);

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), defaultMaterial);
    sphere.position.x = -3;
    scene.add(sphere);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./models/gltf/Michelle.glb', gltf => {
        const model = gltf.scene;
        model.position.y = -2;
        model.scale.setScalar(2.5);
        model.traverse(child => {
            if ((child as THREE.Mesh).isMesh)
                (child as THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial>).material.outputNode =
                    halftones(output);
        });

        scene.add(model);
    });

    // controls

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 0.1;
    controls.maxDistance = 50;

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

async function animate() {
    controls.update();

    const time = clock.getElapsedTime();
    halftoneSettings[1].uniforms!.direction.value.x = Math.cos(time);
    halftoneSettings[1].uniforms!.direction.value.y = Math.sin(time);

    renderer.render(scene, camera);
}
