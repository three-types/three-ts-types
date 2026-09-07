/**
 * This pass is responsible for including tone mapping and color space conversion
 * into your pass chain. In most cases, this pass should be included at the end
 * of each pass chain. If a pass requires sRGB input (e.g. like FXAA), the pass
 * must follow `OutputPass` in the pass chain.
 *
 * The tone mapping and color space settings are extracted from the renderer.
 *
 * ```js
 * const outputPass = new OutputPass();
 * composer.addPass( outputPass );
 * ```
 *
 * @augments Pass
 * @three_import import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
 */
export class OutputPass extends Pass {
    /**
     * This flag indicates that this is an output pass.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isOutputPass: boolean;
    /**
     * The pass uniforms.
     *
     * @type {Object}
     */
    uniforms: Object;
    /**
     * The pass material.
     *
     * @type {RawShaderMaterial}
     */
    material: RawShaderMaterial;
    _fsQuad: FullScreenQuad;
    _outputColorSpace: any;
    _toneMapping: any;
    /**
     * Performs the output pass.
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
import { RawShaderMaterial } from 'three';
import { FullScreenQuad } from './Pass.js';
