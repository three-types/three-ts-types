/**
 * A series of vertex pairs, forming line segments.
 *
 * This is used in {@link LineSegments2} to describe the shape.
 *
 * @augments InstancedBufferGeometry
 * @three_import import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
 */
export class LineSegmentsGeometry extends InstancedBufferGeometry {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLineSegmentsGeometry: boolean;
    /**
     * Applies the given 4x4 transformation matrix to the geometry.
     *
     * @param {Matrix4} matrix - The matrix to apply.
     * @return {LineSegmentsGeometry} A reference to this instance.
     */
    applyMatrix4(matrix: Matrix4): LineSegmentsGeometry;
    /**
     * Sets the given line positions for this geometry. The length must be a multiple of six since
     * each line segment is defined by a start end vertex in the pattern `(xyz xyz)`.
     *
     * @param {Float32Array|Array<number>} array - The position data to set.
     * @return {LineSegmentsGeometry} A reference to this geometry.
     */
    setPositions(array: Float32Array | Array<number>): LineSegmentsGeometry;
    /**
     * Sets the given line colors for this geometry. The length must be a multiple of six since
     * each line segment is defined by a start end color in the pattern `(rgb rgb)`.
     *
     * @param {Float32Array|Array<number>} array - The position data to set.
     * @return {LineSegmentsGeometry} A reference to this geometry.
     */
    setColors(array: Float32Array | Array<number>): LineSegmentsGeometry;
    /**
     * Setups this line segments geometry from the given wireframe geometry.
     *
     * @param {WireframeGeometry} geometry - The geometry that should be used as a data source for this geometry.
     * @return {LineSegmentsGeometry} A reference to this geometry.
     */
    fromWireframeGeometry(geometry: WireframeGeometry): LineSegmentsGeometry;
    /**
     * Setups this line segments geometry from the given edges geometry.
     *
     * @param {EdgesGeometry} geometry - The geometry that should be used as a data source for this geometry.
     * @return {LineSegmentsGeometry} A reference to this geometry.
     */
    fromEdgesGeometry(geometry: EdgesGeometry): LineSegmentsGeometry;
    /**
     * Setups this line segments geometry from the given mesh.
     *
     * @param {Mesh} mesh - The mesh geometry that should be used as a data source for this geometry.
     * @return {LineSegmentsGeometry} A reference to this geometry.
     */
    fromMesh(mesh: Mesh): LineSegmentsGeometry;
    /**
     * Setups this line segments geometry from the given line segments.
     *
     * @param {LineSegments} lineSegments - The line segments that should be used as a data source for this geometry.
     * Assumes the source geometry is not using indices.
     * @return {LineSegmentsGeometry} A reference to this geometry.
     */
    fromLineSegments(lineSegments: LineSegments): LineSegmentsGeometry;
    toJSON(): void;
}
import { InstancedBufferGeometry } from 'three';
import { WireframeGeometry } from 'three';
