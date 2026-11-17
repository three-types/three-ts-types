/**
 * @module ParametricFunctions
 * @three_import import * as ParametricFunctions from 'three/addons/geometries/ParametricFunctions.js';
 */
/**
 * A parametric function representing the Klein bottle.
 *
 * @param {number} v - The `v` coordinate on the surface in the range `[0,1]`.
 * @param {number} u - The `u` coordinate on the surface in the range `[0,1]`.
 * @param {Vector3} target - The target vector that is used to store the method's result.
 */
export function klein(v: number, u: number, target: Vector3): void;
/**
 * A parametric function representing a flat plane.
 *
 * @param {number} u - The `u` coordinate on the surface in the range `[0,1]`.
 * @param {number} v - The `v` coordinate on the surface in the range `[0,1]`.
 * @param {Vector3} target - The target vector that is used to store the method's result.
 */
export function plane(u: number, v: number, target: Vector3): void;
/**
 * A parametric function representing a flat mobius strip.
 *
 * @param {number} u - The `u` coordinate on the surface in the range `[0,1]`.
 * @param {number} t - The `v` coordinate on the surface in the range `[0,1]`.
 * @param {Vector3} target - The target vector that is used to store the method's result.
 */
export function mobius(u: number, t: number, target: Vector3): void;
/**
 * A parametric function representing a volumetric mobius strip.
 *
 * @param {number} u - The `u` coordinate on the surface in the range `[0,1]`.
 * @param {number} t - The `v` coordinate on the surface in the range `[0,1]`.
 * @param {Vector3} target - The target vector that is used to store the method's result.
 */
export function mobius3d(u: number, t: number, target: Vector3): void;
