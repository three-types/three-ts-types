import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let container: HTMLDivElement,
    stats: Stats,
    clock: THREE.Clock,
    gui: GUI,
    mixer: THREE.AnimationMixer,
    actions: Record<string, THREE.AnimationAction>,
    activeAction: THREE.AnimationAction,
    previousAction: THREE.AnimationAction;
let camera: THREE.PerspectiveCamera,
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer,
    model: THREE.Group,
    face: THREE.Mesh;

const api: {
    state: string;
    Jump?: () => void;
    Yes?: () => void;
    No?: () => void;
    Wave?: () => void;
    Punch?: () => void;
    ThumbsUp?: () => void;
} = { state: 'Walking' };

init();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 100);
    camera.position.set(-5, 3, 10);
    camera.lookAt(0, 2, 0);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe0e0e0);
    scene.fog = new THREE.Fog(0xe0e0e0, 20, 100);

    clock = new THREE.Clock();

    // lights

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(0, 20, 10);
    scene.add(dirLight);

    // ground

    const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2000, 2000),
        new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false }),
    );
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);

    const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add(grid);

    // model

    const loader = new GLTFLoader();
    loader.load(
        'models/gltf/RobotExpressive/RobotExpressive.glb',
        function (gltf) {
            model = gltf.scene;
            scene.add(model);

            createGUI(model, gltf.animations);
        },
        undefined,
        function (e) {
            console.error(e);
        },
    );

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);

    // stats
    stats = new Stats();
    container.appendChild(stats.dom);
}

function createGUI(model: THREE.Group, animations: THREE.AnimationClip[]) {
    const states = ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing'];
    const emotes = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp'] as const;

    gui = new GUI();

    mixer = new THREE.AnimationMixer(model);

    actions = {};

    for (let i = 0; i < animations.length; i++) {
        const clip = animations[i];
        const action = mixer.clipAction(clip);
        actions[clip.name] = action;

        if (emotes.indexOf(clip.name as (typeof emotes)[number]) >= 0 || states.indexOf(clip.name) >= 4) {
            action.clampWhenFinished = true;
            action.loop = THREE.LoopOnce;
        }
    }

    // states

    const statesFolder = gui.addFolder('States');

    const clipCtrl = statesFolder.add(api, 'state').options(states);

    clipCtrl.onChange(function () {
        fadeToAction(api.state, 0.5);
    });

    statesFolder.open();

    // emotes

    const emoteFolder = gui.addFolder('Emotes');

    function createEmoteCallback(name: (typeof emotes)[number]) {
        api[name] = function () {
            fadeToAction(name, 0.2);

            mixer.addEventListener('finished', restoreState);
        };

        emoteFolder.add(api as Required<typeof api>, name);
    }

    function restoreState() {
        mixer.removeEventListener('finished', restoreState);

        fadeToAction(api.state, 0.2);
    }

    for (let i = 0; i < emotes.length; i++) {
        createEmoteCallback(emotes[i]);
    }

    emoteFolder.open();

    // expressions

    face = model.getObjectByName('Head_4') as THREE.Mesh;

    const expressions = Object.keys(face.morphTargetDictionary!);
    const expressionFolder = gui.addFolder('Expressions');

    for (let i = 0; i < expressions.length; i++) {
        expressionFolder.add(face.morphTargetInfluences!, i, 0, 1, 0.01).name(expressions[i]);
    }

    activeAction = actions['Walking'];
    activeAction.play();

    expressionFolder.open();
}

function fadeToAction(name: string, duration: number) {
    previousAction = activeAction;
    activeAction = actions[name];

    if (previousAction !== activeAction) {
        previousAction.fadeOut(duration);
    }

    activeAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(duration).play();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
    const dt = clock.getDelta();

    if (mixer) mixer.update(dt);

    renderer.render(scene, camera);

    stats.update();
}
