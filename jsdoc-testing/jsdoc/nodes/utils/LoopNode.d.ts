export default LoopNode;
export function Loop(...params: any[]): LoopNode;
export function Continue(): ExpressionNode;
export function Break(): ExpressionNode;
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
 * The module also provides `Break()` and `Continue()` TSL expression for loop control.
 * @augments Node
 */
declare class LoopNode extends Node {
    /**
     * Constructs a new loop node.
     *
     * @param {Array<any>} params - Depending on the loop type, array holds different parameterization values for the loop.
     */
    constructor(params?: Array<any>);
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
    setup(builder: any): void;
    generate(builder: any): void;
}
import Node from '../core/Node.js';
