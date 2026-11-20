export default BumpMapNode;
/**
 * TSL function for creating a bump map node.
 *
 * @tsl
 * @function
 * @param {Node<float>} textureNode - Represents the bump map data.
 * @param {?Node<float>} [scaleNode=null] - Controls the intensity of the bump effect.
 * @param {Node<vec3>} [normalNode=normalView] - The view-space normal to perturb.
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
 * @augments Node
 */
declare class BumpMapNode extends Node {
    /**
     * Constructs a new bump map node.
     *
     * @param {Node<float>} textureNode - Represents the bump map data.
     * @param {?Node<float>} [scaleNode=null] - Controls the intensity of the bump effect.
     * @param {Node<vec3>} [normalNode=normalView] - The view-space normal to perturb.
     */
    constructor(textureNode: Node<any>, scaleNode?: Node<any> | null, normalNode?: Node<vec3>);
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
    /**
     * The view-space normal to perturb.
     *
     * @type {Node<vec3>}
     * @default normalView
     */
    normalNode: Node<vec3>;
    setup(builder: any): any;
}
import Node from '../core/Node.js';
