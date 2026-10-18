export default WebGLVertexArrayUtils;
/**
 * A WebGL 2 backend utility module for managing vertex array objects (VAOs).
 *
 * VAOs are shared between all owners (render objects and compute pipelines)
 * that use the same GPU buffers and deleted when the last owner releases them.
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
     * @return {WebGLVertexArrayObject} The VAO.
     */
    getVAO(owner: RenderObject | ComputePipeline, attributes: Array<BufferAttribute>): WebGLVertexArrayObject;
    /**
     * Releases the VAO used by the given owner.
     *
     * @param {RenderObject|ComputePipeline} owner - The render object or compute pipeline.
     */
    releaseVAO(owner: RenderObject | ComputePipeline): void;
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
     * Creates a VAO from the given attributes.
     *
     * @private
     * @param {Array<BufferAttribute>} attributes - An array of buffer attributes.
     * @return {WebGLVertexArrayObject} The VAO.
     */
    private _createVAO;
}
