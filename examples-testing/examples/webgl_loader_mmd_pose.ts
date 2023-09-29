import * as THREE from 'three';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
import { MMDLoader } from 'three/addons/loaders/MMDLoader.js';
import { MMDAnimationHelper } from 'three/addons/animation/MMDAnimationHelper.js';

let camera, scene, renderer, effect;
let mesh, helper;

const vpds = [];

Ammo().then(function (AmmoLib) {
    Ammo = AmmoLib;

    init();
    animate();
});

function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 25;

    // scene

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const ambient = new THREE.AmbientLight(0xaaaaaa, 3);
    scene.add(ambient);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(-1, 1, 1).normalize();
    scene.add(directionalLight);

    //

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    effect = new OutlineEffect(renderer);

    // model

    function onProgress(xhr) {
        if (xhr.lengthComputable) {
            const percentComplete = (xhr.loaded / xhr.total) * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    }

    const modelFile = 'models/mmd/miku/miku_v2.pmd';
    const vpdFiles = [
        'models/mmd/vpds/01.vpd',
        'models/mmd/vpds/02.vpd',
        'models/mmd/vpds/03.vpd',
        'models/mmd/vpds/04.vpd',
        'models/mmd/vpds/05.vpd',
        'models/mmd/vpds/06.vpd',
        'models/mmd/vpds/07.vpd',
        'models/mmd/vpds/08.vpd',
        //'models/mmd/vpds/09.vpd',
        //'models/mmd/vpds/10.vpd',
        'models/mmd/vpds/11.vpd',
    ];

    helper = new MMDAnimationHelper();

    const loader = new MMDLoader();

    loader.load(
        modelFile,
        function (object) {
            mesh = object;
            mesh.position.y = -10;

            scene.add(mesh);

            let vpdIndex = 0;

            function loadVpd() {
                const vpdFile = vpdFiles[vpdIndex];

                loader.loadVPD(
                    vpdFile,
                    false,
                    function (vpd) {
                        vpds.push(vpd);

                        vpdIndex++;

                        if (vpdIndex < vpdFiles.length) {
                            loadVpd();
                        } else {
                            initGui();
                        }
                    },
                    onProgress,
                    null,
                );
            }

            loadVpd();
        },
        onProgress,
        null,
    );

    //

    window.addEventListener('resize', onWindowResize);

    function initGui() {
        const gui = new GUI();

        const dictionary = mesh.morphTargetDictionary;

        const controls = {};
        const keys = [];

        const poses = gui.addFolder('Poses');
        const morphs = gui.addFolder('Morphs');

        function getBaseName(s) {
            return s.slice(s.lastIndexOf('/') + 1);
        }

        function initControls() {
            for (const key in dictionary) {
                controls[key] = 0.0;
            }

            controls.pose = -1;

            for (let i = 0; i < vpdFiles.length; i++) {
                controls[getBaseName(vpdFiles[i])] = false;
            }
        }

        function initKeys() {
            for (const key in dictionary) {
                keys.push(key);
            }
        }

        function initPoses() {
            const files = { default: -1 };

            for (let i = 0; i < vpdFiles.length; i++) {
                files[getBaseName(vpdFiles[i])] = i;
            }

            poses.add(controls, 'pose', files).onChange(onChangePose);
        }

        function initMorphs() {
            for (const key in dictionary) {
                morphs.add(controls, key, 0.0, 1.0, 0.01).onChange(onChangeMorph);
            }
        }

        function onChangeMorph() {
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = controls[key];
                mesh.morphTargetInfluences[i] = value;
            }
        }

        function onChangePose() {
            const index = parseInt(controls.pose);

            if (index === -1) {
                mesh.pose();
            } else {
                helper.pose(mesh, vpds[index]);
            }
        }

        initControls();
        initKeys();
        initPoses();
        initMorphs();

        onChangeMorph();
        onChangePose();

        poses.open();
        morphs.open();
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    effect.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    effect.render(scene, camera);
}
