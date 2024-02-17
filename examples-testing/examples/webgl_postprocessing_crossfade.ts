import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import TWEEN from 'three/addons/libs/tween.module.js';

let container, stats;
let renderer;
let transition;

const transitionParams = {
    useTexture: true,
    transition: 0,
    texture: 5,
    cycle: true,
    animate: true,
    threshold: 0.3,
};

const clock = new THREE.Clock();

init();
animate();

function init() {
    initGUI();

    container = document.getElementById('container');

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

    const geometryA = new THREE.BoxGeometry(2, 2, 2);
    const geometryB = new THREE.IcosahedronGeometry(1, 1);
    const sceneA = new FXScene(geometryA, new THREE.Vector3(0, -0.4, 0), 0xffffff);
    const sceneB = new FXScene(geometryB, new THREE.Vector3(0, 0.2, 0.1), 0x000000);

    transition = new Transition(sceneA, sceneB);
}

function animate() {
    requestAnimationFrame(animate);

    render();
    stats.update();
}

function initGUI() {
    const gui = new GUI();

    gui.add(transitionParams, 'animate');
    gui.add(transitionParams, 'transition', 0, 1, 0.01).listen();

    gui.add(transitionParams, 'useTexture').onChange(function (value) {
        transition.useTexture(value);
    });

    gui.add(transitionParams, 'texture', { Perlin: 0, Squares: 1, Cells: 2, Distort: 3, Gradient: 4, Radial: 5 })
        .onChange(function (value) {
            transition.setTexture(value);
        })
        .listen();

    gui.add(transitionParams, 'cycle');

    gui.add(transitionParams, 'threshold', 0, 1, 0.01).onChange(function (value) {
        transition.setTextureThreshold(value);
    });
}

function render() {
    transition.render(clock.getDelta());
}

function generateInstancedMesh(geometry, material, count) {
    const mesh = new THREE.InstancedMesh(geometry, material, count);

    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
        dummy.position.x = Math.random() * 100 - 50;
        dummy.position.y = Math.random() * 60 - 30;
        dummy.position.z = Math.random() * 80 - 40;

        dummy.rotation.x = Math.random() * 2 * Math.PI;
        dummy.rotation.y = Math.random() * 2 * Math.PI;
        dummy.rotation.z = Math.random() * 2 * Math.PI;

        dummy.scale.x = Math.random() * 2 + 1;

        if (geometry.type === 'BoxGeometry') {
            dummy.scale.y = Math.random() * 2 + 1;
            dummy.scale.z = Math.random() * 2 + 1;
        } else {
            dummy.scale.y = dummy.scale.x;
            dummy.scale.z = dummy.scale.x;
        }

        dummy.updateMatrix();

        mesh.setMatrixAt(i, dummy.matrix);
        mesh.setColorAt(i, color.setScalar(0.1 + 0.9 * Math.random()));
    }

    return mesh;
}

function FXScene(geometry, rotationSpeed, clearColor) {
    this.clearColor = clearColor;

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 20;

    // Setup scene
    const scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xaaaaaa, 3));

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(0, 1, 4);
    scene.add(light);

    this.rotationSpeed = rotationSpeed;

    const color = geometry.type === 'BoxGeometry' ? 0x0000ff : 0xff0000;
    const material = new THREE.MeshPhongMaterial({ color: color, flatShading: true });
    const mesh = generateInstancedMesh(geometry, material, 500);
    scene.add(mesh);

    this.fbo = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, { type: THREE.HalfFloatType });

    this.render = function (delta, rtt) {
        mesh.rotation.x += delta * this.rotationSpeed.x;
        mesh.rotation.y += delta * this.rotationSpeed.y;
        mesh.rotation.z += delta * this.rotationSpeed.z;

        renderer.setClearColor(this.clearColor);

        if (rtt) {
            renderer.setRenderTarget(this.fbo);
            renderer.clear();
            renderer.render(scene, camera);
        } else {
            renderer.setRenderTarget(null);
            renderer.render(scene, camera);
        }
    };
}

function Transition(sceneA, sceneB) {
    const scene = new THREE.Scene();

    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, -10, 10);

    const textures = [];

    const loader = new THREE.TextureLoader();

    for (let i = 0; i < 6; i++) {
        textures[i] = loader.load('textures/transition/transition' + (i + 1) + '.png');
    }

    const material = new THREE.ShaderMaterial({
        uniforms: {
            tDiffuse1: {
                value: null,
            },
            tDiffuse2: {
                value: null,
            },
            mixRatio: {
                value: 0.0,
            },
            threshold: {
                value: 0.1,
            },
            useTexture: {
                value: 1,
            },
            tMixTexture: {
                value: textures[0],
            },
        },
        vertexShader: [
            'varying vec2 vUv;',

            'void main() {',

            'vUv = vec2( uv.x, uv.y );',
            'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

            '}',
        ].join('\n'),
        fragmentShader: [
            'uniform float mixRatio;',

            'uniform sampler2D tDiffuse1;',
            'uniform sampler2D tDiffuse2;',
            'uniform sampler2D tMixTexture;',

            'uniform int useTexture;',
            'uniform float threshold;',

            'varying vec2 vUv;',

            'void main() {',

            '	vec4 texel1 = texture2D( tDiffuse1, vUv );',
            '	vec4 texel2 = texture2D( tDiffuse2, vUv );',

            '	if (useTexture==1) {',

            '		vec4 transitionTexel = texture2D( tMixTexture, vUv );',
            '		float r = mixRatio * (1.0 + threshold * 2.0) - threshold;',
            '		float mixf=clamp((transitionTexel.r - r)*(1.0/threshold), 0.0, 1.0);',

            '		gl_FragColor = mix( texel1, texel2, mixf );',

            '	} else {',

            '		gl_FragColor = mix( texel2, texel1, mixRatio );',

            '	}',

            '	#include <tonemapping_fragment>',
            '	#include <colorspace_fragment>',

            '}',
        ].join('\n'),
    });

    const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    material.uniforms.tDiffuse1.value = sceneA.fbo.texture;
    material.uniforms.tDiffuse2.value = sceneB.fbo.texture;

    new TWEEN.Tween(transitionParams).to({ transition: 1 }, 1500).repeat(Infinity).delay(2000).yoyo(true).start();

    this.needsTextureChange = false;

    this.setTextureThreshold = function (value) {
        material.uniforms.threshold.value = value;
    };

    this.useTexture = function (value) {
        material.uniforms.useTexture.value = value ? 1 : 0;
    };

    this.setTexture = function (i) {
        material.uniforms.tMixTexture.value = textures[i];
    };

    this.render = function (delta) {
        // Transition animation
        if (transitionParams.animate) {
            TWEEN.update();

            // Change the current alpha texture after each transition
            if (transitionParams.cycle) {
                if (transitionParams.transition == 0 || transitionParams.transition == 1) {
                    if (this.needsTextureChange) {
                        transitionParams.texture = (transitionParams.texture + 1) % textures.length;
                        material.uniforms.tMixTexture.value = textures[transitionParams.texture];
                        this.needsTextureChange = false;
                    }
                } else {
                    this.needsTextureChange = true;
                }
            } else {
                this.needsTextureChange = true;
            }
        }

        material.uniforms.mixRatio.value = transitionParams.transition;

        // Prevent render both scenes when it's not necessary
        if (transitionParams.transition == 0) {
            sceneB.render(delta, false);
        } else if (transitionParams.transition == 1) {
            sceneA.render(delta, false);
        } else {
            // When 0<transition<1 render transition between two scenes

            sceneA.render(delta, true);
            sceneB.render(delta, true);

            renderer.setRenderTarget(null);
            renderer.clear();
            renderer.render(scene, camera);
        }
    };
}
