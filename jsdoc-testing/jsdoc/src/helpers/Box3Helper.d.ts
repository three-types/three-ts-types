/**
 * A helper object to visualize an instance of {@link Box3}.
 *
 * ```js
 * const box = new THREE.Box3();
 * box.setFromCenterAndSize( new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( 2, 1, 3 ) );
 *
 * const helper = new THREE.Box3Helper( box, 0xffff00 );
 * scene.add( helper )
 * ```
 *
 * @augments LineSegments
 */
export class Box3Helper extends LineSegments {
    /**
     * Constructs a new box3 helper.
     *
     * @param {Box3} box - The box to visualize.
     * @param {number|Color|string} [color=0xffff00] - The box's color.
     */
    constructor(box: Box3, color?: number | Color | string);
    /**
     * The box being visualized.
     *
     * @type {Box3}
     */
    box: Box3;
    updateMatrixWorld(force: any): void;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     */
    dispose(): void;
}
import { LineSegments } from '../objects/LineSegments.js';
