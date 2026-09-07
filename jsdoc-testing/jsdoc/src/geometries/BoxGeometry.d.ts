/**
 * A geometry class for a rectangular cuboid with a given width, height, and depth.
 * On creation, the cuboid is centred on the origin, with each edge parallel to one
 * of the axes.
 *
 * ```js
 * const geometry = new THREE.BoxGeometry( 1, 1, 1 );
 * const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
 * const cube = new THREE.Mesh( geometry, material );
 * scene.add( cube );
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#BoxGeometry
 */
export class BoxGeometry extends BufferGeometry {
    /**
     * Factory method for creating an instance of this class from the given
     * JSON object.
     *
     * @param {Object} data - A JSON object representing the serialized geometry.
     * @return {BoxGeometry} A new instance.
     */
    static fromJSON(data: Object): BoxGeometry;
    /**
     * Constructs a new box geometry.
     *
     * @param {number} [width=1] - The width. That is, the length of the edges parallel to the X axis.
     * @param {number} [height=1] - The height. That is, the length of the edges parallel to the Y axis.
     * @param {number} [depth=1] - The depth. That is, the length of the edges parallel to the Z axis.
     * @param {number} [widthSegments=1] - Number of segmented rectangular faces along the width of the sides.
     * @param {number} [heightSegments=1] - Number of segmented rectangular faces along the height of the sides.
     * @param {number} [depthSegments=1] - Number of segmented rectangular faces along the depth of the sides.
     */
    constructor(width?: number, height?: number, depth?: number, widthSegments?: number, heightSegments?: number, depthSegments?: number);
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
