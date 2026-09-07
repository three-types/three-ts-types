export default MaxMipLevelNode;
/**
 * TSL function for creating a max mip level node.
 *
 * @tsl
 * @function
 * @param {TextureNode} textureNode - The texture node to compute the max mip level for.
 * @returns {MaxMipLevelNode}
 */
export const maxMipLevel: any;
/**
 * A special type of uniform node that computes the
 * maximum mipmap level for a given texture node.
 *
 * ```js
 * const level = maxMipLevel( textureNode );
 * ```
 *
 * @augments UniformNode
 */
declare class MaxMipLevelNode extends UniformNode {
    /**
     * Constructs a new max mip level node.
     *
     * @param {TextureNode} textureNode - The texture node to compute the max mip level for.
     */
    constructor(textureNode: TextureNode);
    /**
     * The texture node to compute the max mip level for.
     *
     * @private
     * @type {TextureNode}
     */
    private _textureNode;
    /**
     * The texture node to compute the max mip level for.
     *
     * @readonly
     * @type {TextureNode}
     */
    readonly get textureNode(): TextureNode;
    /**
     * The texture.
     *
     * @readonly
     * @type {Texture}
     */
    readonly get texture(): Texture;
    update(): void;
}
import UniformNode from '../core/UniformNode.js';
