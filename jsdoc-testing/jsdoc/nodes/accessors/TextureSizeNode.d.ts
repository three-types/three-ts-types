export default TextureSizeNode;
/**
 * TSL function for creating a texture size node.
 *
 * @tsl
 * @function
 * @param {TextureNode} textureNode - A texture node which size should be retrieved.
 * @param {?Node<int>} [levelNode=null] - A level node which defines the requested mip.
 * @returns {TextureSizeNode}
 */
export const textureSize: any;
/**
 * A node that represents the dimensions of a texture. The texture size is
 * retrieved in the shader via built-in shader functions like `textureDimensions()`
 * or `textureSize()`.
 *
 * @augments Node
 */
declare class TextureSizeNode extends Node {
    /**
     * Constructs a new texture size node.
     *
     * @param {TextureNode} textureNode - A texture node which size should be retrieved.
     * @param {?Node<int>} [levelNode=null] - A level node which defines the requested mip.
     */
    constructor(textureNode: TextureNode, levelNode?: Node<int> | null);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isTextureSizeNode: boolean;
    /**
     * A texture node which size should be retrieved.
     *
     * @type {TextureNode}
     */
    textureNode: TextureNode;
    /**
     * A level node which defines the requested mip.
     *
     * @type {Node<int>}
     * @default null
     */
    levelNode: Node<int>;
    generate(builder: any, output: any): any;
}
import Node from '../core/Node.js';
