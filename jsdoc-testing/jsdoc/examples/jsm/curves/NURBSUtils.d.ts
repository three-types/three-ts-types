/**
 * @module NURBSUtils
 * @three_import import * as NURBSUtils from 'three/addons/curves/NURBSUtils.js';
 */
/**
 * Finds knot vector span.
 *
 * @param {number} p - The degree.
 * @param {number} u - The parametric value.
 * @param {Array<number>} U - The knot vector.
 * @return {number} The span.
 */
export function findSpan(p: number, u: number, U: Array<number>): number;
/**
 * Calculates basis functions. See The NURBS Book, page 70, algorithm A2.2.
 *
 * @param {number} span - The span in which `u` lies.
 * @param {number} u - The parametric value.
 * @param {number} p - The degree.
 * @param {Array<number>} U - The knot vector.
 * @return {Array<number>} Array[p+1] with basis functions values.
 */
export function calcBasisFunctions(span: number, u: number, p: number, U: Array<number>): Array<number>;
/**
 * Calculates B-Spline curve points. See The NURBS Book, page 82, algorithm A3.1.
 *
 * @param {number} p - The degree of the B-Spline.
 * @param {Array<number>} U - The knot vector.
 * @param {Array<Vector4>} P - The control points
 * @param {number} u - The parametric point.
 * @return {Vector4} The point for given `u`.
 */
export function calcBSplinePoint(p: number, U: Array<number>, P: Array<Vector4>, u: number): Vector4;
/**
 * Calculates basis functions derivatives. See The NURBS Book, page 72, algorithm A2.3.
 *
 * @param {number} span - The span in which `u` lies.
 * @param {number} u - The parametric point.
 * @param {number} p - The degree.
 * @param {number} n - number of derivatives to calculate
 * @param {Array<number>} U - The knot vector.
 * @return {Array<Array<number>>} An array[n+1][p+1] with basis functions derivatives.
 */
export function calcBasisFunctionDerivatives(span: number, u: number, p: number, n: number, U: Array<number>): Array<Array<number>>;
/**
 * Calculates derivatives of a B-Spline. See The NURBS Book, page 93, algorithm A3.2.
 *
 * @param {number} p - The degree.
 * @param {Array<number>} U - The knot vector.
 * @param {Array<Vector4>} P - The control points
 * @param {number} u - The parametric point.
 * @param {number} nd - The number of derivatives.
 * @return {Array<Vector4>} An array[d+1] with derivatives.
 */
export function calcBSplineDerivatives(p: number, U: Array<number>, P: Array<Vector4>, u: number, nd: number): Array<Vector4>;
/**
 * Calculates "K over I".
 *
 * @param {number} k - The K value.
 * @param {number} i - The I value.
 * @return {number} k!/(i!(k-i)!)
 */
export function calcKoverI(k: number, i: number): number;
/**
 * Calculates derivatives (0-nd) of rational curve. See The NURBS Book, page 127, algorithm A4.2.
 *
 * @param {Array<Vector4>} Pders - Array with derivatives.
 * @return {Array<Vector3>} An array with derivatives for rational curve.
 */
export function calcRationalCurveDerivatives(Pders: Array<Vector4>): Array<Vector3>;
/**
 * Calculates NURBS curve derivatives. See The NURBS Book, page 127, algorithm A4.2.
 *
 * @param {number} p - The degree.
 * @param {Array<number>} U - The knot vector.
 * @param {Array<Vector4>} P - The control points in homogeneous space.
 * @param {number} u - The parametric point.
 * @param {number} nd - The number of derivatives.
 * @return {Array<Vector3>} array with derivatives for rational curve.
 */
export function calcNURBSDerivatives(p: number, U: Array<number>, P: Array<Vector4>, u: number, nd: number): Array<Vector3>;
/**
 * Calculates a rational B-Spline surface point. See The NURBS Book, page 134, algorithm A4.3.
 *
 * @param {number} p - The first degree of B-Spline surface.
 * @param {number} q - The second degree of B-Spline surface.
 * @param {Array<number>} U - The first knot vector.
 * @param {Array<number>} V - The second knot vector.
 * @param {Array<Array<Vector4>>} P - The control points in homogeneous space.
 * @param {number} u - The first parametric point.
 * @param {number} v - The second parametric point.
 * @param {Vector3} target - The target vector.
 */
export function calcSurfacePoint(p: number, q: number, U: Array<number>, V: Array<number>, P: Array<Array<Vector4>>, u: number, v: number, target: Vector3): void;
/**
 * Calculates a rational B-Spline volume point. See The NURBS Book, page 134, algorithm A4.3.
 *
 * @param {number} p - The first degree of B-Spline surface.
 * @param {number} q - The second degree of B-Spline surface.
 * @param {number} r - The third degree of B-Spline surface.
 * @param {Array<number>} U - The first knot vector.
 * @param {Array<number>} V - The second knot vector.
 * @param {Array<number>} W - The third knot vector.
 * @param {Array<Array<Array<Vector4>>>} P - The control points in homogeneous space.
 * @param {number} u - The first parametric point.
 * @param {number} v - The second parametric point.
 * @param {number} w - The third parametric point.
 * @param {Vector3} target - The target vector.
 */
export function calcVolumePoint(p: number, q: number, r: number, U: Array<number>, V: Array<number>, W: Array<number>, P: Array<Array<Array<Vector4>>>, u: number, v: number, w: number, target: Vector3): void;
import { Vector4 } from 'three';
import { Vector3 } from 'three';
