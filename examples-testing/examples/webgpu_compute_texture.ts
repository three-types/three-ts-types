import * as THREE from 'three';
import { texture, textureStore, wgslFn, instanceIndex, MeshBasicNodeMaterial } from 'three/nodes';

import WebGPU from 'three/addons/capabilities/WebGPU.js';
import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js';
import StorageTexture from 'three/addons/renderers/common/StorageTexture.js';

let camera, scene, renderer;

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

    const width = 512,
        height = 512;

    const storageTexture = new StorageTexture(width, height);

    // create function

    const computeWGSL = wgslFn(`
					fn computeWGSL( storageTex: texture_storage_2d<rgba8unorm, write>, index: u32 ) -> void {

						let posX = index % ${width};
						let posY = index / ${width};
						let indexUV = vec2u( posX, posY );

						// https://www.shadertoy.com/view/Xst3zN

						let x = f32( posX ) / 50.0;
						let y = f32( posY ) / 50.0;

						let v1 = sin( x );
						let v2 = sin( y );
						let v3 = sin( x + y );
						let v4 = sin( sqrt( x * x + y * y ) + 5.0 );
						let v = v1 + v2 + v3 + v4;

						let PI = 3.14159265359;

						let r = sin( v );
						let g = sin( v + PI );
						let b = sin( v + PI - 0.5 );

						textureStore( storageTex, indexUV, vec4f( r, g, b, 1 ) );

					}
				`);

    // compute

    const computeWGSLCall = computeWGSL({ storageTex: textureStore(storageTexture), index: instanceIndex });
    const computeNode = computeWGSLCall.compute(width * height);

    const material = new MeshBasicNodeMaterial({ color: 0x00ff00 });
    material.colorNode = texture(storageTexture);

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    scene.add(plane);

    renderer = new WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // compute texture
    renderer.compute(computeNode);

    window.addEventListener('resize', onWindowResize);
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
    renderer.render(scene, camera);
}
