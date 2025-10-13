import * as THREE from 'three/webgpu';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Inspector } from 'three/addons/inspector/Inspector.js';

import {
    abs,
    add,
    instancedBufferAttribute,
    positionLocal,
    mod,
    time,
    sin,
    vec3,
    select,
    float,
    screenUV,
    color,
} from 'three/tsl';

let camera, scene, renderer, controls;

const count = 1000;

init();

async function init() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 100);
    camera.position.z = 15;

    scene = new THREE.Scene();
    scene.backgroundNode = screenUV.distance(0.5).remap(0, 0.65).mix(color(0x94254c), color(0x000000));

    // generate a path representing a heart shape

    const x = 0,
        y = 0;

    const path = new THREE.Path()
        .moveTo(x - 2.5, y - 2.5)
        .bezierCurveTo(x - 2.5, y - 2.5, x - 2, y, x, y)
        .bezierCurveTo(x + 3, y, x + 3, y - 3.5, x + 3, y - 3.5)
        .bezierCurveTo(x + 3, y - 5.5, x + 1, y - 7.7, x - 2.5, y - 9.5)
        .bezierCurveTo(x - 6, y - 7.7, x - 8, y - 5.5, x - 8, y - 3.5)
        .bezierCurveTo(x - 8, y - 3.5, x - 8, y, x - 5, y)
        .bezierCurveTo(x - 3.5, y, x - 2.5, y - 2.5, x - 2.5, y - 2.5);

    // generate instanced ico-spheres along the path

    const geometry = new THREE.IcosahedronGeometry(0.1);
    const material = new THREE.MeshStandardNodeMaterial();

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(2.5, 5, 0);
    mesh.count = count;
    mesh.frustumCulled = false;

    scene.add(mesh);

    // instance data

    const v = new THREE.Vector3();
    const c = new THREE.Color();

    const positions = [];
    const times = [];
    const seeds = [];
    const colors = [];

    for (let i = 0; i < count; i++) {
        const t = i / count;
        path.getPointAt(t, v);

        v.x += 0.5 - Math.random();
        v.y += 0.5 - Math.random();
        v.z = 0.5 - Math.random();

        positions.push(v.x, v.y, v.z);
        times.push(t);
        seeds.push(Math.random());

        c.setHSL(0.75 + Math.random() * 0.25, 1, 0.4);

        colors.push(c.r, c.g, c.b);
    }

    const positionAttribute = new THREE.InstancedBufferAttribute(new Float32Array(positions), 3);
    const colorAttribute = new THREE.InstancedBufferAttribute(new Float32Array(colors), 3);
    const timeAttribute = new THREE.InstancedBufferAttribute(new Float32Array(times), 1);
    const seedAttribute = new THREE.InstancedBufferAttribute(new Float32Array(seeds), 1);

    // TSL

    const instancePosition = instancedBufferAttribute(positionAttribute);
    const instanceColor = instancedBufferAttribute(colorAttribute);
    const instanceSeed = instancedBufferAttribute(seedAttribute);
    const instanceTime = instancedBufferAttribute(timeAttribute);

    const localTime = instanceTime.add(time);
    const modTime = mod(time.mul(0.4), 1);

    const s0 = sin(localTime.add(instanceSeed)).mul(0.25);

    const dist = abs(instanceTime.sub(modTime)).toConst(); // modTime and instanceTime are in the range [0,1]
    const wrapDist = select(dist.greaterThan(0.5), dist.oneMinus(), dist).toConst(); // the normalized distance should wrap around 0/1
    const s1 = select(wrapDist.greaterThan(0.1), float(1), wrapDist.remap(0, 0.1, 3, 1)); // compute a scale in a range around the current interpolated value

    const offset = vec3(instancePosition.x, instancePosition.y.add(s0), instancePosition.z).toConst('offset');
    material.positionNode = add(positionLocal.mul(s1), offset);
    material.colorNode = instanceColor;

    //

    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.inspector = new Inspector();
    document.body.appendChild(renderer.domElement);

    await renderer.init();

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    //

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    controls.update();

    renderer.render(scene, camera);
}
