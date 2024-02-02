import * as THREE from 'three';
import { texture, textureStore, wgslFn, code, instanceIndex, uniform } from 'three/nodes';

import WebGPU from 'three/addons/capabilities/WebGPU.js';
import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js';
import StorageTexture from 'three/addons/renderers/common/StorageTexture.js';

let camera, scene, renderer;
let computeInitNode, computeToPing, computeToPong;
let pingTexture, pongTexture;
let material;
let phase = true;
let lastUpdate = -1;

const seed = uniform(new THREE.Vector2());

init();
render();

function init() {
    if (WebGPU.isAvailable() === false) {
        document.body.appendChild(WebGPU.getErrorMessage());

        throw new Error('No WebGPU support');
    }

    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0, 2);
    camera.position.z = 1;

    scene = new THREE.Scene();

    // texture

    const hdr = true;
    const width = 512,
        height = 512;

    pingTexture = new StorageTexture(width, height);
    pongTexture = new StorageTexture(width, height);

    if (hdr) {
        pingTexture.type = THREE.HalfFloatType;
        pongTexture.type = THREE.HalfFloatType;
    }

    const wgslFormat = hdr ? 'rgba16float' : 'rgba8unorm';

    // compute init

    const rand2 = code(`
					fn rand2( n: vec2f ) -> f32 {

						return fract( sin( dot( n, vec2f( 12.9898, 4.1414 ) ) ) * 43758.5453 );

					}

					fn blur( image : texture_2d<f32>, uv : vec2i ) -> vec4f {

						var color = vec4f( 0.0 );

						color += textureLoad( image, uv + vec2i( - 1, 1 ), 0 );
						color += textureLoad( image, uv + vec2i( - 1, - 1 ), 0 );
						color += textureLoad( image, uv + vec2i( 0, 0 ), 0 );
						color += textureLoad( image, uv + vec2i( 1, - 1 ), 0 );
						color += textureLoad( image, uv + vec2i( 1, 1 ), 0 );

						return color / 5.0; 
					}

					fn getUV( posX: u32, posY: u32 ) -> vec2f {

						let uv = vec2f( f32( posX ) / ${width}.0, f32( posY ) / ${height}.0 );

						return uv;

					}
				`);

    const computeInitWGSL = wgslFn(
        `
					fn computeInitWGSL( writeTex: texture_storage_2d<${wgslFormat}, write>, index: u32, seed: vec2f ) -> void {

						let posX = index % ${width};
						let posY = index / ${width};
						let indexUV = vec2u( posX, posY );
						let uv = getUV( posX, posY );

						let r = rand2( uv + seed * 100 ) - rand2( uv + seed * 300 );
						let g = rand2( uv + seed * 200 ) - rand2( uv + seed * 300 );
						let b = rand2( uv + seed * 200 ) - rand2( uv + seed * 100 );

						textureStore( writeTex, indexUV, vec4( r, g, b, 1 ) );

					}
				`,
        [rand2],
    );

    computeInitNode = computeInitWGSL({ writeTex: textureStore(pingTexture), index: instanceIndex, seed }).compute(
        width * height,
    );

    // compute loop

    const computePingPongWGSL = wgslFn(
        `
					fn computePingPongWGSL( readTex: texture_2d<f32>, writeTex: texture_storage_2d<${wgslFormat}, write>, index: u32 ) -> void {

						let posX = index % ${width};
						let posY = index / ${width};
						let indexUV = vec2i( i32( posX ), i32( posY ) );

						let color = blur( readTex, indexUV ).rgb;

						textureStore( writeTex, indexUV, vec4f( color * 1.05, 1 ) );

					}
				`,
        [rand2],
    );

    //

    computeToPong = computePingPongWGSL({
        readTex: texture(pingTexture),
        writeTex: textureStore(pongTexture),
        index: instanceIndex,
    }).compute(width * height);
    computeToPing = computePingPongWGSL({
        readTex: texture(pongTexture),
        writeTex: textureStore(pingTexture),
        index: instanceIndex,
    }).compute(width * height);

    //

    material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: pongTexture });

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    scene.add(plane);

    renderer = new WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(render);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);

    // compute init

    renderer.compute(computeInitNode);
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);

    const aspect = window.innerWidth / window.innerHeight;

    const frustumHeight = camera.top - camera.bottom;

    camera.left = (-frustumHeight * aspect) / 2;
    camera.right = (frustumHeight * aspect) / 2;

    camera.updateProjectionMatrix();

    render();
}

function render() {
    const time = performance.now();
    const seconds = Math.floor(time / 1000);

    // reset every second

    if (phase && seconds !== lastUpdate) {
        seed.value.set(Math.random(), Math.random());

        renderer.compute(computeInitNode);

        lastUpdate = seconds;
    }

    // compute step

    renderer.compute(phase ? computeToPong : computeToPing);

    material.map = phase ? pongTexture : pingTexture;

    phase = !phase;

    // render step

    // update material texture node

    renderer.render(scene, camera);
}
