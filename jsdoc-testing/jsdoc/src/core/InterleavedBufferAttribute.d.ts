/**
 * An alternative version of a buffer attribute with interleaved data. Interleaved
 * attributes share a common interleaved data storage ({@link InterleavedBuffer}) and refer with
 * different offsets into the buffer.
 */
export class InterleavedBufferAttribute {
    /**
     * Constructs a new interleaved buffer attribute.
     *
     * @param {InterleavedBuffer} interleavedBuffer - The buffer holding the interleaved data.
     * @param {number} itemSize - The item size.
     * @param {number} offset - The attribute offset into the buffer.
     * @param {boolean} [normalized=false] - Whether the data are normalized or not.
     */
    constructor(interleavedBuffer: InterleavedBuffer, itemSize: number, offset: number, normalized?: boolean);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isInterleavedBufferAttribute: boolean;
    /**
     * The name of the buffer attribute.
     *
     * @type {string}
     */
    name: string;
    /**
     * The buffer holding the interleaved data.
     *
     * @type {InterleavedBuffer}
     */
    data: InterleavedBuffer;
    /**
     * The item size, see {@link BufferAttribute#itemSize}.
     *
     * @type {number}
     */
    itemSize: number;
    /**
     * The attribute offset into the buffer.
     *
     * @type {number}
     */
    offset: number;
    /**
     * Whether the data are normalized or not, see {@link BufferAttribute#normalized}
     *
     * @type {InterleavedBuffer}
     */
    normalized: InterleavedBuffer;
    /**
     * The item count of this buffer attribute.
     *
     * @type {number}
     * @readonly
     */
    readonly get count(): number;
    /**
     * The array holding the interleaved buffer attribute data.
     *
     * @type {TypedArray}
     */
    get array(): TypedArray;
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
     * Applies the given 4x4 matrix to the given attribute. Only works with
     * item size `3`.
     *
     * @param {Matrix4} m - The matrix to apply.
     * @return {InterleavedBufferAttribute} A reference to this instance.
     */
    applyMatrix4(m: Matrix4): InterleavedBufferAttribute;
    /**
     * Applies the given 3x3 normal matrix to the given attribute. Only works with
     * item size `3`.
     *
     * @param {Matrix3} m - The normal matrix to apply.
     * @return {InterleavedBufferAttribute} A reference to this instance.
     */
    applyNormalMatrix(m: Matrix3): InterleavedBufferAttribute;
    /**
     * Applies the given 4x4 matrix to the given attribute. Only works with
     * item size `3` and with direction vectors.
     *
     * @param {Matrix4} m - The matrix to apply.
     * @return {InterleavedBufferAttribute} A reference to this instance.
     */
    transformDirection(m: Matrix4): InterleavedBufferAttribute;
    /**
     * Returns the given component of the vector at the given index.
     *
     * @param {number} index - The index into the buffer attribute.
     * @param {number} component - The component index.
     * @return {number} The returned value.
     */
    getComponent(index: number, component: number): number;
    /**
     * Sets the given value to the given component of the vector at the given index.
     *
     * @param {number} index - The index into the buffer attribute.
     * @param {number} component - The component index.
     * @param {number} value - The value to set.
     * @return {InterleavedBufferAttribute} A reference to this instance.
     */
    setComponent(index: number, component: number, value: number): InterleavedBufferAttribute;
    /**
     * Sets the x component of the vector at the given index.
     *
     * @param {number} index - The index into the buffer attribute.
     * @param {number} x - The value to set.
     * @return {InterleavedBufferAttribute} A reference to this instance.
     */
    setX(index: number, x: number): InterleavedBufferAttribute;
    /**
     * Sets the y component of the vector at the given index.
     *
     * @param {number} index - The index into the buffer attribute.
     * @param {number} y - The value to set.
     * @return {InterleavedBufferAttribute} A reference to this instance.
     */
    setY(index: number, y: number): InterleavedBufferAttribute;
    /**
     * Sets the z component of the vector at the given index.
     *
     * @param {number} index - The index into the buffer attribute.
     * @param {number} z - The value to set.
     * @return {InterleavedBufferAttribute} A reference to this instance.
     */
    setZ(index: number, z: number): InterleavedBufferAttribute;
    /**
     * Sets the w component of the vector at the given index.
     *
     * @param {number} index - The index into the buffer attribute.
     * @param {number} w - The value to set.
     * @return {InterleavedBufferAttribute} A reference to this instance.
     */
    setW(index: number, w: number): InterleavedBufferAttribute;
    /**
     * Returns the x component of the vector at the given index.
     *
     * @param {number} index - The index into the buffer attribute.
     * @return {number} The x component.
     */
    getX(index: number): number;
    /**
     * Returns the y component of the vector at the given index.
     *
     * @param {number} index - The index into the buffer attribute.
     * @return {number} The y component.
     */
    getY(index: number): number;
    /**
     * Returns the z component of the vector at the given index.
     *
     * @param {number} index - The index into the buffer attribute.
     * @return {number} The z component.
     */
    getZ(index: number): number;
    /**
     * Returns the w component of the vector at the given index.
     *
     * @param {number} index - The index into the buffer attribute.
     * @return {number} The w component.
     */
    getW(index: number): number;
    /**
     * Sets the x and y component of the vector at the given index.
     *
     * @param {number} index - The index into the buffer attribute.
     * @param {number} x - The value for the x component to set.
     * @param {number} y - The value for the y component to set.
     * @return {InterleavedBufferAttribute} A reference to this instance.
     */
    setXY(index: number, x: number, y: number): InterleavedBufferAttribute;
    /**
     * Sets the x, y and z component of the vector at the given index.
     *
     * @param {number} index - The index into the buffer attribute.
     * @param {number} x - The value for the x component to set.
     * @param {number} y - The value for the y component to set.
     * @param {number} z - The value for the z component to set.
     * @return {InterleavedBufferAttribute} A reference to this instance.
     */
    setXYZ(index: number, x: number, y: number, z: number): InterleavedBufferAttribute;
    /**
     * Sets the x, y, z and w component of the vector at the given index.
     *
     * @param {number} index - The index into the buffer attribute.
     * @param {number} x - The value for the x component to set.
     * @param {number} y - The value for the y component to set.
     * @param {number} z - The value for the z component to set.
     * @param {number} w - The value for the w component to set.
     * @return {InterleavedBufferAttribute} A reference to this instance.
     */
    setXYZW(index: number, x: number, y: number, z: number, w: number): InterleavedBufferAttribute;
    /**
     * Returns a new buffer attribute with copied values from this instance.
     *
     * If no parameter is provided, cloning an interleaved buffer attribute will de-interleave buffer data.
     *
     * @param {Object} [data] - An object with interleaved buffers that allows to retain the interleaved property.
     * @return {BufferAttribute|InterleavedBufferAttribute} A clone of this instance.
     */
    clone(data?: Object): BufferAttribute | InterleavedBufferAttribute;
    /**
     * Serializes the buffer attribute into JSON.
     *
     * If no parameter is provided, cloning an interleaved buffer attribute will de-interleave buffer data.
     *
     * @param {Object} [data] - An optional value holding meta information about the serialization.
     * @return {Object} A JSON object representing the serialized buffer attribute.
     */
    toJSON(data?: Object): Object;
}
import { BufferAttribute } from './BufferAttribute.js';
