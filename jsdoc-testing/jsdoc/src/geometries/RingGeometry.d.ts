/**
 * A class for generating a two-dimensional ring geometry.
 *
 * ```js
 * const geometry = new THREE.RingGeometry( 1, 5, 32 );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
 * const mesh = new THREE.Mesh( geometry, material );
 * scene.add( mesh );
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#RingGeometry
 */
export class RingGeometry extends BufferGeometry {
    /**
     * Factory method for creating an instance of this class from the given
     * JSON object.
     *
     * @param {Object} data - A JSON object representing the serialized geometry.
     * @return {RingGeometry} A new instance.
     */
    static fromJSON(data: Object): RingGeometry;
    /**
     * Constructs a new ring geometry.
     *
     * @param {number} [innerRadius=0.5] - The inner radius of the ring.
     * @param {number} [outerRadius=1] - The outer radius of the ring.
     * @param {number} [thetaSegments=32] - Number of segments. A higher number means the ring will be more round. Minimum is `3`.
     * @param {number} [phiSegments=1] - Number of segments per ring segment. Minimum is `1`.
     * @param {number} [thetaStart=0] - Starting angle in radians.
     * @param {number} [thetaLength=Math.PI*2] - Central angle in radians.
     */
    constructor(innerRadius?: number, outerRadius?: number, thetaSegments?: number, phiSegments?: number, thetaStart?: number, thetaLength?: number);
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
