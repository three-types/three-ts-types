export default StorageInstancedBufferAttribute;
/**
 * This special type of instanced buffer attribute is intended for compute shaders.
 * In earlier three.js versions it was only possible to update attribute data
 * on the CPU via JavaScript and then upload the data to the GPU. With the
 * new material system and renderer it is now possible to use compute shaders
 * to compute the data for an attribute more efficiently on the GPU.
 *
 * The idea is to create an instance of this class and provide it as an input
 * to {@link StorageBufferNode}.
 *
 * Note: This type of buffer attribute can only be used with `WebGPURenderer`.
 *
 * @augments InstancedBufferAttribute
 */
declare class StorageInstancedBufferAttribute extends InstancedBufferAttribute {
    /**
     * Constructs a new storage instanced buffer attribute.
     *
     * @param {number|TypedArray} count - The item count. It is also valid to pass a typed array as an argument.
     * The subsequent parameters are then obsolete.
     * @param {number} itemSize - The item size.
     * @param {TypedArray.constructor} [typeClass=Float32Array] - A typed array constructor.
     */
    constructor(count: number | TypedArray, itemSize: number, typeClass?: TypedArray.constructor);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStorageInstancedBufferAttribute: boolean;
}
import { InstancedBufferAttribute } from '../../core/InstancedBufferAttribute.js';
