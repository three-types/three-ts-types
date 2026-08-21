/**
 * An analytical line segment in 3D space represented by a start and end point.
 */
export class Line3 {
    /**
     * Constructs a new line segment.
     *
     * @param {Vector3} [start=(0,0,0)] - Start of the line segment.
     * @param {Vector3} [end=(0,0,0)] - End of the line segment.
     */
    constructor(start?: Vector3, end?: Vector3);
    /**
     * Start of the line segment.
     *
     * @type {Vector3}
     */
    start: Vector3;
    /**
     * End of the line segment.
     *
     * @type {Vector3}
     */
    end: Vector3;
    /**
     * Sets the start and end values by copying the given vectors.
     *
     * @param {Vector3} start - The start point.
     * @param {Vector3} end - The end point.
     * @return {Line3} A reference to this line segment.
     */
    set(start: Vector3, end: Vector3): Line3;
    /**
     * Copies the values of the given line segment to this instance.
     *
     * @param {Line3} line - The line segment to copy.
     * @return {Line3} A reference to this line segment.
     */
    copy(line: Line3): Line3;
    /**
     * Returns the center of the line segment.
     *
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} The center point.
     */
    getCenter(target: Vector3): Vector3;
    /**
     * Returns the delta vector of the line segment's start and end point.
     *
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} The delta vector.
     */
    delta(target: Vector3): Vector3;
    /**
     * Returns the squared Euclidean distance between the line' start and end point.
     *
     * @return {number} The squared Euclidean distance.
     */
    distanceSq(): number;
    /**
     * Returns the Euclidean distance between the line' start and end point.
     *
     * @return {number} The Euclidean distance.
     */
    distance(): number;
    /**
     * Returns a vector at a certain position along the line segment.
     *
     * @param {number} t - A value between `[0,1]` to represent a position along the line segment.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} The delta vector.
     */
    at(t: number, target: Vector3): Vector3;
    /**
     * Returns a point parameter based on the closest point as projected on the line segment.
     *
     * @param {Vector3} point - The point for which to return a point parameter.
     * @param {boolean} clampToLine - Whether to clamp the result to the range `[0,1]` or not.
     * @return {number} The point parameter.
     */
    closestPointToPointParameter(point: Vector3, clampToLine: boolean): number;
    /**
     * Returns the closest point on the line for a given point.
     *
     * @param {Vector3} point - The point to compute the closest point on the line for.
     * @param {boolean} clampToLine - Whether to clamp the result to the range `[0,1]` or not.
     * @param {Vector3} target - The target vector that is used to store the method's result.
     * @return {Vector3} The closest point on the line.
     */
    closestPointToPoint(point: Vector3, clampToLine: boolean, target: Vector3): Vector3;
    /**
     * Returns the closest squared distance between this line segment and the given one.
     *
     * @param {Line3} line - The line segment to compute the closest squared distance to.
     * @param {Vector3} [c1] - The closest point on this line segment.
     * @param {Vector3} [c2] - The closest point on the given line segment.
     * @return {number} The squared distance between this line segment and the given one.
     */
    distanceSqToLine3(line: Line3, c1?: Vector3, c2?: Vector3): number;
    /**
     * Applies a 4x4 transformation matrix to this line segment.
     *
     * @param {Matrix4} matrix - The transformation matrix.
     * @return {Line3} A reference to this line segment.
     */
    applyMatrix4(matrix: Matrix4): Line3;
    /**
     * Returns `true` if this line segment is equal with the given one.
     *
     * @param {Line3} line - The line segment to test for equality.
     * @return {boolean} Whether this line segment is equal with the given one.
     */
    equals(line: Line3): boolean;
    /**
     * Returns a new line segment with copied values from this instance.
     *
     * @return {Line3} A clone of this instance.
     */
    clone(): Line3;
}
import { Vector3 } from './Vector3.js';
