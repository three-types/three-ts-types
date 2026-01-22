export default MemberNode;
/**
 * Base class for representing member access on an object-like
 * node data structures.
 *
 * @augments Node
 */
declare class MemberNode extends Node {
    /**
     * Constructs a member node.
     *
     * @param {Node} structNode - The struct node.
     * @param {string} property - The property name.
     */
    constructor(structNode: Node, property: string);
    /**
     * The struct node.
     *
     * @type {Node}
     */
    structNode: Node;
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
    hasMember(builder: any): boolean;
    getNodeType(builder: any): string;
    getMemberType(builder: any, name: any): any;
    generate(builder: any): any;
}
import Node from '../core/Node.js';
