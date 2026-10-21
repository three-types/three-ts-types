/**
 * A class containing utility functions for shapes.
 *
 * @hideconstructor
 */
export class ShapeUtils {
    /**
     * Calculate area of a ( 2D ) contour polygon.
     *
     * @param {Array<Vector2>} contour - An array of 2D points.
     * @return {number} The area.
     */
    static area(contour: Array<Vector2>): number;
    /**
     * Returns `true` if the given contour uses a clockwise winding order.
     *
     * @param {Array<Vector2>} pts - An array of 2D points defining a polygon.
     * @return {boolean} Whether the given contour uses a clockwise winding order or not.
     */
    static isClockWise(pts: Array<Vector2>): boolean;
    /**
     * Triangulates the given shape definition.
     *
     * @param {Array<Vector2>} contour - An array of 2D points defining the contour.
     * @param {Array<Array<Vector2>>} holes - An array that holds arrays of 2D points defining the holes.
     * @return {Array<Array<number>>} An array that holds for each face definition an array with three indices.
     */
    static triangulateShape(contour: Array<Vector2>, holes: Array<Array<Vector2>>): Array<Array<number>>;
}
