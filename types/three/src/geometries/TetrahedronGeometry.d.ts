/**
 * A geometry class for representing an tetrahedron.
 *
 * ```js
 * const geometry = new THREE.TetrahedronGeometry();
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const tetrahedron = new THREE.Mesh( geometry, material );
 * scene.add( tetrahedron );
 * ```
 *
 * @augments PolyhedronGeometry
 * @demo scenes/geometry-browser.html#TetrahedronGeometry
 */
export class TetrahedronGeometry extends PolyhedronGeometry {
    /**
     * Factory method for creating an instance of this class from the given
     * JSON object.
     *
     * @param {Object} data - A JSON object representing the serialized geometry.
     * @return {TetrahedronGeometry} A new instance.
     */
    static fromJSON(data: {}): TetrahedronGeometry;
    /**
     * Constructs a new tetrahedron geometry.
     *
     * @param {number} [radius=1] - Radius of the tetrahedron.
     * @param {number} [detail=0] - Setting this to a value greater than `0` adds vertices making it no longer a tetrahedron.
     */
    constructor(radius?: number, detail?: number);
}
import { PolyhedronGeometry } from "./PolyhedronGeometry.js";
