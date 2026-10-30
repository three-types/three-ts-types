export default AssignNode;
/**
 * TSL function for creating an assign node.
 *
 * @tsl
 * @function
 * @param {Node} targetNode - The target node.
 * @param {Node} sourceNode - The source type.
 * @returns {AssignNode}
 */
export const assign: any;
/**
 * These node represents an assign operation. Meaning a node is assigned
 * to another node.
 *
 * @augments Node
 */
declare class AssignNode extends Node {
    /**
     * Constructs a new assign node.
     *
     * @param {Node} targetNode - The target node.
     * @param {Node} sourceNode - The source type.
     */
    constructor(targetNode: Node, sourceNode: Node);
    /**
     * The target node.
     *
     * @type {Node}
     */
    targetNode: Node;
    /**
     * The source node.
     *
     * @type {Node}
     */
    sourceNode: Node;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isAssignNode: boolean;
    generateNodeType(builder: any, output: any): string;
    /**
     * Whether a split is required when assigning source to target. This can happen when the component length of
     * target and source data type does not match.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {boolean} Whether a split is required when assigning source to target.
     */
    needsSplitAssign(builder: NodeBuilder): boolean;
    setup(builder: any): void;
    generate(builder: any, output: any): any;
}
import Node from '../core/Node.js';
