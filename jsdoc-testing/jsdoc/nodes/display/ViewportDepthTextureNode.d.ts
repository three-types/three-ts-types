export default ViewportDepthTextureNode;
/**
 * TSL function for a viewport depth texture node.
 *
 * @tsl
 * @function
 * @param {?Node} [uvNode=screenUV] - The uv node.
 * @param {?Node} [levelNode=null] - The level node.
 * @param {?DepthTexture} [depthTexture=null] - A depth texture. If not provided, a depth texture is created automatically.
 * @returns {ViewportDepthTextureNode}
 */
export const viewportDepthTexture: any;
/**
 * Represents the depth of the current viewport as a texture. This module
 * can be used in combination with viewport texture to achieve effects
 * that require depth evaluation.
 *
 * @augments ViewportTextureNode
 */
declare class ViewportDepthTextureNode extends ViewportTextureNode {
    /**
     * Constructs a new viewport depth texture node.
     *
     * @param {Node} [uvNode=screenUV] - The uv node.
     * @param {?Node} [levelNode=null] - The level node.
     * @param {?DepthTexture} [depthTexture=null] - A depth texture. If not provided, uses a shared depth texture.
     */
    constructor(uvNode?: Node, levelNode?: Node | null, depthTexture?: DepthTexture | null);
}
import ViewportTextureNode from './ViewportTextureNode.js';
import { DepthTexture } from '../../textures/DepthTexture.js';
