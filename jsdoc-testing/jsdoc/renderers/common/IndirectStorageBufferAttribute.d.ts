export default IndirectStorageBufferAttribute;
/**
 * This special type of buffer attribute is intended for compute shaders.
 * It can be used to encode draw parameters for indirect draw calls.
 *
 * Note: This type of buffer attribute can only be used with `WebGPURenderer`
 * and a WebGPU backend.
 *
 * @augments StorageBufferAttribute
 */
declare class IndirectStorageBufferAttribute extends StorageBufferAttribute {
    /**
     * Constructs a new storage buffer attribute.
     *
     * @param {number|Uint32Array} count - The item count. It is also valid to pass a `Uint32Array` as an argument.
     * The subsequent parameter is then obsolete.
     * @param {number} itemSize - The item size.
     */
    constructor(count: number | Uint32Array, itemSize: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isIndirectStorageBufferAttribute: boolean;
}
import StorageBufferAttribute from './StorageBufferAttribute.js';
