export default RemapNode;
/**
 * TSL function for creating a remap node.
 *
 * @tsl
 * @function
 * @param {Node} node - The node that should be remapped.
 * @param {Node} inLowNode - The source or current lower bound of the range.
 * @param {Node} inHighNode - The source or current upper bound of the range.
 * @param {?Node} [outLowNode=float(0)] - The target lower bound of the range.
 * @param {?Node} [outHighNode=float(1)] - The target upper bound of the range.
 * @returns {RemapNode}
 */
export const remap: any;
/**
 * TSL function for creating a remap node, but with enabled clamping.
 *
 * @tsl
 * @function
 * @param {Node} node - The node that should be remapped.
 * @param {Node} inLowNode - The source or current lower bound of the range.
 * @param {Node} inHighNode - The source or current upper bound of the range.
 * @param {?Node} [outLowNode=float(0)] - The target lower bound of the range.
 * @param {?Node} [outHighNode=float(1)] - The target upper bound of the range.
 * @returns {RemapNode}
 */
export const remapClamp: any;
/**
 * This node allows to remap a node value from one range into another. E.g a value of
 * `0.4` in the range `[ 0.3, 0.5 ]` should be remapped into the normalized range `[ 0, 1 ]`.
 * `RemapNode` takes care of that and converts the original value of `0.4` to `0.5`.
 *
 * @augments Node
 */
declare class RemapNode extends Node {
    /**
     * Constructs a new remap node.
     *
     * @param {Node} node - The node that should be remapped.
     * @param {Node} inLowNode - The source or current lower bound of the range.
     * @param {Node} inHighNode - The source or current upper bound of the range.
     * @param {Node} [outLowNode=float(0)] - The target lower bound of the range.
     * @param {Node} [outHighNode=float(1)] - The target upper bound of the range.
     */
    constructor(node: Node, inLowNode: Node, inHighNode: Node, outLowNode?: Node, outHighNode?: Node);
    /**
     * The node that should be remapped.
     *
     * @type {Node}
     */
    node: Node;
    /**
     * The source or current lower bound of the range.
     *
     * @type {Node}
     */
    inLowNode: Node;
    /**
     * The source or current upper bound of the range.
     *
     * @type {Node}
     */
    inHighNode: Node;
    /**
     * The target lower bound of the range.
     *
     * @type {Node}
     * @default float(0)
     */
    outLowNode: Node;
    /**
     * The target upper bound of the range.
     *
     * @type {Node}
     * @default float(1)
     */
    outHighNode: Node;
    /**
     * Whether the node value should be clamped before
     * remapping it to the target range.
     *
     * @type {boolean}
     * @default true
     */
    doClamp: boolean;
    setup(): any;
}
import Node from '../core/Node.js';
