export default Attributes;
/**
 * This renderer module manages geometry attributes.
 *
 * @private
 * @augments DataMap
 */
declare class Attributes extends DataMap {
    /**
     * Constructs a new attribute management component.
     *
     * @param {Backend} backend - The renderer's backend.
     * @param {Info} info - Renderer component for managing metrics and monitoring data.
     */
    constructor(backend: Backend, info: Info);
    /**
     * The renderer's backend.
     *
     * @type {Backend}
     */
    backend: Backend;
    /**
     * Renderer component for managing metrics and monitoring data.
     *
     * @type {Info}
     */
    info: Info;
    /**
     * Stores weak references to the storage attributes with attached
     * `dispose` event listeners.
     *
     * @private
     * @type {Set<WeakRef<StorageBufferAttribute|StorageInstancedBufferAttribute>>}
     */
    private _tracked;
    /**
     * Removes weak references from `_tracked` when their attribute
     * has been garbage collected without an explicit `dispose()`.
     *
     * @private
     * @type {FinalizationRegistry}
     */
    private _registry;
    /**
     * Deletes the data for the given attribute.
     *
     * @param {BufferAttribute|InterleavedBuffer} attribute - The attribute.
     * @return {?Object} The deleted attribute data.
     */
    delete(attribute: BufferAttribute | InterleavedBuffer): Object | null;
    /**
     * Updates the given attribute. This method creates attribute buffers
     * for new attributes and updates data for existing ones.
     *
     * @param {BufferAttribute|InterleavedBuffer} attribute - The attribute to update.
     * @param {number} type - The attribute type.
     */
    update(attribute: BufferAttribute | InterleavedBuffer, type: number): void;
}
import DataMap from './DataMap.js';
