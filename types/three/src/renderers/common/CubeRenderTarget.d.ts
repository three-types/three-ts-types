import { RenderTarget } from "../../core/RenderTarget.js";
import { RenderTargetOptions } from "../../core/RenderTarget.js";
import { Texture } from "../../textures/Texture.js";
import { WebGLRenderer } from "../WebGLRenderer.js";
import Renderer from "./Renderer.js";
/**
 * This class represents a cube render target. It is a special version
 * of `WebGLCubeRenderTarget` which is compatible with `WebGPURenderer`.
 *
 * @augments RenderTarget
 */
declare class CubeRenderTarget extends RenderTarget {
    readonly isCubeRenderTarget: true;
    /**
     * Constructs a new cube render target.
     *
     * @param {number} [size=1] - The size of the render target.
     * @param {RenderTarget~Options} [options] - The configuration object.
     */
    constructor(size?: number, options?: RenderTargetOptions);
    /**
     * Converts the given equirectangular texture to a cube map.
     *
     * @param {Renderer} renderer - The renderer.
     * @param {Texture} texture - The equirectangular texture.
     * @return {CubeRenderTarget} A reference to this cube render target.
     */
    fromEquirectangularTexture(renderer: WebGLRenderer, texture: Texture): this;
    /**
     * Clears this cube render target.
     *
     * @param {Renderer} renderer - The renderer.
     * @param {boolean} [color=true] - Whether the color buffer should be cleared or not.
     * @param {boolean} [depth=true] - Whether the depth buffer should be cleared or not.
     * @param {boolean} [stencil=true] - Whether the stencil buffer should be cleared or not.
     */
    clear(renderer: Renderer, color?: boolean, depth?: boolean, stencil?: boolean): void;
}
export default CubeRenderTarget;
