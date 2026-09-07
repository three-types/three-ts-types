/**
 * Returns a half precision floating point value (FP16) from the given single
 * precision floating point value (FP32).
 *
 * @param {number} val - A single precision floating point value.
 * @return {number} The FP16 value.
 */
export function toHalfFloat(val: number): number;
/**
 * Returns a single precision floating point value (FP32) from the given half
 * precision floating point value (FP16).
 *
 * @param {number} val - A half precision floating point value.
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
     * precision floating point value (FP32).
     *
     * @param {number} val - A single precision floating point value.
     * @return {number} The FP16 value.
     */
    static toHalfFloat(val: number): number;
    /**
     * Returns a single precision floating point value (FP32) from the given half
     * precision floating point value (FP16).
     *
     * @param {number} val - A half precision floating point value.
     * @return {number} The FP32 value.
     */
    static fromHalfFloat(val: number): number;
}
