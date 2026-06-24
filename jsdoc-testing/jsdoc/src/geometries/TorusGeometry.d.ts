/**
 * A geometry class for representing an torus.
 *
 * ```js
 * const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const torus = new THREE.Mesh( geometry, material );
 * scene.add( torus );
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#TorusGeometry
 */
export class TorusGeometry extends BufferGeometry {
    /**
     * Factory method for creating an instance of this class from the given
     * JSON object.
     *
     * @param {Object} data - A JSON object representing the serialized geometry.
     * @return {TorusGeometry} A new instance.
     */
    static fromJSON(data: Object): TorusGeometry;
    /**
     * Constructs a new torus geometry.
     *
     * @param {number} [radius=1] - Radius of the torus, from the center of the torus to the center of the tube.
     * @param {number} [tube=0.4] - Radius of the tube. Must be smaller than `radius`.
     * @param {number} [radialSegments=12] - The number of radial segments.
     * @param {number} [tubularSegments=48] - The number of tubular segments.
     * @param {number} [arc=Math.PI*2] - Central angle in radians.
     * @param {number} [thetaStart=0] - Start of the tubular sweep in radians.
     * @param {number} [thetaLength=Math.PI*2] - Length of the tubular sweep in radians.
     */
    constructor(radius?: number, tube?: number, radialSegments?: number, tubularSegments?: number, arc?: number, thetaStart?: number, thetaLength?: number);
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
