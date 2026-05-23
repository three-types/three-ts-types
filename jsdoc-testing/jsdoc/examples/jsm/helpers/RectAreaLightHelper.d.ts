/**
 * Creates a visual aid for rect area lights.
 *
 * `RectAreaLightHelper` must be added as a child of the light.
 *
 * ```js
 * const light = new THREE.RectAreaLight( 0xffffbb, 1.0, 5, 5 );
 * const helper = new RectAreaLightHelper( light );
 * light.add( helper );
 * ```
 *
 * @augments Line
 * @three_import import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
 */
export class RectAreaLightHelper extends Line {
    /**
     * Constructs a new rect area light helper.
     *
     * @param {RectAreaLight} light - The light to visualize.
     * @param {number|Color|string} [color] - The helper's color.
     * If this is not the set, the helper will take the color of the light.
     */
    constructor(light: RectAreaLight, color?: number | Color | string);
    /**
     * The light to visualize.
     *
     * @type {RectAreaLight}
     */
    light: RectAreaLight;
    /**
     * The helper's color. If `undefined`, the helper will take the color of the light.
     *
     * @type {number|Color|string|undefined}
     */
    color: number | Color | string | undefined;
    updateMatrixWorld(): void;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     */
    dispose(): void;
}
import { Line } from 'three';
