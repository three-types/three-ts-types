/**
 * A light source positioned directly above the scene, with color fading from
 * the sky color to the ground color.
 *
 * This light cannot be used to cast shadows.
 *
 * ```js
 * const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
 * scene.add( light );
 * ```
 *
 * @augments Light
 */
export class HemisphereLight extends Light {
    /**
     * Constructs a new hemisphere light.
     *
     * @param {(number|Color|string)} [skyColor=0xffffff] - The light's sky color.
     * @param {(number|Color|string)} [groundColor=0xffffff] - The light's ground color.
     * @param {number} [intensity=1] - The light's strength/intensity.
     */
    constructor(skyColor?: (number | Color | string), groundColor?: (number | Color | string), intensity?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isHemisphereLight: boolean;
    /**
     * The light's ground color.
     *
     * @type {Color}
     */
    groundColor: Color;
    copy(source: any, recursive: any): this;
}
import { Light } from './Light.js';
import { Color } from '../math/Color.js';
