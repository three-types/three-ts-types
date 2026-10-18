/**
 * A cube render target used in context of {@link WebGLRenderer}.
 *
 * @augments WebGLRenderTarget
 */
export class WebGLCubeRenderTarget extends WebGLRenderTarget {
    /**
     * Constructs a new cube render target.
     *
     * @param {number} [size=1] - The size of the render target.
     * @param {RenderTarget~Options} [options] - The configuration object.
     */
    constructor(size?: number, options?: {});
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isWebGLCubeRenderTarget: boolean;
    /**
     * Converts the given equirectangular texture to a cube map.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {Texture} texture - The equirectangular texture.
     * @return {WebGLCubeRenderTarget} A reference to this cube render target.
     */
    fromEquirectangularTexture(renderer: WebGLRenderer, texture: Texture): WebGLCubeRenderTarget;
    /**
     * Clears this cube render target.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {boolean} [color=true] - Whether the color buffer should be cleared or not.
     * @param {boolean} [depth=true] - Whether the depth buffer should be cleared or not.
     * @param {boolean} [stencil=true] - Whether the stencil buffer should be cleared or not.
     */
    clear(renderer: WebGLRenderer, color?: boolean, depth?: boolean, stencil?: boolean): void;
}
import { WebGLRenderTarget } from './WebGLRenderTarget.js';
