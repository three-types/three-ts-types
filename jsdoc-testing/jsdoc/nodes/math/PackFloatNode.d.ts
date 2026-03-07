export default PackFloatNode;
/**
 * Converts each component of the normalized float to 16-bit integer values. The results are packed into a single unsigned integer.
 * round(clamp(c, -1, +1) * 32767.0)
 *
 * @tsl
 * @function
 * @param {Node<vec2>} value - The 2-component vector to be packed
 * @returns {Node}
 */
export const packSnorm2x16: any;
/**
 * Converts each component of the normalized float to 16-bit integer values. The results are packed into a single unsigned integer.
 * round(clamp(c, 0, +1) * 65535.0)
 *
 * @tsl
 * @function
 * @param {Node<vec2>} value - The 2-component vector to be packed
 * @returns {Node}
 */
export const packUnorm2x16: any;
/**
 * Converts each component of the vec2 to 16-bit floating-point values. The results are packed into a single unsigned integer.
 *
 * @tsl
 * @function
 * @param {Node<vec2>} value - The 2-component vector to be packed
 * @returns {Node}
 */
export const packHalf2x16: any;
/**
 * This node represents an operation that packs floating-point values of a vector into an unsigned 32-bit integer
 *
 * @augments TempNode
 */
declare class PackFloatNode extends TempNode {
    /**
     *
     * @param {'snorm' | 'unorm' | 'float16'} encoding - The numeric encoding that describes how the float values are mapped to the integer range.
     * @param {Node} vectorNode - The vector node to be packed
     */
    constructor(encoding: "snorm" | "unorm" | "float16", vectorNode: Node);
    /**
     * The vector to be packed.
     *
     * @type {Node}
     */
    vectorNode: Node;
    /**
     * The numeric encoding.
     *
     * @type {string}
     */
    encoding: string;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isPackFloatNode: boolean;
    getNodeType(): string;
    generate(builder: any): string;
}
import TempNode from '../core/TempNode.js';
