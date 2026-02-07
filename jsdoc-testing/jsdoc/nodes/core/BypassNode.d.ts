export default BypassNode;
/**
 * TSL function for creating a bypass node.
 *
 * @tsl
 * @function
 * @param {Node} outputNode - The output node.
 * @param {Node} callNode - The call node.
 * @returns {BypassNode}
 */
export const bypass: any;
/**
 * The class generates the code of a given node but returns another node in the output.
 * This can be used to call a method or node that does not return a value, i.e.
 * type `void` on an input where returning a value is required. Example:
 *
 * ```js
 * material.colorNode = myColor.bypass( runVoidFn() )
 *```
 *
 * @augments Node
 */
declare class BypassNode extends Node {
    /**
     * Constructs a new bypass node.
     *
     * @param {Node} outputNode - The output node.
     * @param {Node} callNode - The call node.
     */
    constructor(outputNode: Node, callNode: Node);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isBypassNode: boolean;
    /**
     * The output node.
     *
     * @type {Node}
     */
    outputNode: Node;
    /**
     * The call node.
     *
     * @type {Node}
     */
    callNode: Node;
    getNodeType(builder: any): string;
    generate(builder: any): string | Node | null;
}
import Node from './Node.js';
