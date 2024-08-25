import * as THREE from 'three';
import {
    uniform,
    varyingProperty,
    vec4,
    max,
    sin,
    mat3,
    uint,
    negate,
    cameraProjectionMatrix,
    cameraViewMatrix,
    positionLocal,
    modelWorldMatrix,
    sqrt,
    attribute,
    property,
    float,
    storage,
    storageObject,
    Fn,
    If,
    cos,
    Loop,
    Continue,
    normalize,
    instanceIndex,
    length,
} from 'three/tsl';

import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let container, stats;
let camera, scene, renderer;
let mouseX = 0,
    mouseY = 0;

let windowHalfX = window.innerWidth / 2,
    windowHalfY = window.innerHeight / 2;

let last = performance.now();

let computeVelocity, computePosition, effectController;

const BIRDS = 1024;
const SPEED_LIMIT = 9.0;
const BOUNDS = 800,
    BOUNDS_HALF = BOUNDS / 2;
const UPPER_BOUNDS = BOUNDS;

// Custom Geometry - using 3 triangles each. No UVs, no normals currently.
class BirdGeometry extends THREE.BufferGeometry {
    constructor() {
        super();

        const trianglesPerBird = 3;
        const triangles = BIRDS * trianglesPerBird;
        const points = triangles * 3;

        const vertices = new THREE.BufferAttribute(new Float32Array(points * 3), 3);
        const birdColors = new THREE.BufferAttribute(new Float32Array(points * 3), 3);
        const references = new THREE.BufferAttribute(new Uint32Array(points), 1);
        const birdVertex = new THREE.BufferAttribute(new Uint32Array(points), 1);

        this.setAttribute('position', vertices);
        this.setAttribute('birdColor', birdColors);
        this.setAttribute('reference', references);
        this.setAttribute('birdVertex', birdVertex);

        let v = 0;

        function verts_push() {
            for (let i = 0; i < arguments.length; i++) {
                vertices.array[v++] = arguments[i];
            }
        }

        const wingsSpan = 20;

        for (let f = 0; f < BIRDS; f++) {
            // Body
            verts_push(0, -0, -20, 0, 4, -20, 0, 0, 30);

            // Wings
            verts_push(0, 0, -15, -wingsSpan, 0, 0, 0, 0, 15);

            verts_push(0, 0, 15, wingsSpan, 0, 0, 0, 0, -15);
        }

        for (let v = 0; v < triangles * 3; v++) {
            const triangleIndex = ~~(v / 3);
            const birdIndex = ~~(triangleIndex / trianglesPerBird);

            const c = new THREE.Color(0x666666 + (~~(v / 9) / BIRDS) * 0x666666);

            birdColors.array[v * 3 + 0] = c.r;
            birdColors.array[v * 3 + 1] = c.g;
            birdColors.array[v * 3 + 2] = c.b;

            references.array[v] = birdIndex;

            birdVertex.array[v] = v % 9;
        }

        this.scale(0.2, 0.2, 0.2);
    }
}

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 350;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.fog = new THREE.Fog(0xffffff, 100, 1000);

    renderer = new THREE.WebGPURenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    // Initialize position, velocity, and phase values

    const positionArray = new Float32Array(BIRDS * 3);
    const velocityArray = new Float32Array(BIRDS * 3);
    const phaseArray = new Float32Array(BIRDS);

    for (let i = 0; i < BIRDS; i++) {
        const posX = Math.random() * BOUNDS - BOUNDS_HALF;
        const posY = Math.random() * BOUNDS - BOUNDS_HALF;
        const posZ = Math.random() * BOUNDS - BOUNDS_HALF;

        positionArray[i * 3 + 0] = posX;
        positionArray[i * 3 + 1] = posY;
        positionArray[i * 3 + 2] = posZ;

        const velX = Math.random() - 0.5;
        const velY = Math.random() - 0.5;
        const velZ = Math.random() - 0.5;

        velocityArray[i * 3 + 0] = velX * 10;
        velocityArray[i * 3 + 1] = velY * 10;
        velocityArray[i * 3 + 2] = velZ * 10;

        phaseArray[i] = 1;
    }

    // Create storage buffer attributes.

    const positionBufferAttribute = new THREE.StorageBufferAttribute(positionArray, 3);
    const velocityBufferAttribute = new THREE.StorageBufferAttribute(velocityArray, 3);
    const phaseBufferAttribute = new THREE.StorageBufferAttribute(phaseArray, 1);

    // Labels applied to storage nodes and uniform nodes are reflected within the shader output,
    // and are useful for debugging purposes.

    // Access storage buffer attribute data from within shaders with a StorageNode.

    const positionStorage = storage(positionBufferAttribute, 'vec3', positionBufferAttribute.count).label(
        'positionStorage',
    );
    const velocityStorage = storage(velocityBufferAttribute, 'vec3', velocityBufferAttribute.count).label(
        'velocityStorage',
    );
    const phaseStorage = storage(phaseBufferAttribute, 'float', phaseBufferAttribute.count).label('phaseStorage');

    // Create read-only storage nodes. Storage nodes can only be accessed outside of compute shaders in a read-only state.

    const positionRead = storageObject(positionBufferAttribute, 'vec3', positionBufferAttribute.count).toReadOnly();
    const velocityRead = storageObject(velocityBufferAttribute, 'vec3', velocityBufferAttribute.count).toReadOnly();
    const phaseRead = storageObject(phaseBufferAttribute, 'float', phaseBufferAttribute.count).toReadOnly();

    // Define Uniforms. Uniforms only need to be defined once rather than per shader.

    effectController = {
        separation: uniform(20.0).label('separation'),
        alignment: uniform(20.0).label('alignment'),
        cohesion: uniform(20.0).label('cohesion'),
        freedom: uniform(0.75).label('freedom'),
        now: uniform(0.0),
        deltaTime: uniform(0.0).label('deltaTime'),
        predator: uniform(new THREE.Vector3()).label('predator'),
    };

    // Create geometry

    const birdGeometry = new BirdGeometry();
    const birdMaterial = new THREE.NodeMaterial();
    birdMaterial.normals = false;

    // Declare varyings

    const vColor = varyingProperty('vec4', 'vColor');

    // Animate bird mesh within vertex shader, then apply position offset to vertices.

    const birdVertexTSL = Fn(() => {
        const reference = attribute('reference');
        const birdVertex = attribute('birdVertex');
        const birdColor = attribute('birdColor');

        const position = positionLocal.toVar();
        const newPhase = phaseRead.element(reference).toVar();
        const newVelocity = normalize(velocityRead.element(reference)).toVar();

        If(birdVertex.equal(4).or(birdVertex.equal(7)), () => {
            // flap wings
            position.y = sin(newPhase).mul(5.0);
        });

        const newPosition = modelWorldMatrix.mul(position);

        newVelocity.z.mulAssign(-1.0);
        const xz = length(newVelocity.xz);
        const xyz = float(1.0);
        const x = sqrt(newVelocity.y.mul(newVelocity.y).oneMinus());

        const cosry = newVelocity.x.div(xz).toVar();
        const sinry = newVelocity.z.div(xz).toVar();

        const cosrz = x.div(xyz);
        const sinrz = newVelocity.y.div(xyz).toVar();

        // Nodes must be negated with negate(). Using '-', their values will resolve to NaN.
        const maty = mat3(cosry, 0, negate(sinry), 0, 1, 0, sinry, 0, cosry);

        const matz = mat3(cosrz, sinrz, 0, negate(sinrz), cosrz, 0, 0, 0, 1);

        const finalVert = maty.mul(matz).mul(newPosition);
        finalVert.addAssign(positionRead.element(reference));

        vColor.assign(vec4(birdColor, 1.0));

        return cameraProjectionMatrix.mul(cameraViewMatrix).mul(finalVert);
    });

    birdMaterial.vertexNode = birdVertexTSL();
    birdMaterial.colorNode = vColor;
    birdMaterial.side = THREE.DoubleSide;
    const birdMesh = new THREE.Mesh(birdGeometry, birdMaterial);
    birdMesh.rotation.y = Math.PI / 2;
    birdMesh.matrixAutoUpdate = false;
    birdMesh.updateMatrix();

    // Define GPU Compute shaders.
    // Shaders are computationally identical to their GLSL counterparts outside of texture destructuring.

    computeVelocity = Fn(() => {
        // Define consts
        const PI = float(3.141592653589793);
        const PI_2 = PI.mul(2.0);
        const limit = property('float', 'limit').assign(SPEED_LIMIT);

        // Destructure uniforms
        const { alignment, separation, cohesion, predator, deltaTime } = effectController;

        const zoneRadius = separation.add(alignment).add(cohesion);
        const separationThresh = separation.div(zoneRadius);
        const alignmentThresh = separation.add(alignment).div(zoneRadius);
        const zoneRadiusSq = zoneRadius.mul(zoneRadius);

        const position = positionStorage.element(instanceIndex);
        const velocity = velocityStorage.element(instanceIndex);

        // Add influence of mouse position to velocity.
        const dirToPredator = predator.mul(UPPER_BOUNDS).sub(position);
        dirToPredator.z.assign(0.0);
        const distToPredator = length(dirToPredator);
        const distToPreadatorSq = distToPredator.mul(distToPredator);

        const preyRadius = float(150.0);
        const preyRadiusSq = preyRadius.mul(preyRadius);

        // Move birds away from predator if they are within the predator's area.
        If(distToPredator.lessThan(preyRadius), () => {
            // Scale bird velocity inversely with distance from prey radius center.
            const velocityAdjust = distToPreadatorSq.div(preyRadiusSq).sub(1.0).mul(deltaTime).mul(100.0);
            velocity.addAssign(normalize(dirToPredator).mul(velocityAdjust));
            limit.addAssign(5.0);
        });

        // Attract flocks to center
        const dirToCenter = position.toVar();
        dirToCenter.y.mulAssign(2.5);
        velocity.subAssign(normalize(dirToCenter).mul(deltaTime).mul(5.0));

        Loop({ start: uint(0), end: uint(BIRDS), type: 'uint', condition: '<' }, ({ i }) => {
            const birdPosition = positionStorage.element(i);
            const dirToBird = birdPosition.sub(position);
            const distToBird = length(dirToBird);

            // Don't apply any changes to velocity if the distance to this bird is negligable.
            If(distToBird.lessThan(0.0001), () => {
                Continue();
            });

            const distToBirdSq = distToBird.mul(distToBird);

            // Don't apply any changes to velocity if changes if the bird is outsize the zone's radius.
            If(distToBirdSq.greaterThan(zoneRadiusSq), () => {
                Continue();
            });

            // Determine which threshold the bird is flying within and adjust its velocity accordingly

            const percent = distToBirdSq.div(zoneRadiusSq);

            If(percent.lessThan(separationThresh), () => {
                // Separation - Move apart for comfort
                const velocityAdjust = separationThresh.div(percent).sub(1.0).mul(deltaTime);
                velocity.subAssign(normalize(dirToBird).mul(velocityAdjust));
            })
                .ElseIf(percent.lessThan(alignmentThresh), () => {
                    // Alignment - fly the same direction
                    const threshDelta = alignmentThresh.sub(separationThresh);
                    const adjustedPercent = percent.sub(separationThresh).div(threshDelta);
                    const birdVelocity = velocityStorage.element(i);

                    const cosRange = cos(adjustedPercent.mul(PI_2));
                    const cosRangeAdjust = float(0.5).sub(cosRange.mul(0.5)).add(0.5);
                    const velocityAdjust = cosRangeAdjust.mul(deltaTime);
                    velocity.addAssign(normalize(birdVelocity).mul(velocityAdjust));
                })
                .Else(() => {
                    // Attraction / Cohesion - move closer
                    const threshDelta = alignmentThresh.oneMinus();
                    const adjustedPercent = threshDelta
                        .equal(0.0)
                        .select(1.0, percent.sub(alignmentThresh).div(threshDelta));

                    const cosRange = cos(adjustedPercent.mul(PI_2));
                    const adj1 = cosRange.mul(-0.5);
                    const adj2 = adj1.add(0.5);
                    const adj3 = float(0.5).sub(adj2);

                    const velocityAdjust = adj3.mul(deltaTime);
                    velocity.addAssign(normalize(dirToBird).mul(velocityAdjust));
                });
        });

        If(length(velocity).greaterThan(limit), () => {
            velocity.assign(normalize(velocity).mul(limit));
        });
    })().compute(BIRDS);

    computePosition = Fn(() => {
        const { deltaTime } = effectController;
        positionStorage
            .element(instanceIndex)
            .addAssign(velocityStorage.element(instanceIndex).mul(deltaTime).mul(15.0));

        const velocity = velocityStorage.element(instanceIndex);
        const phase = phaseStorage.element(instanceIndex);

        const modValue = phase
            .add(deltaTime)
            .add(length(velocity.xz).mul(deltaTime).mul(3.0))
            .add(max(velocity.y, 0.0).mul(deltaTime).mul(6.0));
        phaseStorage.element(instanceIndex).assign(modValue.mod(62.83));
    })().compute(BIRDS);

    scene.add(birdMesh);

    stats = new Stats();
    container.appendChild(stats.dom);

    container.style.touchAction = 'none';
    container.addEventListener('pointermove', onPointerMove);

    window.addEventListener('resize', onWindowResize);

    const gui = new GUI();

    gui.add(effectController.separation, 'value', 0.0, 100.0, 1.0).name('Separation');
    gui.add(effectController.alignment, 'value', 0.0, 100, 0.001).name('Alignment ');
    gui.add(effectController.cohesion, 'value', 0.0, 100, 0.025).name('Cohesion');
    gui.close();
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerMove(event) {
    if (event.isPrimary === false) return;

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

function animate() {
    render();
    stats.update();
}

function render() {
    const now = performance.now();
    let deltaTime = (now - last) / 1000;

    if (deltaTime > 1) deltaTime = 1; // safety cap on large deltas
    last = now;

    effectController.now.value = now;
    effectController.deltaTime.value = deltaTime;
    effectController.predator.value.set((0.5 * mouseX) / windowHalfX, (-0.5 * mouseY) / windowHalfY, 0);

    mouseX = 10000;
    mouseY = 10000;

    renderer.compute(computeVelocity);
    renderer.compute(computePosition);
    renderer.render(scene, camera);
}

init();
