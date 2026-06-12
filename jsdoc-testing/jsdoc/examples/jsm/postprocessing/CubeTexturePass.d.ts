/**
 * This pass can be used to render a cube texture over the entire screen.
 *
 * ```js
 * const cubeMap = new THREE.CubeTextureLoader().load( urls );
 *
 * const cubeTexturePass = new CubeTexturePass( camera, cubemap );
 * composer.addPass( cubeTexturePass );
 * ```
 *
 * @augments Pass
 * @three_import import { CubeTexturePass } from 'three/addons/postprocessing/CubeTexturePass.js';
 */
export class CubeTexturePass extends Pass {
    /**
     * Constructs a new cube texture pass.
     *
     * @param {PerspectiveCamera} camera - The camera.
     * @param {CubeTexture} tCube - The cube texture to render.
     * @param {number} [opacity=1] - The opacity.
     */
    constructor(camera: PerspectiveCamera, tCube: CubeTexture, opacity?: number);
    /**
     * The camera.
     *
     * @type {PerspectiveCamera}
     */
    camera: PerspectiveCamera;
    /**
     * The cube texture to render.
     *
     * @type {CubeTexture}
     */
    tCube: CubeTexture;
    /**
     * The opacity.
     *
     * @type {number}
     * @default 1
     */
    opacity: number;
    _cubeMesh: Mesh;
    _cubeScene: Scene;
    _cubeCamera: PerspectiveCamera;
    /**
     * Performs the cube texture pass.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
     * destination for the pass.
     * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
     * previous pass from this buffer.
     * @param {number} deltaTime - The delta time in seconds.
     * @param {boolean} maskActive - Whether masking is active or not.
     */
    render(renderer: WebGLRenderer, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget): void;
}
import { Pass } from './Pass.js';
import { PerspectiveCamera } from 'three';
import { Mesh } from 'three';
import { Scene } from 'three';
