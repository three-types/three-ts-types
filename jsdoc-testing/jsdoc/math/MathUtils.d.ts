export const DEG2RAD: number;
export const RAD2DEG: number;
/**
 * Generate a [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)
 * (universally unique identifier).
 *
 * @return {string} The UUID.
 */
export function generateUUID(): string;
/**
 * Clamps the given value between min and max.
 *
 * @param {number} value - The value to clamp.
 * @param {number} min - The min value.
 * @param {number} max - The max value.
 * @return {number} The clamped value.
 */
export function clamp(value: number, min: number, max: number): number;
/**
 * Computes the Euclidean modulo of the given parameters that
 * is `( ( n % m ) + m ) % m`.
 *
 * @param {number} n - The first parameter.
 * @param {number} m - The second parameter.
 * @return {number} The Euclidean modulo.
 */
export function euclideanModulo(n: number, m: number): number;
/**
 * Performs a linear mapping from range `<a1, a2>` to range `<b1, b2>`
 * for the given value.
 *
 * @param {number} x - The value to be mapped.
 * @param {number} a1 - Minimum value for range A.
 * @param {number} a2 - Maximum value for range A.
 * @param {number} b1 - Minimum value for range B.
 * @param {number} b2 - Maximum value for range B.
 * @return {number} The mapped value.
 */
export function mapLinear(x: number, a1: number, a2: number, b1: number, b2: number): number;
/**
 * Returns the percentage in the closed interval `[0, 1]` of the given value
 * between the start and end point.
 *
 * @param {number} x - The start point
 * @param {number} y - The end point.
 * @param {number} value - A value between start and end.
 * @return {number} The interpolation factor.
 */
export function inverseLerp(x: number, y: number, value: number): number;
/**
 * Returns a value linearly interpolated from two known points based on the given interval -
 * `t = 0` will return `x` and `t = 1` will return `y`.
 *
 * @param {number} x - The start point
 * @param {number} y - The end point.
 * @param {number} t - The interpolation factor in the closed interval `[0, 1]`.
 * @return {number} The interpolated value.
 */
export function lerp(x: number, y: number, t: number): number;
/**
 * Smoothly interpolate a number from `x` to `y` in  a spring-like manner using a delta
 * time to maintain frame rate independent movement. For details, see
 * [Frame rate independent damping using lerp](http://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/).
 *
 * @param {number} x - The current point.
 * @param {number} y - The target point.
 * @param {number} lambda - A higher lambda value will make the movement more sudden,
 * and a lower value will make the movement more gradual.
 * @param {number} dt - Delta time in seconds.
 * @return {number} The interpolated value.
 */
export function damp(x: number, y: number, lambda: number, dt: number): number;
/**
 * Returns a value that alternates between `0` and the given `length` parameter.
 *
 * @param {number} x - The value to pingpong.
 * @param {number} [length=1] - The positive value the function will pingpong to.
 * @return {number} The alternated value.
 */
export function pingpong(x: number, length?: number): number;
/**
 * Returns a value in the range `[0,1]` that represents the percentage that `x` has
 * moved between `min` and `max`, but smoothed or slowed down the closer `x` is to
 * the `min` and `max`.
 *
 * See [Smoothstep](http://en.wikipedia.org/wiki/Smoothstep) for more details.
 *
 * @param {number} x - The value to evaluate based on its position between min and max.
 * @param {number} min - The min value. Any x value below min will be `0`.
 * @param {number} max - The max value. Any x value above max will be `1`.
 * @return {number} The alternated value.
 */
export function smoothstep(x: number, min: number, max: number): number;
/**
 * A [variation on smoothstep](https://en.wikipedia.org/wiki/Smoothstep#Variations)
 * that has zero 1st and 2nd order derivatives at x=0 and x=1.
 *
 * @param {number} x - The value to evaluate based on its position between min and max.
 * @param {number} min - The min value. Any x value below min will be `0`.
 * @param {number} max - The max value. Any x value above max will be `1`.
 * @return {number} The alternated value.
 */
export function smootherstep(x: number, min: number, max: number): number;
/**
 * Returns a random integer from `<low, high>` interval.
 *
 * @param {number} low - The lower value boundary.
 * @param {number} high - The upper value boundary
 * @return {number} A random integer.
 */
export function randInt(low: number, high: number): number;
/**
 * Returns a random float from `<low, high>` interval.
 *
 * @param {number} low - The lower value boundary.
 * @param {number} high - The upper value boundary
 * @return {number} A random float.
 */
export function randFloat(low: number, high: number): number;
/**
 * Returns a random integer from `<-range/2, range/2>` interval.
 *
 * @param {number} range - Defines the value range.
 * @return {number} A random float.
 */
export function randFloatSpread(range: number): number;
/**
 * Returns a deterministic pseudo-random float in the interval `[0, 1]`.
 *
 * @param {number} [s] - The integer seed.
 * @return {number} A random float.
 */
export function seededRandom(s?: number): number;
/**
 * Converts degrees to radians.
 *
 * @param {number} degrees - A value in degrees.
 * @return {number} The converted value in radians.
 */
export function degToRad(degrees: number): number;
/**
 * Converts radians to degrees.
 *
 * @param {number} radians - A value in radians.
 * @return {number} The converted value in degrees.
 */
export function radToDeg(radians: number): number;
/**
 * Returns `true` if the given number is a power of two.
 *
 * @param {number} value - The value to check.
 * @return {boolean} Whether the given number is a power of two or not.
 */
export function isPowerOfTwo(value: number): boolean;
/**
 * Returns the smallest power of two that is greater than or equal to the given number.
 *
 * @param {number} value - The value to find a POT for.
 * @return {number} The smallest power of two that is greater than or equal to the given number.
 */
export function ceilPowerOfTwo(value: number): number;
/**
 * Returns the largest power of two that is less than or equal to the given number.
 *
 * @param {number} value - The value to find a POT for.
 * @return {number} The largest power of two that is less than or equal to the given number.
 */
export function floorPowerOfTwo(value: number): number;
/**
 * Sets the given quaternion from the [Intrinsic Proper Euler Angles](https://en.wikipedia.org/wiki/Euler_angles)
 * defined by the given angles and order.
 *
 * Rotations are applied to the axes in the order specified by order:
 * rotation by angle `a` is applied first, then by angle `b`, then by angle `c`.
 *
 * @param {Quaternion} q - The quaternion to set.
 * @param {number} a - The rotation applied to the first axis, in radians.
 * @param {number} b - The rotation applied to the second axis, in radians.
 * @param {number} c - The rotation applied to the third axis, in radians.
 * @param {('XYX'|'XZX'|'YXY'|'YZY'|'ZXZ'|'ZYZ')} order - A string specifying the axes order.
 */
export function setQuaternionFromProperEuler(q: Quaternion, a: number, b: number, c: number, order: ("XYX" | "XZX" | "YXY" | "YZY" | "ZXZ" | "ZYZ")): void;
/**
 * Normalizes the given value according to the given typed array.
 *
 * @param {number} value - The float value in the range `[0,1]` to normalize.
 * @param {TypedArray} array - The typed array that defines the data type of the value.
 * @return {number} The normalize value.
 */
export function normalize(value: number, array: TypedArray): number;
/**
 * Denormalizes the given value according to the given typed array.
 *
 * @param {number} value - The value to denormalize.
 * @param {TypedArray} array - The typed array that defines the data type of the value.
 * @return {number} The denormalize (float) value in the range `[0,1]`.
 */
export function denormalize(value: number, array: TypedArray): number;
export namespace MathUtils {
    export { DEG2RAD };
    export { RAD2DEG };
    export { generateUUID };
    export { clamp };
    export { euclideanModulo };
    export { mapLinear };
    export { inverseLerp };
    export { lerp };
    export { damp };
    export { pingpong };
    export { smoothstep };
    export { smootherstep };
    export { randInt };
    export { randFloat };
    export { randFloatSpread };
    export { seededRandom };
    export { degToRad };
    export { radToDeg };
    export { isPowerOfTwo };
    export { ceilPowerOfTwo };
    export { floorPowerOfTwo };
    export { setQuaternionFromProperEuler };
    export { normalize };
    export { denormalize };
}
