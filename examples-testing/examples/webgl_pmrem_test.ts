import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let scene, camera, controls, renderer;

function init() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;

    // renderer

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // tonemapping
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);

    // scene

    scene = new THREE.Scene();

    // camera

    camera = new THREE.PerspectiveCamera(40, aspect, 1, 30);
    updateCamera();
    camera.position.set(0, 0, 16);

    // controls

    controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render); // use if there is no animation loop
    controls.minDistance = 4;
    controls.maxDistance = 20;

    // light

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0); // set intensity to 0 to start
    const x = 597;
    const y = 213;
    const theta = ((x + 0.5) * Math.PI) / 512;
    const phi = ((y + 0.5) * Math.PI) / 512;

    directionalLight.position.setFromSphericalCoords(100, -phi, Math.PI / 2 - theta);

    scene.add(directionalLight);
    // scene.add( new THREE.DirectionalLightHelper( directionalLight ) );

    // The spot1Lux HDR environment map is expressed in nits (lux / sr). The directional light has units of lux,
    // so to match a 1 lux light, we set a single pixel with a value equal to 1 divided by the solid
    // angle of the pixel in steradians. This image is 1024 x 512,
    // so the value is 1 / ( sin( phi ) * ( pi / 512 ) ^ 2 ) = 27,490 nits.

    const gui = new GUI();
    gui.add({ enabled: true }, 'enabled')
        .name('PMREM')
        .onChange(value => {
            directionalLight.intensity = value ? 0 : 1;

            scene.traverse(function (child) {
                if (child.isMesh) {
                    child.material.envMapIntensity = 1 - directionalLight.intensity;
                }
            });

            render();
        });
}

function createObjects() {
    let radianceMap = null;
    new RGBELoader()
        // .setDataType( THREE.FloatType )
        .setPath('textures/equirectangular/')
        .load('spot1Lux.hdr', function (texture) {
            radianceMap = pmremGenerator.fromEquirectangular(texture).texture;
            pmremGenerator.dispose();

            scene.background = radianceMap;

            const geometry = new THREE.SphereGeometry(0.4, 32, 32);

            for (let x = 0; x <= 10; x++) {
                for (let y = 0; y <= 2; y++) {
                    const material = new THREE.MeshPhysicalMaterial({
                        roughness: x / 10,
                        metalness: y < 1 ? 1 : 0,
                        color: y < 2 ? 0xffffff : 0x000000,
                        envMap: radianceMap,
                        envMapIntensity: 1,
                    });

                    const mesh = new THREE.Mesh(geometry, material);
                    mesh.position.x = x - 5;
                    mesh.position.y = 1 - y;
                    scene.add(mesh);
                }
            }

            render();
        });

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    updateCamera();

    renderer.setSize(width, height);

    render();
}

function updateCamera() {
    const horizontalFoV = 40;
    const verticalFoV =
        (2 * Math.atan(Math.tan(((horizontalFoV / 2) * Math.PI) / 180) / camera.aspect) * 180) / Math.PI;
    camera.fov = verticalFoV;
    camera.updateProjectionMatrix();
}

function render() {
    renderer.render(scene, camera);
}

Promise.resolve().then(init).then(createObjects).then(render);
