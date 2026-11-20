export default LoopNode;
export function Loop(...params: any[]): LoopNode;
export function Continue(): ExpressionNode;
export function Break(): ExpressionNode;
/**
 * ~ObjectParams
 */
export type LoopNode = {
    /**
     * - The initial value of the loop variable.
     */
    start?: number | Node<int> | Node<uint>;
    /**
     * - The value the loop variable is compared against. If omitted, the loop counts down from `start - 1` to `0`.
     */
    end?: number | Node<int> | Node<uint>;
    /**
     * - The name of the loop variable. Defaults to `i`, `j`, `k` and so on.
     */
    name?: string | undefined;
    /**
     * - The data type of the loop variable.
     */
    type?: string | undefined;
    /**
     * - The comparison operator. The loop runs as long as the comparison is true. Inferred from `start` and `end` if not set.
     */
    condition?: ">" | "<" | "<=" | ">=" | undefined;
    /**
     * - Defines how the loop variable is updated after each iteration. Inferred from `condition` and `type` if not set.
     */
    update?: string | number | Function | Node | undefined;
};
/**
 * The loop body.
 */
export type loopBodyCallback = (inputs: {
    [x: string]: Node;
}) => any;
/**
 * This module offers a variety of ways to implement loops in TSL. In it's basic form it's:
 * ```js
 * Loop( count, ( { i } ) => {
 *
 * } );
 * ```
 * However, it is also possible to define a start and end ranges, data types and loop conditions:
 * ```js
 * Loop( { start: int( 0 ), end: int( 10 ), type: 'int', condition: '<' }, ( { i } ) => {
 *
 * } );
 *```
 * Nested loops can be defined in a compacted form:
 * ```js
 * Loop( 10, 5, ( { i, j } ) => {
 *
 * } );
 * ```
 * Loops that should run backwards can be defined like so:
 * ```js
 * Loop( { start: 10 }, () => {} );
 * ```
 * It is possible to execute with boolean values, similar to the `while` syntax.
 * ```js
 * const value = float( 0 ).toVar();
 *
 * Loop( value.lessThan( 10 ), () => {
 *
 * 	value.addAssign( 1 );
 *
 * } );
 * ```
 * The module also provides `Break()` and `Continue()` TSL expressions for loop control.
 * @augments Node
 */
declare class LoopNode extends Node {
    /**
     * Constructs a new loop node.
     *
     * @param {Array<LoopNode~Params|loopBodyCallback>} params - Any number of loop parameters followed by the loop body.
     */
    constructor(params?: any[]);
    params: any[];
    /**
     * Returns a loop variable name based on an index. The pattern is
     * `0` = `i`, `1`= `j`, `2`= `k` and so on.
     *
     * @param {number} index - The index.
     * @return {string} The loop variable name.
     */
    getVarName(index: number): string;
    /**
     * Returns properties about this node.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {Object} The node properties.
     */
    getProperties(builder: NodeBuilder): Object;
    _getInternalParams(): any[];
    setup(builder: any): void;
    generate(builder: any): void;
}
import Node from '../core/Node.js';
