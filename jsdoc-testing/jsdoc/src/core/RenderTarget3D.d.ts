/**
 * Represents a 3D render target.
 *
 * @augments RenderTarget
 */
export class RenderTarget3D extends RenderTarget {
    /**
     * Constructs a new 3D render target.
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
    readonly isRenderTarget3D: boolean;
}
import { RenderTarget } from './RenderTarget.js';
