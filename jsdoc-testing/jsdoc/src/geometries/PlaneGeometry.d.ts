/**
 * A geometry class for representing a plane.
 *
 * ```js
 * const geometry = new THREE.PlaneGeometry( 1, 1 );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
 * const plane = new THREE.Mesh( geometry, material );
 * scene.add( plane );
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#PlaneGeometry
 */
export class PlaneGeometry extends BufferGeometry {
    /**
     * Factory method for creating an instance of this class from the given
     * JSON object.
     *
     * @param {Object} data - A JSON object representing the serialized geometry.
     * @return {PlaneGeometry} A new instance.
     */
    static fromJSON(data: Object): PlaneGeometry;
    /**
     * Constructs a new plane geometry.
     *
     * @param {number} [width=1] - The width along the X axis.
     * @param {number} [height=1] - The height along the Y axis
     * @param {number} [widthSegments=1] - The number of segments along the X axis.
     * @param {number} [heightSegments=1] - The number of segments along the Y axis.
     */
    constructor(width?: number, height?: number, widthSegments?: number, heightSegments?: number);
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
