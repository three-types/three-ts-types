import { InstancedMesh, PerspectiveCamera, Scene, WebGLRenderer } from 'three'

const camera = new PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 2500);
const renderer = new WebGLRenderer({ antialias: true });
const scene = new Scene();

const container = document.createElement('div');

function init() {
  document.body.appendChild(container);
}

function render() {
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);

  render();
}

init();
animate();
