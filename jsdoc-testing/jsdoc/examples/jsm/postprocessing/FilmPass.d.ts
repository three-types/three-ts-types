/**
 * This pass can be used to create a film grain effect.
 *
 * ```js
 * const filmPass = new FilmPass();
 * composer.addPass( filmPass );
 * ```
 *
 * @augments Pass
 * @three_import import { FilmPass } from 'three/addons/postprocessing/FilmPass.js';
 */
export class FilmPass extends Pass {
    /**
     * Constructs a new film pass.
     *
     * @param {number} [intensity=0.5] - The grain intensity in the range `[0,1]` (0 = no effect, 1 = full effect).
     * @param {boolean} [grayscale=false] - Whether to apply a grayscale effect or not.
     */
    constructor(intensity?: number, grayscale?: boolean);
    /**
     * The pass uniforms. Use this object if you want to update the
     * `intensity` or `grayscale` values at runtime.
     * ```js
     * pass.uniforms.intensity.value = 1;
     * pass.uniforms.grayscale.value = true;
     * ```
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
     * Performs the film pass.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
     * destination for the pass.
     * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
     * previous pass from this buffer.
     * @param {number} deltaTime - The delta time in seconds.
     * @param {boolean} maskActive - Whether masking is active or not.
     */
    render(renderer: WebGLRenderer, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number): void;
}
import { Pass } from './Pass.js';
import { ShaderMaterial } from 'three';
import { FullScreenQuad } from './Pass.js';
