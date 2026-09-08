/**
 * A pass that saves the contents of the current read buffer in a render target.
 *
 * ```js
 * const savePass = new SavePass( customRenderTarget );
 * composer.addPass( savePass );
 * ```
 *
 * @augments Pass
 * @three_import import { SavePass } from 'three/addons/postprocessing/SavePass.js';
 */
export class SavePass extends Pass {
    /**
     * Constructs a new save pass.
     *
     * @param {WebGLRenderTarget} [renderTarget] - The render target for saving the read buffer.
     * If not provided, the pass automatically creates a render target.
     */
    constructor(renderTarget?: WebGLRenderTarget);
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
    /**
     * The render target which is used to save the read buffer.
     *
     * @type {WebGLRenderTarget}
     */
    renderTarget: WebGLRenderTarget;
    _fsQuad: FullScreenQuad;
    /**
     * Performs the save pass.
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
