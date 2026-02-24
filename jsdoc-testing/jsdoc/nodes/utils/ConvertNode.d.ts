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
    serialize(data: any): void;
    deserialize(data: any): void;
    generate(builder: any, output: any): any;
}
import Node from '../core/Node.js';
