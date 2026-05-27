/**
 * A helper object to visualize an instance of {@link Plane}.
 *
 * ```js
 * const plane = new THREE.Plane( new THREE.Vector3( 1, 1, 0.2 ), 3 );
 * const helper = new THREE.PlaneHelper( plane, 1, 0xffff00 );
 * scene.add( helper );
 * ```
 *
 * @augments Line
 */
export class PlaneHelper extends Line {
    /**
     * Constructs a new plane helper.
     *
     * @param {Plane} plane - The plane to be visualized.
     * @param {number} [size=1] - The side length of plane helper.
     * @param {number|Color|string} [hex=0xffff00] - The helper's color.
     */
    constructor(plane: Plane, size?: number, hex?: number | Color | string);
    /**
     * The plane being visualized.
     *
     * @type {Plane}
     */
    plane: Plane;
    /**
     * The side length of plane helper.
     *
     * @type {number}
     * @default 1
     */
    size: number;
    updateMatrixWorld(force: any): void;
    /**
     * Updates the helper to match the position and direction of the
     * light being visualized.
     */
    dispose(): void;
}
import { Line } from '../objects/Line.js';
