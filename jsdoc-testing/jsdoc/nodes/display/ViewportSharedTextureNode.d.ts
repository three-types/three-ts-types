export default ViewportSharedTextureNode;
/**
 * TSL function for creating a shared viewport texture node.
 *
 * @tsl
 * @function
 * @param {?Node} [uvNode=screenUV] - The uv node.
 * @param {?Node} [levelNode=null] - The level node.
 * @returns {ViewportSharedTextureNode}
 */
export const viewportSharedTexture: any;
/**
 * `ViewportTextureNode` creates an internal texture for each node instance. This module
 * shares a texture across all instances of `ViewportSharedTextureNode`. It should
 * be the first choice when using data of the default/screen framebuffer for performance reasons.
 *
 * @augments ViewportTextureNode
 */
declare class ViewportSharedTextureNode extends ViewportTextureNode {
    /**
     * Constructs a new viewport shared texture node.
     *
     * @param {Node} [uvNode=screenUV] - The uv node.
     * @param {?Node} [levelNode=null] - The level node.
     */
    constructor(uvNode?: Node, levelNode?: Node | null);
    updateReference(): this;
}
import ViewportTextureNode from './ViewportTextureNode.js';
