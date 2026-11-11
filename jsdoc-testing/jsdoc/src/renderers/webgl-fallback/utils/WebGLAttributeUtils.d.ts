export default WebGLAttributeUtils;
/**
 * A WebGL 2 backend utility module for managing shader attributes.
 *
 * @private
 */
declare class WebGLAttributeUtils {
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
     * Creates the GPU buffer for the given buffer attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute.
     * @param {GLenum } bufferType - A flag that indicates the buffer type and thus binding point target.
     */
    createAttribute(attribute: BufferAttribute, bufferType: GLenum): void;
    /**
     * Updates the GPU buffer of the given buffer attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute.
     */
    updateAttribute(attribute: BufferAttribute): void;
    /**
     * Destroys the GPU buffer of the given buffer attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute.
     */
    destroyAttribute(attribute: BufferAttribute): void;
    /**
     * This method performs a readback operation by moving buffer data from
     * a storage buffer attribute from the GPU to the CPU. ReadbackBuffer can
     * be used to retain and reuse handles to the intermediate buffers and prevent
     * new allocation.
     *
     * @async
     * @param {BufferAttribute} attribute - The storage buffer attribute to read from.
     * @param {?(ReadbackBuffer|ArrayBuffer)} [target=null] - The readback buffer or array buffer that receives the data. If `null`, a new array buffer is returned.
     * @param {number} [offset=0] - The byte offset to start reading from. Must be a multiple of 4.
     * @param {number} [count=-1] - The number of bytes to read. Must be a multiple of 4, or `-1` to read to the end of the buffer.
     * @return {Promise<ArrayBuffer|ReadbackBuffer>} A promise that resolves with the buffer data when the data are ready.
     */
    getArrayBufferAsync(attribute: BufferAttribute, target?: (ReadbackBuffer | ArrayBuffer) | null, offset?: number, count?: number): Promise<ArrayBuffer | ReadbackBuffer>;
    /**
     * Creates a WebGL buffer with the given data.
     *
     * @private
     * @param {WebGL2RenderingContext} gl - The rendering context.
     * @param {GLenum } bufferType - A flag that indicates the buffer type and thus binding point target.
     * @param {TypedArray} array - The array of the buffer attribute.
     * @param {GLenum} usage - The usage.
     * @return {WebGLBuffer} The WebGL buffer.
     */
    private _createBuffer;
}
