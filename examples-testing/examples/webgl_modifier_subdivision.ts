import * as THREE from 'three';
import { LoopSubdivision } from 'three-subdivide';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let renderer, scene, camera;
let texture;
let meshNormal, meshSmooth;
let wireNormal, wireSmooth;
let wireMaterial;

const params = {
    geometry: 'Box',
    iterations: 3,
    split: true,
    uvSmooth: false,
    preserveEdges: false,
    flatOnly: false,
    maxTriangles: 25000,
    flatShading: false,
    textured: true,
    wireframe: false,
};

init();

function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
    camera.position.set(0, 0.7, 2.1);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render); // use if there is no animation loop
    controls.rotateSpeed = 0.5;
    controls.minZoom = 1;
    controls.target.set(0, 0, 0);
    controls.update();

    scene.add(new THREE.HemisphereLight(0xffffff, 0x737373, 3));

    const frontLight = new THREE.DirectionalLight(0xffffff, 1.5);
    const backLight = new THREE.DirectionalLight(0xffffff, 1.5);
    frontLight.position.set(0, 1, 1);
    backLight.position.set(0, 1, -1);
    scene.add(frontLight, backLight);

    texture = new THREE.TextureLoader().load('./textures/uv_grid_opengl.jpg', () => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.colorSpace = THREE.SRGBColorSpace;

        render();
    });

    meshNormal = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial());
    meshSmooth = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial());
    meshNormal.position.set(-0.7, 0, 0);
    meshSmooth.position.set(0.7, 0, 0);
    scene.add(meshNormal, meshSmooth);

    wireMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, depthTest: true, wireframe: true });
    wireNormal = new THREE.Mesh(new THREE.BufferGeometry(), wireMaterial);
    wireSmooth = new THREE.Mesh(new THREE.BufferGeometry(), wireMaterial);
    wireNormal.visible = false;
    wireSmooth.visible = false;
    wireNormal.position.copy(meshNormal.position);
    wireSmooth.position.copy(meshSmooth.position);
    scene.add(wireNormal, wireSmooth);

    updateMeshes();

    window.addEventListener('resize', onWindowResize);

    const geomTypes = [
        'Box',
        'Capsule',
        'Circle',
        'Cone',
        'Cylinder',
        'Dodecahedron',
        'Icosahedron',
        'Lathe',
        'Octahedron',
        'Plane',
        'Ring',
        'Sphere',
        'Tetrahedron',
        'Torus',
        'TorusKnot',
    ];

    const gui = new GUI();

    const folder1 = gui.addFolder('Subdivide Params');
    const geomController = folder1.add(params, 'geometry', geomTypes).onFinishChange(() => {
        const geom = params.geometry.toLowerCase();

        params.split = geom === 'box' || geom === 'ring' || geom === 'plane';
        params.uvSmooth = geom === 'circle' || geom === 'plane' || geom === 'ring';

        refreshDisplay();
    });

    folder1.add(params, 'iterations').min(0).max(5).step(1).onFinishChange(updateMeshes);
    const splitController = folder1.add(params, 'split').onFinishChange(updateMeshes);
    const uvSmoothController = folder1.add(params, 'uvSmooth').onFinishChange(updateMeshes);
    const preserveController = folder1.add(params, 'preserveEdges').onFinishChange(updateMeshes);
    folder1.add(params, 'flatOnly').onFinishChange(updateMeshes);
    folder1.add(params, 'maxTriangles').onFinishChange(updateMeshes);

    const folder2 = gui.addFolder('Material');
    folder2.add(params, 'flatShading').onFinishChange(updateMaterial);
    folder2.add(params, 'textured').onFinishChange(updateMaterial);
    folder2.add(params, 'wireframe').onFinishChange(updateWireframe);

    function refreshDisplay() {
        geomController.updateDisplay();
        splitController.updateDisplay();
        uvSmoothController.updateDisplay();
        preserveController.updateDisplay();

        updateMeshes();
    }
}

function getGeometry() {
    switch (params.geometry.toLowerCase()) {
        case 'box':
            return new THREE.BoxGeometry();

        case 'capsule':
            return new THREE.CapsuleGeometry(0.5, 0.5, 3, 5);

        case 'circle':
            return new THREE.CircleGeometry(0.6, 10);

        case 'cone':
            return new THREE.ConeGeometry(0.6, 1.5, 5, 3);

        case 'cylinder':
            return new THREE.CylinderGeometry(0.5, 0.5, 1, 5, 4);

        case 'dodecahedron':
            return new THREE.DodecahedronGeometry(0.6);

        case 'icosahedron':
            return new THREE.IcosahedronGeometry(0.6);

        case 'lathe':
            // Sine Wave

            const points = [];

            for (let i = 0; i < 65; i += 5) {
                const x = (Math.sin(i * 0.2) * Math.sin(i * 0.1) * 15 + 50) * 1.2;
                const y = (i - 5) * 3;
                points.push(new THREE.Vector2(x * 0.0075, y * 0.005));
            }

            const latheGeometry = new THREE.LatheGeometry(points, 4);
            latheGeometry.center();

            return latheGeometry;

        case 'octahedron':
            return new THREE.OctahedronGeometry(0.7);

        case 'plane':
            return new THREE.PlaneGeometry();

        case 'ring':
            return new THREE.RingGeometry(0.3, 0.6, 10);

        case 'sphere':
            return new THREE.SphereGeometry(0.6, 8, 4);

        case 'tetrahedron':
            return new THREE.TetrahedronGeometry(0.8);

        case 'torus':
            return new THREE.TorusGeometry(0.48, 0.24, 4, 6);

        case 'torusknot':
            return new THREE.TorusKnotGeometry(0.38, 0.18, 20, 4);
    }
}

function updateMeshes() {
    const normalGeometry = getGeometry();

    const smoothGeometry = LoopSubdivision.modify(normalGeometry, params.iterations, params);

    meshNormal.geometry.dispose();
    meshSmooth.geometry.dispose();
    meshNormal.geometry = normalGeometry;
    meshSmooth.geometry = smoothGeometry;

    wireNormal.geometry.dispose();
    wireSmooth.geometry.dispose();
    wireNormal.geometry = normalGeometry.clone();
    wireSmooth.geometry = smoothGeometry.clone();

    updateMaterial();
}

function disposeMaterial(material) {
    const materials = Array.isArray(material) ? material : [material];

    for (let i = 0; i < materials.length; i++) {
        if (materials[i].dispose) materials[i].dispose();
    }
}

function updateMaterial() {
    disposeMaterial(meshNormal.material);
    disposeMaterial(meshSmooth.material);

    const materialParams = {
        color: params.textured ? 0xffffff : 0x808080,
        flatShading: params.flatShading,
        map: params.textured ? texture : null,
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1,
    };

    switch (params.geometry.toLowerCase()) {
        case 'circle':
        case 'lathe':
        case 'plane':
        case 'ring':
            materialParams.side = THREE.DoubleSide;
            break;

        case 'box':
        case 'capsule':
        case 'cone':
        case 'cylinder':
        case 'dodecahedron':
        case 'icosahedron':
        case 'octahedron':
        case 'sphere':
        case 'tetrahedron':
        case 'torus':
        case 'torusknot':
            materialParams.side = THREE.FrontSide;
            break;
    }

    meshNormal.material = meshSmooth.material = new THREE.MeshStandardMaterial(materialParams);

    render();
}

function updateWireframe() {
    wireNormal.visible = wireSmooth.visible = params.wireframe;

    render();
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    render();
}

function render() {
    renderer.render(scene, camera);
}
