import * as THREE from 'three';

import WebGL from 'three/addons/capabilities/WebGL.js';

if (WebGL.isWebGL2Available() === false) {
    document.body.appendChild(WebGL.getWebGL2ErrorMessage());
}

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer, mesh: THREE.Mesh;

init();
animate();

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
        vertexShader: document.getElementById('vertexShader')!.textContent!,
        fragmentShader: document.getElementById('fragmentShader')!.textContent!,
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
    document.body.appendChild(renderer.domElement);
}

function animate(time?: number) {
    requestAnimationFrame(animate);

    mesh.rotation.x = time != null ? (time / 1000.0) * 0.25 : NaN;
    mesh.rotation.y = time != null ? (time / 1000.0) * 0.5 : NaN;

    renderer.render(scene, camera);
}
