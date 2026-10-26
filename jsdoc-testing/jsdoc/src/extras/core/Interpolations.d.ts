/**
 * Interpolations contains spline and Bézier functions internally used by concrete curve classes.
 *
 * Bezier Curves formulas obtained from: https://en.wikipedia.org/wiki/B%C3%A9zier_curve
 *
 * @module Interpolations
 */
/**
 * Computes a point on a Catmull-Rom spline.
 *
 * @param {number} t - The interpolation factor.
 * @param {number} p0 - The first control point.
 * @param {number} p1 - The second control point.
 * @param {number} p2 - The third control point.
 * @param {number} p3 - The fourth control point.
 * @return {number} The calculated point on a Catmull-Rom spline.
 */
export function CatmullRom(t: number, p0: number, p1: number, p2: number, p3: number): number;
/**
 * Computes a point on a Quadratic Bezier curve.
 *
 * @param {number} t - The interpolation factor.
 * @param {number} p0 - The first control point.
 * @param {number} p1 - The second control point.
 * @param {number} p2 - The third control point.
 * @return {number} The calculated point on a Quadratic Bezier curve.
 */
export function QuadraticBezier(t: number, p0: number, p1: number, p2: number): number;
/**
 * Computes a point on a Cubic Bezier curve.
 *
 * @param {number} t - The interpolation factor.
 * @param {number} p0 - The first control point.
 * @param {number} p1 - The second control point.
 * @param {number} p2 - The third control point.
 * @param {number} p3 - The fourth control point.
 * @return {number} The calculated point on a Cubic Bezier curve.
 */
export function CubicBezier(t: number, p0: number, p1: number, p2: number, p3: number): number;
