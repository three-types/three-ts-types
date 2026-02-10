export default OutputStructNode;
/**
 * TSL function for creating an output struct node.
 *
 * @tsl
 * @function
 * @param {...Node} members - A parameter list of nodes.
 * @returns {OutputStructNode}
 */
export const outputStruct: any;
/**
 * This node can be used to define multiple outputs in a shader programs.
 *
 * @augments Node
 */
declare class OutputStructNode extends Node {
    /**
     * Constructs a new output struct node. The constructor can be invoked with an
     * arbitrary number of nodes representing the members.
     *
     * @param {...Node} members - A parameter list of nodes.
     */
    constructor(...members: Node[]);
    /**
     * An array of nodes which defines the output.
     *
     * @type {Array<Node>}
     */
    members: Array<Node>;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isOutputStructNode: boolean;
    getNodeType(): string;
    generate(builder: any): any;
}
import Node from './Node.js';
