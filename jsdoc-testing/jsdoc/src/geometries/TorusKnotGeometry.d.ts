/**
 * Creates a torus knot, the particular shape of which is defined by a pair
 * of coprime integers, p and q. If p and q are not coprime, the result will
 * be a torus link.
 *
 * ```js
 * const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const torusKnot = new THREE.Mesh( geometry, material );
 * scene.add( torusKnot );
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#TorusKnotGeometry
 */
export class TorusKnotGeometry extends BufferGeometry {
    /**
     * Factory method for creating an instance of this class from the given
     * JSON object.
     *
     * @param {Object} data - A JSON object representing the serialized geometry.
     * @return {TorusKnotGeometry} A new instance.
     */
    static fromJSON(data: Object): TorusKnotGeometry;
    /**
     * Constructs a new torus knot geometry.
     *
     * @param {number} [radius=1] - Radius of the torus knot.
     * @param {number} [tube=0.4] - Radius of the tube.
     * @param {number} [tubularSegments=64] - The number of tubular segments.
     * @param {number} [radialSegments=8] - The number of radial segments.
     * @param {number} [p=2] - This value determines, how many times the geometry winds around its axis of rotational symmetry.
     * @param {number} [q=3] - This value determines, how many times the geometry winds around a circle in the interior of the torus.
     */
    constructor(radius?: number, tube?: number, tubularSegments?: number, radialSegments?: number, p?: number, q?: number);
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
