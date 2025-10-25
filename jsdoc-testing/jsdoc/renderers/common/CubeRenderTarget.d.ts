export default CubeRenderTarget;
/**
 * This class represents a cube render target. It is a special version
 * of `WebGLCubeRenderTarget` which is compatible with `WebGPURenderer`.
 *
 * @augments WebGLCubeRenderTarget
 */
declare class CubeRenderTarget extends WebGLCubeRenderTarget {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isCubeRenderTarget: boolean;
    /**
     * Converts the given equirectangular texture to a cube map.
     *
     * @param {Renderer} renderer - The renderer.
     * @param {Texture} texture - The equirectangular texture.
     * @return {CubeRenderTarget} A reference to this cube render target.
     */
    fromEquirectangularTexture(renderer: Renderer, texture: Texture): CubeRenderTarget;
}
import { WebGLCubeRenderTarget } from '../../renderers/WebGLCubeRenderTarget.js';
