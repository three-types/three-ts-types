export default OperatorNode;
/**
 * Returns the addition of two or more value.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @param {...Node} params - Additional input parameters.
 * @returns {OperatorNode}
 */
export const add: any;
/**
 * Returns the subtraction of two or more value.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @param {...Node} params - Additional input parameters.
 * @returns {OperatorNode}
 */
export const sub: any;
/**
 * Returns the multiplication of two or more value.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @param {...Node} params - Additional input parameters.
 * @returns {OperatorNode}
 */
export const mul: any;
/**
 * Returns the division of two or more value.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @param {...Node} params - Additional input parameters.
 * @returns {OperatorNode}
 */
export const div: any;
/**
 * Computes the remainder of dividing the first node by the second one.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @returns {OperatorNode}
 */
export const mod: any;
/**
 * Checks if two nodes are equal.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @returns {OperatorNode}
 */
export const equal: any;
/**
 * Checks if two nodes are not equal.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @returns {OperatorNode}
 */
export const notEqual: any;
/**
 * Checks if the first node is less than the second.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @returns {OperatorNode}
 */
export const lessThan: any;
/**
 * Checks if the first node is greater than the second.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @returns {OperatorNode}
 */
export const greaterThan: any;
/**
 * Checks if the first node is less than or equal to the second.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @returns {OperatorNode}
 */
export const lessThanEqual: any;
/**
 * Checks if the first node is greater than or equal to the second.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @returns {OperatorNode}
 */
export const greaterThanEqual: any;
/**
 * Performs a logical AND operation on multiple nodes.
 *
 * @tsl
 * @function
 * @param {...Node} nodes - The input nodes to be combined using AND.
 * @returns {OperatorNode}
 */
export const and: any;
/**
 * Performs a logical OR operation on multiple nodes.
 *
 * @tsl
 * @function
 * @param {...Node} nodes - The input nodes to be combined using OR.
 * @returns {OperatorNode}
 */
export const or: any;
/**
 * Performs logical NOT on a node.
 *
 * @tsl
 * @function
 * @param {Node} value - The value.
 * @returns {OperatorNode}
 */
export const not: any;
/**
 * Performs logical XOR on two nodes.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @returns {OperatorNode}
 */
export const xor: any;
/**
 * Performs bitwise AND on two nodes.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @returns {OperatorNode}
 */
export const bitAnd: any;
/**
 * Performs bitwise NOT on a node.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @returns {OperatorNode}
 */
export const bitNot: any;
/**
 * Performs bitwise OR on two nodes.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @returns {OperatorNode}
 */
export const bitOr: any;
/**
 * Performs bitwise XOR on two nodes.
 *
 * @tsl
 * @function
 * @param {Node} a - The first input.
 * @param {Node} b - The second input.
 * @returns {OperatorNode}
 */
export const bitXor: any;
/**
 * Shifts a node to the left.
 *
 * @tsl
 * @function
 * @param {Node} a - The node to shift.
 * @param {Node} b - The value to shift.
 * @returns {OperatorNode}
 */
export const shiftLeft: any;
/**
 * Shifts a node to the right.
 *
 * @tsl
 * @function
 * @param {Node} a - The node to shift.
 * @param {Node} b - The value to shift.
 * @returns {OperatorNode}
 */
export const shiftRight: any;
export function incrementBefore(...params: any[]): any;
export namespace incrementBefore { }
export function incrementBefore(...params: any[]): any;
export namespace incrementBefore { }
export function incrementBefore(...params: any[]): any;
export namespace incrementBefore { }
export function incrementBefore(...params: any[]): any;
export namespace incrementBefore { }
export function modInt(a: Node, b: Node): OperatorNode;
/**
 * This node represents basic mathematical and logical operations like addition,
 * subtraction or comparisons (e.g. `equal()`).
 *
 * @augments TempNode
 */
declare class OperatorNode extends TempNode {
    /**
     * Constructs a new operator node.
     *
     * @param {string} op - The operator.
     * @param {Node} aNode - The first input.
     * @param {Node} bNode - The second input.
     * @param {...Node} params - Additional input parameters.
     */
    constructor(op: string, aNode: Node, bNode: Node, ...params: Node[]);
    /**
     * The operator.
     *
     * @type {string}
     */
    op: string;
    /**
     * The first input.
     *
     * @type {Node}
     */
    aNode: Node;
    /**
     * The second input.
     *
     * @type {Node}
     */
    bNode: Node;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isOperatorNode: boolean;
    /**
     * Returns the operator method name.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @param {string} output - The output type.
     * @returns {string} The operator method name.
     */
    getOperatorMethod(builder: NodeBuilder, output: string): string;
    generate(builder: any, output: any): any;
    serialize(data: any): void;
    deserialize(data: any): void;
}
import TempNode from '../core/TempNode.js';
