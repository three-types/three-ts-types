/**
 * An 3D arrow object for visualizing directions.
 *
 * ```js
 * const dir = new THREE.Vector3( 1, 2, 0 );
 *
 * //normalize the direction vector (convert to vector of length 1)
 * dir.normalize();
 *
 * const origin = new THREE.Vector3( 0, 0, 0 );
 * const length = 1;
 * const hex = 0xffff00;
 *
 * const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
 * scene.add( arrowHelper );
 * ```
 *
 * @augments Object3D
 */
export class ArrowHelper extends Object3D {
    /**
     * Constructs a new arrow helper.
     *
     * @param {Vector3} [dir=(0, 0, 1)] - The (normalized) direction vector.
     * @param {Vector3} [origin=(0, 0, 0)] - Point at which the arrow starts.
     * @param {number} [length=1] - Length of the arrow in world units.
     * @param {(number|Color|string)} [color=0xffff00] - Color of the arrow.
     * @param {number} [headLength=length*0.2] - The length of the head of the arrow.
     * @param {number} [headWidth=headLength*0.2] - The width of the head of the arrow.
     */
    constructor(dir?: Vector3, origin?: Vector3, length?: number, color?: (number | Color | string), headLength?: number, headWidth?: number);
    type: string;
    /**
     * The line part of the arrow helper.
     *
     * @type {Line}
     */
    line: Line;
    /**
     * The cone part of the arrow helper.
     *
     * @type {Mesh}
     */
    cone: Mesh;
    /**
     * Sets the direction of the helper.
     *
     * @param {Vector3} dir - The normalized direction vector.
     */
    setDirection(dir: Vector3): void;
    /**
     * Sets the length of the helper.
     *
     * @param {number} length - Length of the arrow in world units.
     * @param {number} [headLength=length*0.2] - The length of the head of the arrow.
     * @param {number} [headWidth=headLength*0.2] - The width of the head of the arrow.
     */
    setLength(length: number, headLength?: number, headWidth?: number): void;
    /**
     * Sets the color of the helper.
     *
     * @param {number|Color|string} color - The color to set.
     */
    setColor(color: number | Color | string): void;
    copy(source: any): this;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     */
    dispose(): void;
}
import { Object3D } from '../core/Object3D.js';
import { Line } from '../objects/Line.js';
import { Mesh } from '../objects/Mesh.js';
import { Vector3 } from '../math/Vector3.js';
