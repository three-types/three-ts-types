export default NormalMapNode;
/**
 * TSL function for creating a normal map node.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} node - Represents the normal map data.
 * @param {?Node<vec2>} [scaleNode=null] - Controls the intensity of the effect.
 * @returns {NormalMapNode}
 */
export const normalMap: any;
/**
 * This class can be used for applying normals maps to materials.
 *
 * ```js
 * material.normalNode = normalMap( texture( normalTex ) );
 * ```
 *
 * @augments TempNode
 */
declare class NormalMapNode extends TempNode {
    /**
     * Constructs a new normal map node.
     *
     * @param {Node<vec3>} node - Represents the normal map data.
     * @param {?Node<vec2>} [scaleNode=null] - Controls the intensity of the effect.
     */
    constructor(node: Node<any>, scaleNode?: Node<vec2> | null);
    /**
     * Represents the normal map data.
     *
     * @type {Node<vec3>}
     */
    node: Node<any>;
    /**
     * Controls the intensity of the effect.
     *
     * @type {?Node<vec2>}
     * @default null
     */
    scaleNode: Node<vec2> | null;
    /**
     * The normal map type.
     *
     * @type {(TangentSpaceNormalMap|ObjectSpaceNormalMap)}
     * @default TangentSpaceNormalMap
     */
    normalMapType: (number | number);
    /**
     * Controls how to unpack the sampled normal map values.
     *
     * @type {string}
     * @default NoNormalPacking
     */
    unpackNormalMode: string;
    setup(builder: any): any;
}
import TempNode from '../core/TempNode.js';
