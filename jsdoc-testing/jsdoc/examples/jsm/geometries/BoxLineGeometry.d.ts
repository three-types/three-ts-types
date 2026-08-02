/**
 * A special type of box geometry intended for {@link LineSegments}.
 *
 * ```js
 * const geometry = new THREE.BoxLineGeometry();
 * const material = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
 * const lines = new THREE.LineSegments( geometry, material );
 * scene.add( lines );
 * ```
 *
 * @augments BufferGeometry
 * @three_import import { BoxLineGeometry } from 'three/addons/geometries/BoxLineGeometry.js';
 */
export class BoxLineGeometry extends BufferGeometry {
    /**
     * Constructs a new box line geometry.
     *
     * @param {number} [width=1] - The width. That is, the length of the edges parallel to the X axis.
     * @param {number} [height=1] - The height. That is, the length of the edges parallel to the Y axis.
     * @param {number} [depth=1] - The depth. That is, the length of the edges parallel to the Z axis.
     * @param {number} [widthSegments=1] - Number of segmented rectangular sections along the width of the sides.
     * @param {number} [heightSegments=1] - Number of segmented rectangular sections along the height of the sides.
     * @param {number} [depthSegments=1] - Number of segmented rectangular sections along the depth of the sides.
     */
    constructor(width?: number, height?: number, depth?: number, widthSegments?: number, heightSegments?: number, depthSegments?: number);
}
import { BufferGeometry } from 'three';
