export default ConvertNode;
/**
 * This module is part of the TSL core and usually not used in app level code.
 * It represents a convert operation during the shader generation process
 * meaning it converts the data type of a node to a target data type.
 *
 * @augments Node
 */
declare class ConvertNode extends Node {
    /**
     * Constructs a new convert node.
     *
     * @param {Node} node - The node which type should be converted.
     * @param {string} convertTo - The target node type. Multiple types can be defined by separating them with a `|` sign.
     */
    constructor(node: Node, convertTo: string);
    /**
     * The node which type should be converted.
     *
     * @type {Node}
     */
    node: Node;
    /**
     * The target node type. Multiple types can be defined by separating them with a `|` sign.
     *
     * @type {string}
     */
    convertTo: string;
    /**
     * This method is overwritten since the implementation tries to infer the best
     * matching type from the {@link ConvertNode#convertTo} property.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    generateNodeType(builder: NodeBuilder): string;
    serialize(data: any): void;
    deserialize(data: any): void;
    generate(builder: any, output: any): any;
}
import Node from '../core/Node.js';
