/**
 * A curve representing a 2D line segment.
 *
 * @augments Curve
 */
export class LineCurve extends Curve {
    /**
     * Constructs a new line curve.
     *
     * @param {Vector2} [v1] - The start point.
     * @param {Vector2} [v2] - The end point.
     */
    constructor(v1?: Vector2, v2?: Vector2);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLineCurve: boolean;
    type: string;
    /**
     * The start point.
     *
     * @type {Vector2}
     */
    v1: Vector2;
    /**
     * The end point.
     *
     * @type {Vector2}
     */
    v2: Vector2;
    /**
     * Returns a point on the line.
     *
     * @param {number} t - A interpolation factor representing a position on the line. Must be in the range `[0,1]`.
     * @param {Vector2} [optionalTarget] - The optional target vector the result is written to.
     * @return {Vector2} The position on the line.
     */
    getPoint(t: number, optionalTarget?: Vector2): Vector2;
    getPointAt(u: any, optionalTarget: any): Vector2;
    getTangent(t: any, optionalTarget?: Vector2): Vector2;
    getTangentAt(u: any, optionalTarget: any): Vector2;
    copy(source: any): this;
    fromJSON(json: any): this;
}
import { Curve } from '../core/Curve.js';
import { Vector2 } from '../../math/Vector2.js';
