/**
 * TSL function for defining a label context value for a given node.
 *
 * @tsl
 * @function
 * @deprecated
 * @param {Node} node - The node whose context should be modified.
 * @param {string} name - The name/label to set.
 * @returns {ContextNode}
 */
export function label(node: Node, name: string): ContextNode;
export default ContextNode;
/**
 * TSL function for creating a context node.
 *
 * @tsl
 * @function
 * @param {Node} node - The node whose context should be modified.
 * @param {Object} [value={}] - The modified context data.
 * @returns {ContextNode}
 */
export const context: any;
export function uniformFlow(node: Node): ContextNode;
export function setName(node: Node, name: string): ContextNode;
import Node from './Node.js';
/**
 * This node can be used as a context management component for another node.
 * {@link NodeBuilder} performs its node building process in a specific context and
 * this node allows the modify the context. A typical use case is to overwrite `getUV()` e.g.:
 *
 * ```js
 *node.context( { getUV: () => customCoord } );
 *```
 * @augments Node
 */
declare class ContextNode extends Node {
    /**
     * Constructs a new context node.
     *
     * @param {Node} node - The node whose context should be modified.
     * @param {Object} [value={}] - The modified context data.
     */
    constructor(node: Node, value?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isContextNode: boolean;
    /**
     * The node whose context should be modified.
     *
     * @type {Node}
     */
    node: Node;
    /**
     * The modified context data.
     *
     * @type {Object}
     * @default {}
     */
    value: Object;
    /**
     * This method is overwritten to ensure it returns the member type of {@link ContextNode#node}.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} name - The member name.
     * @returns {string} The member type.
     */
    getMemberType(builder: NodeBuilder, name: string): string;
    analyze(builder: any): void;
    setup(builder: any): void;
    generate(builder: any, output: any): string | Node | null;
}
