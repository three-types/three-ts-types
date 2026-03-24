/**
 * Convenient class that can be used when creating a `Float32` buffer attribute with
 * a plain `Array` instance.
 *
 * @augments BufferAttribute
 */
export class Float32BufferAttribute extends BufferAttribute {
    /**
     * Constructs a new buffer attribute.
     *
     * @param {(Array<number>|Float32Array)} array - The array holding the attribute data.
     * @param {number} itemSize - The item size.
     * @param {boolean} [normalized=false] - Whether the data are normalized or not.
     */
    constructor(array: (Array<number> | Float32Array), itemSize: number, normalized?: boolean);
}
/**
 * Convenient class that can be used when creating a `Float16` buffer attribute with
 * a plain `Array` instance.
 *
 * This class automatically converts to and from FP16 via `Uint16Array` since `Float16Array`
 * browser support is still problematic.
 *
 * @augments BufferAttribute
 */
export class Float16BufferAttribute extends BufferAttribute {
    /**
     * Constructs a new buffer attribute.
     *
     * @param {(Array<number>|Uint16Array)} array - The array holding the attribute data.
     * @param {number} itemSize - The item size.
     * @param {boolean} [normalized=false] - Whether the data are normalized or not.
     */
    constructor(array: (Array<number> | Uint16Array), itemSize: number, normalized?: boolean);
    isFloat16BufferAttribute: boolean;
    getX(index: any): number;
    setX(index: any, x: any): this;
    getY(index: any): number;
    setY(index: any, y: any): this;
    getZ(index: any): number;
    setZ(index: any, z: any): this;
    getW(index: any): number;
    setW(index: any, w: any): this;
    setXY(index: any, x: any, y: any): this;
    setXYZ(index: any, x: any, y: any, z: any): this;
    setXYZW(index: any, x: any, y: any, z: any, w: any): this;
}
/**
 * Convenient class that can be used when creating a `UInt32` buffer attribute with
 * a plain `Array` instance.
 *
 * @augments BufferAttribute
 */
export class Uint32BufferAttribute extends BufferAttribute {
    /**
     * Constructs a new buffer attribute.
     *
     * @param {(Array<number>|Uint32Array)} array - The array holding the attribute data.
     * @param {number} itemSize - The item size.
     * @param {boolean} [normalized=false] - Whether the data are normalized or not.
     */
    constructor(array: (Array<number> | Uint32Array), itemSize: number, normalized?: boolean);
}
/**
 * Convenient class that can be used when creating a `Int32` buffer attribute with
 * a plain `Array` instance.
 *
 * @augments BufferAttribute
 */
export class Int32BufferAttribute extends BufferAttribute {
    /**
     * Constructs a new buffer attribute.
     *
     * @param {(Array<number>|Int32Array)} array - The array holding the attribute data.
     * @param {number} itemSize - The item size.
     * @param {boolean} [normalized=false] - Whether the data are normalized or not.
     */
    constructor(array: (Array<number> | Int32Array), itemSize: number, normalized?: boolean);
}
/**
 * Convenient class that can be used when creating a `UInt16` buffer attribute with
 * a plain `Array` instance.
 *
 * @augments BufferAttribute
 */
export class Uint16BufferAttribute extends BufferAttribute {
    /**
     * Constructs a new buffer attribute.
     *
     * @param {(Array<number>|Uint16Array)} array - The array holding the attribute data.
     * @param {number} itemSize - The item size.
     * @param {boolean} [normalized=false] - Whether the data are normalized or not.
     */
    constructor(array: (Array<number> | Uint16Array), itemSize: number, normalized?: boolean);
}
/**
 * Convenient class that can be used when creating a `Int16` buffer attribute with
 * a plain `Array` instance.
 *
 * @augments BufferAttribute
 */
export class Int16BufferAttribute extends BufferAttribute {
    /**
     * Constructs a new buffer attribute.
     *
     * @param {(Array<number>|Int16Array)} array - The array holding the attribute data.
     * @param {number} itemSize - The item size.
     * @param {boolean} [normalized=false] - Whether the data are normalized or not.
     */
    constructor(array: (Array<number> | Int16Array), itemSize: number, normalized?: boolean);
}
/**
 * Convenient class that can be used when creating a `UInt8Clamped` buffer attribute with
 * a plain `Array` instance.
 *
 * @augments BufferAttribute
 */
export class Uint8ClampedBufferAttribute extends BufferAttribute {
    /**
     * Constructs a new buffer attribute.
     *
     * @param {(Array<number>|Uint8ClampedArray)} array - The array holding the attribute data.
     * @param {number} itemSize - The item size.
     * @param {boolean} [normalized=false] - Whether the data are normalized or not.
     */
    constructor(array: (Array<number> | Uint8ClampedArray), itemSize: number, normalized?: boolean);
}
/**
 * Convenient class that can be used when creating a `UInt8` buffer attribute with
 * a plain `Array` instance.
 *
 * @augments BufferAttribute
 */
export class Uint8BufferAttribute extends BufferAttribute {
    /**
     * Constructs a new buffer attribute.
     *
     * @param {(Array<number>|Uint8Array)} array - The array holding the attribute data.
     * @param {number} itemSize - The item size.
     * @param {boolean} [normalized=false] - Whether the data are normalized or not.
     */
    constructor(array: (Array<number> | Uint8Array), itemSize: number, normalized?: boolean);
}
/**
 * Convenient class that can be used when creating a `Int8` buffer attribute with
 * a plain `Array` instance.
 *
 * @augments BufferAttribute
 */
export class Int8BufferAttribute extends BufferAttribute {
    /**
     * Constructs a new buffer attribute.
     *
     * @param {(Array<number>|Int8Array)} array - The array holding the attribute data.
     * @param {number} itemSize - The item size.
     * @param {boolean} [normalized=false] - Whether the data are normalized or not.
     */
    constructor(array: (Array<number> | Int8Array), itemSize: number, normalized?: boolean);
}
/**
 * This class stores data for an attribute (such as vertex positions, face
 * indices, normals, colors, UVs, and any custom attributes ) associated with
 * a geometry, which allows for more efficient passing of data to the GPU.
 *
 * When working with vector-like data, the `fromBufferAttribute( attribute, index )`
 * helper methods on vector and color class might be helpful. E.g. {@link Vector3#fromBufferAttribute}.
 */
export class BufferAttribute {
    /**
     * Constructs a new buffer attribute.
     *
     * @param {TypedArray} array - The array holding the attribute data.
     * @param {number} itemSize - The item size.
     * @param {boolean} [normalized=false] - Whether the data are normalized or not.
     */
    constructor(array: TypedArray, itemSize: number, normalized?: boolean);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isBufferAttribute: boolean;
    /**
     * The name of the buffer attribute.
     *
     * @type {string}
     */
    name: string;
    /**
     * The array holding the attribute data. It should have `itemSize * numVertices`
     * elements, where `numVertices` is the number of vertices in the associated geometry.
     *
     * @type {TypedArray}
     */
    array: TypedArray;
    /**
     * The number of values of the array that should be associated with a particular vertex.
     * For instance, if this attribute is storing a 3-component vector (such as a position,
     * normal, or color), then the value should be `3`.
     *
     * @type {number}
     */
    itemSize: number;
    /**
     * Represents the number of items this buffer attribute stores. It is internally computed
     * by dividing the `array` length by the `itemSize`.
     *
     * @type {number}
     * @readonly
     */
    readonly count: number;
    /**
     * Applies to integer data only. Indicates how the underlying data in the buffer maps to
     * the values in the GLSL code. For instance, if `array` is an instance of `UInt16Array`,
     * and `normalized` is `true`, the values `0 - +65535` in the array data will be mapped to
     * `0.0f - +1.0f` in the GLSL attribute. If `normalized` is `false`, the values will be converted
     * to floats unmodified, i.e. `65535` becomes `65535.0f`.
     *
     * @type {boolean}
     */
    normalized: boolean;
    /**
     * Defines the intended usage pattern of the data store for optimization purposes.
     *
     * Note: After the initial use of a buffer, its usage cannot be changed. Instead,
     * instantiate a new one and set the desired usage before the next render.
     *
     * @type {(StaticDrawUsage|DynamicDrawUsage|StreamDrawUsage|StaticReadUsage|DynamicReadUsage|StreamReadUsage|StaticCopyUsage|DynamicCopyUsage|StreamCopyUsage)}
     * @default StaticDrawUsage
     */
    usage: (number | DynamicDrawUsage | StreamDrawUsage | StaticReadUsage | DynamicReadUsage | StreamReadUsage | StaticCopyUsage | DynamicCopyUsage | StreamCopyUsage);
    /**
     * This can be used to only update some components of stored vectors (for example, just the
     * component related to color). Use the `addUpdateRange()` function to add ranges to this array.
     *
     * @type {Array<Object>}
     */
    updateRanges: Array<Object>;
    /**
     * Configures the bound GPU type for use in shaders.
     *
     * Note: this only has an effect for integer arrays and is not configurable for float arrays.
     * For lower precision float types, use `Float16BufferAttribute`.
     *
     * @type {(FloatType|IntType)}
     * @default FloatType
     */
    gpuType: (number | IntType);
    /**
     * A version number, incremented every time the `needsUpdate` is set to `true`.
     *
     * @type {number}
     */
    version: number;
    /**
     * A callback function that is executed after the renderer has transferred the attribute
     * array data to the GPU.
     */
    onUploadCallback(): void;
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
     * Sets the usage of this buffer attribute.
     *
     * @param {(StaticDrawUsage|DynamicDrawUsage|StreamDrawUsage|StaticReadUsage|DynamicReadUsage|StreamReadUsage|StaticCopyUsage|DynamicCopyUsage|StreamCopyUsage)} value - The usage to set.
     * @return {BufferAttribute} A reference to this buffer attribute.
     */
    setUsage(value: (number | DynamicDrawUsage | StreamDrawUsage | StaticReadUsage | DynamicReadUsage | StreamReadUsage | StaticCopyUsage | DynamicCopyUsage | StreamCopyUsage)): BufferAttribute;
    /**
     * Adds a range of data in the data array to be updated on the GPU.
     *
     * @param {number} start - Position at which to start update.
     * @param {number} count - The number of components to update.
     */
    addUpdateRange(start: number, count: number): void;
    /**
     * Clears the update ranges.
     */
    clearUpdateRanges(): void;
    /**
     * Copies the values of the given buffer attribute to this instance.
     *
     * @param {BufferAttribute} source - The buffer attribute to copy.
     * @return {BufferAttribute} A reference to this instance.
     */
    copy(source: BufferAttribute): BufferAttribute;
    /**
     * Copies a vector from the given buffer attribute to this one. The start
     * and destination position in the attribute buffers are represented by the
     * given indices.
     *
     * @param {number} index1 - The destination index into this buffer attribute.
     * @param {BufferAttribute} attribute - The buffer attribute to copy from.
     * @param {number} index2 - The source index into the given buffer attribute.
     * @return {BufferAttribute} A reference to this instance.
     */
    copyAt(index1: number, attribute: BufferAttribute, index2: number): BufferAttribute;
    /**
     * Copies the given array data into this buffer attribute.
     *
     * @param {(TypedArray|Array)} array - The array to copy.
     * @return {BufferAttribute} A reference to this instance.
     */
    copyArray(array: (TypedArray | any[])): BufferAttribute;
    /**
     * Applies the given 3x3 matrix to the given attribute. Works with
     * item size `2` and `3`.
     *
     * @param {Matrix3} m - The matrix to apply.
     * @return {BufferAttribute} A reference to this instance.
     */
    applyMatrix3(m: Matrix3): BufferAttribute;
    /**
     * Applies the given 4x4 matrix to the given attribute. Only works with
     * item size `3`.
     *
     * @param {Matrix4} m - The matrix to apply.
     * @return {BufferAttribute} A reference to this instance.
     */
    applyMatrix4(m: Matrix4): BufferAttribute;
    /**
     * Applies the given 3x3 normal matrix to the given attribute. Only works with
     * item size `3`.
     *
     * @param {Matrix3} m - The normal matrix to apply.
     * @return {BufferAttribute} A reference to this instance.
     */
    applyNormalMatrix(m: Matrix3): BufferAttribute;
    /**
     * Applies the given 4x4 matrix to the given attribute. Only works with
     * item size `3` and with direction vectors.
     *
     * @param {Matrix4} m - The matrix to apply.
     * @return {BufferAttribute} A reference to this instance.
     */
    transformDirection(m: Matrix4): BufferAttribute;
    /**
     * Sets the given array data in the buffer attribute.
     *
     * @param {(TypedArray|Array)} value - The array data to set.
     * @param {number} [offset=0] - The offset in this buffer attribute's array.
     * @return {BufferAttribute} A reference to this instance.
     */
    set(value: (TypedArray | any[]), offset?: number): BufferAttribute;
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
     * @return {BufferAttribute} A reference to this instance.
     */
    setComponent(index: number, component: number, value: number): BufferAttribute;
    /**
     * Returns the x component of the vector at the given index.
     *
     * @param {number} index - The index into the buffer attribute.
     * @return {number} The x component.
     */
    getX(index: number): number;
    /**
     * Sets the x component of the vector at the given index.
     *
     * @param {number} index - The index into the buffer attribute.
     * @param {number} x - The value to set.
     * @return {BufferAttribute} A reference to this instance.
     */
    setX(index: number, x: number): BufferAttribute;
    /**
     * Returns the y component of the vector at the given index.
     *
     * @param {number} index - The index into the buffer attribute.
     * @return {number} The y component.
     */
    getY(index: number): number;
    /**
     * Sets the y component of the vector at the given index.
     *
     * @param {number} index - The index into the buffer attribute.
     * @param {number} y - The value to set.
     * @return {BufferAttribute} A reference to this instance.
     */
    setY(index: number, y: number): BufferAttribute;
    /**
     * Returns the z component of the vector at the given index.
     *
     * @param {number} index - The index into the buffer attribute.
     * @return {number} The z component.
     */
    getZ(index: number): number;
    /**
     * Sets the z component of the vector at the given index.
     *
     * @param {number} index - The index into the buffer attribute.
     * @param {number} z - The value to set.
     * @return {BufferAttribute} A reference to this instance.
     */
    setZ(index: number, z: number): BufferAttribute;
    /**
     * Returns the w component of the vector at the given index.
     *
     * @param {number} index - The index into the buffer attribute.
     * @return {number} The w component.
     */
    getW(index: number): number;
    /**
     * Sets the w component of the vector at the given index.
     *
     * @param {number} index - The index into the buffer attribute.
     * @param {number} w - The value to set.
     * @return {BufferAttribute} A reference to this instance.
     */
    setW(index: number, w: number): BufferAttribute;
    /**
     * Sets the x and y component of the vector at the given index.
     *
     * @param {number} index - The index into the buffer attribute.
     * @param {number} x - The value for the x component to set.
     * @param {number} y - The value for the y component to set.
     * @return {BufferAttribute} A reference to this instance.
     */
    setXY(index: number, x: number, y: number): BufferAttribute;
    /**
     * Sets the x, y and z component of the vector at the given index.
     *
     * @param {number} index - The index into the buffer attribute.
     * @param {number} x - The value for the x component to set.
     * @param {number} y - The value for the y component to set.
     * @param {number} z - The value for the z component to set.
     * @return {BufferAttribute} A reference to this instance.
     */
    setXYZ(index: number, x: number, y: number, z: number): BufferAttribute;
    /**
     * Sets the x, y, z and w component of the vector at the given index.
     *
     * @param {number} index - The index into the buffer attribute.
     * @param {number} x - The value for the x component to set.
     * @param {number} y - The value for the y component to set.
     * @param {number} z - The value for the z component to set.
     * @param {number} w - The value for the w component to set.
     * @return {BufferAttribute} A reference to this instance.
     */
    setXYZW(index: number, x: number, y: number, z: number, w: number): BufferAttribute;
    /**
     * Sets the given callback function that is executed after the Renderer has transferred
     * the attribute array data to the GPU. Can be used to perform clean-up operations after
     * the upload when attribute data are not needed anymore on the CPU side.
     *
     * @param {Function} callback - The `onUpload()` callback.
     * @return {BufferAttribute} A reference to this instance.
     */
    onUpload(callback: Function): BufferAttribute;
    /**
     * Returns a new buffer attribute with copied values from this instance.
     *
     * @return {BufferAttribute} A clone of this instance.
     */
    clone(): BufferAttribute;
    /**
     * Serializes the buffer attribute into JSON.
     *
     * @return {Object} A JSON object representing the serialized buffer attribute.
     */
    toJSON(): Object;
}
