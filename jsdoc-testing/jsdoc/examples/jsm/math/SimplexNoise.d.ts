/**
 * A utility class providing noise functions.
 *
 * The code is based on [Simplex noise demystified](https://web.archive.org/web/20210210162332/http://staffwww.itn.liu.se/~stegu/simplexnoise/simplexnoise.pdf)
 * by Stefan Gustavson, 2005.
 *
 * @three_import import { SimplexNoise } from 'three/addons/math/SimplexNoise.js';
 */
export class SimplexNoise {
    /**
     * Constructs a new simplex noise object.
     *
     * @param {Object} [r=Math] - A math utility class that holds a `random()` method. This makes it
     * possible to pass in custom random number generator.
     */
    constructor(r?: Object);
    grad3: number[][];
    grad4: number[][];
    p: number[];
    perm: number[];
    simplex: number[][];
    /**
     * A 2D simplex noise method.
     *
     * @param {number} xin - The x coordinate.
     * @param {number} yin - The y coordinate.
     * @return {number} The noise value.
     */
    noise(xin: number, yin: number): number;
    /**
     * A 3D simplex noise method.
     *
     * @param {number} xin - The x coordinate.
     * @param {number} yin - The y coordinate.
     * @param {number} zin - The z coordinate.
     * @return {number} The noise value.
     */
    noise3d(xin: number, yin: number, zin: number): number;
    /**
     * A 4D simplex noise method.
     *
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     * @param {number} z - The z coordinate.
     * @param {number} w - The w coordinate.
     * @return {number} The noise value.
     */
    noise4d(x: number, y: number, z: number, w: number): number;
    _dot(g: any, x: any, y: any): number;
    _dot3(g: any, x: any, y: any, z: any): number;
    _dot4(g: any, x: any, y: any, z: any, w: any): number;
}
