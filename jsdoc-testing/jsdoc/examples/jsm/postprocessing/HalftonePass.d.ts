/**
 * Pass for creating a RGB halftone effect.
 *
 * ```js
 * const params = {
 * 	shape: 1,
 * 	radius: 4,
 * 	rotateR: Math.PI / 12,
 * 	rotateB: Math.PI / 12 * 2,
 * 	rotateG: Math.PI / 12 * 3,
 * 	scatter: 0,
 * 	blending: 1,
 * 	blendingMode: 1,
 * 	greyscale: false,
 * 	disable: false
 * };
 * const halftonePass = new HalftonePass( params );
 * composer.addPass( halftonePass );
 * ```
 *
 * @augments Pass
 * @three_import import { HalftonePass } from 'three/addons/postprocessing/HalftonePass.js';
 */
export class HalftonePass extends Pass {
    /**
     * Constructs a new halftone pass.
     *
     * @param {Object} params - The halftone shader parameter.
     */
    constructor(params: Object);
    /**
     * The pass uniforms.
     *
     * @type {Object}
     */
    uniforms: Object;
    /**
     * The pass material.
     *
     * @type {ShaderMaterial}
     */
    material: ShaderMaterial;
    _fsQuad: FullScreenQuad;
    /**
     * Performs the halftone pass.
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
    /**
     * Sets the size of the pass.
     *
     * @param {number} width - The width to set.
     * @param {number} height - The height to set.
     */
    setSize(width: number, height: number): void;
}
import { Pass } from './Pass.js';
import { ShaderMaterial } from 'three';
import { FullScreenQuad } from './Pass.js';
