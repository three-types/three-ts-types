export default CubeMapNode;
/**
 * TSL function for creating a cube map node.
 *
 * @tsl
 * @function
 * @param {Node} envNode - The node representing the environment map.
 * @returns {CubeMapNode}
 */
export const cubeMapNode: any;
/**
 * This node can be used to automatically convert environment maps in the
 * equirectangular format into the cube map format.
 *
 * @augments TempNode
 */
declare class CubeMapNode extends TempNode {
    /**
     * Constructs a new cube map node.
     *
     * @param {Node} envNode - The node representing the environment map.
     */
    constructor(envNode: Node);
    /**
     * The node representing the environment map.
     *
     * @type {Node}
     */
    envNode: Node;
    /**
     * A reference to the internal cube texture.
     *
     * @private
     * @type {?CubeTexture}
     * @default null
     */
    private _cubeTexture;
    /**
     * A reference to the internal cube texture node.
     *
     * @private
     * @type {CubeTextureNode}
     */
    private _cubeTextureNode;
    /**
     * A default cube texture that acts as a placeholder.
     * It is used when the conversion from equirectangular to cube
     * map has not finished yet for a given texture.
     *
     * @private
     * @type {CubeTexture}
     */
    private _defaultTexture;
    updateBefore(frame: any): void;
    setup(builder: any): CubeTextureNode;
}
import TempNode from '../core/TempNode.js';
