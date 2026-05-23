/**
 * Class representing a 2D vector. A 2D vector is an ordered pair of numbers
 * (labeled x and y), which can be used to represent a number of things, such as:
 *
 * - A point in 2D space (i.e. a position on a plane).
 * - A direction and length across a plane. In three.js the length will
 * always be the Euclidean distance(straight-line distance) from `(0, 0)` to `(x, y)`
 * and the direction is also measured from `(0, 0)` towards `(x, y)`.
 * - Any arbitrary ordered pair of numbers.
 *
 * There are other things a 2D vector can be used to represent, such as
 * momentum vectors, complex numbers and so on, however these are the most
 * common uses in three.js.
 *
 * Iterating through a vector instance will yield its components `(x, y)` in
 * the corresponding order.
 * ```js
 * const a = new THREE.Vector2( 0, 1 );
 *
 * //no arguments; will be initialised to (0, 0)
 * const b = new THREE.Vector2( );
 *
 * const d = a.distanceTo( b );
 * ```
 */
export class Vector2 {
    /**
     * Constructs a new 2D vector.
     *
     * @param {number} [x=0] - The x value of this vector.
     * @param {number} [y=0] - The y value of this vector.
     */
    constructor(x?: number, y?: number);
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
    set width(value: number);
    /**
     * Alias for {@link Vector2#x}.
     *
     * @type {number}
     */
    get width(): number;
    set height(value: number);
    /**
     * Alias for {@link Vector2#y}.
     *
     * @type {number}
     */
    get height(): number;
    /**
     * Sets the vector components.
     *
     * @param {number} x - The value of the x component.
     * @param {number} y - The value of the y component.
     * @return {Vector2} A reference to this vector.
     */
    set(x: number, y: number): Vector2;
    /**
     * Sets the vector components to the same value.
     *
     * @param {number} scalar - The value to set for all vector components.
     * @return {Vector2} A reference to this vector.
     */
    setScalar(scalar: number): Vector2;
    /**
     * Sets the vector's x component to the given value
     *
     * @param {number} x - The value to set.
     * @return {Vector2} A reference to this vector.
     */
    setX(x: number): Vector2;
    /**
     * Sets the vector's y component to the given value
     *
     * @param {number} y - The value to set.
     * @return {Vector2} A reference to this vector.
     */
    setY(y: number): Vector2;
    /**
     * Allows to set a vector component with an index.
     *
     * @param {number} index - The component index. `0` equals to x, `1` equals to y.
     * @param {number} value - The value to set.
     * @return {Vector2} A reference to this vector.
     */
    setComponent(index: number, value: number): Vector2;
    /**
     * Returns the value of the vector component which matches the given index.
     *
     * @param {number} index - The component index. `0` equals to x, `1` equals to y.
     * @return {number} A vector component value.
     */
    getComponent(index: number): number;
    /**
     * Returns a new vector with copied values from this instance.
     *
     * @return {Vector2} A clone of this instance.
     */
    clone(): Vector2;
    /**
     * Copies the values of the given vector to this instance.
     *
     * @param {Vector2} v - The vector to copy.
     * @return {Vector2} A reference to this vector.
     */
    copy(v: Vector2): Vector2;
    /**
     * Adds the given vector to this instance.
     *
     * @param {Vector2} v - The vector to add.
     * @return {Vector2} A reference to this vector.
     */
    add(v: Vector2): Vector2;
    /**
     * Adds the given scalar value to all components of this instance.
     *
     * @param {number} s - The scalar to add.
     * @return {Vector2} A reference to this vector.
     */
    addScalar(s: number): Vector2;
    /**
     * Adds the given vectors and stores the result in this instance.
     *
     * @param {Vector2} a - The first vector.
     * @param {Vector2} b - The second vector.
     * @return {Vector2} A reference to this vector.
     */
    addVectors(a: Vector2, b: Vector2): Vector2;
    /**
     * Adds the given vector scaled by the given factor to this instance.
     *
     * @param {Vector2} v - The vector.
     * @param {number} s - The factor that scales `v`.
     * @return {Vector2} A reference to this vector.
     */
    addScaledVector(v: Vector2, s: number): Vector2;
    /**
     * Subtracts the given vector from this instance.
     *
     * @param {Vector2} v - The vector to subtract.
     * @return {Vector2} A reference to this vector.
     */
    sub(v: Vector2): Vector2;
    /**
     * Subtracts the given scalar value from all components of this instance.
     *
     * @param {number} s - The scalar to subtract.
     * @return {Vector2} A reference to this vector.
     */
    subScalar(s: number): Vector2;
    /**
     * Subtracts the given vectors and stores the result in this instance.
     *
     * @param {Vector2} a - The first vector.
     * @param {Vector2} b - The second vector.
     * @return {Vector2} A reference to this vector.
     */
    subVectors(a: Vector2, b: Vector2): Vector2;
    /**
     * Multiplies the given vector with this instance.
     *
     * @param {Vector2} v - The vector to multiply.
     * @return {Vector2} A reference to this vector.
     */
    multiply(v: Vector2): Vector2;
    /**
     * Multiplies the given scalar value with all components of this instance.
     *
     * @param {number} scalar - The scalar to multiply.
     * @return {Vector2} A reference to this vector.
     */
    multiplyScalar(scalar: number): Vector2;
    /**
     * Divides this instance by the given vector.
     *
     * @param {Vector2} v - The vector to divide.
     * @return {Vector2} A reference to this vector.
     */
    divide(v: Vector2): Vector2;
    /**
     * Divides this vector by the given scalar.
     *
     * @param {number} scalar - The scalar to divide.
     * @return {Vector2} A reference to this vector.
     */
    divideScalar(scalar: number): Vector2;
    /**
     * Multiplies this vector (with an implicit 1 as the 3rd component) by
     * the given 3x3 matrix.
     *
     * @param {Matrix3} m - The matrix to apply.
     * @return {Vector2} A reference to this vector.
     */
    applyMatrix3(m: Matrix3): Vector2;
    /**
     * If this vector's x or y value is greater than the given vector's x or y
     * value, replace that value with the corresponding min value.
     *
     * @param {Vector2} v - The vector.
     * @return {Vector2} A reference to this vector.
     */
    min(v: Vector2): Vector2;
    /**
     * If this vector's x or y value is less than the given vector's x or y
     * value, replace that value with the corresponding max value.
     *
     * @param {Vector2} v - The vector.
     * @return {Vector2} A reference to this vector.
     */
    max(v: Vector2): Vector2;
    /**
     * If this vector's x or y value is greater than the max vector's x or y
     * value, it is replaced by the corresponding value.
     * If this vector's x or y value is less than the min vector's x or y value,
     * it is replaced by the corresponding value.
     *
     * @param {Vector2} min - The minimum x and y values.
     * @param {Vector2} max - The maximum x and y values in the desired range.
     * @return {Vector2} A reference to this vector.
     */
    clamp(min: Vector2, max: Vector2): Vector2;
    /**
     * If this vector's x or y values are greater than the max value, they are
     * replaced by the max value.
     * If this vector's x or y values are less than the min value, they are
     * replaced by the min value.
     *
     * @param {number} minVal - The minimum value the components will be clamped to.
     * @param {number} maxVal - The maximum value the components will be clamped to.
     * @return {Vector2} A reference to this vector.
     */
    clampScalar(minVal: number, maxVal: number): Vector2;
    /**
     * If this vector's length is greater than the max value, it is replaced by
     * the max value.
     * If this vector's length is less than the min value, it is replaced by the
     * min value.
     *
     * @param {number} min - The minimum value the vector length will be clamped to.
     * @param {number} max - The maximum value the vector length will be clamped to.
     * @return {Vector2} A reference to this vector.
     */
    clampLength(min: number, max: number): Vector2;
    /**
     * The components of this vector are rounded down to the nearest integer value.
     *
     * @return {Vector2} A reference to this vector.
     */
    floor(): Vector2;
    /**
     * The components of this vector are rounded up to the nearest integer value.
     *
     * @return {Vector2} A reference to this vector.
     */
    ceil(): Vector2;
    /**
     * The components of this vector are rounded to the nearest integer value
     *
     * @return {Vector2} A reference to this vector.
     */
    round(): Vector2;
    /**
     * The components of this vector are rounded towards zero (up if negative,
     * down if positive) to an integer value.
     *
     * @return {Vector2} A reference to this vector.
     */
    roundToZero(): Vector2;
    /**
     * Inverts this vector - i.e. sets x = -x and y = -y.
     *
     * @return {Vector2} A reference to this vector.
     */
    negate(): Vector2;
    /**
     * Calculates the dot product of the given vector with this instance.
     *
     * @param {Vector2} v - The vector to compute the dot product with.
     * @return {number} The result of the dot product.
     */
    dot(v: Vector2): number;
    /**
     * Calculates the cross product of the given vector with this instance.
     *
     * @param {Vector2} v - The vector to compute the cross product with.
     * @return {number} The result of the cross product.
     */
    cross(v: Vector2): number;
    /**
     * Computes the square of the Euclidean length (straight-line length) from
     * (0, 0) to (x, y). If you are comparing the lengths of vectors, you should
     * compare the length squared instead as it is slightly more efficient to calculate.
     *
     * @return {number} The square length of this vector.
     */
    lengthSq(): number;
    /**
     * Computes the  Euclidean length (straight-line length) from (0, 0) to (x, y).
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
     * @return {Vector2} A reference to this vector.
     */
    normalize(): Vector2;
    /**
     * Computes the angle in radians of this vector with respect to the positive x-axis.
     *
     * @return {number} The angle in radians.
     */
    angle(): number;
    /**
     * Returns the angle between the given vector and this instance in radians.
     *
     * @param {Vector2} v - The vector to compute the angle with.
     * @return {number} The angle in radians.
     */
    angleTo(v: Vector2): number;
    /**
     * Computes the distance from the given vector to this instance.
     *
     * @param {Vector2} v - The vector to compute the distance to.
     * @return {number} The distance.
     */
    distanceTo(v: Vector2): number;
    /**
     * Computes the squared distance from the given vector to this instance.
     * If you are just comparing the distance with another distance, you should compare
     * the distance squared instead as it is slightly more efficient to calculate.
     *
     * @param {Vector2} v - The vector to compute the squared distance to.
     * @return {number} The squared distance.
     */
    distanceToSquared(v: Vector2): number;
    /**
     * Computes the Manhattan distance from the given vector to this instance.
     *
     * @param {Vector2} v - The vector to compute the Manhattan distance to.
     * @return {number} The Manhattan distance.
     */
    manhattanDistanceTo(v: Vector2): number;
    /**
     * Sets this vector to a vector with the same direction as this one, but
     * with the specified length.
     *
     * @param {number} length - The new length of this vector.
     * @return {Vector2} A reference to this vector.
     */
    setLength(length: number): Vector2;
    /**
     * Linearly interpolates between the given vector and this instance, where
     * alpha is the percent distance along the line - alpha = 0 will be this
     * vector, and alpha = 1 will be the given one.
     *
     * @param {Vector2} v - The vector to interpolate towards.
     * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
     * @return {Vector2} A reference to this vector.
     */
    lerp(v: Vector2, alpha: number): Vector2;
    /**
     * Linearly interpolates between the given vectors, where alpha is the percent
     * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
     * be the second one. The result is stored in this instance.
     *
     * @param {Vector2} v1 - The first vector.
     * @param {Vector2} v2 - The second vector.
     * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
     * @return {Vector2} A reference to this vector.
     */
    lerpVectors(v1: Vector2, v2: Vector2, alpha: number): Vector2;
    /**
     * Returns `true` if this vector is equal with the given one.
     *
     * @param {Vector2} v - The vector to test for equality.
     * @return {boolean} Whether this vector is equal with the given one.
     */
    equals(v: Vector2): boolean;
    /**
     * Sets this vector's x value to be `array[ offset ]` and y
     * value to be `array[ offset + 1 ]`.
     *
     * @param {Array<number>} array - An array holding the vector component values.
     * @param {number} [offset=0] - The offset into the array.
     * @return {Vector2} A reference to this vector.
     */
    fromArray(array: Array<number>, offset?: number): Vector2;
    /**
     * Writes the components of this vector to the given array. If no array is provided,
     * the method returns a new instance.
     *
     * @param {Array<number>} [array=[]] - The target array holding the vector components.
     * @param {number} [offset=0] - Index of the first element in the array.
     * @return {Array<number>} The vector components.
     */
    toArray(array?: Array<number>, offset?: number): Array<number>;
    /**
     * Sets the components of this vector from the given buffer attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
     * @param {number} index - The index into the attribute.
     * @return {Vector2} A reference to this vector.
     */
    fromBufferAttribute(attribute: BufferAttribute, index: number): Vector2;
    /**
     * Rotates this vector around the given center by the given angle.
     *
     * @param {Vector2} center - The point around which to rotate.
     * @param {number} angle - The angle to rotate, in radians.
     * @return {Vector2} A reference to this vector.
     */
    rotateAround(center: Vector2, angle: number): Vector2;
    /**
     * Sets each component of this vector to a pseudo-random value between `0` and
     * `1`, excluding `1`.
     *
     * @return {Vector2} A reference to this vector.
     */
    random(): Vector2;
    [Symbol.iterator](): Generator<number, void, unknown>;
}
