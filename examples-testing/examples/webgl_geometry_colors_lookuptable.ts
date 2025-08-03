import * as THREE from 'three';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Lut } from 'three/addons/math/Lut.js';

let container;

let perpCamera, orthoCamera, renderer, lut;

let mesh, sprite;
let scene, uiScene;

let params;

init();

function init() {
    container = document.getElementById('container');

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    uiScene = new THREE.Scene();

    lut = new Lut();

    const width = window.innerWidth;
    const height = window.innerHeight;

    perpCamera = new THREE.PerspectiveCamera(60, width / height, 1, 100);
    perpCamera.position.set(0, 0, 10);
    scene.add(perpCamera);

    orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 2);
    orthoCamera.position.set(0.5, 0, 1);

    sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
            map: new THREE.CanvasTexture(lut.createCanvas()),
        }),
    );
    sprite.material.map.colorSpace = THREE.SRGBColorSpace;
    sprite.scale.x = 0.125;
    uiScene.add(sprite);

    mesh = new THREE.Mesh(
        undefined,
        new THREE.MeshLambertMaterial({
            side: THREE.DoubleSide,
            color: 0xf5f5f5,
            vertexColors: true,
        }),
    );
    scene.add(mesh);

    params = {
        colorMap: 'rainbow',
    };
    loadModel();

    const pointLight = new THREE.PointLight(0xffffff, 3, 0, 0);
    perpCamera.add(pointLight);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.autoClear = false;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);

    const controls = new OrbitControls(perpCamera, renderer.domElement);
    controls.addEventListener('change', render);

    const gui = new GUI();

    gui.add(params, 'colorMap', ['rainbow', 'cooltowarm', 'blackbody', 'grayscale']).onChange(function () {
        updateColors();
        render();
    });
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    perpCamera.aspect = width / height;
    perpCamera.updateProjectionMatrix();

    renderer.setSize(width, height);
    render();
}

function render() {
    renderer.clear();
    renderer.render(scene, perpCamera);
    renderer.render(uiScene, orthoCamera);
}

function loadModel() {
    const loader = new THREE.BufferGeometryLoader();
    loader.load('models/json/pressure.json', function (geometry) {
        geometry.center();
        geometry.computeVertexNormals();

        // default color attribute
        const colors = [];

        for (let i = 0, n = geometry.attributes.position.count; i < n; ++i) {
            colors.push(1, 1, 1);
        }

        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        mesh.geometry = geometry;
        updateColors();

        render();
    });
}

function updateColors() {
    lut.setColorMap(params.colorMap);

    lut.setMax(2000);
    lut.setMin(0);

    const geometry = mesh.geometry;
    const pressures = geometry.attributes.pressure;
    const colors = geometry.attributes.color;
    const color = new THREE.Color();

    for (let i = 0; i < pressures.array.length; i++) {
        const colorValue = pressures.array[i];

        color.copy(lut.getColor(colorValue)).convertSRGBToLinear();

        colors.setXYZ(i, color.r, color.g, color.b);
    }

    colors.needsUpdate = true;

    const map = sprite.material.map;
    lut.updateCanvas(map.image);
    map.needsUpdate = true;
}
