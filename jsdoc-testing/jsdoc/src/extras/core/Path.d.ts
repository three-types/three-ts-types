/**
 * A 2D path representation. The class provides methods for creating paths
 * and contours of 2D shapes similar to the 2D Canvas API.
 *
 * ```js
 * const path = new THREE.Path();
 *
 * path.lineTo( 0, 0.8 );
 * path.quadraticCurveTo( 0, 1, 0.2, 1 );
 * path.lineTo( 1, 1 );
 *
 * const points = path.getPoints();
 *
 * const geometry = new THREE.BufferGeometry().setFromPoints( points );
 * const material = new THREE.LineBasicMaterial( { color: 0xffffff } );
 *
 * const line = new THREE.Line( geometry, material );
 * scene.add( line );
 * ```
 *
 * @augments CurvePath
 */
export class Path extends CurvePath {
    /**
     * Constructs a new path.
     *
     * @param {Array<Vector2>} [points] - An array of 2D points defining the path.
     */
    constructor(points?: Array<Vector2>);
    /**
     * The current offset of the path. Any new curve added will start here.
     *
     * @type {Vector2}
     */
    currentPoint: Vector2;
    /**
     * Creates a path from the given list of points. The points are added
     * to the path as instances of {@link LineCurve}.
     *
     * @param {Array<Vector2>} points - An array of 2D points.
     * @return {Path} A reference to this path.
     */
    setFromPoints(points: Array<Vector2>): Path;
    /**
     * Moves {@link Path#currentPoint} to the given point.
     *
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     * @return {Path} A reference to this path.
     */
    moveTo(x: number, y: number): Path;
    /**
     * Adds an instance of {@link LineCurve} to the path by connecting
     * the current point with the given one.
     *
     * @param {number} x - The x coordinate of the end point.
     * @param {number} y - The y coordinate of the end point.
     * @return {Path} A reference to this path.
     */
    lineTo(x: number, y: number): Path;
    /**
     * Adds an instance of {@link QuadraticBezierCurve} to the path by connecting
     * the current point with the given one.
     *
     * @param {number} aCPx - The x coordinate of the control point.
     * @param {number} aCPy - The y coordinate of the control point.
     * @param {number} aX - The x coordinate of the end point.
     * @param {number} aY - The y coordinate of the end point.
     * @return {Path} A reference to this path.
     */
    quadraticCurveTo(aCPx: number, aCPy: number, aX: number, aY: number): Path;
    /**
     * Adds an instance of {@link CubicBezierCurve} to the path by connecting
     * the current point with the given one.
     *
     * @param {number} aCP1x - The x coordinate of the first control point.
     * @param {number} aCP1y - The y coordinate of the first control point.
     * @param {number} aCP2x - The x coordinate of the second control point.
     * @param {number} aCP2y - The y coordinate of the second control point.
     * @param {number} aX - The x coordinate of the end point.
     * @param {number} aY - The y coordinate of the end point.
     * @return {Path} A reference to this path.
     */
    bezierCurveTo(aCP1x: number, aCP1y: number, aCP2x: number, aCP2y: number, aX: number, aY: number): Path;
    /**
     * Adds an instance of {@link SplineCurve} to the path by connecting
     * the current point with the given list of points.
     *
     * @param {Array<Vector2>} pts - An array of points in 2D space.
     * @return {Path} A reference to this path.
     */
    splineThru(pts: Array<Vector2>): Path;
    /**
     * Adds an arc as an instance of {@link EllipseCurve} to the path, positioned relative
     * to the current point.
     *
     * @param {number} [aX=0] - The x coordinate of the center of the arc offsetted from the previous curve.
     * @param {number} [aY=0] - The y coordinate of the center of the arc offsetted from the previous curve.
     * @param {number} [aRadius=1] - The radius of the arc.
     * @param {number} [aStartAngle=0] - The start angle in radians.
     * @param {number} [aEndAngle=Math.PI*2] - The end angle in radians.
     * @param {boolean} [aClockwise=false] - Whether to sweep the arc clockwise or not.
     * @return {Path} A reference to this path.
     */
    arc(aX?: number, aY?: number, aRadius?: number, aStartAngle?: number, aEndAngle?: number, aClockwise?: boolean): Path;
    /**
     * Adds an absolutely positioned arc as an instance of {@link EllipseCurve} to the path.
     *
     * @param {number} [aX=0] - The x coordinate of the center of the arc.
     * @param {number} [aY=0] - The y coordinate of the center of the arc.
     * @param {number} [aRadius=1] - The radius of the arc.
     * @param {number} [aStartAngle=0] - The start angle in radians.
     * @param {number} [aEndAngle=Math.PI*2] - The end angle in radians.
     * @param {boolean} [aClockwise=false] - Whether to sweep the arc clockwise or not.
     * @return {Path} A reference to this path.
     */
    absarc(aX?: number, aY?: number, aRadius?: number, aStartAngle?: number, aEndAngle?: number, aClockwise?: boolean): Path;
    /**
     * Adds an ellipse as an instance of {@link EllipseCurve} to the path, positioned relative
     * to the current point
     *
     * @param {number} [aX=0] - The x coordinate of the center of the ellipse offsetted from the previous curve.
     * @param {number} [aY=0] - The y coordinate of the center of the ellipse offsetted from the previous curve.
     * @param {number} [xRadius=1] - The radius of the ellipse in the x axis.
     * @param {number} [yRadius=1] - The radius of the ellipse in the y axis.
     * @param {number} [aStartAngle=0] - The start angle in radians.
     * @param {number} [aEndAngle=Math.PI*2] - The end angle in radians.
     * @param {boolean} [aClockwise=false] - Whether to sweep the ellipse clockwise or not.
     * @param {number} [aRotation=0] - The rotation angle of the ellipse in radians, counterclockwise from the positive X axis.
     * @return {Path} A reference to this path.
     */
    ellipse(aX?: number, aY?: number, xRadius?: number, yRadius?: number, aStartAngle?: number, aEndAngle?: number, aClockwise?: boolean, aRotation?: number): Path;
    /**
     * Adds an absolutely positioned ellipse as an instance of {@link EllipseCurve} to the path.
     *
     * @param {number} [aX=0] - The x coordinate of the absolute center of the ellipse.
     * @param {number} [aY=0] - The y coordinate of the absolute center of the ellipse.
     * @param {number} [xRadius=1] - The radius of the ellipse in the x axis.
     * @param {number} [yRadius=1] - The radius of the ellipse in the y axis.
     * @param {number} [aStartAngle=0] - The start angle in radians.
     * @param {number} [aEndAngle=Math.PI*2] - The end angle in radians.
     * @param {boolean} [aClockwise=false] - Whether to sweep the ellipse clockwise or not.
     * @param {number} [aRotation=0] - The rotation angle of the ellipse in radians, counterclockwise from the positive X axis.
     * @return {Path} A reference to this path.
     */
    absellipse(aX?: number, aY?: number, xRadius?: number, yRadius?: number, aStartAngle?: number, aEndAngle?: number, aClockwise?: boolean, aRotation?: number): Path;
    copy(source: any): this;
    fromJSON(json: any): this;
}
import { CurvePath } from './CurvePath.js';
import { Vector2 } from '../../math/Vector2.js';
