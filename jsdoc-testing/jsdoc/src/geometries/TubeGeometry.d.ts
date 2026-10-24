/**
 * Creates a tube that extrudes along a 3D curve.
 *
 * ```js
 * class CustomSinCurve extends THREE.Curve {
 *
 * 	getPoint( t, optionalTarget = new THREE.Vector3() ) {
 *
 * 		const tx = t * 3 - 1.5;
 * 		const ty = Math.sin( 2 * Math.PI * t );
 * 		const tz = 0;
 *
 * 		return optionalTarget.set( tx, ty, tz );
 * 	}
 *
 * }
 *
 * const path = new CustomSinCurve( 10 );
 * const geometry = new THREE.TubeGeometry( path, 20, 2, 8, false );
 * const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
 * const mesh = new THREE.Mesh( geometry, material );
 * scene.add( mesh );
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#TubeGeometry
 */
export class TubeGeometry extends BufferGeometry {
    /**
     * Factory method for creating an instance of this class from the given
     * JSON object.
     *
     * @param {Object} data - A JSON object representing the serialized geometry.
     * @return {TubeGeometry} A new instance.
     */
    static fromJSON(data: Object): TubeGeometry;
    /**
     * Constructs a new tube geometry.
     *
     * @param {Curve} [path=QuadraticBezierCurve3] - A 3D curve defining the path of the tube.
     * @param {number} [tubularSegments=64] - The number of segments that make up the tube.
     * @param {number} [radius=1] -The radius of the tube.
     * @param {number} [radialSegments=8] - The number of segments that make up the cross-section.
     * @param {boolean} [closed=false] - Whether the tube is closed or not.
     */
    constructor(path?: Curve, tubularSegments?: number, radius?: number, radialSegments?: number, closed?: boolean);
    /**
     * Holds the constructor parameters that have been
     * used to generate the geometry. Any modification
     * after instantiation does not change the geometry.
     *
     * @type {Object}
     */
    parameters: Object;
    tangents: any;
    normals: any;
    binormals: any;
    copy(source: any): this;
}
import { BufferGeometry } from '../core/BufferGeometry.js';
