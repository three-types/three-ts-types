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
 * The `select()` method is called in a chaining fashion on a condition. The parameter nodes of `select()`
 * determine the outcome of the entire statement.
 *
 * ```js
 * velocity = position.greaterThanEqual( limit ).select( velocity.negate(), velocity );
 * ```
 *
 * When the condition is itself a vector (e.g. the `bvec4` produced by
 * `someVec4.greaterThanEqual( someOtherVec4 )`), `select()` resolves
 * per-component - each output lane picks independently based on its own
 * condition component, the same way WGSL's native `select()` and GLSL's
 * `mix( x, y, bvecN )` do - rather than picking one branch for the whole
 * vector. The condition and values are converted to the largest vector width,
 * with the condition converted to boolean components. Scalar values are broadcast.
 *
 * ```js
 * // per-component: each channel picks independently
 * const clamped = value.greaterThan( vec3( 1.0 ) ).select( vec3( 1.0 ), value );
 * ```
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
    /**
     * This method is overwritten since the node type is inferred from the if/else
     * nodes.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    generateNodeType(builder: NodeBuilder): string;
    setup(builder: any): void;
    generate(builder: any, output: any): any;
}
import Node from '../core/Node.js';
