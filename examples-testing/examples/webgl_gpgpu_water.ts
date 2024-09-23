import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { GPUComputationRenderer } from 'three/addons/misc/GPUComputationRenderer.js';
import { SimplexNoise } from 'three/addons/math/SimplexNoise.js';

// Texture width for simulation
const WIDTH = 128;

// Water size in system units
const BOUNDS = 512;
const BOUNDS_HALF = BOUNDS * 0.5;

let container, stats;
let camera, scene, renderer;
let mouseMoved = false;
const mouseCoords = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

let waterMesh;
let meshRay;
let gpuCompute;
let heightmapVariable;
let waterUniforms;
let smoothShader;
let readWaterLevelShader;
let readWaterLevelRenderTarget;
let readWaterLevelImage;
const waterNormal = new THREE.Vector3();

const NUM_SPHERES = 5;
const spheres = [];
let spheresEnabled = true;

const simplex = new SimplexNoise();

init();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.set(0, 200, 350);
    camera.lookAt(0, 0, 0);

    scene = new THREE.Scene();

    const sun = new THREE.DirectionalLight(0xffffff, 3.0);
    sun.position.set(300, 400, 175);
    scene.add(sun);

    const sun2 = new THREE.DirectionalLight(0x40a040, 2.0);
    sun2.position.set(-100, 350, -200);
    scene.add(sun2);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

    container.style.touchAction = 'none';
    container.addEventListener('pointermove', onPointerMove);

    document.addEventListener('keydown', function (event) {
        // W Pressed: Toggle wireframe
        if (event.keyCode === 87) {
            waterMesh.material.wireframe = !waterMesh.material.wireframe;
            waterMesh.material.needsUpdate = true;
        }
    });

    window.addEventListener('resize', onWindowResize);

    const gui = new GUI();

    const effectController = {
        mouseSize: 20.0,
        viscosity: 0.98,
        spheresEnabled: spheresEnabled,
    };

    const valuesChanger = function () {
        heightmapVariable.material.uniforms['mouseSize'].value = effectController.mouseSize;
        heightmapVariable.material.uniforms['viscosityConstant'].value = effectController.viscosity;
        spheresEnabled = effectController.spheresEnabled;
        for (let i = 0; i < NUM_SPHERES; i++) {
            if (spheres[i]) {
                spheres[i].visible = spheresEnabled;
            }
        }
    };

    gui.add(effectController, 'mouseSize', 1.0, 100.0, 1.0).onChange(valuesChanger);
    gui.add(effectController, 'viscosity', 0.9, 0.999, 0.001).onChange(valuesChanger);
    gui.add(effectController, 'spheresEnabled').onChange(valuesChanger);
    const buttonSmooth = {
        smoothWater: function () {
            smoothWater();
        },
    };
    gui.add(buttonSmooth, 'smoothWater');

    initWater();

    createSpheres();

    valuesChanger();
}

function initWater() {
    const materialColor = 0x0040c0;

    const geometry = new THREE.PlaneGeometry(BOUNDS, BOUNDS, WIDTH - 1, WIDTH - 1);

    // material: make a THREE.ShaderMaterial clone of THREE.MeshPhongMaterial, with customized vertex shader
    const material = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.merge([
            THREE.ShaderLib['phong'].uniforms,
            {
                heightmap: { value: null },
            },
        ]),
        vertexShader: document.getElementById('waterVertexShader').textContent,
        fragmentShader: THREE.ShaderChunk['meshphong_frag'],
    });

    material.lights = true;

    // Material attributes from THREE.MeshPhongMaterial
    // Sets the uniforms with the material values
    material.uniforms['diffuse'].value = new THREE.Color(materialColor);
    material.uniforms['specular'].value = new THREE.Color(0x111111);
    material.uniforms['shininess'].value = Math.max(50, 1e-4);
    material.uniforms['opacity'].value = material.opacity;

    // Defines
    material.defines.WIDTH = WIDTH.toFixed(1);
    material.defines.BOUNDS = BOUNDS.toFixed(1);

    waterUniforms = material.uniforms;

    waterMesh = new THREE.Mesh(geometry, material);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.matrixAutoUpdate = false;
    waterMesh.updateMatrix();

    scene.add(waterMesh);

    // THREE.Mesh just for mouse raycasting
    const geometryRay = new THREE.PlaneGeometry(BOUNDS, BOUNDS, 1, 1);
    meshRay = new THREE.Mesh(geometryRay, new THREE.MeshBasicMaterial({ color: 0xffffff, visible: false }));
    meshRay.rotation.x = -Math.PI / 2;
    meshRay.matrixAutoUpdate = false;
    meshRay.updateMatrix();
    scene.add(meshRay);

    // Creates the gpu computation class and sets it up

    gpuCompute = new GPUComputationRenderer(WIDTH, WIDTH, renderer);

    const heightmap0 = gpuCompute.createTexture();

    fillTexture(heightmap0);

    heightmapVariable = gpuCompute.addVariable(
        'heightmap',
        document.getElementById('heightmapFragmentShader').textContent,
        heightmap0,
    );

    gpuCompute.setVariableDependencies(heightmapVariable, [heightmapVariable]);

    heightmapVariable.material.uniforms['mousePos'] = { value: new THREE.Vector2(10000, 10000) };
    heightmapVariable.material.uniforms['mouseSize'] = { value: 20.0 };
    heightmapVariable.material.uniforms['viscosityConstant'] = { value: 0.98 };
    heightmapVariable.material.uniforms['heightCompensation'] = { value: 0 };
    heightmapVariable.material.defines.BOUNDS = BOUNDS.toFixed(1);

    const error = gpuCompute.init();
    if (error !== null) {
        console.error(error);
    }

    // Create compute shader to smooth the water surface and velocity
    smoothShader = gpuCompute.createShaderMaterial(document.getElementById('smoothFragmentShader').textContent, {
        smoothTexture: { value: null },
    });

    // Create compute shader to read water level
    readWaterLevelShader = gpuCompute.createShaderMaterial(
        document.getElementById('readWaterLevelFragmentShader').textContent,
        {
            point1: { value: new THREE.Vector2() },
            levelTexture: { value: null },
        },
    );
    readWaterLevelShader.defines.WIDTH = WIDTH.toFixed(1);
    readWaterLevelShader.defines.BOUNDS = BOUNDS.toFixed(1);

    // Create a 4x1 pixel image and a render target (Uint8, 4 channels, 1 byte per channel) to read water height and orientation
    readWaterLevelImage = new Uint8Array(4 * 1 * 4);

    readWaterLevelRenderTarget = new THREE.WebGLRenderTarget(4, 1, {
        wrapS: THREE.ClampToEdgeWrapping,
        wrapT: THREE.ClampToEdgeWrapping,
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.UnsignedByteType,
        depthBuffer: false,
    });
}

function fillTexture(texture) {
    const waterMaxHeight = 10;

    function noise(x, y) {
        let multR = waterMaxHeight;
        let mult = 0.025;
        let r = 0;
        for (let i = 0; i < 15; i++) {
            r += multR * simplex.noise(x * mult, y * mult);
            multR *= 0.53 + 0.025 * i;
            mult *= 1.25;
        }

        return r;
    }

    const pixels = texture.image.data;

    let p = 0;
    for (let j = 0; j < WIDTH; j++) {
        for (let i = 0; i < WIDTH; i++) {
            const x = (i * 128) / WIDTH;
            const y = (j * 128) / WIDTH;

            pixels[p + 0] = noise(x, y);
            pixels[p + 1] = pixels[p + 0];
            pixels[p + 2] = 0;
            pixels[p + 3] = 1;

            p += 4;
        }
    }
}

function smoothWater() {
    const currentRenderTarget = gpuCompute.getCurrentRenderTarget(heightmapVariable);
    const alternateRenderTarget = gpuCompute.getAlternateRenderTarget(heightmapVariable);

    for (let i = 0; i < 10; i++) {
        smoothShader.uniforms['smoothTexture'].value = currentRenderTarget.texture;
        gpuCompute.doRenderTarget(smoothShader, alternateRenderTarget);

        smoothShader.uniforms['smoothTexture'].value = alternateRenderTarget.texture;
        gpuCompute.doRenderTarget(smoothShader, currentRenderTarget);
    }
}

function createSpheres() {
    const sphereTemplate = new THREE.Mesh(
        new THREE.SphereGeometry(4, 24, 12),
        new THREE.MeshPhongMaterial({ color: 0xffff00 }),
    );

    for (let i = 0; i < NUM_SPHERES; i++) {
        let sphere = sphereTemplate;
        if (i < NUM_SPHERES - 1) {
            sphere = sphereTemplate.clone();
        }

        sphere.position.x = (Math.random() - 0.5) * BOUNDS * 0.7;
        sphere.position.z = (Math.random() - 0.5) * BOUNDS * 0.7;

        sphere.userData.velocity = new THREE.Vector3();

        scene.add(sphere);

        spheres[i] = sphere;
    }
}

function sphereDynamics() {
    const currentRenderTarget = gpuCompute.getCurrentRenderTarget(heightmapVariable);

    readWaterLevelShader.uniforms['levelTexture'].value = currentRenderTarget.texture;

    for (let i = 0; i < NUM_SPHERES; i++) {
        const sphere = spheres[i];

        if (sphere) {
            // Read water level and orientation
            const u = (0.5 * sphere.position.x) / BOUNDS_HALF + 0.5;
            const v = 1 - ((0.5 * sphere.position.z) / BOUNDS_HALF + 0.5);
            readWaterLevelShader.uniforms['point1'].value.set(u, v);
            gpuCompute.doRenderTarget(readWaterLevelShader, readWaterLevelRenderTarget);

            renderer.readRenderTargetPixels(readWaterLevelRenderTarget, 0, 0, 4, 1, readWaterLevelImage);
            const pixels = new Float32Array(readWaterLevelImage.buffer);

            // Get orientation
            waterNormal.set(pixels[1], 0, -pixels[2]);

            const pos = sphere.position;

            // Set height
            pos.y = pixels[0];

            // Move sphere
            waterNormal.multiplyScalar(0.1);
            sphere.userData.velocity.add(waterNormal);
            sphere.userData.velocity.multiplyScalar(0.998);
            pos.add(sphere.userData.velocity);

            if (pos.x < -BOUNDS_HALF) {
                pos.x = -BOUNDS_HALF + 0.001;
                sphere.userData.velocity.x *= -0.3;
            } else if (pos.x > BOUNDS_HALF) {
                pos.x = BOUNDS_HALF - 0.001;
                sphere.userData.velocity.x *= -0.3;
            }

            if (pos.z < -BOUNDS_HALF) {
                pos.z = -BOUNDS_HALF + 0.001;
                sphere.userData.velocity.z *= -0.3;
            } else if (pos.z > BOUNDS_HALF) {
                pos.z = BOUNDS_HALF - 0.001;
                sphere.userData.velocity.z *= -0.3;
            }
        }
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function setMouseCoords(x, y) {
    mouseCoords.set((x / renderer.domElement.clientWidth) * 2 - 1, -(y / renderer.domElement.clientHeight) * 2 + 1);
    mouseMoved = true;
}

function onPointerMove(event) {
    if (event.isPrimary === false) return;

    setMouseCoords(event.clientX, event.clientY);
}

function animate() {
    render();
    stats.update();
}

function render() {
    // Set uniforms: mouse interaction
    const uniforms = heightmapVariable.material.uniforms;
    if (mouseMoved) {
        raycaster.setFromCamera(mouseCoords, camera);

        const intersects = raycaster.intersectObject(meshRay);

        if (intersects.length > 0) {
            const point = intersects[0].point;
            uniforms['mousePos'].value.set(point.x, point.z);
        } else {
            uniforms['mousePos'].value.set(10000, 10000);
        }

        mouseMoved = false;
    } else {
        uniforms['mousePos'].value.set(10000, 10000);
    }

    // Do the gpu computation
    gpuCompute.compute();

    if (spheresEnabled) {
        sphereDynamics();
    }

    // Get compute output in custom uniform
    waterUniforms['heightmap'].value = gpuCompute.getCurrentRenderTarget(heightmapVariable).texture;

    // Render
    renderer.render(scene, camera);
}
