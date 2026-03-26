/**
 * A geometry class for representing an octahedron.
 *
 * ```js
 * const geometry = new THREE.OctahedronGeometry();
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const octahedron = new THREE.Mesh( geometry, material );
 * scene.add( octahedron );
 * ```
 *
 * @augments PolyhedronGeometry
 * @demo scenes/geometry-browser.html#OctahedronGeometry
 */
export class OctahedronGeometry extends PolyhedronGeometry {
    /**
     * Constructs a new octahedron geometry.
     *
     * @param {number} [radius=1] - Radius of the octahedron.
     * @param {number} [detail=0] - Setting this to a value greater than `0` adds vertices making it no longer a octahedron.
     */
    constructor(radius?: number, detail?: number);
}
import { PolyhedronGeometry } from './PolyhedronGeometry.js';
