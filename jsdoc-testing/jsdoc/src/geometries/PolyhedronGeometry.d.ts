/**
 * A polyhedron is a solid in three dimensions with flat faces. This class
 * will take an array of vertices, project them onto a sphere, and then
 * divide them up to the desired level of detail.
 *
 * @augments BufferGeometry
 */
export class PolyhedronGeometry extends BufferGeometry {
    /**
     * Factory method for creating an instance of this class from the given
     * JSON object.
     *
     * @param {Object} data - A JSON object representing the serialized geometry.
     * @return {PolyhedronGeometry} A new instance.
     */
    static fromJSON(data: Object): PolyhedronGeometry;
    /**
     * Constructs a new polyhedron geometry.
     *
     * @param {Array<number>} [vertices] - A flat array of vertices describing the base shape.
     * @param {Array<number>} [indices] - A flat array of indices describing the base shape.
     * @param {number} [radius=1] - The radius of the shape.
     * @param {number} [detail=0] - How many levels to subdivide the geometry. The more detail, the smoother the shape.
     */
    constructor(vertices?: Array<number>, indices?: Array<number>, radius?: number, detail?: number);
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
