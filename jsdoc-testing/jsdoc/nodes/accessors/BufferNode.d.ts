export default BufferNode;
export function buffer(value: Array<number>, type: string, count: number): BufferNode;
/**
 * A special type of uniform node which represents array-like data
 * as uniform buffers. The access usually happens via `element()`
 * which returns an instance of {@link ArrayElementNode}. For example:
 *
 * ```js
 * const bufferNode = buffer( array, 'mat4', count );
 * const matrixNode = bufferNode.element( index ); // access a matrix from the buffer
 * ```
 * In general, it is recommended to use the more managed {@link UniformArrayNode}
 * since it handles more input types and automatically cares about buffer paddings.
 *
 * @augments UniformNode
 */
declare class BufferNode extends UniformNode {
    /**
     * Constructs a new buffer node.
     *
     * @param {Array<number>} value - Array-like buffer data.
     * @param {string} bufferType - The data type of the buffer.
     * @param {number} [bufferCount=0] - The count of buffer elements.
     */
    constructor(value: Array<number>, bufferType: string, bufferCount?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isBufferNode: boolean;
    /**
     * The data type of the buffer.
     *
     * @type {string}
     */
    bufferType: string;
    /**
     * The uniform node that holds the value of the reference node.
     *
     * @type {number}
     * @default 0
     */
    bufferCount: number;
    /**
     * Overwrites the default implementation to return a fixed value `'buffer'`.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {string} The input type.
     */
    getInputType(): string;
}
import UniformNode from '../core/UniformNode.js';
