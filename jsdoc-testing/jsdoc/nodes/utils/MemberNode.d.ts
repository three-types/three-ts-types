export default MemberNode;
/**
 * Base class for representing member access on an object-like
 * node data structures.
 *
 * @augments Node
 */
declare class MemberNode extends Node {
    /**
     * Constructs an array element node.
     *
     * @param {Node} node - The array-like node.
     * @param {string} property - The property name.
     */
    constructor(node: Node, property: string);
    /**
     * The array-like node.
     *
     * @type {Node}
     */
    node: Node;
    /**
     * The property name.
     *
     * @type {Node}
     */
    property: Node;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isMemberNode: boolean;
    getNodeType(builder: any): string;
    generate(builder: any): string;
}
import Node from '../core/Node.js';
