/**
 * @module GeometryUtils
 * @three_import import * as GeometryUtils from 'three/addons/utils/GeometryUtils.js';
 */
/**
 * Generates 2D-Coordinates along a Hilbert curve.
 *
 * Based on work by: {@link http://www.openprocessing.org/sketch/15493}
 *
 * @param {Vector3} [center] - Center of Hilbert curve.
 * @param {number} [size=10] - Total width of Hilbert curve.
 * @param {number} [iterations=10] - Number of subdivisions.
 * @param {number} [v0=0] - Corner index -X, -Z.
 * @param {number} [v1=1] - Corner index -X, +Z.
 * @param {number} [v2=2] - Corner index +X, +Z.
 * @param {number} [v3=3] - Corner index +X, -Z.
 * @returns {Array<Vector3>} The Hilbert curve points.
 */
export function hilbert2D(center?: Vector3, size?: number, iterations?: number, v0?: number, v1?: number, v2?: number, v3?: number): Array<Vector3>;
/**
 * Generates 3D-Coordinates along a Hilbert curve.
 *
 * Based on work by: {@link https://openprocessing.org/user/5654}
 *
 * @param {Vector3} [center] - Center of Hilbert curve.
 * @param {number} [size=10] - Total width of Hilbert curve.
 * @param {number} [iterations=1] - Number of subdivisions.
 * @param {number} [v0=0] - Corner index -X, +Y, -Z.
 * @param {number} [v1=1] - Corner index -X, +Y, +Z.
 * @param {number} [v2=2] - Corner index -X, -Y, +Z.
 * @param {number} [v3=3] - Corner index -X, -Y, -Z.
 * @param {number} [v4=4] - Corner index +X, -Y, -Z.
 * @param {number} [v5=5] - Corner index +X, -Y, +Z.
 * @param {number} [v6=6] - Corner index +X, +Y, +Z.
 * @param {number} [v7=7] - Corner index +X, +Y, -Z.
 * @returns {Array<Vector3>}  - The Hilbert curve points.
 */
export function hilbert3D(center?: Vector3, size?: number, iterations?: number, v0?: number, v1?: number, v2?: number, v3?: number, v4?: number, v5?: number, v6?: number, v7?: number): Array<Vector3>;
/**
 * Generates a Gosper curve (lying in the XY plane).
 *
 * Reference: {@link https://gist.github.com/nitaku/6521802}
 *
 * @param {number} [size=1] - The size of a single gosper island.
 * @return {Array<number>} The gosper island points.
 */
export function gosper(size?: number): Array<number>;
import { Vector3 } from 'three';
