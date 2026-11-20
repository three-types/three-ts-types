/**
 * A geometry class for representing an icosahedron.
 *
 * ```js
 * const geometry = new THREE.IcosahedronGeometry();
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const icosahedron = new THREE.Mesh( geometry, material );
 * scene.add( icosahedron );
 * ```
 *
 * @augments PolyhedronGeometry
 * @demo scenes/geometry-browser.html#IcosahedronGeometry
 */
export class IcosahedronGeometry extends PolyhedronGeometry {
    /**
     * Constructs a new icosahedron geometry.
     *
     * @param {number} [radius=1] - Radius of the icosahedron.
     * @param {number} [detail=0] - Setting this to a value greater than `0` adds vertices making it no longer a icosahedron.
     */
    constructor(radius?: number, detail?: number);
}
import { PolyhedronGeometry } from './PolyhedronGeometry.js';
