export default RangeNode;
/**
 * TSL function for creating a range node.
 *
 * @tsl
 * @function
 * @param {Node<any>} [minNode=float()] - A node defining the lower bound of the range.
 * @param {Node<any>} [maxNode=float()] - A node defining the upper bound of the range.
 * @returns {RangeNode}
 */
export const range: any;
/**
 * `RangeNode` generates random instanced attribute data in a defined range.
 * An exemplary use case for this utility node is to generate random per-instance
 * colors:
 * ```js
 * const material = new MeshBasicNodeMaterial();
 * material.colorNode = range( new Color( 0x000000 ), new Color( 0xFFFFFF ) );
 * const mesh = new InstancedMesh( geometry, material, count );
 * ```
 * @augments Node
 */
declare class RangeNode extends Node {
    /**
     * Constructs a new range node.
     *
     * @param {Node<any>} [minNode=float()] - A node defining the lower bound of the range.
     * @param {Node<any>} [maxNode=float()] - A node defining the upper bound of the range.
     */
    constructor(minNode?: Node<any>, maxNode?: Node<any>);
    /**
     *  A node defining the lower bound of the range.
     *
     * @type {Node<any>}
     * @default float()
     */
    minNode: Node<any>;
    /**
     *  A node defining the upper bound of the range.
     *
     * @type {Node<any>}
     * @default float()
     */
    maxNode: Node<any>;
    /**
     * Returns the vector length which is computed based on the range definition.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {number} The vector length.
     */
    getVectorLength(builder: NodeBuilder): number;
    /**
     * Returns a constant node from the given node by traversing it.
     *
     * @param {Node} node - The node to traverse.
     * @returns {Node} The constant node, if found.
     */
    getConstNode(node: Node): Node;
    setup(builder: any): any;
}
import Node from '../core/Node.js';
