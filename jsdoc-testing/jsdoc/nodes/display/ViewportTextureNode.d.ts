export default ViewportTextureNode;
/**
 * TSL function for creating a viewport texture node.
 *
 * @tsl
 * @function
 * @param {?Node} [uvNode=screenUV] - The uv node.
 * @param {?Node} [levelNode=null] - The level node.
 * @param {?Texture} [framebufferTexture=null] - A framebuffer texture holding the viewport data. If not provided, a framebuffer texture is created automatically.
 * @returns {ViewportTextureNode}
 */
export const viewportTexture: any;
/**
 * TSL function for creating a viewport texture node with enabled mipmap generation.
 *
 * @tsl
 * @function
 * @param {?Node} [uvNode=screenUV] - The uv node.
 * @param {?Node} [levelNode=null] - The level node.
 * @param {?Texture} [framebufferTexture=null] - A framebuffer texture holding the viewport data. If not provided, a framebuffer texture is created automatically.
 * @returns {ViewportTextureNode}
 */
export const viewportMipTexture: any;
/**
 * A special type of texture node which represents the data of the current viewport
 * as a texture. The module extracts data from the current bound framebuffer with
 * a copy operation so no extra render pass is required to produce the texture data
 * (which is good for performance). `ViewportTextureNode` can be used as an input for a
 * variety of effects like refractive or transmissive materials.
 *
 * @augments TextureNode
 */
declare class ViewportTextureNode extends TextureNode {
    /**
     * Constructs a new viewport texture node.
     *
     * @param {Node} [uvNode=screenUV] - The uv node.
     * @param {?Node} [levelNode=null] - The level node.
     * @param {?Texture} [framebufferTexture=null] - A framebuffer texture holding the viewport data. If not provided, a framebuffer texture is created automatically.
     */
    constructor(uvNode?: Node, levelNode?: Node | null, framebufferTexture?: Texture | null);
    /**
     * Whether to generate mipmaps or not.
     *
     * @type {boolean}
     * @default false
     */
    generateMipmaps: boolean;
    /**
     * The reference framebuffer texture. This is used to store the framebuffer texture
     * for the current render target. If the render target changes, a new framebuffer texture
     * is created automatically.
     *
     * @type {FramebufferTexture}
     * @default null
     */
    defaultFramebuffer: FramebufferTexture;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isOutputTextureNode: boolean;
    /**
     * The framebuffer texture for the current renderer context.
     *
     * @type {WeakMap<RenderTarget, FramebufferTexture>}
     * @private
     */
    private _cacheTextures;
    /**
     * This methods returns a texture for the given render target reference.
     *
     * To avoid rendering errors, `ViewportTextureNode` must use unique framebuffer textures
     * for different render contexts.
     *
     * @param {?RenderTarget} [reference=null] - The render target reference.
     * @return {Texture} The framebuffer texture.
     */
    getTextureForReference(reference?: RenderTarget | null): Texture;
    updateReference(frame: any): import("../../textures/Texture.js").Texture;
    updateBefore(frame: any): void;
    clone(): any;
}
import TextureNode from '../accessors/TextureNode.js';
import { FramebufferTexture } from '../../textures/FramebufferTexture.js';
