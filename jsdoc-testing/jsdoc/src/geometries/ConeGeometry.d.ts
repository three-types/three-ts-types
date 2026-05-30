/**
 * A geometry class for representing a cone.
 *
 * ```js
 * const geometry = new THREE.ConeGeometry( 5, 20, 32 );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const cone = new THREE.Mesh(geometry, material );
 * scene.add( cone );
 * ```
 *
 * @augments CylinderGeometry
 * @demo scenes/geometry-browser.html#ConeGeometry
 */
export class ConeGeometry extends CylinderGeometry {
    /**
     * Constructs a new cone geometry.
     *
     * @param {number} [radius=1] - Radius of the cone base.
     * @param {number} [height=1] - Height of the cone.
     * @param {number} [radialSegments=32] - Number of segmented faces around the circumference of the cone.
     * @param {number} [heightSegments=1] - Number of rows of faces along the height of the cone.
     * @param {boolean} [openEnded=false] - Whether the base of the cone is open or capped.
     * @param {number} [thetaStart=0] - Start angle for first segment, in radians.
     * @param {number} [thetaLength=Math.PI*2] - The central angle, often called theta, of the circular sector, in radians.
     * The default value results in a complete cone.
     */
    constructor(radius?: number, height?: number, radialSegments?: number, heightSegments?: number, openEnded?: boolean, thetaStart?: number, thetaLength?: number);
}
import { CylinderGeometry } from './CylinderGeometry.js';
