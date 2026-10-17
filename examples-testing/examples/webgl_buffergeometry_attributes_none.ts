import * as THREE from 'three';

let camera, scene, renderer, mesh;

init();

function init() {
    camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 1, 3500);
    camera.position.z = 4;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    scene.fog = new THREE.Fog(0x050505, 2000, 3500);

    // geometry

    const triangleCount = 10000;
    const vertexCountPerTriangle = 3;
    const vertexCount = triangleCount * vertexCountPerTriangle;

    const geometry = new THREE.BufferGeometry();
    geometry.setDrawRange(0, vertexCount);

    // material

    const material = new THREE.RawShaderMaterial({
        uniforms: {
            seed: { value: 42 },
        },
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
        side: THREE.DoubleSide,
        glslVersion: THREE.GLSL3,
    });

    // mesh

    mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    scene.add(mesh);

    // renderer

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);
}

function animate(time) {
    mesh.rotation.x = (time / 1000.0) * 0.25;
    mesh.rotation.y = (time / 1000.0) * 0.5;

    renderer.render(scene, camera);
}
