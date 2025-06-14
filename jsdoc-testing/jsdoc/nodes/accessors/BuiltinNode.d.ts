export default BuiltinNode;
/**
 * TSL function for creating a builtin node.
 *
 * @tsl
 * @function
 * @param {string} name - The name of the built-in shader variable.
 * @returns {BuiltinNode}
 */
export const builtin: any;
/**
 * The node allows to set values for built-in shader variables. That is
 * required for features like hardware-accelerated vertex clipping.
 *
 * @augments Node
 */
declare class BuiltinNode extends Node {
    /**
     * Constructs a new builtin node.
     *
     * @param {string} name - The name of the built-in shader variable.
     */
    constructor(name: string);
    /**
     * The name of the built-in shader variable.
     *
     * @type {string}
     */
    name: string;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isBuiltinNode: boolean;
    /**
     * Generates the code snippet of the builtin node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The generated code snippet.
     */
    generate(): string;
}
import Node from '../core/Node.js';
