/**
 * A base class extending {@link Curve}. `CurvePath` is simply an
 * array of connected curves, but retains the API of a curve.
 *
 * @augments Curve
 */
export class CurvePath extends Curve {
    type: string;
    /**
     * An array of curves defining the
     * path.
     *
     * @type {Array<Curve>}
     */
    curves: Array<Curve>;
    /**
     * Whether the path should automatically be closed
     * by a line curve.
     *
     * @type {boolean}
     * @default false
     */
    autoClose: boolean;
    /**
     * Adds a curve to this curve path.
     *
     * @param {Curve} curve - The curve to add.
     */
    add(curve: Curve): void;
    /**
     * Adds a line curve to close the path.
     *
     * @return {CurvePath} A reference to this curve path.
     */
    closePath(): CurvePath;
    /**
     * This method returns a vector in 2D or 3D space (depending on the curve definitions)
     * for the given interpolation factor.
     *
     * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
     * @param {(Vector2|Vector3)} [optionalTarget] - The optional target vector the result is written to.
     * @return {?(Vector2|Vector3)} The position on the curve. It can be a 2D or 3D vector depending on the curve definition.
     */
    getPoint(t: number, optionalTarget?: (Vector2 | Vector3)): (Vector2 | Vector3) | null;
    cacheLengths: number[] | null | undefined;
    /**
     * Returns list of cumulative curve lengths of the defined curves.
     *
     * @return {Array<number>} The curve lengths.
     */
    getCurveLengths(): Array<number>;
    getSpacedPoints(divisions?: number): any[];
    copy(source: any): this;
    fromJSON(json: any): this;
}
import { Curve } from './Curve.js';
