export default BumpMapNode;
/**
 * TSL function for creating a bump map node.
 *
 * @tsl
 * @function
 * @param {Node<float>} textureNode - Represents the bump map data.
 * @param {?Node<float>} [scaleNode=null] - Controls the intensity of the bump effect.
 * @returns {BumpMapNode}
 */
export const bumpMap: any;
/**
 * This class can be used for applying bump maps to materials.
 *
 * ```js
 * material.normalNode = bumpMap( texture( bumpTex ) );
 * ```
 *
 * @augments TempNode
 */
declare class BumpMapNode extends TempNode {
    /**
     * Constructs a new bump map node.
     *
     * @param {Node<float>} textureNode - Represents the bump map data.
     * @param {?Node<float>} [scaleNode=null] - Controls the intensity of the bump effect.
     */
    constructor(textureNode: Node<any>, scaleNode?: Node<any> | null);
    /**
     * Represents the bump map data.
     *
     * @type {Node<float>}
     */
    textureNode: Node<any>;
    /**
     * Controls the intensity of the bump effect.
     *
     * @type {?Node<float>}
     * @default null
     */
    scaleNode: Node<any> | null;
    setup(): any;
}
import TempNode from '../core/TempNode.js';
