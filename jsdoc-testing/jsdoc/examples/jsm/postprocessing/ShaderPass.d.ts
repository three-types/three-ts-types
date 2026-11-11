/**
 * This pass can be used to create a post processing effect
 * with a raw GLSL shader object. Useful for implementing custom
 * effects.
 *
 * ```js
 * const fxaaPass = new ShaderPass( FXAAShader );
 * composer.addPass( fxaaPass );
 * ```
 *
 * @augments Pass
 * @three_import import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
 */
export class ShaderPass extends Pass {
    /**
     * Constructs a new shader pass.
     *
     * @param {Object|ShaderMaterial} [shader] - A shader object holding vertex and fragment shader as well as
     * defines and uniforms. It's also valid to pass a custom shader material.
     * @param {string} [textureID='tDiffuse'] - The name of the texture uniform that should sample
     * the read buffer.
     */
    constructor(shader?: Object | ShaderMaterial, textureID?: string);
    /**
     * The name of the texture uniform that should sample the read buffer.
     *
     * @type {string}
     * @default 'tDiffuse'
     */
    textureID: string;
    /**
     * The pass uniforms.
     *
     * @type {?Object}
     */
    uniforms: Object | null;
    /**
     * The pass material.
     *
     * @type {?ShaderMaterial}
     */
    material: ShaderMaterial | null;
    _fsQuad: FullScreenQuad;
    /**
     * Performs the shader pass.
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
import { ShaderMaterial } from 'three';
import { FullScreenQuad } from './Pass.js';
