/**
 * A geometry class for representing a capsule.
 *
 * ```js
 * const geometry = new THREE.CapsuleGeometry( 1, 1, 4, 8, 1 );
 * const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
 * const capsule = new THREE.Mesh( geometry, material );
 * scene.add( capsule );
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#CapsuleGeometry
 */
export class CapsuleGeometry extends BufferGeometry {
    /**
     * Factory method for creating an instance of this class from the given
     * JSON object.
     *
     * @param {Object} data - A JSON object representing the serialized geometry.
     * @return {CapsuleGeometry} A new instance.
     */
    static fromJSON(data: Object): CapsuleGeometry;
    /**
     * Constructs a new capsule geometry.
     *
     * @param {number} [radius=1] - Radius of the capsule.
     * @param {number} [height=1] - Height of the middle section.
     * @param {number} [capSegments=4] - Number of curve segments used to build each cap.
     * @param {number} [radialSegments=8] - Number of segmented faces around the circumference of the capsule. Must be an integer >= 3.
     * @param {number} [heightSegments=1] - Number of rows of faces along the height of the middle section. Must be an integer >= 1.
     */
    constructor(radius?: number, height?: number, capSegments?: number, radialSegments?: number, heightSegments?: number);
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
