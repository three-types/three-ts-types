/**
 * This class represents a NURBS surface.
 *
 * Implementation is based on `(x, y [, z=0 [, w=1]])` control points with `w=weight`.
 *
 * @three_import import { NURBSSurface } from 'three/addons/curves/NURBSSurface.js';
 */
export class NURBSSurface {
    /**
     * Constructs a new NURBS surface.
     *
     * @param {number} degree1 - The first NURBS degree.
     * @param {number} degree2 - The second NURBS degree.
     * @param {Array<number>} knots1 - The first knots as a flat array of numbers.
     * @param {Array<number>} knots2 - The second knots as a flat array of numbers.
     * @param {Array<Array<Vector2|Vector3|Vector4>>} controlPoints - An array^2 holding control points.
     */
    constructor(degree1: number, degree2: number, knots1: Array<number>, knots2: Array<number>, controlPoints: Array<Array<Vector2 | Vector3 | Vector4>>);
    /**
     * The first NURBS degree.
     *
     * @type {number}
     */
    degree1: number;
    /**
     * The second NURBS degree.
     *
     * @type {number}
     */
    degree2: number;
    /**
     * The first knots as a flat array of numbers.
     *
     * @type {Array<number>}
     */
    knots1: Array<number>;
    /**
     * The second knots as a flat array of numbers.
     *
     * @type {Array<number>}
     */
    knots2: Array<number>;
    /**
     *  An array holding arrays of control points.
     *
     * @type {Array<Array<Vector2|Vector3|Vector4>>}
     */
    controlPoints: Array<Array<Vector2 | Vector3 | Vector4>>;
    /**
     * This method returns a vector in 3D space for the given interpolation factor. This vector lies on the NURBS surface.
     *
     * @param {number} t1 - The first interpolation factor representing the `u` position on the surface. Must be in the range `[0,1]`.
     * @param {number} t2 - The second interpolation factor representing the `v` position on the surface. Must be in the range `[0,1]`.
     * @param {Vector3} target - The target vector the result is written to.
     */
    getPoint(t1: number, t2: number, target: Vector3): void;
}
import { Vector4 } from 'three';
