/**
 * An alternative version of a buffer attribute with more control over the VBO.
 *
 * The renderer does not construct a VBO for this kind of attribute. Instead, it uses
 * whatever VBO is passed in constructor and can later be altered via the `buffer` property.
 *
 * The most common use case for this class is when some kind of GPGPU calculation interferes
 * or even produces the VBOs in question.
 *
 * Notice that this class can only be used with {@link WebGLRenderer}.
 */
export class GLBufferAttribute {
    /**
     * Constructs a new GL buffer attribute.
     *
     * @param {WebGLBuffer} buffer - The native WebGL buffer.
     * @param {number} type - The native data type (e.g. `gl.FLOAT`).
     * @param {number} itemSize - The item size.
     * @param {number} elementSize - The corresponding size (in bytes) for the given `type` parameter.
     * @param {number} count - The expected number of vertices in VBO.
     * @param {boolean} [normalized=false] - Whether the data are normalized or not.
     */
    constructor(
        buffer: WebGLBuffer,
        type: GLenum,
        itemSize: number,
        elementSize: 1 | 2 | 4,
        count: number,
        normalized?: boolean,
    );
    /**
     * This flag can be used for type testing.
     *
     * @default true
     */
    readonly isGLBufferAttribute: true;
    /**
     * The name of the buffer attribute.
     */
    name: string;
    /**
     * The native WebGL buffer.
     */
    buffer: WebGLBuffer;
    /**
     * The native data type.
     */
    type: GLenum;
    /**
     * The item size, see {@link BufferAttribute#itemSize}.
     */
    itemSize: number;
    /**
     * The corresponding size (in bytes) for the given `type` parameter.
     */
    elementSize: 1 | 2 | 4;
    /**
     * The expected number of vertices in VBO.
     */
    count: number;
    /**
     * Applies to integer data only. Indicates how the underlying data in the buffer maps to
     * the values in the GLSL code. For instance, if `buffer` contains data of `gl.UNSIGNED_SHORT`,
     * and `normalized` is `true`, the values `0 - +65535` in the buffer data will be mapped to
     * `0.0f - +1.0f` in the GLSL attribute. If `normalized` is `false`, the values will be converted
     * to floats unmodified, i.e. `65535` becomes `65535.0f`.
     */
    normalized: boolean;
    /**
     * A version number, incremented every time the `needsUpdate` is set to `true`.
     */
    version: number;
    /**
     * Flag to indicate that this attribute has changed and should be re-sent to
     * the GPU. Set this to `true` when you modify the value of the array.
     *
     * @default false
     * @param {boolean} value
     */
    set needsUpdate(value: boolean);
    /**
     * Sets the given native WebGL buffer.
     *
     * @param {WebGLBuffer} buffer - The buffer to set.
     * @return {BufferAttribute} A reference to this instance.
     */
    setBuffer(buffer: WebGLBuffer): this;
    /**
     * Sets the given native data type and element size.
     *
     * @param {number} type - The native data type (e.g. `gl.FLOAT`).
     * @param {number} elementSize - The corresponding size (in bytes) for the given `type` parameter.
     * @return {BufferAttribute} A reference to this instance.
     */
    setType(type: GLenum, elementSize: 1 | 2 | 4): this;
    /**
     * Sets the item size.
     *
     * @param {number} itemSize - The item size.
     * @return {BufferAttribute} A reference to this instance.
     */
    setItemSize(itemSize: number): this;
    /**
     * Sets the count (the expected number of vertices in VBO).
     *
     * @param {number} count - The count.
     * @return {BufferAttribute} A reference to this instance.
     */
    setCount(count: number): this;
}
