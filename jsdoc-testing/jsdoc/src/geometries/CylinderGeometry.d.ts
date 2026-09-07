/**
 * A geometry class for representing a cylinder.
 *
 * ```js
 * const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const cylinder = new THREE.Mesh( geometry, material );
 * scene.add( cylinder );
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#CylinderGeometry
 */
export class CylinderGeometry extends BufferGeometry {
    /**
     * Factory method for creating an instance of this class from the given
     * JSON object.
     *
     * @param {Object} data - A JSON object representing the serialized geometry.
     * @return {CylinderGeometry} A new instance.
     */
    static fromJSON(data: Object): CylinderGeometry;
    /**
     * Constructs a new cylinder geometry.
     *
     * @param {number} [radiusTop=1] - Radius of the cylinder at the top.
     * @param {number} [radiusBottom=1] - Radius of the cylinder at the bottom.
     * @param {number} [height=1] - Height of the cylinder.
     * @param {number} [radialSegments=32] - Number of segmented faces around the circumference of the cylinder.
     * @param {number} [heightSegments=1] - Number of rows of faces along the height of the cylinder.
     * @param {boolean} [openEnded=false] - Whether the base of the cylinder is open or capped.
     * @param {number} [thetaStart=0] - Start angle for first segment, in radians.
     * @param {number} [thetaLength=Math.PI*2] - The central angle, often called theta, of the circular sector, in radians.
     * The default value results in a complete cylinder.
     */
    constructor(radiusTop?: number, radiusBottom?: number, height?: number, radialSegments?: number, heightSegments?: number, openEnded?: boolean, thetaStart?: number, thetaLength?: number);
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
