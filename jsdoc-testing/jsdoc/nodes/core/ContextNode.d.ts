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
export function label(node: Node, name: string): ContextNode;
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
    analyze(builder: any): void;
    setup(builder: any): void;
    generate(builder: any, output: any): string | Node | null;
}
import Node from './Node.js';
