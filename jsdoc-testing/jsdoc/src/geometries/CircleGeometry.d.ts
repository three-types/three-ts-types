/**
 * A simple shape of Euclidean geometry. It is constructed from a
 * number of triangular segments that are oriented around a central point and
 * extend as far out as a given radius. It is built counter-clockwise from a
 * start angle and a given central angle. It can also be used to create
 * regular polygons, where the number of segments determines the number of
 * sides.
 *
 * ```js
 * const geometry = new THREE.CircleGeometry( 5, 32 );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const circle = new THREE.Mesh( geometry, material );
 * scene.add( circle )
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#CircleGeometry
 */
export class CircleGeometry extends BufferGeometry {
    /**
     * Factory method for creating an instance of this class from the given
     * JSON object.
     *
     * @param {Object} data - A JSON object representing the serialized geometry.
     * @return {CircleGeometry} A new instance.
     */
    static fromJSON(data: Object): CircleGeometry;
    /**
     * Constructs a new circle geometry.
     *
     * @param {number} [radius=1] - Radius of the circle.
     * @param {number} [segments=32] - Number of segments (triangles), minimum = `3`.
     * @param {number} [thetaStart=0] - Start angle for first segment in radians.
     * @param {number} [thetaLength=Math.PI*2] - The central angle, often called theta,
     * of the circular sector in radians. The default value results in a complete circle.
     */
    constructor(radius?: number, segments?: number, thetaStart?: number, thetaLength?: number);
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
