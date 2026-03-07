export default BitcastNode;
/**
 * Reinterpret the bit representation of a value in one type as a value in another type.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The parameter.
 * @param {string} y - The new type.
 * @returns {Node}
 */
export const bitcast: any;
export function floatBitsToInt(value: Node<float>): BitcastNode;
export function floatBitsToUint(value: Node<float>): BitcastNode;
export function intBitsToFloat(value: Node<int>): BitcastNode;
export function uintBitsToFloat(value: Node<uint>): BitcastNode;
/**
 * This node represents an operation that reinterprets the bit representation of a value
 * in one type as a value in another type.
 *
 * @augments TempNode
 */
declare class BitcastNode extends TempNode {
    /**
     * Constructs a new bitcast node.
     *
     * @param {Node} valueNode - The value to convert.
     * @param {string} conversionType - The type to convert to.
     * @param {?string} [inputType = null] - The expected input data type of the bitcast operation.
     */
    constructor(valueNode: Node, conversionType: string, inputType?: string | null);
    /**
     * The data to bitcast to a new type.
     *
     * @type {Node}
     */
    valueNode: Node;
    /**
     * The type the value will be converted to.
     *
     * @type {string}
     */
    conversionType: string;
    /**
     * The expected input data type of the bitcast operation.
     *
     *
     * @type {string}
     * @default null
     */
    inputType: string;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isBitcastNode: boolean;
    getNodeType(builder: any): any;
    generate(builder: any): string;
}
import TempNode from '../core/TempNode.js';
