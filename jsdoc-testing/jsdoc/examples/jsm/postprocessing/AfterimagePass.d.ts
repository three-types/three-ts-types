/**
 * Pass for a basic after image effect.
 *
 * ```js
 * const afterimagePass = new AfterimagePass( 0.9 );
 * composer.addPass( afterimagePass );
 * ```
 *
 * @augments Pass
 * @three_import import { AfterimagePass } from 'three/addons/postprocessing/AfterimagePass.js';
 */
export class AfterimagePass extends Pass {
    /**
     * Constructs a new after image pass.
     *
     * @param {number} [damp=0.96] - The damping intensity. A higher value means a stronger after image effect.
     */
    constructor(damp?: number);
    /**
     * The pass uniforms. Use this object if you want to update the
     * `damp` value at runtime.
     * ```js
     * pass.uniforms.damp.value = 0.9;
     * ```
     *
     * @type {Object}
     */
    uniforms: Object;
    set damp(value: number);
    /**
     * The damping intensity, from 0.0 to 1.0. A higher value means a stronger after image effect.
     *
     * @type {number}
     */
    get damp(): number;
    /**
     * The composition material.
     *
     * @type {ShaderMaterial}
     */
    compFsMaterial: ShaderMaterial;
    /**
     * The copy material.
     *
     * @type {ShaderMaterial}
     */
    copyFsMaterial: ShaderMaterial;
    _textureComp: WebGLRenderTarget;
    _textureOld: WebGLRenderTarget;
    _compFsQuad: FullScreenQuad;
    _copyFsQuad: FullScreenQuad;
    /**
     * Performs the after image pass.
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
import { WebGLRenderTarget } from 'three';
import { FullScreenQuad } from './Pass.js';
