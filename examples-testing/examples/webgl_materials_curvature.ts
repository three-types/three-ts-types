import * as THREE from 'three';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

let camera, scene, renderer;

let ninjaMeshRaw, curvatureAttribute, bufferGeo;

init();

//returns average of elements in a dictionary
function average(dict) {
    let sum = 0;
    let length = 0;

    Object.keys(dict).forEach(function (key) {
        sum += dict[key];
        length++;
    });

    return sum / length;
}

//clamp a number between min and max
function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}

//filter the curvature array to only show concave values
function filterConcave(curvature) {
    for (let i = 0; i < curvature.length; i++) {
        curvature[i] = Math.abs(clamp(curvature[i], -1, 0));
    }
}

//filter the curvature array to only show convex values
function filterConvex(curvature) {
    for (let i = 0; i < curvature.length; i++) {
        curvature[i] = clamp(curvature[i], 0, 1);
    }
}

//filter the curvature array to show both the concave and convex values
function filterBoth(curvature) {
    for (let i = 0; i < curvature.length; i++) {
        curvature[i] = Math.abs(curvature[i]);
    }
}

//initialize the scene
function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.position.x = -23;
    camera.position.y = 2;
    camera.position.z = 24;

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.autoClear = false;
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 20;
    controls.maxDistance = 100;

    const loader = new OBJLoader();
    //load the obj
    loader.load('models/obj/ninja/ninjaHead_Low.obj', function (object) {
        object.traverse(function (child) {
            if (child.isMesh) {
                bufferGeo = child.geometry;
                bufferGeo.center();
                const dict = {};

                for (let i = 0; i < bufferGeo.attributes.position.count; i += 3) {
                    //create a dictionary of every position, and its neighboring positions
                    const array = bufferGeo.attributes.position.array;
                    const normArray = bufferGeo.attributes.normal.array;

                    const posA = new THREE.Vector3(array[3 * i], array[3 * i + 1], array[3 * i + 2]);
                    const posB = new THREE.Vector3(array[3 * (i + 1)], array[3 * (i + 1) + 1], array[3 * (i + 1) + 2]);
                    const posC = new THREE.Vector3(array[3 * (i + 2)], array[3 * (i + 2) + 1], array[3 * (i + 2) + 2]);

                    const normA = new THREE.Vector3(
                        normArray[3 * i],
                        normArray[3 * i + 1],
                        normArray[3 * i + 2],
                    ).normalize();
                    const normB = new THREE.Vector3(
                        normArray[3 * (i + 1)],
                        normArray[3 * (i + 1) + 1],
                        normArray[3 * (i + 1) + 2],
                    ).normalize();
                    const normC = new THREE.Vector3(
                        normArray[3 * (i + 2)],
                        normArray[3 * (i + 2) + 1],
                        normArray[3 * (i + 2) + 2],
                    ).normalize();

                    const strA = posA.toArray().toString();
                    const strB = posB.toArray().toString();
                    const strC = posC.toArray().toString();

                    const posB_A = new THREE.Vector3().subVectors(posB, posA);
                    const posB_C = new THREE.Vector3().subVectors(posB, posC);
                    const posC_A = new THREE.Vector3().subVectors(posC, posA);

                    const b2a = normB.dot(posB_A.normalize());
                    const b2c = normB.dot(posB_C.normalize());
                    const c2a = normC.dot(posC_A.normalize());

                    const a2b = -normA.dot(posB_A.normalize());
                    const c2b = -normC.dot(posB_C.normalize());
                    const a2c = -normA.dot(posC_A.normalize());

                    if (dict[strA] === undefined) {
                        dict[strA] = {};
                    }

                    if (dict[strB] === undefined) {
                        dict[strB] = {};
                    }

                    if (dict[strC] === undefined) {
                        dict[strC] = {};
                    }

                    dict[strA][strB] = a2b;
                    dict[strA][strC] = a2c;
                    dict[strB][strA] = b2a;
                    dict[strB][strC] = b2c;
                    dict[strC][strA] = c2a;
                    dict[strC][strB] = c2b;
                }

                let curvatureDict = {};
                let min = 10,
                    max = 0;

                Object.keys(dict).forEach(function (key) {
                    curvatureDict[key] = average(dict[key]);
                });

                //smoothing
                const smoothCurvatureDict = Object.create(curvatureDict);

                Object.keys(dict).forEach(function (key) {
                    let count = 0;
                    let sum = 0;
                    Object.keys(dict[key]).forEach(function (key2) {
                        sum += smoothCurvatureDict[key2];
                        count++;
                    });
                    smoothCurvatureDict[key] = sum / count;
                });

                curvatureDict = smoothCurvatureDict;

                // fit values to 0 and 1
                Object.keys(curvatureDict).forEach(function (key) {
                    const val = Math.abs(curvatureDict[key]);
                    if (val < min) min = val;
                    if (val > max) max = val;
                });

                const range = max - min;

                Object.keys(curvatureDict).forEach(function (key) {
                    const val = Math.abs(curvatureDict[key]);
                    if (curvatureDict[key] < 0) {
                        curvatureDict[key] = (min - val) / range;
                    } else {
                        curvatureDict[key] = (val - min) / range;
                    }
                });

                curvatureAttribute = new Float32Array(bufferGeo.attributes.position.count);

                for (let i = 0; i < bufferGeo.attributes.position.count; i++) {
                    const array = bufferGeo.attributes.position.array;
                    const pos = new THREE.Vector3(array[3 * i], array[3 * i + 1], array[3 * i + 2]);
                    const str = pos.toArray().toString();
                    curvatureAttribute[i] = curvatureDict[str];
                }

                bufferGeo.setAttribute('curvature', new THREE.BufferAttribute(curvatureAttribute, 1));

                //starting filter is to show both concave and convex
                const curvatureFiltered = new Float32Array(curvatureAttribute);
                filterBoth(curvatureFiltered);

                const materialRaw = new THREE.ShaderMaterial({
                    vertexShader: document.getElementById('vertexShaderRaw').textContent,
                    fragmentShader: document.getElementById('fragmentShaderRaw').textContent,
                });

                ninjaMeshRaw = new THREE.Mesh(bufferGeo, materialRaw);
            }
        });

        scene.add(ninjaMeshRaw);
    });

    //init GUI
    const params = {
        filterConvex: function () {
            const curvatureFiltered = new Float32Array(curvatureAttribute);
            filterConvex(curvatureFiltered);
            bufferGeo.attributes.curvature.array = curvatureFiltered;
            bufferGeo.attributes.curvature.needsUpdate = true;
        },
        filterConcave: function () {
            const curvatureFiltered = new Float32Array(curvatureAttribute);
            filterConcave(curvatureFiltered);
            bufferGeo.attributes.curvature.array = curvatureFiltered;
            bufferGeo.attributes.curvature.needsUpdate = true;
        },
        filterBoth: function () {
            const curvatureFiltered = new Float32Array(curvatureAttribute);
            filterBoth(curvatureFiltered);
            bufferGeo.attributes.curvature.array = curvatureFiltered;
            bufferGeo.attributes.curvature.needsUpdate = true;
        },
    };

    const gui = new GUI({ title: 'Topology' });

    gui.add(params, 'filterConvex');
    gui.add(params, 'filterConcave');
    gui.add(params, 'filterBoth');

    onWindowResize();

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function animate() {
    renderer.render(scene, camera);
}
