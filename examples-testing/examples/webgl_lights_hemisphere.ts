import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
const mixers: THREE.AnimationMixer[] = [];
let stats: Stats;

const clock = new THREE.Clock();

init();

function init() {
    const container = document.getElementById('container')!;

    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.set(0, 0, 250);

    scene = new THREE.Scene();
    scene.background = new THREE.Color().setHSL(0.6, 0, 1);
    scene.fog = new THREE.Fog(scene.background, 1, 5000);

    // LIGHTS

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
    scene.add(hemiLightHelper);

    //

    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(-1, 1.75, 1);
    dirLight.position.multiplyScalar(30);
    scene.add(dirLight);

    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;

    const d = 50;

    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = -0.0001;

    const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
    scene.add(dirLightHelper);

    // GROUND

    const groundGeo = new THREE.PlaneGeometry(10000, 10000);
    const groundMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    groundMat.color.setHSL(0.095, 1, 0.75);

    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -33;
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // SKYDOME

    const vertexShader = document.getElementById('vertexShader')!.textContent!;
    const fragmentShader = document.getElementById('fragmentShader')!.textContent!;
    const uniforms = {
        topColor: { value: new THREE.Color(0x0077ff) },
        bottomColor: { value: new THREE.Color(0xffffff) },
        offset: { value: 33 },
        exponent: { value: 0.6 },
    };
    uniforms['topColor'].value.copy(hemiLight.color);

    scene.fog.color.copy(uniforms['bottomColor'].value);

    const skyGeo = new THREE.SphereGeometry(4000, 32, 15);
    const skyMat = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.BackSide,
    });

    const sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);

    // MODEL

    const loader = new GLTFLoader();

    loader.load('models/gltf/Flamingo.glb', function (gltf) {
        const mesh = gltf.scene.children[0];

        const s = 0.35;
        mesh.scale.set(s, s, s);
        mesh.position.y = 15;
        mesh.rotation.y = -1;

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add(mesh);

        const mixer = new THREE.AnimationMixer(mesh);
        mixer.clipAction(gltf.animations[0]).setDuration(1).play();
        mixers.push(mixer);
    });

    // RENDERER

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;

    // STATS

    stats = new Stats();
    container.appendChild(stats.dom);

    //

    const params = {
        toggleHemisphereLight: function () {
            hemiLight.visible = !hemiLight.visible;
            hemiLightHelper.visible = !hemiLightHelper.visible;
        },
        toggleDirectionalLight: function () {
            dirLight.visible = !dirLight.visible;
            dirLightHelper.visible = !dirLightHelper.visible;
        },
        shadowIntensity: 1,
    };

    const gui = new GUI();

    gui.add(params, 'toggleHemisphereLight').name('toggle hemisphere light');
    gui.add(params, 'toggleDirectionalLight').name('toggle directional light');
    gui.add(params, 'shadowIntensity', 0, 1)
        .name('shadow intensity')
        .onChange(value => {
            dirLight.shadow.intensity = value;
        });
    gui.open();

    //

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
    render();
    stats.update();
}

function render() {
    const delta = clock.getDelta();

    for (let i = 0; i < mixers.length; i++) {
        mixers[i].update(delta);
    }

    renderer.render(scene, camera);
}
