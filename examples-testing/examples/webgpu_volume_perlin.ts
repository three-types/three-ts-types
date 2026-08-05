import * as THREE from 'three/webgpu';
import { Break, If, Loop, bool, vec3, vec4, texture3D, uniform, Fn } from 'three/tsl';

import { RaymarchingBox } from 'three/addons/tsl/utils/Raymarching.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js';

import { Inspector } from 'three/addons/inspector/Inspector.js';

const REFINEMENT_STEPS = 4;

let renderer, scene, camera;
let mesh;

init();

function init() {
    renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.inspector = new Inspector();
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 2);

    new OrbitControls(camera, renderer.domElement);

    // Texture

    const size = 128;
    const data = new Uint8Array(size * size * size);

    let i = 0;
    const perlin = new ImprovedNoise();
    const vector = new THREE.Vector3();

    for (let z = 0; z < size; z++) {
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                vector.set(x, y, z).divideScalar(size);

                const d = perlin.noise(vector.x * 6.5, vector.y * 6.5, vector.z * 6.5);

                data[i++] = d * 128 + 128;
            }
        }
    }

    const texture = new THREE.Data3DTexture(data, size, size, size);
    texture.format = THREE.RedFormat;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.unpackAlignment = 1;
    texture.needsUpdate = true;

    // Shader

    const opaqueRaymarchingTexture = Fn(({ texture, steps, threshold, refine }) => {
        const finalColor = vec4(0).toVar();

        const positionPrev = vec3(0).toVar();
        const hasPrev = bool(false).toVar();

        RaymarchingBox(steps, ({ positionRay }) => {
            const mapValue = texture.sample(positionRay.add(0.5)).r.toVar();

            If(mapValue.greaterThan(threshold), () => {
                const surfacePos = positionRay.toVar();

                If(refine.and(hasPrev), () => {
                    // The surface lies between the previous sample (below the threshold)
                    // and the current one (above it). Bisect that interval to localize
                    // the crossing precisely.

                    const p0 = positionPrev.toVar();
                    const p1 = positionRay.toVar();

                    Loop(REFINEMENT_STEPS, () => {
                        const pm = p0.add(p1).mul(0.5).toConst();
                        const dm = texture.sample(pm.add(0.5)).r.toConst();

                        If(dm.greaterThan(threshold), () => {
                            p1.assign(pm);
                        }).Else(() => {
                            p0.assign(pm);
                        });
                    });

                    surfacePos.assign(p1);
                });

                const p = vec3(surfacePos).add(0.5);

                finalColor.rgb.assign(texture.normal(p).mul(0.5).add(surfacePos.mul(1.5).add(0.25)));
                finalColor.a.assign(1);
                Break();
            });

            positionPrev.assign(positionRay);
            hasPrev.assign(true);
        });

        return finalColor;
    });

    //

    const threshold = uniform(0.6);
    const steps = uniform(200);
    const refine = uniform(true);

    const material = new THREE.NodeMaterial();
    material.colorNode = opaqueRaymarchingTexture({
        texture: texture3D(texture, null, 0),
        steps,
        threshold,
        refine,
    });
    material.side = THREE.BackSide;
    material.transparent = true;

    mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
    scene.add(mesh);

    //

    const gui = renderer.inspector.createParameters('Parameters');
    gui.add(threshold, 'value', 0, 1, 0.01).name('threshold');
    gui.add(steps, 'value', 0, 300, 1).name('steps');
    gui.add(refine, 'value').name('refine');

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.render(scene, camera);
}
