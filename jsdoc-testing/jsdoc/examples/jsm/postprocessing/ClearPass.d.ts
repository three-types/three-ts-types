/**
 * This class can be used to force a clear operation for the current read or
 * default framebuffer (when rendering to screen).
 *
 * ```js
 * const clearPass = new ClearPass();
 * composer.addPass( clearPass );
 * ```
 *
 * @augments Pass
 * @three_import import { ClearPass } from 'three/addons/postprocessing/ClearPass.js';
 */
export class ClearPass extends Pass {
    /**
     * Constructs a new clear pass.
     *
     * @param {(number|Color|string)} [clearColor=0x000000] - The clear color.
     * @param {number} [clearAlpha=0] - The clear alpha.
     */
    constructor(clearColor?: (number | Color | string), clearAlpha?: number);
    /**
     * The clear color.
     *
     * @type {(number|Color|string)}
     * @default 0x000000
     */
    clearColor: (number | Color | string);
    /**
     * The clear alpha.
     *
     * @type {number}
     * @default 0
     */
    clearAlpha: number;
    _oldClearColor: Color;
    /**
     * Performs the clear operation. This affects the current read or the default framebuffer.
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
import { Color } from 'three';
