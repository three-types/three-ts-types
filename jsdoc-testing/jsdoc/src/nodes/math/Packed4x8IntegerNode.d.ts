export default Packed4x8IntegerNode;
/**
 * Computes the dot product of four unsigned 8-bit integer components packed
 * into each input.
 *
 * @tsl
 * @function
 * @param {Node<uint>} a - The first packed unsigned integer vector.
 * @param {Node<uint>} b - The second packed unsigned integer vector.
 * @returns {Node<uint>} The dot product.
 */
export const dot4U8Packed: any;
/**
 * Computes the dot product of four signed 8-bit integer components packed
 * into each input.
 *
 * @tsl
 * @function
 * @param {Node<uint>} a - The first packed signed integer vector.
 * @param {Node<uint>} b - The second packed signed integer vector.
 * @returns {Node<int>} The dot product.
 */
export const dot4I8Packed: any;
/**
 * Packs the least significant 8 bits of four signed integers into a `uint`.
 *
 * @tsl
 * @function
 * @param {Node<ivec4>} value - The signed integer vector to pack.
 * @returns {Node<uint>} The packed value.
 */
export const pack4xI8: any;
/**
 * Packs the least significant 8 bits of four unsigned integers into a `uint`.
 *
 * @tsl
 * @function
 * @param {Node<uvec4>} value - The unsigned integer vector to pack.
 * @returns {Node<uint>} The packed value.
 */
export const pack4xU8: any;
/**
 * Clamps four signed integers to the signed 8-bit range and packs them into a
 * `uint`.
 *
 * @tsl
 * @function
 * @param {Node<ivec4>} value - The signed integer vector to clamp and pack.
 * @returns {Node<uint>} The packed value.
 */
export const pack4xI8Clamp: any;
/**
 * Clamps four unsigned integers to the unsigned 8-bit range and packs them
 * into a `uint`.
 *
 * @tsl
 * @function
 * @param {Node<uvec4>} value - The unsigned integer vector to clamp and pack.
 * @returns {Node<uint>} The packed value.
 */
export const pack4xU8Clamp: any;
/**
 * Unpacks a `uint` into four sign-extended signed 8-bit integer components.
 *
 * @tsl
 * @function
 * @param {Node<uint>} value - The packed value.
 * @returns {Node<ivec4>} The unpacked signed integer vector.
 */
export const unpack4xI8: any;
/**
 * Unpacks a `uint` into four zero-extended unsigned 8-bit integer components.
 *
 * @tsl
 * @function
 * @param {Node<uint>} value - The packed value.
 * @returns {Node<uvec4>} The unpacked unsigned integer vector.
 */
export const unpack4xU8: any;
/**
 * Represents one of the built-in functions of WGSL's `packed_4x8_integer_dot_product`
 * language extension. If the extension is not available, the node falls back to an
 * emulation with plain integer bit operations.
 *
 * @augments TempNode
 */
declare class Packed4x8IntegerNode extends TempNode {
    static get DOT4_U8_PACKED(): string;
    static get DOT4_I8_PACKED(): string;
    static get PACK4X_I8(): string;
    static get PACK4X_U8(): string;
    static get PACK4X_I8_CLAMP(): string;
    static get PACK4X_U8_CLAMP(): string;
    static get UNPACK4X_I8(): string;
    static get UNPACK4X_U8(): string;
    /**
     * Constructs a packed 4x8 integer function node.
     *
     * @param {string} method - The WGSL built-in function name.
     * @param {Node} aNode - The first argument.
     * @param {?Node} [bNode=null] - The optional second argument.
     */
    constructor(method: string, aNode: Node, bNode?: Node | null);
    /**
     * The WGSL built-in function name.
     *
     * @type {string}
     */
    method: string;
    /**
     * The first argument.
     *
     * @type {Node}
     */
    aNode: Node;
    /**
     * The optional second argument.
     *
     * @type {?Node}
     */
    bNode: Node | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isPacked4x8IntegerNode: boolean;
    getInputType(): "uint" | "ivec4" | "uvec4";
    generateNodeType(): "uint" | "int" | "ivec4" | "uvec4";
    /**
     * Returns the reusable `Fn()` definition that emulates this node's method.
     *
     * @private
     * @returns {Function} The emulation function.
     */
    private _getEmulatedFn;
    setup(builder: any): any;
    generate(builder: any, output: any): any;
    serialize(data: any): void;
    deserialize(data: any): void;
}
import TempNode from '../core/TempNode.js';
