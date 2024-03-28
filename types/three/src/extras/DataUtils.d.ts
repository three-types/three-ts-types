/**
 * Returns a half precision floating point value from the given single precision floating point value.
 * @param val A single precision floating point value.
 * @see {@link https://threejs.org/docs/index.html#api/en/extras/DataUtils | Official Documentation}
 * @see {@link https://github.com/mrdoob/three.js/blob/master/src/extras/DataUtils.js | Source}
 */
export function toHalfFloat(val: number): number;

/**
 * Returns a single precision floating point value from the given half precision floating point value.
 * @param val A half precision floating point value.
 * @see {@link https://threejs.org/docs/index.html#api/en/extras/DataUtils | Official Documentation}
 * @see {@link https://github.com/mrdoob/three.js/blob/master/src/extras/DataUtils.js | Source}
 */
export function fromHalfFloat(val: number): number;

/**
 * This method packs three floats into a single Uint32 value which is required for the `RGB9E5` texture format.
 * @param r A float representing the R channel.
 * @param g A float representing the G channel.
 * @param b A float representing the B channel.
 * @param target An instance of `Uint32Array` with length `1`.
 */
export function toRGB9E5(r: number, g: number, b: number, target: Uint32Array): Uint32Array;

/**
 * This method unpacks three floats from a single Uint32 value holding a `RGB9E5` texel.
 * @param val An instance of `Uint32Array` with length `1`.
 * @param target An array holding the three unpacked floats.
 */
export function fromRGB9E5(val: Uint32Array, target: number[]): number[];

export const DataUtils: {
    toHalfFloat: typeof toHalfFloat;
    fromHalfFloat: typeof fromHalfFloat;
    toRGB9E5: typeof toRGB9E5;
    fromRGB9E5: typeof fromRGB9E5;
};
