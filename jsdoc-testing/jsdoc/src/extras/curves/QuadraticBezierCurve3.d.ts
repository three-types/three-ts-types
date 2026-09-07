/**
 * A curve representing a 3D Quadratic Bezier curve.
 *
 * @augments Curve
 */
export class QuadraticBezierCurve3 extends Curve {
    /**
     * Constructs a new Quadratic Bezier curve.
     *
     * @param {Vector3} [v0] - The start point.
     * @param {Vector3} [v1] - The control point.
     * @param {Vector3} [v2] - The end point.
     */
    constructor(v0?: Vector3, v1?: Vector3, v2?: Vector3);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isQuadraticBezierCurve3: boolean;
    type: string;
    /**
     * The start point.
     *
     * @type {Vector3}
     */
    v0: Vector3;
    /**
     * The control point.
     *
     * @type {Vector3}
     */
    v1: Vector3;
    /**
     * The end point.
     *
     * @type {Vector3}
     */
    v2: Vector3;
    /**
     * Returns a point on the curve.
     *
     * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
     * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
     * @return {Vector3} The position on the curve.
     */
    getPoint(t: number, optionalTarget?: Vector3): Vector3;
    copy(source: any): this;
    fromJSON(json: any): this;
}
import { Curve } from '../core/Curve.js';
import { Vector3 } from '../../math/Vector3.js';
