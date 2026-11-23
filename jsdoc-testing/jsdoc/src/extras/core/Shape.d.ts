/**
 * Defines an arbitrary 2d shape plane using paths with optional holes. It
 * can be used with {@link ExtrudeGeometry}, {@link ShapeGeometry}, to get
 * points, or to get triangulated faces.
 *
 * ```js
 * const heartShape = new THREE.Shape();
 *
 * heartShape.moveTo( 25, 25 );
 * heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
 * heartShape.bezierCurveTo( - 30, 0, - 30, 35, - 30, 35 );
 * heartShape.bezierCurveTo( - 30, 55, - 10, 77, 25, 95 );
 * heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
 * heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
 * heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );
 *
 * const extrudeSettings = {
 * 	depth: 8,
 * 	bevelEnabled: true,
 * 	bevelSegments: 2,
 * 	steps: 2,
 * 	bevelSize: 1,
 * 	bevelThickness: 1
 * };
 *
 * const geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
 * const mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial() );
 * ```
 *
 * @augments Path
 */
export class Shape extends Path {
    /**
     * Constructs a new shape.
     *
     * @param {Array<Vector2>} [points] - An array of 2D points defining the shape.
     */
    constructor(points?: Array<Vector2>);
    /**
     * The UUID of the shape.
     *
     * @type {string}
     * @readonly
     */
    readonly uuid: string;
    /**
     * Defines the holes in the shape. Hole definitions must use the
     * opposite winding order (CW/CCW) than the outer shape.
     *
     * @type {Array<Path>}
     * @readonly
     */
    readonly holes: Array<Path>;
    /**
     * Returns an array representing each contour of the holes
     * as a list of 2D points.
     *
     * @param {number} divisions - The fineness of the result.
     * @return {Array<Array<Vector2>>} The holes as a series of 2D points.
     */
    getPointsHoles(divisions: number): Array<Array<Vector2>>;
    /**
     * Returns an object that holds contour data for the shape and its holes as
     * arrays of 2D points.
     *
     * @param {number} divisions - The fineness of the result.
     * @return {{shape:Array<Vector2>,holes:Array<Array<Vector2>>}} An object with contour data.
     */
    extractPoints(divisions: number): {
        shape: Array<Vector2>;
        holes: Array<Array<Vector2>>;
    };
    copy(source: any): this;
    fromJSON(json: any): this;
}
import { Path } from './Path.js';
