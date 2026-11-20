import { Usage } from "../constants.js";
import { TypedArray } from "./BufferAttribute.js";

/**
 * "Interleaved" means that multiple attributes, possibly of different types,
 * (e.g., position, normal, uv, color) are packed into a single array buffer.
 *
 * An introduction into interleaved arrays can be found here: [Interleaved array basics](https://blog.tojicode.com/2011/05/interleaved-array-basics.html)
 */
export class InterleavedBuffer {
    /**
     * Constructs a new interleaved buffer.
     *
     * @param {TypedArray} array - A typed array with a shared buffer storing attribute data.
     * @param {number} stride - The number of typed-array elements per vertex.
     */
    constructor(array: TypedArray, stride: number);
    /**
     * This flag can be used for type testing.
     *
     * @default true
     */
    readonly isInterleavedBuffer: true;
    /**
     * A typed array with a shared buffer storing attribute data.
     */
    array: TypedArray;
    /**
     * The number of typed-array elements per vertex.
     */
    stride: number;
    /**
     * The total number of elements in the array
     */
    count: number;
    /**
     * Defines the intended usage pattern of the data store for optimization purposes.
     *
     * Note: After the initial use of a buffer, its usage cannot be changed. Instead,
     * instantiate a new one and set the desired usage before the next render.
     *
     * @default StaticDrawUsage
     */
    usage: Usage;
    /**
     * This can be used to only update some components of stored vectors (for example, just the
     * component related to color). Use the `addUpdateRange()` function to add ranges to this array.
     */
    updateRanges: Array<{
        /**
         * Position at which to start update.
         */
        start: number;
        /**
         * The number of components to update.
         */
        count: number;
    }>;
    /**
     * A version number, incremented every time the `needsUpdate` is set to `true`.
     */
    version: number;
    /**
     * The UUID of the interleaved buffer.
     */
    readonly uuid: string;
    /**
     * A callback function that is executed after the renderer has transferred the attribute array
     * data to the GPU.
     */
    onUploadCallback: () => void;
    /**
     * Flag to indicate that this attribute has changed and should be re-sent to
     * the GPU. Set this to `true` when you modify the value of the array.
     *
     * @default false
     * @param {boolean} value
     */
    set needsUpdate(value: boolean);
    /**
     * Sets the usage of this interleaved buffer.
     *
     * @param {(StaticDrawUsage|DynamicDrawUsage|StreamDrawUsage|StaticReadUsage|DynamicReadUsage|StreamReadUsage|StaticCopyUsage|DynamicCopyUsage|StreamCopyUsage)} value - The usage to set.
     * @return {InterleavedBuffer} A reference to this interleaved buffer.
     */
    setUsage(value: Usage): this;
    /**
     * Adds a range of data in the data array to be updated on the GPU.
     *
     * @param {number} start - Position at which to start update.
     * @param {number} count - The number of components to update.
     */
    addUpdateRange(start: number, count: number): void;
    /**
     * Clears the update ranges.
     */
    clearUpdateRanges(): void;
    /**
     * Copies the values of the given interleaved buffer to this instance.
     *
     * @param {InterleavedBuffer} source - The interleaved buffer to copy.
     * @return {InterleavedBuffer} A reference to this instance.
     */
    copy(source: InterleavedBuffer): this;
    /**
     * Copies a vector from the given interleaved buffer to this one. The start
     * and destination position in the attribute buffers are represented by the
     * given indices.
     *
     * @param {number} index1 - The destination index into this interleaved buffer.
     * @param {InterleavedBuffer} interleavedBuffer - The interleaved buffer to copy from.
     * @param {number} index2 - The source index into the given interleaved buffer.
     * @return {InterleavedBuffer} A reference to this instance.
     */
    copyAt(index1: number, interleavedBuffer: InterleavedBuffer, index2: number): this;
    /**
     * Sets the given array data in the interleaved buffer.
     *
     * @param {(TypedArray|Array)} value - The array data to set.
     * @param {number} [offset=0] - The offset in this interleaved buffer's array.
     * @return {InterleavedBuffer} A reference to this instance.
     */
    set(value: ArrayLike<number>, offset?: number): this;
    /**
     * Returns a new interleaved buffer with copied values from this instance.
     *
     * @param {Object} [data] - An object with shared array buffers that allows to retain shared structures.
     * @return {InterleavedBuffer} A clone of this instance.
     */
    clone(data: {}): InterleavedBuffer;
    /**
     * Sets the given callback function that is executed after the Renderer has transferred
     * the array data to the GPU. Can be used to perform clean-up operations after
     * the upload when data are not needed anymore on the CPU side.
     *
     * @param {Function} callback - The `onUpload()` callback.
     * @return {InterleavedBuffer} A reference to this instance.
     */
    onUpload(callback: () => void): this;
    /**
     * Serializes the interleaved buffer into JSON.
     *
     * @param {Object} [data] - An optional value holding meta information about the serialization.
     * @return {Object} A JSON object representing the serialized interleaved buffer.
     */
    toJSON(data: {}): {
        uuid: string;
        buffer: string;
        type: string;
        stride: number;
    };
}
