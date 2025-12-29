export default ArrayElementNode;
/**
 * Base class for representing element access on an array-like
 * node data structures.
 *
 * @augments Node
 */
declare class ArrayElementNode extends Node {
    /**
     * Constructs an array element node.
     *
     * @param {Node} node - The array-like node.
     * @param {Node} indexNode - The index node that defines the element access.
     */
    constructor(node: Node, indexNode: Node);
    /**
     * The array-like node.
     *
     * @type {Node}
     */
    node: Node;
    /**
     * The index node that defines the element access.
     *
     * @type {Node}
     */
    indexNode: Node;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isArrayElementNode: boolean;
    /**
     * This method is overwritten since the member type is inferred from the array-like node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} name - The member name.
     * @return {string} The member type.
     */
    getMemberType(builder: NodeBuilder, name: string): string;
    generate(builder: any): string;
}
import Node from '../core/Node.js';
