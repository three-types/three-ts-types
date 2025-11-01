import * as THREE from 'three';

let camera: THREE.OrthographicCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;

let uniforms: Record<string, THREE.IUniform<unknown>>;

init();

function init() {
    const container = document.getElementById('container')!;

    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    scene = new THREE.Scene();

    const geometry = new THREE.PlaneGeometry(2, 2);

    uniforms = {
        time: { value: 1.0 },
    };

    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexShader')!.textContent!,
        fragmentShader: document.getElementById('fragmentShader')!.textContent!,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
    uniforms['time'].value = performance.now() / 1000;

    renderer.render(scene, camera);
}
