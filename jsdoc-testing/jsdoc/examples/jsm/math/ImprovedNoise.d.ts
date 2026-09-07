/**
 * A utility class providing a 3D noise function.
 *
 * The code is based on [IMPROVED NOISE](https://cs.nyu.edu/~perlin/noise/)
 * by Ken Perlin, 2002.
 *
 * @three_import import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js';
 */
export class ImprovedNoise {
    /**
     * Returns a noise value for the given parameters.
     *
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     * @param {number} z - The z coordinate.
     * @return {number} The noise value.
     */
    noise(x: number, y: number, z: number): number;
}
