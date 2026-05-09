/**
 * Creates a visual aid consisting of a spherical mesh for a
 * given {@link HemisphereLight}.
 *
 * When the hemisphere light is transformed or its light properties are changed,
 * it's necessary to call the `update()` method of the respective helper.
 *
 * ```js
 * const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
 * const helper = new THREE.HemisphereLightHelper( light, 5 );
 * scene.add( helper );
 * ```
 *
 * @augments Object3D
 */
export class HemisphereLightHelper extends Object3D {
    /**
     * Constructs a new hemisphere light helper.
     *
     * @param {HemisphereLight} light - The light to be visualized.
     * @param {number} [size=1] - The size of the mesh used to visualize the light.
     * @param {number|Color|string} [color] - The helper's color. If not set, the helper will take
     * the color of the light.
     */
    constructor(light: HemisphereLight, size?: number, color?: number | Color | string);
    /**
     * The light being visualized.
     *
     * @type {HemisphereLight}
     */
    light: HemisphereLight;
    matrix: any;
    /**
     * The color parameter passed in the constructor.
     * If not set, the helper will take the color of the light.
     *
     * @type {number|Color|string}
     */
    color: number | Color | string;
    type: string;
    material: MeshBasicMaterial;
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
import { Color } from '../math/Color.js';
import { MeshBasicMaterial } from '../materials/MeshBasicMaterial.js';
