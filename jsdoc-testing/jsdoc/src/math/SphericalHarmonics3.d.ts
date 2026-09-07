/**
 * Represents a third-order spherical harmonics (SH). Light probes use this class
 * to encode lighting information.
 *
 * - Primary reference: {@link https://graphics.stanford.edu/papers/envmap/envmap.pdf}
 * - Secondary reference: {@link https://www.ppsloan.org/publications/StupidSH36.pdf}
 */
export class SphericalHarmonics3 {
    /**
     * Computes the SH basis for the given normal vector.
     *
     * @param {Vector3} normal - The normal.
     * @param {Array<number>} shBasis - The target array holding the SH basis.
     */
    static getBasisAt(normal: Vector3, shBasis: Array<number>): void;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSphericalHarmonics3: boolean;
    /**
     * An array holding the (9) SH coefficients.
     *
     * @type {Array<Vector3>}
     */
    coefficients: Array<Vector3>;
    /**
     * Sets the given SH coefficients to this instance by copying
     * the values.
     *
     * @param {Array<Vector3>} coefficients - The SH coefficients.
     * @return {SphericalHarmonics3} A reference to this spherical harmonics.
     */
    set(coefficients: Array<Vector3>): SphericalHarmonics3;
    /**
     * Sets all SH coefficients to `0`.
     *
     * @return {SphericalHarmonics3} A reference to this spherical harmonics.
     */
    zero(): SphericalHarmonics3;
    /**
     * Returns the radiance in the direction of the given normal.
     *
     * @param {Vector3} normal - The normal vector (assumed to be unit length)
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} The radiance.
     */
    getAt(normal: Vector3, target: Vector3): Vector3;
    /**
     * Returns the irradiance (radiance convolved with cosine lobe) in the
     * direction of the given normal.
     *
     * @param {Vector3} normal - The normal vector (assumed to be unit length)
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} The irradiance.
     */
    getIrradianceAt(normal: Vector3, target: Vector3): Vector3;
    /**
     * Adds the given SH to this instance.
     *
     * @param {SphericalHarmonics3} sh - The SH to add.
     * @return {SphericalHarmonics3} A reference to this spherical harmonics.
     */
    add(sh: SphericalHarmonics3): SphericalHarmonics3;
    /**
     * A convenience method for performing {@link SphericalHarmonics3#add} and
     * {@link SphericalHarmonics3#scale} at once.
     *
     * @param {SphericalHarmonics3} sh - The SH to add.
     * @param {number} s - The scale factor.
     * @return {SphericalHarmonics3} A reference to this spherical harmonics.
     */
    addScaledSH(sh: SphericalHarmonics3, s: number): SphericalHarmonics3;
    /**
     * Scales this SH by the given scale factor.
     *
     * @param {number} s - The scale factor.
     * @return {SphericalHarmonics3} A reference to this spherical harmonics.
     */
    scale(s: number): SphericalHarmonics3;
    /**
     * Linear interpolates between the given SH and this instance by the given
     * alpha factor.
     *
     * @param {SphericalHarmonics3} sh - The SH to interpolate with.
     * @param {number} alpha - The alpha factor.
     * @return {SphericalHarmonics3} A reference to this spherical harmonics.
     */
    lerp(sh: SphericalHarmonics3, alpha: number): SphericalHarmonics3;
    /**
     * Returns `true` if this spherical harmonics is equal with the given one.
     *
     * @param {SphericalHarmonics3} sh - The spherical harmonics to test for equality.
     * @return {boolean} Whether this spherical harmonics is equal with the given one.
     */
    equals(sh: SphericalHarmonics3): boolean;
    /**
     * Copies the values of the given spherical harmonics to this instance.
     *
     * @param {SphericalHarmonics3} sh - The spherical harmonics to copy.
     * @return {SphericalHarmonics3} A reference to this spherical harmonics.
     */
    copy(sh: SphericalHarmonics3): SphericalHarmonics3;
    /**
     * Returns a new spherical harmonics with copied values from this instance.
     *
     * @return {SphericalHarmonics3} A clone of this instance.
     */
    clone(): SphericalHarmonics3;
    /**
     * Sets the SH coefficients of this instance from the given array.
     *
     * @param {Array<number>} array - An array holding the SH coefficients.
     * @param {number} [offset=0] - The array offset where to start copying.
     * @return {SphericalHarmonics3} A clone of this instance.
     */
    fromArray(array: Array<number>, offset?: number): SphericalHarmonics3;
    /**
     * Returns an array with the SH coefficients, or copies them into the provided
     * array. The coefficients are represented as numbers.
     *
     * @param {Array<number>} [array=[]] - The target array.
     * @param {number} [offset=0] - The array offset where to start copying.
     * @return {Array<number>} An array with flat SH coefficients.
     */
    toArray(array?: Array<number>, offset?: number): Array<number>;
}
import { Vector3 } from './Vector3.js';
