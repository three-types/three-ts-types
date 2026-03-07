export default UniformArrayNode;
export function uniformArray(values: Array<any>, nodeType?: string | null): UniformArrayNode;
/**
 * Similar to {@link BufferNode} this module represents array-like data as
 * uniform buffers. Unlike {@link BufferNode}, it can handle more common
 * data types in the array (e.g `three.js` primitives) and automatically
 * manage buffer padding. It should be the first choice when working with
 * uniforms buffers.
 * ```js
 * const tintColors = uniformArray( [
 * 	new Color( 1, 0, 0 ),
 * 	new Color( 0, 1, 0 ),
 * 	new Color( 0, 0, 1 )
 * ], 'color' );
 *
 * const redColor = tintColors.element( 0 );
 *
 * @augments BufferNode
 */
declare class UniformArrayNode extends BufferNode {
    /**
     * Constructs a new uniform array node.
     *
     * @param {Array<any>} value - Array holding the buffer data.
     * @param {?string} [elementType=null] - The data type of a buffer element.
     */
    constructor(value: Array<any>, elementType?: string | null);
    /**
     * Array holding the buffer data. Unlike {@link BufferNode}, the array can
     * hold number primitives as well as three.js objects like vectors, matrices
     * or colors.
     *
     * @type {Array<any>}
     */
    array: Array<any>;
    /**
     * The data type of an array element.
     *
     * @type {string}
     */
    elementType: string;
    /**
     * The padded type. Uniform buffers must conform to a certain buffer layout
     * so a separate type is computed to ensure correct buffer size.
     *
     * @type {string}
     */
    paddedType: string;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isArrayBufferNode: boolean;
    /**
     * This method is overwritten since the node type is inferred from the
     * {@link UniformArrayNode#paddedType}.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The node type.
     */
    getNodeType(): string;
    /**
     * The data type of the array elements.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The element type.
     */
    getElementType(): string;
    /**
     * Returns the padded type based on the element type.
     *
     * @return {string} The padded type.
     */
    getPaddedType(): string;
    /**
     * The update makes sure to correctly transfer the data from the (complex) objects
     * in the array to the internal, correctly padded value buffer.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    update(): void;
    /**
     * Implement the value buffer creation based on the array data.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @return {null}
     */
    setup(builder: NodeBuilder): null;
    /**
     * Overwrites the default `element()` method to provide element access
     * based on {@link UniformArrayNode}.
     *
     * @param {IndexNode} indexNode - The index node.
     * @return {UniformArrayElementNode}
     */
    element(indexNode: IndexNode): UniformArrayElementNode;
}
import BufferNode from './BufferNode.js';
/**
 * Represents the element access on uniform array nodes.
 *
 * @augments ArrayElementNode
 */
declare class UniformArrayElementNode extends ArrayElementNode {
    /**
     * Constructs a new buffer node.
     *
     * @param {UniformArrayNode} uniformArrayNode - The uniform array node to access.
     * @param {IndexNode} indexNode - The index data that define the position of the accessed element in the array.
     */
    constructor(uniformArrayNode: UniformArrayNode, indexNode: IndexNode);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isArrayBufferElementNode: boolean;
    generate(builder: any): any;
}
import ArrayElementNode from '../utils/ArrayElementNode.js';
