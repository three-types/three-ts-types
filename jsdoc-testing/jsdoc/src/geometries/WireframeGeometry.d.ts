/**
 * Can be used as a helper object to visualize a geometry as a wireframe.
 *
 * ```js
 * const geometry = new THREE.SphereGeometry();
 *
 * const wireframe = new THREE.WireframeGeometry( geometry );
 *
 * const line = new THREE.LineSegments( wireframe );
 * line.material.depthWrite = false;
 * line.material.opacity = 0.25;
 * line.material.transparent = true;
 *
 * scene.add( line );
 * ```
 *
 * Note: It is not yet possible to serialize/deserialize instances of this class.
 *
 * @augments BufferGeometry
 */
export class WireframeGeometry extends BufferGeometry {
    /**
     * Constructs a new wireframe geometry.
     *
     * @param {?BufferGeometry} [geometry=null] - The geometry.
     */
    constructor(geometry?: BufferGeometry | null);
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
