import * as THREE from 'three';
import {
    tslFn,
    texture,
    uv,
    uint,
    positionWorld,
    modelWorldMatrix,
    cameraViewMatrix,
    timerLocal,
    timerDelta,
    cameraProjectionMatrix,
    vec2,
    instanceIndex,
    positionGeometry,
    storage,
    MeshBasicNodeMaterial,
    If,
} from 'three/nodes';

import WebGPU from 'three/addons/capabilities/WebGPU.js';
import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

const maxParticleCount = 50000;
const instanceCount = maxParticleCount / 2;

let camera, scene, renderer;
let controls, stats;
let computeParticles;
let monkey;
let clock;

let collisionBox, collisionCamera, collisionPosRT, collisionPosMaterial;

init();

function init() {
    if (WebGPU.isAvailable() === false) {
        document.body.appendChild(WebGPU.getErrorMessage());

        throw new Error('No WebGPU support');
    }

    const { innerWidth, innerHeight } = window;

    camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 110);
    camera.layers.enable(2); // @TODO: Fix .castShadow and remove it
    camera.position.set(40, 8, 0);
    camera.lookAt(0, 0, 0);

    scene = new THREE.Scene();

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.castShadow = true;
    dirLight.position.set(3, 12, 17);
    dirLight.castShadow = true;
    dirLight.shadow.camera.near = 5;
    dirLight.shadow.camera.far = 50;
    dirLight.shadow.camera.right = 10;
    dirLight.shadow.camera.left = -10;
    dirLight.shadow.camera.top = 10;
    dirLight.shadow.camera.bottom = -10;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.bias = -0.01;

    scene.add(dirLight);
    scene.add(new THREE.AmbientLight(0x111111));

    //

    collisionCamera = new THREE.OrthographicCamera(-50, 50, 50, -50, 0.1, 50);
    collisionCamera.position.y = 50;
    collisionCamera.lookAt(0, 0, 0);
    collisionCamera.layers.disableAll();
    collisionCamera.layers.enable(1);

    collisionPosRT = new THREE.RenderTarget(1024, 1024);
    collisionPosRT.texture.type = THREE.HalfFloatType;

    collisionPosMaterial = new MeshBasicNodeMaterial();
    collisionPosMaterial.colorNode = positionWorld;

    //

    const createBuffer = (type = 'vec3') =>
        storage(new THREE.InstancedBufferAttribute(new Float32Array(maxParticleCount * 4), 4), type, maxParticleCount);

    const positionBuffer = createBuffer();
    const velocityBuffer = createBuffer();
    const ripplePositionBuffer = createBuffer();
    const rippleTimeBuffer = createBuffer();

    // compute

    const timer = timerLocal();

    const randUint = () => uint(Math.random() * 0xffffff);

    const computeInit = tslFn(() => {
        const position = positionBuffer.element(instanceIndex);
        const velocity = velocityBuffer.element(instanceIndex);
        const rippleTime = rippleTimeBuffer.element(instanceIndex);

        const randX = instanceIndex.hash();
        const randY = instanceIndex.add(randUint()).hash();
        const randZ = instanceIndex.add(randUint()).hash();

        position.x = randX.mul(100).add(-50);
        position.y = randY.mul(25);
        position.z = randZ.mul(100).add(-50);

        velocity.y = randX.mul(-0.04).add(-0.2);

        rippleTime.x = 1000;
    })().compute(maxParticleCount);

    //

    const computeUpdate = tslFn(() => {
        const getCoord = pos => pos.add(50).div(100);

        const position = positionBuffer.element(instanceIndex);
        const velocity = velocityBuffer.element(instanceIndex);
        const ripplePosition = ripplePositionBuffer.element(instanceIndex);
        const rippleTime = rippleTimeBuffer.element(instanceIndex);

        position.addAssign(velocity);

        rippleTime.x = rippleTime.x.add(timerDelta().mul(4));

        //

        const collisionArea = texture(collisionPosRT.texture, getCoord(position.xz));

        const surfaceOffset = 0.05;

        const floorPosition = collisionArea.y.add(surfaceOffset);

        // floor

        const ripplePivotOffsetY = -0.9;

        If(position.y.add(ripplePivotOffsetY).lessThan(floorPosition), () => {
            position.y = 25;

            ripplePosition.x = position.x;
            ripplePosition.y = floorPosition;
            ripplePosition.z = position.z;

            // reset hit time: x = time

            rippleTime.x = 1;

            // next drops will not fall in the same place

            position.x = instanceIndex.add(timer).hash().mul(100).add(-50);
            position.z = instanceIndex.add(timer.add(randUint())).hash().mul(100).add(-50);
        });

        const rippleOnSurface = texture(collisionPosRT.texture, getCoord(ripplePosition.xz));

        const rippleFloorArea = rippleOnSurface.y.add(surfaceOffset);

        If(ripplePosition.y.greaterThan(rippleFloorArea), () => {
            rippleTime.x = 1000;
        });
    });

    computeParticles = computeUpdate().compute(maxParticleCount);

    // rain

    const billboarding = tslFn(() => {
        const particlePosition = positionBuffer.toAttribute();

        const worldMatrix = modelWorldMatrix.toVar();
        worldMatrix[3][0] = particlePosition.x;
        worldMatrix[3][1] = particlePosition.y;
        worldMatrix[3][2] = particlePosition.z;

        const modelViewMatrix = cameraViewMatrix.mul(worldMatrix);
        modelViewMatrix[0][0] = 1;
        modelViewMatrix[0][1] = 0;
        modelViewMatrix[0][2] = 0;

        //modelViewMatrix[ 0 ][ 0 ] = modelWorldMatrix[ 0 ].length();
        //modelViewMatrix[ 1 ][ 1 ] = modelWorldMatrix[ 1 ].length();

        modelViewMatrix[2][0] = 0;
        modelViewMatrix[2][1] = 0;
        modelViewMatrix[2][2] = 1;

        return cameraProjectionMatrix.mul(modelViewMatrix).mul(positionGeometry);
    });

    const rainMaterial = new MeshBasicNodeMaterial();
    rainMaterial.colorNode = uv().distance(vec2(0.5, 0)).oneMinus().mul(3).exp().mul(0.1);
    rainMaterial.vertexNode = billboarding();
    rainMaterial.opacity = 0.2;
    rainMaterial.side = THREE.DoubleSide;
    rainMaterial.forceSinglePass = true;
    rainMaterial.depthWrite = false;
    rainMaterial.depthTest = true;
    rainMaterial.transparent = true;

    const rainParticles = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 2), rainMaterial);
    rainParticles.isInstancedMesh = true;
    rainParticles.count = instanceCount;
    rainParticles.layers.disableAll();
    rainParticles.layers.enable(2);
    scene.add(rainParticles);

    // ripple

    const rippleTime = rippleTimeBuffer.element(instanceIndex).x;

    const rippleEffect = tslFn(() => {
        const center = uv().add(vec2(-0.5)).length().mul(7);
        const distance = rippleTime.sub(center);

        return distance.min(1).sub(distance.max(1).sub(1));
    });

    const rippleMaterial = new MeshBasicNodeMaterial();
    rippleMaterial.colorNode = rippleEffect();
    rippleMaterial.positionNode = positionGeometry.add(ripplePositionBuffer.toAttribute());
    rippleMaterial.opacityNode = rippleTime.mul(0.3).oneMinus().max(0).mul(0.5);
    rippleMaterial.side = THREE.DoubleSide;
    rippleMaterial.forceSinglePass = true;
    rippleMaterial.depthWrite = false;
    rippleMaterial.depthTest = true;
    rippleMaterial.transparent = true;

    // ripple geometry

    const surfaceRippleGeometry = new THREE.PlaneGeometry(2.5, 2.5);
    surfaceRippleGeometry.rotateX(-Math.PI / 2);

    const xRippleGeometry = new THREE.PlaneGeometry(1, 2);
    xRippleGeometry.rotateY(-Math.PI / 2);

    const zRippleGeometry = new THREE.PlaneGeometry(1, 2);

    const rippleGeometry = BufferGeometryUtils.mergeGeometries([
        surfaceRippleGeometry,
        xRippleGeometry,
        zRippleGeometry,
    ]);

    const rippleParticles = new THREE.Mesh(rippleGeometry, rippleMaterial);
    rippleParticles.isInstancedMesh = true;
    rippleParticles.count = instanceCount;
    rippleParticles.layers.disableAll();
    rippleParticles.layers.enable(2);
    scene.add(rippleParticles);

    // floor geometry

    const floorGeometry = new THREE.PlaneGeometry(1000, 1000);
    floorGeometry.rotateX(-Math.PI / 2);

    const plane = new THREE.Mesh(floorGeometry, new THREE.MeshBasicMaterial({ color: 0x050505 }));
    scene.add(plane);

    //

    collisionBox = new THREE.Mesh(new THREE.BoxGeometry(30, 1, 15), new THREE.MeshStandardMaterial());
    collisionBox.material.color.set(0x333333);
    collisionBox.position.y = 12;
    collisionBox.scale.x = 3.5;
    collisionBox.layers.enable(1);
    collisionBox.castShadow = true;
    scene.add(collisionBox);

    //

    const loader = new THREE.BufferGeometryLoader();
    loader.load('models/json/suzanne_buffergeometry.json', function (geometry) {
        geometry.computeVertexNormals();

        monkey = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ roughness: 1, metalness: 0 }));
        monkey.receiveShadow = true;
        monkey.scale.setScalar(5);
        monkey.rotation.y = Math.PI / 2;
        monkey.position.y = 4.5;
        monkey.layers.enable(1); // add to collision layer

        scene.add(monkey);
    });

    //

    clock = new THREE.Clock();

    //

    renderer = new WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);
    stats = new Stats();
    document.body.appendChild(stats.dom);

    //

    renderer.compute(computeInit);

    //

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 5;
    controls.maxDistance = 50;
    controls.update();

    //

    window.addEventListener('resize', onWindowResize);

    // gui

    const gui = new GUI();

    gui.add(collisionBox.position, 'z', -50, 50, 0.001).name('position');
    gui.add(collisionBox.scale, 'x', 0.1, 3.5, 0.01).name('scale');
    gui.add(rainParticles, 'count', 200, maxParticleCount, 1)
        .name('drop count')
        .onChange(v => (rippleParticles.count = v));
}

function onWindowResize() {
    const { innerWidth, innerHeight } = window;

    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(innerWidth, innerHeight);
}

function animate() {
    stats.update();

    if (monkey) {
        monkey.rotation.y += clock.getDelta();
    }

    // position

    scene.overrideMaterial = collisionPosMaterial;
    renderer.setRenderTarget(collisionPosRT);
    renderer.render(scene, collisionCamera);

    // compute

    renderer.compute(computeParticles);

    // result

    scene.overrideMaterial = null;
    renderer.setRenderTarget(null);
    renderer.render(scene, camera);
}
