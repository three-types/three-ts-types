/**
 * A pass for a basic Bloom effect.
 *
 * {@link UnrealBloomPass} produces a more advanced Bloom but is also
 * more expensive.
 *
 * ```js
 * const effectBloom = new BloomPass( 0.75 );
 * composer.addPass( effectBloom );
 * ```
 *
 * @augments Pass
 * @three_import import { BloomPass } from 'three/addons/postprocessing/BloomPass.js';
 */
export class BloomPass extends Pass {
    /**
     * Constructs a new Bloom pass.
     *
     * @param {number} [strength=1] - The Bloom strength.
     * @param {number} [kernelSize=25] - The kernel size.
     * @param {number} [sigma=4] - The sigma.
     */
    constructor(strength?: number, kernelSize?: number, sigma?: number);
    /**
     * The combine pass uniforms.
     *
     * @type {Object}
     */
    combineUniforms: Object;
    /**
     * The combine pass material.
     *
     * @type {ShaderMaterial}
     */
    materialCombine: ShaderMaterial;
    /**
     * The convolution pass uniforms.
     *
     * @type {Object}
     */
    convolutionUniforms: Object;
    /**
     * The convolution pass material.
     *
     * @type {ShaderMaterial}
     */
    materialConvolution: ShaderMaterial;
    _renderTargetX: WebGLRenderTarget;
    _renderTargetY: WebGLRenderTarget;
    _fsQuad: FullScreenQuad;
    /**
     * Performs the Bloom pass.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
     * destination for the pass.
     * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
     * previous pass from this buffer.
     * @param {number} deltaTime - The delta time in seconds.
     * @param {boolean} maskActive - Whether masking is active or not.
     */
    render(renderer: WebGLRenderer, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
    /**
     * Sets the size of the pass.
     *
     * @param {number} width - The width to set.
     * @param {number} height - The height to set.
     */
    setSize(width: number, height: number): void;
}
export namespace BloomPass {
    let blurX: Vector2;
    let blurY: Vector2;
}
import { Pass } from './Pass.js';
import { ShaderMaterial } from 'three';
import { WebGLRenderTarget } from 'three';
import { FullScreenQuad } from './Pass.js';
import { Vector2 } from 'three';
