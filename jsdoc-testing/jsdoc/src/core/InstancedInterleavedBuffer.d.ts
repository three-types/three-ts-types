/**
 * An instanced version of an interleaved buffer.
 *
 * @augments InterleavedBuffer
 */
export class InstancedInterleavedBuffer extends InterleavedBuffer {
    /**
     * Constructs a new instanced interleaved buffer.
     *
     * @param {TypedArray} array - A typed array with a shared buffer storing attribute data.
     * @param {number} stride - The number of typed-array elements per vertex.
     * @param {number} [meshPerAttribute=1] - Defines how often a value of this interleaved buffer should be repeated.
     */
    constructor(array: TypedArray, stride: number, meshPerAttribute?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isInstancedInterleavedBuffer: boolean;
    /**
     * Defines how often a value of this buffer attribute should be repeated,
     * see {@link InstancedBufferAttribute#meshPerAttribute}.
     *
     * @type {number}
     * @default 1
     */
    meshPerAttribute: number;
    copy(source: any): this;
    clone(data: any): InterleavedBuffer;
    toJSON(data: any): Object;
}
import { InterleavedBuffer } from './InterleavedBuffer.js';
