/**
 * Helper object to assist with visualizing a {@link DirectionalLight}'s
 * effect on the scene. This consists of a plane and a line representing the
 * light's position and direction.
 *
 * When the directional light or its target are transformed or light properties
 * are changed, it's necessary to call the `update()` method of the respective helper.
 *
 * ```js
 * const light = new THREE.DirectionalLight( 0xFFFFFF );
 * scene.add( light );
 *
 * const helper = new THREE.DirectionalLightHelper( light, 5 );
 * scene.add( helper );
 * ```
 *
 * @augments Object3D
 */
export class DirectionalLightHelper extends Object3D {
    /**
     * Constructs a new directional light helper.
     *
     * @param {DirectionalLight} light - The light to be visualized.
     * @param {number} [size=1] - The dimensions of the plane.
     * @param {number|Color|string} [color] - The helper's color. If not set, the helper will take
     * the color of the light.
     */
    constructor(light: DirectionalLight, size?: number, color?: number | Color | string);
    /**
     * The light being visualized.
     *
     * @type {DirectionalLight}
     */
    light: DirectionalLight;
    matrix: any;
    /**
     * The color parameter passed in the constructor.
     * If not set, the helper will take the color of the light.
     *
     * @type {number|Color|string}
     */
    color: number | Color | string;
    type: string;
    /**
     * Contains the line showing the location of the directional light.
     *
     * @type {Line}
     */
    lightPlane: Line;
    /**
     * Represents the target line of the directional light.
     *
     * @type {Line}
     */
    targetLine: Line;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     */
    dispose(): void;
    /**
     * Updates the helper to match the position and direction of the
     * light being visualized.
     */
    update(): void;
}
import { Object3D } from '../core/Object3D.js';
import { Line } from '../objects/Line.js';
