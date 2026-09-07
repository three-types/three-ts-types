/**
 * This class represents a NURBS volume.
 *
 * Implementation is based on `(x, y [, z=0 [, w=1]])` control points with `w=weight`.
 *
 * @three_import import { NURBSVolume } from 'three/addons/curves/NURBSVolume.js';
 */
export class NURBSVolume {
    /**
     * Constructs a new NURBS surface.
     *
     * @param {number} degree1 - The first NURBS degree.
     * @param {number} degree2 - The second NURBS degree.
     * @param {number} degree3 - The third NURBS degree.
     * @param {Array<number>} knots1 - The first knots as a flat array of numbers.
     * @param {Array<number>} knots2 - The second knots as a flat array of numbers.
     * @param {Array<number>} knots3 - The third knots as a flat array of numbers.
     * @param {Array<Array<Array<Vector2|Vector3|Vector4>>>} controlPoints - An array^3 holding control points.
     */
    constructor(degree1: number, degree2: number, degree3: number, knots1: Array<number>, knots2: Array<number>, knots3: Array<number>, controlPoints: Array<Array<Array<Vector2 | Vector3 | Vector4>>>);
    degree1: number;
    degree2: number;
    degree3: number;
    knots1: number[];
    knots2: number[];
    knots3: number[];
    controlPoints: never[][];
    /**
     * This method returns a vector in 3D space for the given interpolation factor. This vector lies within the NURBS volume.
     *
     * @param {number} t1 - The first interpolation factor representing the `u` position within the volume. Must be in the range `[0,1]`.
     * @param {number} t2 - The second interpolation factor representing the `v` position within the volume. Must be in the range `[0,1]`.
     * @param {number} t3 - The third interpolation factor representing the `w` position within the volume. Must be in the range `[0,1]`.
     * @param {Vector3} target - The target vector the result is written to.
     */
    getPoint(t1: number, t2: number, t3: number, target: Vector3): void;
}
import { Vector4 } from 'three';
