import * as THREE from 'three';
import { texture, uniform, saturation, hue } from 'three/tsl';

let camera, scene, renderer;
const mouse = new THREE.Vector2();

let quadMesh, renderTarget;

let box;

const dpr = window.devicePixelRatio;

init();

function init() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10);
    camera.position.z = 3;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0066ff);

    // textured mesh

    const loader = new THREE.TextureLoader();
    const uvTexture = loader.load('./textures/uv_grid_opengl.jpg');

    const geometryBox = new THREE.BoxGeometry();
    const materialBox = new THREE.MeshBasicNodeMaterial();
    materialBox.colorNode = texture(uvTexture);

    //

    box = new THREE.Mesh(geometryBox, materialBox);
    scene.add(box);

    //

    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    renderTarget = new THREE.RenderTarget(window.innerWidth * dpr, window.innerHeight * dpr);

    window.addEventListener('mousemove', onWindowMouseMove);
    window.addEventListener('resize', onWindowResize);

    // FX

    // modulate the final color based on the mouse position

    const screenFXNode = uniform(mouse);

    const materialFX = new THREE.MeshBasicNodeMaterial();
    materialFX.colorNode = hue(
        saturation(texture(renderTarget.texture).rgb, screenFXNode.x.oneMinus()),
        screenFXNode.y,
    );

    quadMesh = new THREE.QuadMesh(materialFX);
}

function onWindowMouseMove(e) {
    mouse.x = e.offsetX / window.innerWidth;
    mouse.y = e.offsetY / window.innerHeight;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderTarget.setSize(window.innerWidth * dpr, window.innerHeight * dpr);
}

function animate() {
    box.rotation.x += 0.01;
    box.rotation.y += 0.02;

    renderer.setRenderTarget(renderTarget);
    renderer.render(scene, camera);

    renderer.setRenderTarget(null);
    quadMesh.render(renderer);
}
