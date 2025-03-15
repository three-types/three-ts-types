import * as THREE from 'three';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';

let camera: THREE.PerspectiveCamera,
    controls: FirstPersonControls,
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer,
    light: THREE.DirectionalLight;

let material1: THREE.MeshPhongMaterial, material2: THREE.MeshPhongMaterial, material3: THREE.MeshPhongMaterial;

let analyser1: THREE.AudioAnalyser, analyser2: THREE.AudioAnalyser, analyser3: THREE.AudioAnalyser;

const clock = new THREE.Clock();

const startButton = document.getElementById('startButton')!;
startButton.addEventListener('click', init);

function init() {
    const overlay = document.getElementById('overlay')!;
    overlay.remove();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 25, 0);

    const listener = new THREE.AudioListener();
    camera.add(listener);

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0025);

    light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(0, 0.5, 1).normalize();
    scene.add(light);

    const sphere = new THREE.SphereGeometry(20, 32, 16);

    material1 = new THREE.MeshPhongMaterial({ color: 0xffaa00, flatShading: true, shininess: 0 });
    material2 = new THREE.MeshPhongMaterial({ color: 0xff2200, flatShading: true, shininess: 0 });
    material3 = new THREE.MeshPhongMaterial({ color: 0x6622aa, flatShading: true, shininess: 0 });

    // sound spheres

    const mesh1 = new THREE.Mesh(sphere, material1);
    mesh1.position.set(-250, 30, 0);
    scene.add(mesh1);

    const sound1 = new THREE.PositionalAudio(listener);
    const songElement = document.getElementById('song') as HTMLAudioElement;
    sound1.setMediaElementSource(songElement);
    sound1.setRefDistance(20);
    songElement.play();
    mesh1.add(sound1);

    //

    const mesh2 = new THREE.Mesh(sphere, material2);
    mesh2.position.set(250, 30, 0);
    scene.add(mesh2);

    const sound2 = new THREE.PositionalAudio(listener);
    const skullbeatzElement = document.getElementById('skullbeatz') as HTMLAudioElement;
    sound2.setMediaElementSource(skullbeatzElement);
    sound2.setRefDistance(20);
    skullbeatzElement.play();
    mesh2.add(sound2);

    //

    const mesh3 = new THREE.Mesh(sphere, material3);
    mesh3.position.set(0, 30, -250);
    scene.add(mesh3);

    const sound3 = new THREE.PositionalAudio(listener);
    const oscillator = listener.context.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(144, sound3.context.currentTime);
    oscillator.start(0);
    sound3.setNodeSource(oscillator);
    sound3.setRefDistance(20);
    sound3.setVolume(0.5);
    mesh3.add(sound3);

    // analysers

    analyser1 = new THREE.AudioAnalyser(sound1, 32);
    analyser2 = new THREE.AudioAnalyser(sound2, 32);
    analyser3 = new THREE.AudioAnalyser(sound3, 32);

    // global ambient audio

    const sound4 = new THREE.Audio(listener);
    const utopiaElement = document.getElementById('utopia') as HTMLAudioElement;
    sound4.setMediaElementSource(utopiaElement);
    sound4.setVolume(0.5);
    utopiaElement.play();

    // ground

    const helper = new THREE.GridHelper(1000, 10, 0x444444, 0x444444);
    helper.position.y = 0.1;
    scene.add(helper);

    //

    class SoundControls {
        master: number;
        firstSphere: number;
        secondSphere: number;
        thirdSphere: number;
        Ambient: number;

        constructor() {
            this.master = listener.getMasterVolume();
            this.firstSphere = sound1.getVolume();
            this.secondSphere = sound2.getVolume();
            this.thirdSphere = sound3.getVolume();
            this.Ambient = sound4.getVolume();
        }
    }

    class GeneratorControls {
        frequency: number;
        wavetype: OscillatorType;

        constructor() {
            this.frequency = oscillator.frequency.value;
            this.wavetype = oscillator.type;
        }
    }

    const gui = new GUI();
    const soundControls = new SoundControls();
    const generatorControls = new GeneratorControls();
    const volumeFolder = gui.addFolder('sound volume');
    const generatorFolder = gui.addFolder('sound generator');

    volumeFolder
        .add(soundControls, 'master')
        .min(0.0)
        .max(1.0)
        .step(0.01)
        .onChange(function () {
            listener.setMasterVolume(soundControls.master);
        });
    volumeFolder
        .add(soundControls, 'firstSphere')
        .min(0.0)
        .max(1.0)
        .step(0.01)
        .onChange(function () {
            sound1.setVolume(soundControls.firstSphere);
        });
    volumeFolder
        .add(soundControls, 'secondSphere')
        .min(0.0)
        .max(1.0)
        .step(0.01)
        .onChange(function () {
            sound2.setVolume(soundControls.secondSphere);
        });

    volumeFolder
        .add(soundControls, 'thirdSphere')
        .min(0.0)
        .max(1.0)
        .step(0.01)
        .onChange(function () {
            sound3.setVolume(soundControls.thirdSphere);
        });
    volumeFolder
        .add(soundControls, 'Ambient')
        .min(0.0)
        .max(1.0)
        .step(0.01)
        .onChange(function () {
            sound4.setVolume(soundControls.Ambient);
        });
    volumeFolder.open();
    generatorFolder
        .add(generatorControls, 'frequency')
        .min(50.0)
        .max(5000.0)
        .step(1.0)
        .onChange(function () {
            oscillator.frequency.setValueAtTime(generatorControls.frequency, listener.context.currentTime);
        });
    generatorFolder
        .add(generatorControls, 'wavetype', ['sine', 'square', 'sawtooth', 'triangle'])
        .onChange(function () {
            oscillator.type = generatorControls.wavetype;
        });

    generatorFolder.open();

    //

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    //

    controls = new FirstPersonControls(camera, renderer.domElement);

    controls.movementSpeed = 70;
    controls.lookSpeed = 0.05;
    controls.lookVertical = false;

    //

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    controls.handleResize();
}

function animate() {
    const delta = clock.getDelta();

    controls.update(delta);

    material1.emissive.b = analyser1.getAverageFrequency() / 256;
    material2.emissive.b = analyser2.getAverageFrequency() / 256;
    material3.emissive.b = analyser3.getAverageFrequency() / 256;

    renderer.render(scene, camera);
}
