import * as THREE from 'three';

import { DragControls } from 'three/addons/controls/DragControls.js';

let container: HTMLDivElement;
let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
let controls: DragControls, group: THREE.Group;
let enableSelection = false;

const objects: THREE.Object3D[] = [];

const mouse = new THREE.Vector2(),
    raycaster = new THREE.Raycaster();

init();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.z = 25;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    scene.add(new THREE.AmbientLight(0xaaaaaa));

    const light = new THREE.SpotLight(0xffffff, 10000);
    light.position.set(0, 25, 50);
    light.angle = Math.PI / 9;

    light.castShadow = true;
    light.shadow.camera.near = 10;
    light.shadow.camera.far = 100;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    scene.add(light);

    group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.BoxGeometry();

    for (let i = 0; i < 200; i++) {
        const object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));

        object.position.x = Math.random() * 30 - 15;
        object.position.y = Math.random() * 15 - 7.5;
        object.position.z = Math.random() * 20 - 10;

        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;

        object.scale.x = Math.random() * 2 + 1;
        object.scale.y = Math.random() * 2 + 1;
        object.scale.z = Math.random() * 2 + 1;

        object.castShadow = true;
        object.receiveShadow = true;

        scene.add(object);

        objects.push(object);
    }

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    container.appendChild(renderer.domElement);

    controls = new DragControls([...objects], camera, renderer.domElement);
    controls.rotateSpeed = 2;
    controls.addEventListener('drag', render);

    //

    window.addEventListener('resize', onWindowResize);

    document.addEventListener('click', onClick);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    render();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();
}

function onKeyDown(event: KeyboardEvent) {
    enableSelection = event.keyCode === 16 ? true : false;

    if (event.keyCode === 77) {
        controls.touches.ONE = controls.touches.ONE === THREE.TOUCH.PAN ? THREE.TOUCH.ROTATE : THREE.TOUCH.PAN;
    }
}

function onKeyUp() {
    enableSelection = false;
}

function onClick(event: MouseEvent) {
    event.preventDefault();

    if (enableSelection === true) {
        const draggableObjects = controls.objects;
        draggableObjects.length = 0;

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersections = raycaster.intersectObjects(objects, true);

        if (intersections.length > 0) {
            const object = intersections[0].object;

            if (group.children.includes(object) === true) {
                ((object as THREE.Mesh).material as THREE.MeshLambertMaterial).emissive.set(0x000000);
                scene.attach(object);
            } else {
                ((object as THREE.Mesh).material as THREE.MeshLambertMaterial).emissive.set(0xaaaaaa);
                group.attach(object);
            }

            controls.transformGroup = true;
            draggableObjects.push(group);
        }

        if (group.children.length === 0) {
            controls.transformGroup = false;
            draggableObjects.push(...objects);
        }
    }

    render();
}

function render() {
    renderer.render(scene, camera);
}
