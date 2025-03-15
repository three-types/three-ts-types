import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;

init();

function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, -400, 600);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const loader = new FontLoader();
    loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
        const color = new THREE.Color(0x006699);

        const matDark = new THREE.MeshBasicMaterial({
            color: color,
            side: THREE.DoubleSide,
        });

        const matLite = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.4,
            side: THREE.DoubleSide,
        });

        const message = '   Three.js\nStroke text.';

        const shapes: THREE.Path[] = font.generateShapes(message, 100);

        const geometry = new THREE.ShapeGeometry(shapes as THREE.Shape[]);

        geometry.computeBoundingBox();

        const xMid = -0.5 * (geometry.boundingBox!.max.x - geometry.boundingBox!.min.x);

        geometry.translate(xMid, 0, 0);

        // make shape ( N.B. edge view not visible )

        const text = new THREE.Mesh(geometry, matLite);
        text.position.z = -150;
        scene.add(text);

        // make line shape ( N.B. edge view remains visible )

        const holeShapes: THREE.Path[] = [];

        for (let i = 0; i < shapes.length; i++) {
            const shape = shapes[i] as THREE.Shape;

            if (shape.holes && shape.holes.length > 0) {
                for (let j = 0; j < shape.holes.length; j++) {
                    const hole = shape.holes[j];
                    holeShapes.push(hole);
                }
            }
        }

        shapes.push(...holeShapes);

        const style = SVGLoader.getStrokeStyle(5, color.getStyle());

        const strokeText = new THREE.Group();

        for (let i = 0; i < shapes.length; i++) {
            const shape = shapes[i];

            const points = shape.getPoints();

            const geometry = SVGLoader.pointsToStroke(points, style);

            geometry.translate(xMid, 0, 0);

            const strokeMesh = new THREE.Mesh(geometry, matDark);
            strokeText.add(strokeMesh);
        }

        scene.add(strokeText);

        render();
    }); //end load function

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    controls.addEventListener('change', render);

    window.addEventListener('resize', onWindowResize);
} // end init

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();
}

function render() {
    renderer.render(scene, camera);
}
