import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// Mediapipe

import vision from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0';

const { FaceLandmarker, FilesetResolver } = vision;

const blendshapesMap = {
    // '_neutral': '',
    browDownLeft: 'browDown_L',
    browDownRight: 'browDown_R',
    browInnerUp: 'browInnerUp',
    browOuterUpLeft: 'browOuterUp_L',
    browOuterUpRight: 'browOuterUp_R',
    cheekPuff: 'cheekPuff',
    cheekSquintLeft: 'cheekSquint_L',
    cheekSquintRight: 'cheekSquint_R',
    eyeBlinkLeft: 'eyeBlink_L',
    eyeBlinkRight: 'eyeBlink_R',
    eyeLookDownLeft: 'eyeLookDown_L',
    eyeLookDownRight: 'eyeLookDown_R',
    eyeLookInLeft: 'eyeLookIn_L',
    eyeLookInRight: 'eyeLookIn_R',
    eyeLookOutLeft: 'eyeLookOut_L',
    eyeLookOutRight: 'eyeLookOut_R',
    eyeLookUpLeft: 'eyeLookUp_L',
    eyeLookUpRight: 'eyeLookUp_R',
    eyeSquintLeft: 'eyeSquint_L',
    eyeSquintRight: 'eyeSquint_R',
    eyeWideLeft: 'eyeWide_L',
    eyeWideRight: 'eyeWide_R',
    jawForward: 'jawForward',
    jawLeft: 'jawLeft',
    jawOpen: 'jawOpen',
    jawRight: 'jawRight',
    mouthClose: 'mouthClose',
    mouthDimpleLeft: 'mouthDimple_L',
    mouthDimpleRight: 'mouthDimple_R',
    mouthFrownLeft: 'mouthFrown_L',
    mouthFrownRight: 'mouthFrown_R',
    mouthFunnel: 'mouthFunnel',
    mouthLeft: 'mouthLeft',
    mouthLowerDownLeft: 'mouthLowerDown_L',
    mouthLowerDownRight: 'mouthLowerDown_R',
    mouthPressLeft: 'mouthPress_L',
    mouthPressRight: 'mouthPress_R',
    mouthPucker: 'mouthPucker',
    mouthRight: 'mouthRight',
    mouthRollLower: 'mouthRollLower',
    mouthRollUpper: 'mouthRollUpper',
    mouthShrugLower: 'mouthShrugLower',
    mouthShrugUpper: 'mouthShrugUpper',
    mouthSmileLeft: 'mouthSmile_L',
    mouthSmileRight: 'mouthSmile_R',
    mouthStretchLeft: 'mouthStretch_L',
    mouthStretchRight: 'mouthStretch_R',
    mouthUpperUpLeft: 'mouthUpperUp_L',
    mouthUpperUpRight: 'mouthUpperUp_R',
    noseSneerLeft: 'noseSneer_L',
    noseSneerRight: 'noseSneer_R',
    // '': 'tongueOut'
};

//

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100);
camera.position.z = 5;

const scene = new THREE.Scene();
scene.scale.x = -1;

const environment = new RoomEnvironment(renderer);
const pmremGenerator = new THREE.PMREMGenerator(renderer);

scene.background = new THREE.Color(0x666666);
scene.environment = pmremGenerator.fromScene(environment).texture;

const controls = new OrbitControls(camera, renderer.domElement);

// Face

const ktx2Loader = new KTX2Loader().setTranscoderPath('jsm/libs/basis/').detectSupport(renderer);

new GLTFLoader()
    .setKTX2Loader(ktx2Loader)
    .setMeshoptDecoder(MeshoptDecoder)
    .load('models/gltf/facecap.glb', gltf => {
        const mesh = gltf.scene.children[0];
        scene.add(mesh);

        const head = mesh.getObjectByName('mesh_2');
        head.material = new THREE.MeshNormalMaterial();

        // GUI

        const gui = new GUI();
        gui.close();

        const influences = head.morphTargetInfluences;

        for (const [key, value] of Object.entries(head.morphTargetDictionary)) {
            gui.add(influences, value, 0, 1, 0.01).name(key.replace('blendShape1.', '')).listen(influences);
        }

        renderer.setAnimationLoop(animation);
    });

// Video Texture

const video = document.createElement('video');

const texture = new THREE.VideoTexture(video);
texture.colorSpace = THREE.SRGBColorSpace;

const geometry = new THREE.PlaneGeometry(1, 1);
const material = new THREE.MeshBasicMaterial({ map: texture, depthWrite: false });
const videomesh = new THREE.Mesh(geometry, material);
scene.add(videomesh);

// MediaPipe

const filesetResolver = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm',
);

const faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
    baseOptions: {
        modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
        delegate: 'GPU',
    },
    outputFaceBlendshapes: true,
    outputFacialTransformationMatrixes: true,
    runningMode: 'VIDEO',
    numFaces: 1,
});

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'user' } })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function (error) {
            console.error('Unable to access the camera/webcam.', error);
        });
}

const transform = new THREE.Object3D();

function animation() {
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
        const results = faceLandmarker.detectForVideo(video, Date.now());

        if (results.facialTransformationMatrixes.length > 0) {
            const facialTransformationMatrixes = results.facialTransformationMatrixes[0].data;

            transform.matrix.fromArray(facialTransformationMatrixes);
            transform.matrix.decompose(transform.position, transform.quaternion, transform.scale);

            const object = scene.getObjectByName('grp_transform');

            object.position.x = transform.position.x;
            object.position.y = transform.position.z + 40;
            object.position.z = -transform.position.y;

            object.rotation.x = transform.rotation.x;
            object.rotation.y = transform.rotation.z;
            object.rotation.z = -transform.rotation.y;
        }

        if (results.faceBlendshapes.length > 0) {
            const face = scene.getObjectByName('mesh_2');

            const faceBlendshapes = results.faceBlendshapes[0].categories;

            for (const blendshape of faceBlendshapes) {
                const categoryName = blendshape.categoryName;
                const score = blendshape.score;

                const index = face.morphTargetDictionary[blendshapesMap[categoryName]];

                if (index !== undefined) {
                    face.morphTargetInfluences[index] = score;
                }
            }
        }
    }

    videomesh.scale.x = video.videoWidth / 100;
    videomesh.scale.y = video.videoHeight / 100;

    renderer.render(scene, camera);

    controls.update();
}

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});
