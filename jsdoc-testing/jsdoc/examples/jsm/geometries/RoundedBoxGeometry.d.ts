/**
 * A special type of box geometry with rounded corners and edges.
 *
 * ```js
 * const geometry = new THREE.RoundedBoxGeometry();
 * const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
 * const cube = new THREE.Mesh( geometry, material );
 * scene.add( cube );
 * ```
 *
 * @augments BoxGeometry
 * @three_import import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
 */
export class RoundedBoxGeometry extends BoxGeometry {
    /**
     * Constructs a new rounded box geometry.
     *
     * @param {number} [width=1] - The width. That is, the length of the edges parallel to the X axis.
     * @param {number} [height=1] - The height. That is, the length of the edges parallel to the Y axis.
     * @param {number} [depth=1] - The depth. That is, the length of the edges parallel to the Z axis.
     * @param {number} [segments=2] - Number of segments that form the rounded corners.
     * @param {number} [radius=0.1] - The radius of the rounded corners.
     */
    constructor(width?: number, height?: number, depth?: number, segments?: number, radius?: number);
}
import { BoxGeometry } from 'three';
