import { TypedArray } from "./BufferAttribute.js";
import { InterleavedBuffer } from "./InterleavedBuffer.js";

/**
 * An instanced version of an interleaved buffer.
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
     * @default true
     */
    readonly isInstancedInterleavedBuffer: true;
    /**
     * Defines how often a value of this buffer attribute should be repeated,
     * see {@link InstancedBufferAttribute#meshPerAttribute}.
     *
     * @default 1
     */
    meshPerAttribute: number;
}
