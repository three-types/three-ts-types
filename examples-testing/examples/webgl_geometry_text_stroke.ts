import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { Font } from 'three/addons/loaders/FontLoader.js';
import { unzipSync, strFromU8 } from 'three/addons/libs/fflate.module.js';

let camera, scene, renderer;

init();

function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, -400, 1000);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    new THREE.FileLoader()
        .setResponseType('arraybuffer')
        .load('fonts/MPLUSRounded1c/MPLUSRounded1c-Regular.typeface.json.zip', function (data) {
            const zip = unzipSync(new Uint8Array(data));
            const strArray = strFromU8(new Uint8Array(zip['MPLUSRounded1c-Regular.typeface.json'].buffer));

            const font = new Font(JSON.parse(strArray));
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

            const material = {
                dark: matDark,
                lite: matLite,
                color: color,
            };

            const english = '   Three.js\nStroke text.'; // Left to right

            const hebrew = 'טקסט קו'; // Right to left

            const chinese = '文字描邊'; // Top to bottom

            const message1 = generateStrokeText(font, material, english, 80, 'ltr');

            const message2 = generateStrokeText(font, material, hebrew, 80, 'rtl');

            const message3 = generateStrokeText(font, material, chinese, 80, 'tb');

            message1.position.x = -100;

            message2.position.x = -100;
            message2.position.y = -300;

            message3.position.x = 300;
            message3.position.y = -300;

            scene.add(message1, message2, message3);

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

function generateStrokeText(font, material, message, size, direction = 'ltr') {
    const shapes = font.generateShapes(message, size, direction);

    const geometry = new THREE.ShapeGeometry(shapes);

    const strokeText = new THREE.Group();

    geometry.computeBoundingBox();

    const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

    geometry.translate(xMid, 0, 0);

    // make shape ( N.B. edge view not visible )

    const text = new THREE.Mesh(geometry, material.lite);

    text.position.z = -150;

    strokeText.add(text);

    // make line shape ( N.B. edge view remains visible )

    const holeShapes = [];

    for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];

        if (shape.holes && shape.holes.length > 0) {
            for (let j = 0; j < shape.holes.length; j++) {
                const hole = shape.holes[j];
                holeShapes.push(hole);
            }
        }
    }

    shapes.push(...holeShapes);

    const style = SVGLoader.getStrokeStyle(5, material.color.getStyle());

    for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];

        const points = shape.getPoints();

        const geometry = SVGLoader.pointsToStroke(points, style);

        geometry.translate(xMid, 0, 0);

        const strokeMesh = new THREE.Mesh(geometry, material.dark);
        strokeText.add(strokeMesh);
    }

    return strokeText;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();
}

function render() {
    renderer.render(scene, camera);
}
