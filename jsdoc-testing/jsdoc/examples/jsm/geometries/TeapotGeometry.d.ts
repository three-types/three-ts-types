/**
 * Tessellates the famous Utah teapot database by Martin Newell into triangles.
 *
 * The teapot should normally be rendered as a double sided object, since for some
 * patches both sides can be seen, e.g., the gap around the lid and inside the spout.
 *
 * Segments 'n' determines the number of triangles output. Total triangles = 32*2*n*n - 8*n
 * (degenerates at the top and bottom cusps are deleted).
 *
 * Code based on [SPD software](http://tog.acm.org/resources/SPD/)
 * Created for the Udacity course [Interactive Rendering](http://bit.ly/ericity)
 *
 * ```js
 * const geometry = new TeapotGeometry( 50, 18 );
 * const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
 * const teapot = new THREE.Mesh( geometry, material );
 * scene.add( teapot );
 * ```
 *
 * @augments BufferGeometry
 * @three_import import { TeapotGeometry } from 'three/addons/geometries/TeapotGeometry.js';
 */
export class TeapotGeometry extends BufferGeometry {
    /**
     * Constructs a new teapot geometry.
     *
     * @param {number} [size=50] - Relative scale of the teapot.
     * @param {number} [segments=10] - Number of line segments to subdivide each patch edge.
     * @param {boolean} [bottom=true] - Whether the bottom of the teapot is generated or not.
     * @param {boolean} [lid=true] - Whether the lid is generated or not.
     * @param {boolean} [body=true] - Whether the body is generated or not.
     * @param {boolean} [fitLid=true] - Whether the lid is slightly stretched to prevent gaps between the body and lid or not.
     * @param {boolean} [blinn=true] -  Whether the teapot is scaled vertically for better aesthetics or not.
     */
    constructor(size?: number, segments?: number, bottom?: boolean, lid?: boolean, body?: boolean, fitLid?: boolean, blinn?: boolean);
}
import { BufferGeometry } from 'three';
