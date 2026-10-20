/**
 * An array render target used in context of {@link WebGLRenderer}.
 *
 * @augments WebGLRenderTarget
 */
export class WebGLArrayRenderTarget extends WebGLRenderTarget {
    /**
     * Constructs a new array render target.
     *
     * @param {number} [width=1] - The width of the render target.
     * @param {number} [height=1] - The height of the render target.
     * @param {number} [depth=1] - The height of the render target.
     * @param {RenderTarget~Options} [options] - The configuration object.
     */
    constructor(width?: number, height?: number, depth?: number, options?: {});
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isWebGLArrayRenderTarget: boolean;
}
import { WebGLRenderTarget } from './WebGLRenderTarget.js';
