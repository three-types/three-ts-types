export default ReferenceElementNode;
/**
 * This class is only relevant if the referenced property is array-like.
 * In this case, `ReferenceElementNode` allows to refer to a specific
 * element inside the data structure via an index.
 *
 * @augments ArrayElementNode
 */
declare class ReferenceElementNode extends ArrayElementNode {
    /**
     * Constructs a new reference element node.
     *
     * @param {(ReferenceBaseNode|ReferenceNode)} referenceNode - The reference node.
     * @param {Node} indexNode - The index node that defines the element access.
     */
    constructor(referenceNode: (ReferenceBaseNode | ReferenceNode), indexNode: Node);
    /**
     * Similar to {@link ReferenceNode#reference}, an additional
     * property references to the current node.
     *
     * @type {?(ReferenceBaseNode|ReferenceNode)}
     * @default null
     */
    referenceNode: (ReferenceBaseNode | ReferenceNode) | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isReferenceElementNode: boolean;
    /**
     * This method is overwritten since the node type is inferred from
     * the uniform type of the reference node.
     *
     * @return {string} The node type.
     */
    generateNodeType(): string;
    generate(builder: any): any;
}
import ArrayElementNode from '../utils/ArrayElementNode.js';
