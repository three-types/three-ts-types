import * as THREE from 'three';
import * as Nodes from 'three/nodes';

import {
    tslFn,
    wgslFn,
    positionLocal,
    positionWorld,
    normalLocal,
    normalWorld,
    normalView,
    color,
    texture,
    uv,
    float,
    vec2,
    vec3,
    vec4,
    oscSine,
    triplanarTexture,
    viewportBottomLeft,
    js,
    string,
    global,
    loop,
    MeshBasicNodeMaterial,
    NodeObjectLoader,
} from 'three/nodes';

import WebGPU from 'three/addons/capabilities/WebGPU.js';
import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js';

import { TeapotGeometry } from 'three/addons/geometries/TeapotGeometry.js';

import Stats from 'three/addons/libs/stats.module.js';

let stats;

let camera, scene, renderer;

const objects = [],
    materials = [];

init();

function init() {
    if (WebGPU.isAvailable() === false) {
        document.body.appendChild(WebGPU.getErrorMessage());

        throw new Error('No WebGPU support');
    }

    const container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(0, 200, 800);

    scene = new THREE.Scene();

    // Grid

    const helper = new THREE.GridHelper(1000, 40, 0x303030, 0x303030);
    helper.position.y = -75;
    scene.add(helper);

    // Materials

    const textureLoader = new THREE.TextureLoader();

    const uvTexture = textureLoader.load('./textures/uv_grid_opengl.jpg');
    uvTexture.wrapS = THREE.RepeatWrapping;
    uvTexture.wrapT = THREE.RepeatWrapping;

    const opacityTexture = textureLoader.load('./textures/alphaMap.jpg');
    opacityTexture.wrapS = THREE.RepeatWrapping;
    opacityTexture.wrapT = THREE.RepeatWrapping;

    let material;

    //
    //	BASIC
    //

    // PositionLocal
    material = new MeshBasicNodeMaterial();
    material.colorNode = positionLocal;
    materials.push(material);

    // PositionWorld
    material = new MeshBasicNodeMaterial();
    material.colorNode = positionWorld;
    materials.push(material);

    // NormalLocal
    material = new MeshBasicNodeMaterial();
    material.colorNode = normalLocal;
    materials.push(material);

    // NormalWorld
    material = new MeshBasicNodeMaterial();
    material.colorNode = normalWorld;
    materials.push(material);

    // NormalView
    material = new MeshBasicNodeMaterial();
    material.colorNode = normalView;
    materials.push(material);

    // Texture
    material = new MeshBasicNodeMaterial();
    material.colorNode = texture(uvTexture);
    materials.push(material);

    // Opacity
    material = new MeshBasicNodeMaterial();
    material.colorNode = color(0x0099ff);
    material.opacityNode = texture(uvTexture);
    material.transparent = true;
    materials.push(material);

    // AlphaTest
    material = new MeshBasicNodeMaterial();
    material.colorNode = texture(uvTexture);
    material.opacityNode = texture(opacityTexture);
    material.alphaTestNode = 0.5;
    materials.push(material);

    // Normal
    material = new THREE.MeshNormalMaterial();
    material.opacity = 0.5;
    material.transparent = true;
    materials.push(material);

    //
    //	ADVANCED
    //

    // Custom ShaderNode ( desaturate filter )

    const desaturateShaderNode = tslFn(input => {
        return vec3(0.299, 0.587, 0.114).dot(input.color.xyz);
    });

    material = new MeshBasicNodeMaterial();
    material.colorNode = desaturateShaderNode({ color: texture(uvTexture) });
    materials.push(material);

    // Custom ShaderNode(no inputs) > Approach 2

    const desaturateNoInputsShaderNode = tslFn(() => {
        return vec3(0.299, 0.587, 0.114).dot(texture(uvTexture).xyz);
    });

    material = new MeshBasicNodeMaterial();
    material.colorNode = desaturateNoInputsShaderNode();
    materials.push(material);

    // Custom WGSL ( desaturate filter )

    const desaturateWGSLFn = wgslFn(`
					fn desaturate( color:vec3<f32> ) -> vec3<f32> {

						let lum = vec3<f32>( 0.299, 0.587, 0.114 );

						return vec3<f32>( dot( lum, color ) );

					}
				`);

    // include example

    const someWGSLFn = wgslFn(
        `
					fn someFn( color:vec3<f32> ) -> vec3<f32> {

						return desaturate( color );

					}
				`,
        [desaturateWGSLFn],
    );

    material = new MeshBasicNodeMaterial();
    material.colorNode = someWGSLFn({ color: texture(uvTexture) });
    materials.push(material);

    // Custom WGSL ( get texture from keywords )

    const getWGSLTextureSample = wgslFn(`
					fn getWGSLTextureSample( tex: texture_2d<f32>, tex_sampler: sampler, uv:vec2<f32> ) -> vec4<f32> {

						return textureSample( tex, tex_sampler, uv ) * vec4<f32>( 0.0, 1.0, 0.0, 1.0 );

					}
				`);

    const textureNode = texture(uvTexture);
    //getWGSLTextureSample.keywords = { tex: textureNode, tex_sampler: sampler( textureNode ) };

    material = new MeshBasicNodeMaterial();
    material.colorNode = getWGSLTextureSample({ tex: textureNode, tex_sampler: textureNode, uv: uv() });
    materials.push(material);

    // Triplanar Texture Mapping
    material = new MeshBasicNodeMaterial();
    material.colorNode = triplanarTexture(texture(uvTexture), null, null, float(0.01));
    materials.push(material);

    // Screen Projection Texture
    material = new MeshBasicNodeMaterial();
    material.colorNode = texture(uvTexture, viewportBottomLeft);
    materials.push(material);

    // Loop
    material = new MeshBasicNodeMaterial();
    materials.push(material);

    const loopCount = 10;
    material.colorNode = loop(loopCount, ({ i }, stack) => {
        const output = vec4().temp();
        const scale = oscSine().mul(0.09); // just a value to test

        const scaleI = scale.mul(i);
        const scaleINeg = scaleI.negate();

        const leftUV = uv().add(vec2(scaleI, 0));
        const rightUV = uv().add(vec2(scaleINeg, 0));
        const topUV = uv().add(vec2(0, scaleI));
        const bottomUV = uv().add(vec2(0, scaleINeg));

        stack.assign(output, output.add(texture(uvTexture, leftUV)));
        stack.assign(output, output.add(texture(uvTexture, rightUV)));
        stack.assign(output, output.add(texture(uvTexture, topUV)));
        stack.assign(output, output.add(texture(uvTexture, bottomUV)));

        return output.div(loopCount * 4);
    });

    // Scriptable

    global.set('THREE', THREE);
    global.set('TSL', Nodes);

    const asyncNode = js(`

					layout = {
						outputType: 'node'
					};

					const { float } = TSL;

					function init() {

						setTimeout( () => {

							local.set( 'result', float( 1.0 ) );

							refresh(); // refresh the node

						}, 1000 );

						return float( 0.0 );

					}

					function main() {

						const result = local.get( 'result', init );

						//console.log( 'result', result );

						return result;

					}

				`).scriptable();

    const scriptableNode = js(`

					layout = {
						outputType: 'node',
						elements: [
							{ name: 'source', inputType: 'node' },
							{ name: 'contrast', inputType: 'node' },
							{ name: 'vector3', inputType: 'Vector3' },
							{ name: 'message', inputType: 'string' },
							{ name: 'binary', inputType: 'ArrayBuffer' },
							{ name: 'object3d', inputType: 'Object3D' },
							{ name: 'execFrom', inputType: 'string' }
						]
					};

					const { saturation, float, oscSine, mul } = TSL;

					function helloWorld() {

						console.log( "Hello World!" );

					}

					function main() {

						const source = parameters.get( 'source' ) || float();
						const contrast = parameters.get( 'contrast' ) || float();

						const material = local.get( 'material' );

						//console.log( 'vector3', parameters.get( 'vector3' ) );

						if ( parameters.get( 'execFrom' ) === 'serialized' ) {

							//console.log( 'message', parameters.get( 'message' ).value );
							//console.log( 'binary', parameters.get( 'binary' ) );
							//console.log( 'object3d', parameters.get( 'object3d' ) ); // unserializable yet

							//console.log( global.get( 'renderer' ) );

						}

						if ( material ) material.needsUpdate = true;

						return mul( saturation( source, oscSine() ), contrast );

					}

					output = { helloWorld };

				`).scriptable();

    scriptableNode.setParameter('source', texture(uvTexture).xyz);
    scriptableNode.setParameter('contrast', asyncNode);
    scriptableNode.setParameter('vector3', vec3(new THREE.Vector3(1, 1, 1)));
    scriptableNode.setParameter('message', string('Hello World!'));
    scriptableNode.setParameter('binary', new ArrayBuffer(4));
    scriptableNode.setParameter('object3d', new THREE.Group());

    scriptableNode.call('helloWorld');

    material = new MeshBasicNodeMaterial();
    material.colorNode = scriptableNode;
    materials.push(material);

    scriptableNode.setLocal('material', material);

    //
    // Geometry
    //

    const geometry = new TeapotGeometry(50, 18);

    for (let i = 0, l = materials.length; i < l; i++) {
        addMesh(geometry, materials[i]);
    }

    const serializeMesh = scene.children[scene.children.length - 1];

    //

    renderer = new WebGPURenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    //

    stats = new Stats();
    container.appendChild(stats.dom);

    //

    window.addEventListener('resize', onWindowResize);

    //

    setTimeout(() => testSerialization(serializeMesh), 1000);
}

function addMesh(geometry, material) {
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = (objects.length % 4) * 200 - 400;
    mesh.position.z = Math.floor(objects.length / 4) * 200 - 200;

    mesh.rotation.x = Math.random() * 200 - 100;
    mesh.rotation.y = Math.random() * 200 - 100;
    mesh.rotation.z = Math.random() * 200 - 100;

    objects.push(mesh);

    scene.add(mesh);
}

function testSerialization(mesh) {
    const json = mesh.toJSON();
    const loader = new NodeObjectLoader();
    const serializedMesh = loader.parse(json);

    serializedMesh.position.x = (objects.length % 4) * 200 - 400;
    serializedMesh.position.z = Math.floor(objects.length / 4) * 200 - 200;

    const scriptableNode = serializedMesh.material.colorNode;

    // it's because local.get( 'material' ) is used in the example ( local/global is unserializable )
    scriptableNode.setLocal('material', serializedMesh.material);
    scriptableNode.setParameter('execFrom', 'serialized');

    objects.push(serializedMesh);

    scene.add(serializedMesh);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
    const timer = 0.0001 * Date.now();

    camera.position.x = Math.cos(timer) * 1000;
    camera.position.z = Math.sin(timer) * 1000;

    camera.lookAt(scene.position);

    for (let i = 0, l = objects.length; i < l; i++) {
        const object = objects[i];

        object.rotation.x += 0.01;
        object.rotation.y += 0.005;
    }

    renderer.render(scene, camera);

    stats.update();
}
