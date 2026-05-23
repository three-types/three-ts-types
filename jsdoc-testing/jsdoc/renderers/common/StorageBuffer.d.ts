export default StorageBuffer;
/**
 * Represents a storage buffer binding type.
 *
 * @private
 * @augments Buffer
 */
declare class StorageBuffer extends Buffer {
    /**
     * Constructs a new uniform buffer.
     *
     * @param {string} name - The buffer's name.
     * @param {BufferAttribute} attribute - The buffer attribute.
     */
    constructor(name: string, attribute: BufferAttribute);
    /**
     * This flag can be used for type testing.
     *
     * @private
     * @type {BufferAttribute}
     */
    private _attribute;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isStorageBuffer: boolean;
    /**
     * The storage buffer attribute.
     *
     * @type {BufferAttribute}
     */
    get attribute(): BufferAttribute;
}
import Buffer from './Buffer.js';
