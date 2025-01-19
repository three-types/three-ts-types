import * as THREE from 'three';

import Stats from 'stats-gl';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';

let line, thresholdLine, segments, thresholdSegments;
let renderer, scene, camera, controls;
let sphereInter, sphereOnLine;
let stats;
let gui;
let clock;

const color = new THREE.Color();

const pointer = new THREE.Vector2(Infinity, Infinity);

const raycaster = new THREE.Raycaster();

raycaster.params.Line2 = {};
raycaster.params.Line2.threshold = 0;

const matLine = new LineMaterial({
    color: 0xffffff,
    linewidth: 1, // in world units with size attenuation, pixels otherwise
    worldUnits: true,
    vertexColors: true,

    alphaToCoverage: true,
});

const matThresholdLine = new LineMaterial({
    color: 0xffffff,
    linewidth: matLine.linewidth, // in world units with size attenuation, pixels otherwise
    worldUnits: true,
    // vertexColors: true,
    transparent: true,
    opacity: 0.2,
    depthTest: false,
    visible: false,
});

const params = {
    'line type': 0,
    'world units': matLine.worldUnits,
    'visualize threshold': matThresholdLine.visible,
    width: matLine.linewidth,
    alphaToCoverage: matLine.alphaToCoverage,
    threshold: raycaster.params.Line2.threshold,
    translation: raycaster.params.Line2.threshold,
    animate: true,
};

init();

function init() {
    clock = new THREE.Clock();

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0.0);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(-40, 0, 60);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 10;
    controls.maxDistance = 500;

    const sphereGeometry = new THREE.SphereGeometry(0.25, 8, 4);
    const sphereInterMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, depthTest: false });
    const sphereOnLineMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, depthTest: false });

    sphereInter = new THREE.Mesh(sphereGeometry, sphereInterMaterial);
    sphereOnLine = new THREE.Mesh(sphereGeometry, sphereOnLineMaterial);
    sphereInter.visible = false;
    sphereOnLine.visible = false;
    sphereInter.renderOrder = 10;
    sphereOnLine.renderOrder = 10;
    scene.add(sphereInter);
    scene.add(sphereOnLine);

    // Position and THREE.Color Data

    const positions = [];
    const colors = [];
    const points = [];
    for (let i = -50; i < 50; i++) {
        const t = i / 3;
        points.push(new THREE.Vector3(t * Math.sin(2 * t), t, t * Math.cos(2 * t)));
    }

    const spline = new THREE.CatmullRomCurve3(points);
    const divisions = Math.round(3 * points.length);
    const point = new THREE.Vector3();
    const color = new THREE.Color();

    for (let i = 0, l = divisions; i < l; i++) {
        const t = i / l;

        spline.getPoint(t, point);
        positions.push(point.x, point.y, point.z);

        color.setHSL(t, 1.0, 0.5, THREE.SRGBColorSpace);
        colors.push(color.r, color.g, color.b);
    }

    const lineGeometry = new LineGeometry();
    lineGeometry.setPositions(positions);
    lineGeometry.setColors(colors);

    const segmentsGeometry = new LineSegmentsGeometry();
    segmentsGeometry.setPositions(positions);
    segmentsGeometry.setColors(colors);

    segments = new LineSegments2(segmentsGeometry, matLine);
    segments.computeLineDistances();
    segments.scale.set(1, 1, 1);
    scene.add(segments);
    segments.visible = false;

    thresholdSegments = new LineSegments2(segmentsGeometry, matThresholdLine);
    thresholdSegments.computeLineDistances();
    thresholdSegments.scale.set(1, 1, 1);
    scene.add(thresholdSegments);
    thresholdSegments.visible = false;

    line = new Line2(lineGeometry, matLine);
    line.computeLineDistances();
    line.scale.set(1, 1, 1);
    scene.add(line);

    thresholdLine = new Line2(lineGeometry, matThresholdLine);
    thresholdLine.computeLineDistances();
    thresholdLine.scale.set(1, 1, 1);
    scene.add(thresholdLine);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    //

    document.addEventListener('pointermove', onPointerMove);
    window.addEventListener('resize', onWindowResize);
    onWindowResize();

    stats = new Stats({ horizontal: false, trackGPU: true });
    stats.init(renderer);
    document.body.appendChild(stats.dom);

    initGui();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function animate() {
    const delta = clock.getDelta();

    const obj = line.visible ? line : segments;
    thresholdLine.position.copy(line.position);
    thresholdLine.quaternion.copy(line.quaternion);
    thresholdSegments.position.copy(segments.position);
    thresholdSegments.quaternion.copy(segments.quaternion);

    if (params.animate) {
        line.rotation.y += delta * 0.1;

        segments.rotation.y = line.rotation.y;
    }

    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObject(obj);

    if (intersects.length > 0) {
        sphereInter.visible = true;
        sphereOnLine.visible = true;

        sphereInter.position.copy(intersects[0].point);
        sphereOnLine.position.copy(intersects[0].pointOnLine);

        const index = intersects[0].faceIndex;
        const colors = obj.geometry.getAttribute('instanceColorStart');

        color.fromBufferAttribute(colors, index);

        sphereInter.material.color.copy(color).offsetHSL(0.3, 0, 0);
        sphereOnLine.material.color.copy(color).offsetHSL(0.7, 0, 0);

        renderer.domElement.style.cursor = 'crosshair';
    } else {
        sphereInter.visible = false;
        sphereOnLine.visible = false;
        renderer.domElement.style.cursor = '';
    }

    renderer.render(scene, camera);

    stats.update();
}

//

function switchLine(val) {
    switch (val) {
        case 0:
            line.visible = true;
            thresholdLine.visible = true;

            segments.visible = false;
            thresholdSegments.visible = false;

            break;

        case 1:
            line.visible = false;
            thresholdLine.visible = false;

            segments.visible = true;
            thresholdSegments.visible = true;

            break;
    }
}

function initGui() {
    gui = new GUI();

    gui.add(params, 'line type', { LineGeometry: 0, LineSegmentsGeometry: 1 })
        .onChange(function (val) {
            switchLine(val);
        })
        .setValue(1);

    gui.add(params, 'world units').onChange(function (val) {
        matLine.worldUnits = val;
        matLine.needsUpdate = true;

        matThresholdLine.worldUnits = val;
        matThresholdLine.needsUpdate = true;
    });

    gui.add(params, 'visualize threshold').onChange(function (val) {
        matThresholdLine.visible = val;
    });

    gui.add(params, 'width', 1, 10).onChange(function (val) {
        matLine.linewidth = val;
        matThresholdLine.linewidth = matLine.linewidth + raycaster.params.Line2.threshold;
    });

    gui.add(params, 'alphaToCoverage').onChange(function (val) {
        matLine.alphaToCoverage = val;
    });

    gui.add(params, 'threshold', 0, 10).onChange(function (val) {
        raycaster.params.Line2.threshold = val;
        matThresholdLine.linewidth = matLine.linewidth + raycaster.params.Line2.threshold;
    });

    gui.add(params, 'translation', 0, 10).onChange(function (val) {
        line.position.x = val;
        segments.position.x = val;
    });

    gui.add(params, 'animate');
}
