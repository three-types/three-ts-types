import * as THREE from 'three/webgpu';
import {
    color,
    storage,
    Fn,
    instancedBufferAttribute,
    instanceIndex,
    sin,
    time,
    float,
    uniform,
    shapeCircle,
    mix,
    vec3,
    ShaderNodeObject,
} from 'three/tsl';

import Stats from 'three/addons/libs/stats.module.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import * as GeometryUtils from 'three/addons/utils/GeometryUtils.js';

let renderer: THREE.WebGPURenderer,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    camera2: THREE.PerspectiveCamera,
    controls: OrbitControls,
    backgroundNode: ShaderNodeObject<THREE.Node>;
let material: THREE.PointsNodeMaterial;
let stats: Stats;
let gui: GUI;
let effectController: {
    pulseSpeed: ShaderNodeObject<THREE.UniformNode<number>>;
    minWidth: ShaderNodeObject<THREE.UniformNode<number>>;
    maxWidth: ShaderNodeObject<THREE.UniformNode<number>>;
    alphaToCoverage: boolean;
};

// viewport
let insetWidth: number;
let insetHeight: number;

// compute
let computeSize: ShaderNodeObject<THREE.ComputeNode>;

init();

async function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(-40, 0, 60);

    camera2 = new THREE.PerspectiveCamera(40, 1, 1, 1000);
    camera2.position.copy(camera.position);

    backgroundNode = color(0x222222);

    effectController = {
        pulseSpeed: uniform(6),
        minWidth: uniform(6),
        maxWidth: uniform(20),
        alphaToCoverage: true,
    };

    // Position and THREE.Color Data

    const points = GeometryUtils.hilbert3D(new THREE.Vector3(0, 0, 0), 20.0, 1, 0, 1, 2, 3, 4, 5, 6, 7);

    const spline = new THREE.CatmullRomCurve3(points);
    const divisions = Math.round(4 * points.length);
    const point = new THREE.Vector3();
    const pointColor = new THREE.Color();

    const positions = [];
    const colors = [];
    const sizes = new Float32Array(divisions);

    for (let i = 0, l = divisions; i < l; i++) {
        const t = i / l;

        spline.getPoint(t, point);
        positions.push(point.x, point.y, point.z);

        pointColor.setHSL(t, 1.0, 0.5, THREE.SRGBColorSpace);
        colors.push(pointColor.r, pointColor.g, pointColor.b);

        sizes[i] = 10.0;
    }

    // Instanced Points

    const positionAttribute = new THREE.InstancedBufferAttribute(new Float32Array(positions), 3);
    const colorsAttribute = new THREE.InstancedBufferAttribute(new Float32Array(colors), 3);

    const instanceSizeBufferAttribute = new THREE.StorageInstancedBufferAttribute(sizes, 1);
    const instanceSizeStorage = storage(instanceSizeBufferAttribute, 'float', instanceSizeBufferAttribute.count);

    computeSize = Fn(() => {
        const { pulseSpeed, minWidth, maxWidth } = effectController;

        const relativeTime = time.add(float(instanceIndex));

        const sizeFactor = sin(relativeTime.mul(pulseSpeed)).add(1).div(2);

        instanceSizeStorage.element(instanceIndex).assign(sizeFactor.mul(maxWidth.sub(minWidth)).add(minWidth));
    })().compute(divisions);

    // Material / Sprites

    const attributeRange = instancedBufferAttribute(instanceSizeBufferAttribute);
    const pointColors = mix(
        vec3(0.0),
        instancedBufferAttribute(colorsAttribute),
        attributeRange.div(float(effectController.maxWidth)),
    );

    material = new THREE.PointsNodeMaterial({
        colorNode: pointColors,
        opacityNode: shapeCircle(),
        positionNode: instancedBufferAttribute(positionAttribute),
        // rotationNode: time,
        sizeNode: instancedBufferAttribute(instanceSizeBufferAttribute),
        // size: 40, // in pixels units
        vertexColors: true,
        sizeAttenuation: false,
        alphaToCoverage: true,
    });

    const instancedPoints = new THREE.Sprite(material);
    instancedPoints.count = divisions;
    scene.add(instancedPoints);

    // Renderer / Controls

    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    //renderer.logarithmicDepthBuffer = true;
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 10;
    controls.maxDistance = 500;

    window.addEventListener('resize', onWindowResize);
    onWindowResize();

    // GUI

    stats = new Stats();
    document.body.appendChild(stats.dom);

    gui = new GUI();

    gui.add(effectController, 'alphaToCoverage').onChange(function (val) {
        material.alphaToCoverage = val;
    });

    gui.add(effectController.minWidth, 'value', 1, 30, 1).name('minWidth');
    gui.add(effectController.maxWidth, 'value', 2, 30, 1).name('maxWidth');
    gui.add(effectController.pulseSpeed, 'value', 1, 20, 0.1).name('pulseSpeed');
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    insetWidth = window.innerHeight / 4; // square
    insetHeight = window.innerHeight / 4;

    camera2.aspect = insetWidth / insetHeight;
    camera2.updateProjectionMatrix();
}

function animate() {
    stats.update();

    // compute

    renderer.compute(computeSize);

    // main scene

    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);

    controls.update();

    renderer.autoClear = true;

    scene.backgroundNode = null;

    renderer.render(scene, camera);

    // inset scene

    const posY = window.innerHeight - insetHeight - 20;

    renderer.clearDepth(); // important!

    renderer.setScissorTest(true);

    renderer.setScissor(20, posY, insetWidth, insetHeight);

    renderer.setViewport(20, posY, insetWidth, insetHeight);

    camera2.position.copy(camera.position);

    camera2.quaternion.copy(camera.quaternion);

    renderer.autoClear = false;

    scene.backgroundNode = backgroundNode;

    renderer.render(scene, camera2);

    renderer.setScissorTest(false);
}

//
