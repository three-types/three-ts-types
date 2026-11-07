import { BufferAttribute } from "../core/BufferAttribute.js";
import { Matrix4 } from "./Matrix4.js";
import { QuaternionLike } from "./Quaternion.js";
import { Vector3Like } from "./Vector3.js";

export type Vector4Tuple = [number, number, number, number];

export interface Vector4Like {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly w: number;
}

/**
 * Class representing a 4D vector. A 4D vector is an ordered quadruplet of numbers
 * (labeled x, y, z and w), which can be used to represent a number of things, such as:
 *
 * - A point in 4D space.
 * - A direction and length in 4D space. In three.js the length will
 * always be the Euclidean distance(straight-line distance) from `(0, 0, 0, 0)` to `(x, y, z, w)`
 * and the direction is also measured from `(0, 0, 0, 0)` towards `(x, y, z, w)`.
 * - Any arbitrary ordered quadruplet of numbers.
 *
 * There are other things a 4D vector can be used to represent, however these
 * are the most common uses in *three.js*.
 *
 * Iterating through a vector instance will yield its components `(x, y, z, w)` in
 * the corresponding order.
 * ```js
 * const a = new THREE.Vector4( 0, 1, 0, 0 );
 *
 * //no arguments; will be initialised to (0, 0, 0, 1)
 * const b = new THREE.Vector4( );
 *
 * const d = a.dot( b );
 * ```
 */
export class Vector4 {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isVector4: true;
    /**
     * Constructs a new 4D vector.
     *
     * @param {number} [x=0] - The x value of this vector.
     * @param {number} [y=0] - The y value of this vector.
     * @param {number} [z=0] - The z value of this vector.
     * @param {number} [w=1] - The w value of this vector.
     */
    constructor(x?: number, y?: number, z?: number, w?: number);
    /**
     * The x value of this vector.
     *
     * @type {number}
     */
    x: number;
    /**
     * The y value of this vector.
     *
     * @type {number}
     */
    y: number;
    /**
     * The z value of this vector.
     *
     * @type {number}
     */
    z: number;
    /**
     * The w value of this vector.
     *
     * @type {number}
     */
    w: number;
    set width(value: number);
    /**
     * Alias for {@link Vector4#z}.
     *
     * @type {number}
     */
    get width(): number;
    set height(value: number);
    /**
     * Alias for {@link Vector4#w}.
     *
     * @type {number}
     */
    get height(): number;
    /**
     * Sets the vector components.
     *
     * @param {number} x - The value of the x component.
     * @param {number} y - The value of the y component.
     * @param {number} z - The value of the z component.
     * @param {number} w - The value of the w component.
     * @return {Vector4} A reference to this vector.
     */
    set(x: number, y: number, z: number, w: number): this;
    /**
     * Sets the vector components to the same value.
     *
     * @param {number} scalar - The value to set for all vector components.
     * @return {Vector4} A reference to this vector.
     */
    setScalar(scalar: number): this;
    /**
     * Sets the vector's x component to the given value
     *
     * @param {number} x - The value to set.
     * @return {Vector4} A reference to this vector.
     */
    setX(x: number): this;
    /**
     * Sets the vector's y component to the given value
     *
     * @param {number} y - The value to set.
     * @return {Vector4} A reference to this vector.
     */
    setY(y: number): this;
    /**
     * Sets the vector's z component to the given value
     *
     * @param {number} z - The value to set.
     * @return {Vector4} A reference to this vector.
     */
    setZ(z: number): this;
    /**
     * Sets the vector's w component to the given value
     *
     * @param {number} w - The value to set.
     * @return {Vector4} A reference to this vector.
     */
    setW(w: number): this;
    /**
     * Allows to set a vector component with an index.
     *
     * @param {number} index - The component index. `0` equals to x, `1` equals to y,
     * `2` equals to z, `3` equals to w.
     * @param {number} value - The value to set.
     * @return {Vector4} A reference to this vector.
     */
    setComponent(index: number, value: number): this;
    /**
     * Returns the value of the vector component which matches the given index.
     *
     * @param {number} index - The component index. `0` equals to x, `1` equals to y,
     * `2` equals to z, `3` equals to w.
     * @return {number} A vector component value.
     */
    getComponent(index: number): number;
    /**
     * Returns a new vector with copied values from this instance.
     *
     * @return {Vector4} A clone of this instance.
     */
    clone(): this;
    /**
     * Copies the values of the given vector to this instance.
     *
     * @param {Vector3|Vector4} v - The vector to copy.
     * @return {Vector4} A reference to this vector.
     */
    copy(v: Vector3Like | Vector4Like): this;
    /**
     * Adds the given vector to this instance.
     *
     * @param {Vector4} v - The vector to add.
     * @return {Vector4} A reference to this vector.
     */
    add(v: Vector4Like): this;
    /**
     * Adds the given scalar value to all components of this instance.
     *
     * @param {number} s - The scalar to add.
     * @return {Vector4} A reference to this vector.
     */
    addScalar(s: number): this;
    /**
     * Adds the given vectors and stores the result in this instance.
     *
     * @param {Vector4} a - The first vector.
     * @param {Vector4} b - The second vector.
     * @return {Vector4} A reference to this vector.
     */
    addVectors(a: Vector4Like, b: Vector4Like): this;
    /**
     * Adds the given vector scaled by the given factor to this instance.
     *
     * @param {Vector4} v - The vector.
     * @param {number} s - The factor that scales `v`.
     * @return {Vector4} A reference to this vector.
     */
    addScaledVector(v: Vector4Like, s: number): this;
    /**
     * Subtracts the given vector from this instance.
     *
     * @param {Vector4} v - The vector to subtract.
     * @return {Vector4} A reference to this vector.
     */
    sub(v: Vector4Like): this;
    /**
     * Subtracts the given scalar value from all components of this instance.
     *
     * @param {number} s - The scalar to subtract.
     * @return {Vector4} A reference to this vector.
     */
    subScalar(s: number): this;
    /**
     * Subtracts the given vectors and stores the result in this instance.
     *
     * @param {Vector4} a - The first vector.
     * @param {Vector4} b - The second vector.
     * @return {Vector4} A reference to this vector.
     */
    subVectors(a: Vector4Like, b: Vector4Like): this;
    /**
     * Multiplies the given vector with this instance.
     *
     * @param {Vector4} v - The vector to multiply.
     * @return {Vector4} A reference to this vector.
     */
    multiply(v: Vector4Like): this;
    /**
     * Multiplies the given scalar value with all components of this instance.
     *
     * @param {number} scalar - The scalar to multiply.
     * @return {Vector4} A reference to this vector.
     */
    multiplyScalar(scalar: number): this;
    /**
     * Multiplies this vector with the given 4x4 matrix.
     *
     * @param {Matrix4} m - The 4x4 matrix.
     * @return {Vector4} A reference to this vector.
     */
    applyMatrix4(m: Matrix4): this;
    /**
     * Divides this instance by the given vector.
     *
     * @param {Vector4} v - The vector to divide.
     * @return {Vector4} A reference to this vector.
     */
    divide(v: Vector4Like): this;
    /**
     * Divides this vector by the given scalar.
     *
     * @param {number} scalar - The scalar to divide.
     * @return {Vector4} A reference to this vector.
     */
    divideScalar(scalar: number): this;
    /**
     * Sets the x, y and z components of this
     * vector to the quaternion's axis and w to the angle.
     *
     * @param {Quaternion} q - The Quaternion to set.
     * @return {Vector4} A reference to this vector.
     */
    setAxisAngleFromQuaternion(q: QuaternionLike): this;
    /**
     * Sets the x, y and z components of this
     * vector to the axis of rotation and w to the angle.
     *
     * @param {Matrix4} m - A 4x4 matrix of which the upper left 3x3 matrix is a pure rotation matrix.
     * @return {Vector4} A reference to this vector.
     */
    setAxisAngleFromRotationMatrix(m: Matrix4): this;
    /**
     * Sets the vector components to the position elements of the
     * given transformation matrix.
     *
     * @param {Matrix4} m - The 4x4 matrix.
     * @return {Vector4} A reference to this vector.
     */
    setFromMatrixPosition(m: Matrix4): this;
    /**
     * If this vector's x, y, z or w value is greater than the given vector's x, y, z or w
     * value, replace that value with the corresponding min value.
     *
     * @param {Vector4} v - The vector.
     * @return {Vector4} A reference to this vector.
     */
    min(v: Vector4Like): this;
    /**
     * If this vector's x, y, z or w value is less than the given vector's x, y, z or w
     * value, replace that value with the corresponding max value.
     *
     * @param {Vector4} v - The vector.
     * @return {Vector4} A reference to this vector.
     */
    max(v: Vector4Like): this;
    /**
     * If this vector's x, y, z or w value is greater than the max vector's x, y, z or w
     * value, it is replaced by the corresponding value.
     * If this vector's x, y, z or w value is less than the min vector's x, y, z or w value,
     * it is replaced by the corresponding value.
     *
     * @param {Vector4} min - The minimum x, y and z values.
     * @param {Vector4} max - The maximum x, y and z values in the desired range.
     * @return {Vector4} A reference to this vector.
     */
    clamp(min: Vector4Like, max: Vector4Like): this;
    /**
     * If this vector's x, y, z or w values are greater than the max value, they are
     * replaced by the max value.
     * If this vector's x, y, z or w values are less than the min value, they are
     * replaced by the min value.
     *
     * @param {number} minVal - The minimum value the components will be clamped to.
     * @param {number} maxVal - The maximum value the components will be clamped to.
     * @return {Vector4} A reference to this vector.
     */
    clampScalar(minVal: number, maxVal: number): this;
    /**
     * If this vector's length is greater than the max value, it is replaced by
     * the max value.
     * If this vector's length is less than the min value, it is replaced by the
     * min value.
     *
     * @param {number} min - The minimum value the vector length will be clamped to.
     * @param {number} max - The maximum value the vector length will be clamped to.
     * @return {Vector4} A reference to this vector.
     */
    clampLength(min: number, max: number): Vector4;
    /**
     * The components of this vector are rounded down to the nearest integer value.
     *
     * @return {Vector4} A reference to this vector.
     */
    floor(): this;
    /**
     * The components of this vector are rounded up to the nearest integer value.
     *
     * @return {Vector4} A reference to this vector.
     */
    ceil(): this;
    /**
     * The components of this vector are rounded to the nearest integer value
     *
     * @return {Vector4} A reference to this vector.
     */
    round(): this;
    /**
     * The components of this vector are rounded towards zero (up if negative,
     * down if positive) to an integer value.
     *
     * @return {Vector4} A reference to this vector.
     */
    roundToZero(): this;
    /**
     * Inverts this vector - i.e. sets x = -x, y = -y, z = -z, w = -w.
     *
     * @return {Vector4} A reference to this vector.
     */
    negate(): this;
    /**
     * Calculates the dot product of the given vector with this instance.
     *
     * @param {Vector4} v - The vector to compute the dot product with.
     * @return {number} The result of the dot product.
     */
    dot(v: Vector4Like): number;
    /**
     * Computes the square of the Euclidean length (straight-line length) from
     * (0, 0, 0, 0) to (x, y, z, w). If you are comparing the lengths of vectors, you should
     * compare the length squared instead as it is slightly more efficient to calculate.
     *
     * @return {number} The square length of this vector.
     */
    lengthSq(): number;
    /**
     * Computes the  Euclidean length (straight-line length) from (0, 0, 0, 0) to (x, y, z, w).
     *
     * @return {number} The length of this vector.
     */
    length(): number;
    /**
     * Computes the Manhattan length of this vector.
     *
     * @return {number} The length of this vector.
     */
    manhattanLength(): number;
    /**
     * Converts this vector to a unit vector - that is, sets it equal to a vector
     * with the same direction as this one, but with a vector length of `1`.
     *
     * @return {Vector4} A reference to this vector.
     */
    normalize(): this;
    /**
     * Sets this vector to a vector with the same direction as this one, but
     * with the specified length.
     *
     * @param {number} length - The new length of this vector.
     * @return {Vector4} A reference to this vector.
     */
    setLength(length: number): this;
    /**
     * Linearly interpolates between the given vector and this instance, where
     * alpha is the percent distance along the line - alpha = 0 will be this
     * vector, and alpha = 1 will be the given one.
     *
     * @param {Vector4} v - The vector to interpolate towards.
     * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
     * @return {Vector4} A reference to this vector.
     */
    lerp(v: Vector4Like, alpha: number): this;
    /**
     * Linearly interpolates between the given vectors, where alpha is the percent
     * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
     * be the second one. The result is stored in this instance.
     *
     * @param {Vector4} v1 - The first vector.
     * @param {Vector4} v2 - The second vector.
     * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
     * @return {Vector4} A reference to this vector.
     */
    lerpVectors(v1: Vector4Like, v2: Vector4Like, alpha: number): this;
    /**
     * Returns `true` if this vector is equal with the given one.
     *
     * @param {Vector4} v - The vector to test for equality.
     * @return {boolean} Whether this vector is equal with the given one.
     */
    equals(v: Vector4Like): boolean;
    /**
     * Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`,
     * z value to be `array[ offset + 2 ]`, w value to be `array[ offset + 3 ]`.
     *
     * @param {Array<number>} array - An array holding the vector component values.
     * @param {number} [offset=0] - The offset into the array.
     * @return {Vector4} A reference to this vector.
     */
    fromArray(array: number[] | ArrayLike<number>, offset?: number): this;
    /**
     * Writes the components of this vector to the given array. If no array is provided,
     * the method returns a new instance.
     *
     * @param {Array<number>} [array=[]] - The target array holding the vector components.
     * @param {number} [offset=0] - Index of the first element in the array.
     * @return {Array<number>} The vector components.
     */
    toArray(array?: number[], offset?: number): number[];
    /**
     * Writes the components of this vector to the given array. If no array is provided,
     * the method returns a new instance.
     *
     * @param {Array<number>} [array=[]] - The target array holding the vector components.
     * @param {number} [offset=0] - Index of the first element in the array.
     * @return {Array<number>} The vector components.
     */
    toArray(array?: Vector4Tuple, offset?: 0): Vector4Tuple;
    /**
     * Writes the components of this vector to the given array. If no array is provided,
     * the method returns a new instance.
     *
     * @param {Array<number>} [array=[]] - The target array holding the vector components.
     * @param {number} [offset=0] - Index of the first element in the array.
     * @return {Array<number>} The vector components.
     */
    toArray(array: ArrayLike<number>, offset?: number): ArrayLike<number>;
    /**
     * Sets the components of this vector from the given buffer attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
     * @param {number} index - The index into the attribute.
     * @return {Vector4} A reference to this vector.
     */
    fromBufferAttribute(attribute: BufferAttribute, index: number): this;
    /**
     * Sets each component of this vector to a pseudo-random value between `0` and
     * `1`, excluding `1`.
     *
     * @return {Vector4} A reference to this vector.
     */
    random(): this;
    [Symbol.iterator](): Generator<number, void, unknown>;
}
