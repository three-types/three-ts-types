/**
 * Can be used as a helper object to view the edges of a geometry.
 *
 * ```js
 * const geometry = new THREE.BoxGeometry();
 * const edges = new THREE.EdgesGeometry( geometry );
 * const line = new THREE.LineSegments( edges );
 * scene.add( line );
 * ```
 *
 * Note: It is not yet possible to serialize/deserialize instances of this class.
 *
 * @augments BufferGeometry
 */
export class EdgesGeometry extends BufferGeometry {
    /**
     * Constructs a new edges geometry.
     *
     * @param {?BufferGeometry} [geometry=null] - The geometry.
     * @param {number} [thresholdAngle=1] - An edge is only rendered if the angle (in degrees)
     * between the face normals of the adjoining faces exceeds this value.
     */
    constructor(geometry?: BufferGeometry | null, thresholdAngle?: number);
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
