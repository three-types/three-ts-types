/**
 * Creates meshes with axial symmetry like vases. The lathe rotates around the Y axis.
 *
 * ```js
 * const points = [];
 * for ( let i = 0; i < 10; i ++ ) {
 * 	points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
 * }
 * const geometry = new THREE.LatheGeometry( points );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const lathe = new THREE.Mesh( geometry, material );
 * scene.add( lathe );
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#LatheGeometry
 */
export class LatheGeometry extends BufferGeometry {
    /**
     * Factory method for creating an instance of this class from the given
     * JSON object.
     *
     * @param {Object} data - A JSON object representing the serialized geometry.
     * @return {LatheGeometry} A new instance.
     */
    static fromJSON(data: Object): LatheGeometry;
    /**
     * Constructs a new lathe geometry.
     *
     * @param {Array<Vector2|Vector3>} [points] - An array of points in 2D space. The x-coordinate of each point
     * must be greater than zero.
     * @param {number} [segments=12] - The number of circumference segments to generate.
     * @param {number} [phiStart=0] - The starting angle in radians.
     * @param {number} [phiLength=Math.PI*2] - The radian (0 to 2PI) range of the lathed section 2PI is a
     * closed lathe, less than 2PI is a portion.
     */
    constructor(points?: Array<Vector2 | Vector3>, segments?: number, phiStart?: number, phiLength?: number);
    /**
     * Holds the constructor parameters that have been
     * used to generate the geometry. Any modification
     * after instantiation does not change the geometry.
     *
     * @type {Object}
     */
    parameters: Object;
    copy(source: any): this;
}
import { BufferGeometry } from '../core/BufferGeometry.js';
import { Vector2 } from '../math/Vector2.js';
import { Vector3 } from '../math/Vector3.js';
