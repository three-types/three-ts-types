/**
 * This class represents a NURBS curve.
 *
 * Implementation is based on `(x, y [, z=0 [, w=1]])` control points with `w=weight`.
 *
 * @augments Curve
 * @three_import import { NURBSCurve } from 'three/addons/curves/NURBSCurve.js';
 */
export class NURBSCurve extends Curve {
    /**
     * Constructs a new NURBS curve.
     *
     * @param {number} degree - The NURBS degree.
     * @param {Array<number>} knots - The knots as a flat array of numbers.
     * @param {Array<Vector2|Vector3|Vector4>} controlPoints - An array holding control points.
     * @param {number} [startKnot] - Index of the start knot into the `knots` array.
     * @param {number} [endKnot] - Index of the end knot into the `knots` array.
     */
    constructor(degree: number, knots: Array<number>, controlPoints: Array<Vector2 | Vector3 | Vector4>, startKnot?: number, endKnot?: number);
    /**
     * The NURBS degree.
     *
     * @type {number}
     */
    degree: number;
    /**
     * The knots as a flat array of numbers.
     *
     * @type {Array<number>}
     */
    knots: Array<number>;
    /**
     * An array of control points.
     *
     * @type {Array<Vector4>}
     */
    controlPoints: Array<Vector4>;
    /**
     * Index of the start knot into the `knots` array.
     *
     * @type {number}
     */
    startKnot: number;
    /**
     * Index of the end knot into the `knots` array.
     *
     * @type {number}
     */
    endKnot: number;
    /**
     * This method returns a vector in 3D space for the given interpolation factor.
     *
     * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
     * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
     * @return {Vector3} The position on the curve.
     */
    getPoint(t: number, optionalTarget?: Vector3): Vector3;
    /**
     * Returns a unit vector tangent for the given interpolation factor.
     *
     * @param {number} t - The interpolation factor.
     * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
     * @return {Vector3} The tangent vector.
     */
    getTangent(t: number, optionalTarget?: Vector3): Vector3;
    fromJSON(json: any): this;
}
import { Curve } from 'three';
import { Vector4 } from 'three';
import { Vector3 } from 'three';
