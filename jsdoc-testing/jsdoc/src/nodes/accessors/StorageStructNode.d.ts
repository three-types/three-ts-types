export default StorageStructNode;
export function storageStruct(value: StorageBufferAttribute, structType: Struct): StorageStructNode;
/**
 * A storage buffer bound as a single struct instead of an array of elements. This allows
 * the struct's last member to be a runtime-sized array, whose length follows the size of
 * the bound buffer. A typical use is a queue with an atomic length ahead of its elements.
 *
 * ```js
 * const Queue = struct( {
 * 	length: { type: 'uint', atomic: true },
 * 	elements: 'array<u32>'
 * }, 'Queue' );
 *
 * const queue = storageStruct( new THREE.StorageBufferAttribute( new Uint32Array( count + 1 ), 1 ), Queue );
 * ```
 *
 * The node is only supported with the WebGPU backend.
 *
 * @augments StorageBufferNode
 */
declare class StorageStructNode extends StorageBufferNode {
    /**
     * Constructs a new storage struct node.
     *
     * @param {StorageBufferAttribute} value - The buffer data.
     * @param {Struct} structType - The struct type of the buffer.
     */
    constructor(value: StorageBufferAttribute, structType: Struct);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStorageStructNode: boolean;
}
import StorageBufferNode from './StorageBufferNode.js';
