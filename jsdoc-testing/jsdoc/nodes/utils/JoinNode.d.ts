export default JoinNode;
/**
 * This module is part of the TSL core and usually not used in app level code.
 * It represents a join operation during the shader generation process.
 * For example in can compose/join two single floats into a `vec2` type.
 *
 * @augments TempNode
 */
declare class JoinNode extends TempNode {
    /**
     * Constructs a new join node.
     *
     * @param {Array<Node>} nodes - An array of nodes that should be joined.
     * @param {?string} [nodeType=null] - The node type.
     */
    constructor(nodes?: Array<Node>, nodeType?: string | null);
    /**
     * An array of nodes that should be joined.
     *
     * @type {Array<Node>}
     */
    nodes: Array<Node>;
    generate(builder: any, output: any): any;
}
import TempNode from '../core/TempNode.js';
