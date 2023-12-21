import * as THREE from 'three';
import { texture, uniform, normalMap, MeshStandardNodeMaterial, NodeObjectLoader } from 'three/nodes';

import Stats from 'three/addons/libs/stats.module.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

import { nodeFrame } from 'three/addons/renderers/webgl-legacy/nodes/WebGLNodes.js';

let container, stats;

let camera, scene, renderer, controls;

init();
animate();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 3;

    //

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.z = 2;

    controls = new TrackballControls(camera, renderer.domElement);

    // Test Extended Material

    class MeshCustomNodeMaterial extends MeshStandardNodeMaterial {
        constructor() {
            super();
        }
    }

    // Extends Serialization Material

    const superCreateMaterialFromType = THREE.MaterialLoader.createMaterialFromType;

    THREE.MaterialLoader.createMaterialFromType = function (type) {
        const materialLib = {
            MeshCustomNodeMaterial,
        };

        if (materialLib[type] !== undefined) {
            return new materialLib[type]();
        }

        return superCreateMaterialFromType.call(this, type);
    };

    //

    const material = new MeshCustomNodeMaterial();

    new OBJLoader().setPath('models/obj/cerberus/').load('Cerberus.obj', function (group) {
        const loaderManager = new THREE.LoadingManager();

        const loader = new THREE.TextureLoader(loaderManager).setPath('models/obj/cerberus/');

        const diffuseMap = loader.load('Cerberus_A.jpg');
        diffuseMap.wrapS = THREE.RepeatWrapping;
        diffuseMap.colorSpace = THREE.SRGBColorSpace;

        const rmMap = loader.load('Cerberus_RM.jpg');
        rmMap.wrapS = THREE.RepeatWrapping;

        const normalMapTexture = loader.load('Cerberus_N.jpg');
        normalMapTexture.wrapS = THREE.RepeatWrapping;

        const mgMapNode = texture(rmMap);

        material.colorNode = texture(diffuseMap).mul(uniform(material.color));

        // roughness is in G channel, metalness is in B channel
        material.roughnessNode = mgMapNode.g;
        material.metalnessNode = mgMapNode.b;

        material.normalNode = normalMap(texture(normalMapTexture));

        group.traverse(function (child) {
            if (child.isMesh) {
                child.material = material;
            }
        });

        group.position.x = -0.45;
        group.rotation.y = -Math.PI / 2;
        //scene.add( group );

        // TODO: Serialization test

        loaderManager.onLoad = () => {
            const groupJSON = JSON.stringify(group.toJSON());

            const objectLoader = new NodeObjectLoader();
            objectLoader.parse(JSON.parse(groupJSON), newGroup => {
                //scene.remove( group );

                newGroup.position.copy(group.position);
                newGroup.rotation.copy(group.rotation);

                scene.add(newGroup);

                console.log('Serialized!');
            });
        };
    });

    const environments = {
        'Venice Sunset': { filename: 'venice_sunset_1k.hdr' },
        Overpass: { filename: 'pedestrian_overpass_1k.hdr' },
    };

    function loadEnvironment(name) {
        if (environments[name].texture !== undefined) {
            scene.background = environments[name].texture;
            scene.environment = environments[name].texture;
            return;
        }

        const filename = environments[name].filename;
        new RGBELoader().setPath('textures/equirectangular/').load(filename, function (hdrEquirect) {
            const hdrCubeRenderTarget = pmremGenerator.fromEquirectangular(hdrEquirect);
            hdrEquirect.dispose();

            scene.background = hdrCubeRenderTarget.texture;
            scene.environment = hdrCubeRenderTarget.texture;
            environments[name].texture = hdrCubeRenderTarget.texture;
        });
    }

    const params = {
        environment: Object.keys(environments)[0],
    };
    loadEnvironment(params.environment);

    const gui = new GUI();
    gui.add(params, 'environment', Object.keys(environments)).onChange(function (value) {
        loadEnvironment(value);
    });
    gui.open();

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    //

    stats = new Stats();
    container.appendChild(stats.dom);

    window.addEventListener('resize', onWindowResize);
}

//

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

//

function animate() {
    requestAnimationFrame(animate);

    nodeFrame.update();

    controls.update();
    renderer.render(scene, camera);

    stats.update();
}
