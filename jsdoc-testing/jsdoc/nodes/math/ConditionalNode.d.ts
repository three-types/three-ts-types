export default ConditionalNode;
/**
 * TSL function for creating a conditional node.
 *
 * @tsl
 * @function
 * @param {Node} condNode - The node that defines the condition.
 * @param {Node} ifNode - The node that is evaluate when the condition ends up `true`.
 * @param {?Node} [elseNode=null] - The node that is evaluate when the condition ends up `false`.
 * @returns {ConditionalNode}
 */
export const select: any;
/**
 * Represents a logical `if/else` statement. Can be used as an alternative
 * to the `If()`/`Else()` syntax.
 *
 * The corresponding TSL `select()` looks like so:
 * ```js
 * velocity = position.greaterThanEqual( limit ).select( velocity.negate(), velocity );
 * ```
 * The `select()` method is called in a chaining fashion on a condition. The parameter nodes of `select()`
 * determine the outcome of the entire statement.
 *
 * @augments Node
 */
declare class ConditionalNode extends Node {
    /**
     * Constructs a new conditional node.
     *
     * @param {Node} condNode - The node that defines the condition.
     * @param {Node} ifNode - The node that is evaluate when the condition ends up `true`.
     * @param {?Node} [elseNode=null] - The node that is evaluate when the condition ends up `false`.
     */
    constructor(condNode: Node, ifNode: Node, elseNode?: Node | null);
    /**
     * The node that defines the condition.
     *
     * @type {Node}
     */
    condNode: Node;
    /**
     * The node that is evaluate when the condition ends up `true`.
     *
     * @type {Node}
     */
    ifNode: Node;
    /**
     * The node that is evaluate when the condition ends up `false`.
     *
     * @type {?Node}
     * @default null
     */
    elseNode: Node | null;
    setup(builder: any): void;
    generate(builder: any, output: any): any;
}
import Node from '../core/Node.js';
