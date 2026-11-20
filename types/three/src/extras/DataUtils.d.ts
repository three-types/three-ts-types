/**
 * Returns a half precision floating point value (FP16) from the given single
 * precision floating point value (FP32). The result is the FP16 bit pattern as
 * an integer in the range `[0, 65535]`, e.g. for a `Uint16Array` used with
 * `HalfFloatType`. Values are clamped to `[-65504, 65504]`.
 *
 * @param {number} val - A single precision floating point value.
 * @return {number} The FP16 bit pattern.
 */
export function toHalfFloat(val: number): number;
/**
 * Returns a single precision floating point value (FP32) from the given half
 * precision floating point value (FP16).
 *
 * @param {number} val - A FP16 bit pattern, e.g. an element of a `Uint16Array`.
 * @return {number} The FP32 value.
 */
export function fromHalfFloat(val: number): number;
/**
 * A class containing utility functions for data.
 *
 * @hideconstructor
 */
export class DataUtils {
    /**
     * Returns a half precision floating point value (FP16) from the given single
     * precision floating point value (FP32). The result is the FP16 bit pattern as
     * an integer in the range `[0, 65535]`, e.g. for a `Uint16Array` used with
     * `HalfFloatType`. Values are clamped to `[-65504, 65504]`.
     *
     * @param {number} val - A single precision floating point value.
     * @return {number} The FP16 bit pattern.
     */
    static toHalfFloat(val: number): number;
    /**
     * Returns a single precision floating point value (FP32) from the given half
     * precision floating point value (FP16).
     *
     * @param {number} val - A FP16 bit pattern, e.g. an element of a `Uint16Array`.
     * @return {number} The FP32 value.
     */
    static fromHalfFloat(val: number): number;
}
