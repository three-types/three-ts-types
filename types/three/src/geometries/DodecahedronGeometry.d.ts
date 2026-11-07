/**
 * A geometry class for representing a dodecahedron.
 *
 * ```js
 * const geometry = new THREE.DodecahedronGeometry();
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const dodecahedron = new THREE.Mesh( geometry, material );
 * scene.add( dodecahedron );
 * ```
 *
 * @augments PolyhedronGeometry
 * @demo scenes/geometry-browser.html#DodecahedronGeometry
 */
export class DodecahedronGeometry extends PolyhedronGeometry {
    /**
     * Factory method for creating an instance of this class from the given
     * JSON object.
     *
     * @param {Object} data - A JSON object representing the serialized geometry.
     * @return {DodecahedronGeometry} A new instance.
     */
    static fromJSON(data: {}): DodecahedronGeometry;
    /**
     * Constructs a new dodecahedron geometry.
     *
     * @param {number} [radius=1] - Radius of the dodecahedron.
     * @param {number} [detail=0] - Setting this to a value greater than `0` adds vertices making it no longer a dodecahedron.
     */
    constructor(radius?: number, detail?: number);
}
import { PolyhedronGeometry } from "./PolyhedronGeometry.js";
