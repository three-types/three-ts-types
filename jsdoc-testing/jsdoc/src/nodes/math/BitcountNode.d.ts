export default BitcountNode;
/**
 * Finds the number of consecutive 0 bits from the least significant bit of the input value,
 * which is also the index of the least significant bit of the input value.
 *
 * Can only be used with {@link WebGPURenderer} and a WebGPU backend.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The input value.
 * @returns {Node}
 */
export const countTrailingZeros: any;
/**
 * Finds the number of consecutive 0 bits starting from the most significant bit of the input value.
 *
 * Can only be used with {@link WebGPURenderer} and a WebGPU backend.
 *
 * @tsl
 * @function
 * @param {Node | number} x - The input value.
 * @returns {Node}
 */
export const countLeadingZeros: any;
/**
 * Finds the number of '1' bits set in the input value
 *
 * Can only be used with {@link WebGPURenderer} and a WebGPU backend.
 *
 * @tsl
 * @function
 * @returns {Node}
 */
export const countOneBits: any;
/**
 * This node represents an operation that counts the bits of a piece of shader data.
 *
 * @augments MathNode
 */
declare class BitcountNode extends MathNode {
    /**
     * Constructs a new math node.
     *
     * @param {'countTrailingZeros'|'countLeadingZeros'|'countOneBits'} method - The method name.
     * @param {Node} aNode - The first input.
     */
    constructor(method: "countTrailingZeros" | "countLeadingZeros" | "countOneBits", aNode: Node);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isBitcountNode: boolean;
    /**
     * Casts the input value of the function to an integer if necessary.
     *
     * @private
     * @param {Node<uint>|Node<int>} inputNode - The input value.
     * @param {Node<uint>} outputNode - The output value.
     * @param {string} elementType - The type of the input value.
     */
    private _resolveElementType;
    _returnDataNode(inputType: any): any;
    /**
     * Creates and registers a reusable GLSL function that emulates the behavior of countTrailingZeros.
     *
     * @private
     * @param {string} method - The name of the function to create.
     * @param {string} elementType - The type of the input value.
     * @returns {Function} - The generated function
     */
    private _createTrailingZerosBaseLayout;
    /**
     * Creates and registers a reusable GLSL function that emulates the behavior of countLeadingZeros.
     *
     * @private
     * @param {string} method - The name of the function to create.
     * @param {string} elementType - The type of the input value.
     * @returns {Function} - The generated function
     */
    private _createLeadingZerosBaseLayout;
    /**
     * Creates and registers a reusable GLSL function that emulates the behavior of countOneBits.
     *
     * @private
     * @param {string} method - The name of the function to create.
     * @param {string} elementType - The type of the input value.
     * @returns {Function} - The generated function
     */
    private _createOneBitsBaseLayout;
    /**
     * Creates and registers a reusable GLSL function that emulates the behavior of the specified bitcount function.
     * including considerations for component-wise bitcounts on vector type inputs.
     *
     * @private
     * @param {string} method - The name of the function to create.
     * @param {string} inputType - The type of the input value.
     * @param {number} typeLength - The vec length of the input value.
     * @param {Function} baseFn - The base function that operates on an individual component of the vector.
     * @returns {Function} - The alias function for the specified bitcount method.
     */
    private _createMainLayout;
}
declare namespace BitcountNode {
    let COUNT_TRAILING_ZEROS: string;
    let COUNT_LEADING_ZEROS: string;
    let COUNT_ONE_BITS: string;
}
import MathNode from './MathNode.js';
