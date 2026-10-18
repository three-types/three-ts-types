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
    constructor(buffer: WebGLBuffer, type: number, itemSize: number, elementSize: number, count: number, normalized?: boolean);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isGLBufferAttribute: boolean;
    /**
     * The name of the buffer attribute.
     *
     * @type {string}
     */
    name: string;
    /**
     * The native WebGL buffer.
     *
     * @type {WebGLBuffer}
     */
    buffer: WebGLBuffer;
    /**
     * The native data type.
     *
     * @type {number}
     */
    type: number;
    /**
     * The item size, see {@link BufferAttribute#itemSize}.
     *
     * @type {number}
     */
    itemSize: number;
    /**
     * The corresponding size (in bytes) for the given `type` parameter.
     *
     * @type {number}
     */
    elementSize: number;
    /**
     * The expected number of vertices in VBO.
     *
     * @type {number}
     */
    count: number;
    /**
     * Applies to integer data only. Indicates how the underlying data in the buffer maps to
     * the values in the GLSL code. For instance, if `buffer` contains data of `gl.UNSIGNED_SHORT`,
     * and `normalized` is `true`, the values `0 - +65535` in the buffer data will be mapped to
     * `0.0f - +1.0f` in the GLSL attribute. If `normalized` is `false`, the values will be converted
     * to floats unmodified, i.e. `65535` becomes `65535.0f`.
     *
     * @type {boolean}
     */
    normalized: boolean;
    /**
     * A version number, incremented every time the `needsUpdate` is set to `true`.
     *
     * @type {number}
     */
    version: number;
    /**
     * Flag to indicate that this attribute has changed and should be re-sent to
     * the GPU. Set this to `true` when you modify the value of the array.
     *
     * @type {number}
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
    setBuffer(buffer: WebGLBuffer): BufferAttribute;
    /**
     * Sets the given native data type and element size.
     *
     * @param {number} type - The native data type (e.g. `gl.FLOAT`).
     * @param {number} elementSize - The corresponding size (in bytes) for the given `type` parameter.
     * @return {BufferAttribute} A reference to this instance.
     */
    setType(type: number, elementSize: number): BufferAttribute;
    /**
     * Sets the item size.
     *
     * @param {number} itemSize - The item size.
     * @return {BufferAttribute} A reference to this instance.
     */
    setItemSize(itemSize: number): BufferAttribute;
    /**
     * Sets the count (the expected number of vertices in VBO).
     *
     * @param {number} count - The count.
     * @return {BufferAttribute} A reference to this instance.
     */
    setCount(count: number): BufferAttribute;
}
