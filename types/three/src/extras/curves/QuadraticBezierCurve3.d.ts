import { Vector3 } from "../../math/Vector3.js";
import { Curve } from "../core/Curve.js";

/**
 * A curve representing a 3D Quadratic Bezier curve.
 *
 * @augments Curve
 */
export class QuadraticBezierCurve3 extends Curve<Vector3> {
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
     * @default true
     */
    readonly isQuadraticBezierCurve3: true;
    /**
     * The start point.
     */
    v0: Vector3;
    /**
     * The control point.
     */
    v1: Vector3;
    /**
     * The end point.
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
    copy(source: QuadraticBezierCurve3): this;
}
