export default WebGLVertexArrayUtils;
/**
 * A WebGL 2 backend utility module for managing vertex array objects (VAOs).
 *
 * VAOs are shared between all owners (render objects and compute pipelines)
 * that use the same GPU buffers and deleted when the last owner releases them
 * or when one of their buffers is destroyed.
 *
 * @private
 */
declare class WebGLVertexArrayUtils {
    /**
     * Constructs a new utility object.
     *
     * @param {WebGLBackend} backend - The WebGL 2 backend.
     */
    constructor(backend: WebGLBackend);
    /**
     * A reference to the WebGL 2 backend.
     *
     * @type {WebGLBackend}
     */
    backend: WebGLBackend;
    /**
     * The VAO cache. Entries are keyed by the IDs of the attribute buffers
     * and hold one VAO per combination of active storage buffers as well
     * as a usage counter.
     *
     * @type {Map<string,Object>}
     */
    cache: Map<string, Object>;
    /**
     * Returns a VAO for the given attributes.
     *
     * @param {RenderObject|ComputePipeline} owner - The render object or compute pipeline using the VAO.
     * @param {Array<BufferAttribute>} attributes - An array of buffer attributes.
     * @param {?BufferAttribute} [index=null] - The index attribute.
     * @return {WebGLVertexArrayObject} The VAO.
     */
    getVAO(owner: RenderObject | ComputePipeline, attributes: Array<BufferAttribute>, index?: BufferAttribute | null): WebGLVertexArrayObject;
    /**
     * Releases the VAO used by the given owner.
     *
     * @param {RenderObject|ComputePipeline} owner - The render object or compute pipeline.
     */
    releaseVAO(owner: RenderObject | ComputePipeline): void;
    /**
     * Deletes all VAOs referencing the given attribute buffer. Must be called
     * when the buffer is destroyed since VAOs keep the memory of attached buffers
     * allocated. Owners of deleted VAOs request a new one with their next draw.
     *
     * @param {Object} bufferData - The backend data of the attribute buffer.
     */
    releaseBuffer(bufferData: Object): void;
    /**
     * Frees internal resources.
     */
    dispose(): void;
    /**
     * Returns `true` if the given attributes refer to other GPU buffers than
     * the VAO of the given owner.
     *
     * @private
     * @param {Object} ownerData - The backend data of the owner.
     * @param {Array<BufferAttribute>} attributes - An array of buffer attributes.
     * @param {?WebGLBuffer} indexGPU - The index buffer.
     * @return {boolean} Whether the owner requires a different VAO or not.
     */
    private _needsUpdate;
    /**
     * Releases the VAO entry. If possible, the all VAO variants are deleted.
     *
     * @private
     * @param {string} key - The cache key.
     */
    private _releaseEntry;
    /**
     * Deletes all VAO variants of the given cache entry.
     *
     * @private
     * @param {string} key - The cache key.
     */
    private _deleteEntry;
    /**
     * Creates a VAO from the given attributes.
     *
     * @private
     * @param {Array<BufferAttribute>} attributes - An array of buffer attributes.
     * @param {?WebGLBuffer} indexGPU - The index buffer.
     * @return {WebGLVertexArrayObject} The VAO.
     */
    private _createVAO;
}
