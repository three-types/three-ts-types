export default WebGPUAttributeUtils;
/**
 * A WebGPU backend utility module for managing shader attributes.
 *
 * @private
 */
declare class WebGPUAttributeUtils {
    /**
     * Constructs a new utility object.
     *
     * @param {WebGPUBackend} backend - The WebGPU backend.
     */
    constructor(backend: WebGPUBackend);
    /**
     * A reference to the WebGPU backend.
     *
     * @type {WebGPUBackend}
     */
    backend: WebGPUBackend;
    /**
     * Creates the GPU buffer for the given buffer attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute.
     * @param {GPUBufferUsage} usage - A flag that indicates how the buffer may be used after its creation.
     */
    createAttribute(attribute: BufferAttribute, usage: GPUBufferUsage): void;
    /**
     * Updates the GPU buffer of the given buffer attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute.
     */
    updateAttribute(attribute: BufferAttribute): void;
    /**
     * This method creates the vertex buffer layout data which are
     * require when creating a render pipeline for the given render object.
     *
     * @param {RenderObject} renderObject - The render object.
     * @return {Array<Object>} An array holding objects which describe the vertex buffer layout.
     */
    createShaderVertexBuffers(renderObject: RenderObject): Array<Object>;
    /**
     * Destroys the GPU buffer of the given buffer attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute.
     */
    destroyAttribute(attribute: BufferAttribute): void;
    /**
     * This method performs a readback operation by moving buffer data from
     * a storage buffer attribute from the GPU to the CPU.
     *
     * @async
     * @param {StorageBufferAttribute} attribute - The storage buffer attribute.
     * @return {Promise<ArrayBuffer>} A promise that resolves with the buffer data when the data are ready.
     */
    getArrayBufferAsync(attribute: StorageBufferAttribute): Promise<ArrayBuffer>;
    /**
     * Returns the vertex format of the given buffer attribute.
     *
     * @private
     * @param {BufferAttribute} geometryAttribute - The buffer attribute.
     * @return {string|undefined} The vertex format (e.g. 'float32x3').
     */
    private _getVertexFormat;
    /**
     * Utility method for handling interleaved buffer attributes correctly.
     * To process them, their `InterleavedBuffer` is returned.
     *
     * @private
     * @param {BufferAttribute} attribute - The attribute.
     * @return {BufferAttribute|InterleavedBuffer}
     */
    private _getBufferAttribute;
}
