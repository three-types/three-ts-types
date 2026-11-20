import { Vector3 } from "../../math/Vector3.js";
import { Curve } from "../core/Curve.js";

/**
 * A curve representing a 3D line segment.
 *
 * @augments Curve
 */
export class LineCurve3 extends Curve<Vector3> {
    /**
     * Constructs a new line curve.
     *
     * @param {Vector3} [v1] - The start point.
     * @param {Vector3} [v2] - The end point.
     */
    constructor(v1?: Vector3, v2?: Vector3);
    /**
     * This flag can be used for type testing.
     *
     * @default true
     */
    readonly isLineCurve3: true;
    /**
     * The start point.
     */
    v1: Vector3;
    /**
     * The end point.
     */
    v2: Vector3;
    /**
     * Returns a point on the line.
     *
     * @param {number} t - A interpolation factor representing a position on the line. Must be in the range `[0,1]`.
     * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
     * @return {Vector3} The position on the line.
     */
    getPoint(t: number, optionalTarget?: Vector3): Vector3;
    copy(source: LineCurve3): this;
}
