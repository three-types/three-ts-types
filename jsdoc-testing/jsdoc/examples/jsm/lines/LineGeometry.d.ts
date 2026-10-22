/**
 * A chain of vertices, forming a polyline.
 *
 * This is used in {@link Line2} to describe the shape.
 *
 * ```js
 * const points = [
 * 	new THREE.Vector3( - 10, 0, 0 ),
 * 	new THREE.Vector3( 0, 5, 0 ),
 * 	new THREE.Vector3( 10, 0, 0 ),
 * ];
 *
 * const geometry = new LineGeometry();
 * geometry.setFromPoints( points );
 * ```
 *
 * @augments LineSegmentsGeometry
 * @three_import import { LineLineGeometry2 } from 'three/addons/lines/LineGeometry.js';
 */
export class LineGeometry extends LineSegmentsGeometry {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLineGeometry: boolean;
    /**
     * Sets the given line positions for this geometry.
     *
     * @param {Float32Array|Array<number>} array - The position data to set.
     * @return {LineGeometry} A reference to this geometry.
     */
    setPositions(array: Float32Array | Array<number>): LineGeometry;
    /**
     * Sets the given line colors for this geometry.
     *
     * @param {Float32Array|Array<number>} array - The position data to set.
     * @return {LineGeometry} A reference to this geometry.
     */
    setColors(array: Float32Array | Array<number>): LineGeometry;
    /**
     * Setups this line segments geometry from the given sequence of points.
     *
     * @param {Array<Vector3|Vector2>} points - An array of points in 2D or 3D space.
     * @return {LineGeometry} A reference to this geometry.
     */
    setFromPoints(points: Array<Vector3 | Vector2>): LineGeometry;
    /**
     * Setups this line segments geometry from the given line.
     *
     * @param {Line} line - The line that should be used as a data source for this geometry.
     * @return {LineGeometry} A reference to this geometry.
     */
    fromLine(line: Line): LineGeometry;
}
import { LineSegmentsGeometry } from './LineSegmentsGeometry.js';
