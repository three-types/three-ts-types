export default ExpressionNode;
/**
 * TSL function for creating an expression node.
 *
 * @tsl
 * @function
 * @param {string} [snippet] - The native code snippet.
 * @param {?string} [nodeType='void'] - The node type.
 * @returns {ExpressionNode}
 */
export const expression: any;
/**
 * This class can be used to implement basic expressions in shader code.
 * Basic examples for that are `return`, `continue` or `discard` statements.
 *
 * @augments Node
 */
declare class ExpressionNode extends Node {
    /**
     * Constructs a new expression node.
     *
     * @param {string} [snippet=''] - The native code snippet.
     * @param {string} [nodeType='void'] - The node type.
     */
    constructor(snippet?: string, nodeType?: string);
    /**
     * The native code snippet.
     *
     * @type {string}
     * @default ''
     */
    snippet: string;
    generate(builder: any, output: any): any;
}
import Node from '../core/Node.js';
