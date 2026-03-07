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
 * @augments TempNode
 */
declare class AssignNode extends TempNode {
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
    /**
     * Whether this node is used more than once in context of other nodes. This method
     * is overwritten since it always returns `false` (assigns are unique).
     *
     * @return {boolean} A flag that indicates if there is more than one dependency to other nodes. Always `false`.
     */
    hasDependencies(): boolean;
    getNodeType(builder: any, output: any): any;
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
import TempNode from '../core/TempNode.js';
