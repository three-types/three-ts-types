/**
 * A class for generating a sphere geometry.
 *
 * ```js
 * const geometry = new THREE.SphereGeometry( 15, 32, 16 );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const sphere = new THREE.Mesh( geometry, material );
 * scene.add( sphere );
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#SphereGeometry
 */
export class SphereGeometry extends BufferGeometry {
    /**
     * Factory method for creating an instance of this class from the given
     * JSON object.
     *
     * @param {Object} data - A JSON object representing the serialized geometry.
     * @return {SphereGeometry} A new instance.
     */
    static fromJSON(data: Object): SphereGeometry;
    /**
     * Constructs a new sphere geometry.
     *
     * @param {number} [radius=1] - The sphere radius.
     * @param {number} [widthSegments=32] - The number of horizontal segments. Minimum value is `3`.
     * @param {number} [heightSegments=16] - The number of vertical segments. Minimum value is `2`.
     * @param {number} [phiStart=0] - The horizontal starting angle in radians.
     * @param {number} [phiLength=Math.PI*2] - The horizontal sweep angle size.
     * @param {number} [thetaStart=0] - The vertical starting angle in radians.
     * @param {number} [thetaLength=Math.PI] - The vertical sweep angle size.
     */
    constructor(radius?: number, widthSegments?: number, heightSegments?: number, phiStart?: number, phiLength?: number, thetaStart?: number, thetaLength?: number);
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
