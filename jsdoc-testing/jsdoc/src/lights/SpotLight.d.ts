/**
 * This light gets emitted from a single point in one direction, along a cone
 * that increases in size the further from the light it gets.
 *
 * This light can cast shadows - see the {@link SpotLightShadow} for details.
 *
 * ```js
 * // white spotlight shining from the side, modulated by a texture
 * const spotLight = new THREE.SpotLight( 0xffffff );
 * spotLight.position.set( 100, 1000, 100 );
 * spotLight.map = new THREE.TextureLoader().load( url );
 *
 * spotLight.castShadow = true;
 * spotLight.shadow.mapSize.width = 1024;
 * spotLight.shadow.mapSize.height = 1024;
 * spotLight.shadow.camera.near = 500;
 * spotLight.shadow.camera.far = 4000;
 * ```
 *
 * @augments Light
 */
export class SpotLight extends Light {
    /**
     * Constructs a new spot light.
     *
     * @param {(number|Color|string)} [color=0xffffff] - The light's color.
     * @param {number} [intensity=1] - The light's strength/intensity measured in candela (cd).
     * @param {number} [distance=0] - Maximum range of the light. `0` means no limit.
     * @param {number} [angle=Math.PI/3] - Maximum angle of light dispersion from its direction whose upper bound is `Math.PI/2`.
     * @param {number} [penumbra=0] - Percent of the spotlight cone that is attenuated due to penumbra. Value range is `[0,1]`.
     * @param {number} [decay=2] - The exponent of the light's distance falloff.
     */
    constructor(color?: (number | Color | string), intensity?: number, distance?: number, angle?: number, penumbra?: number, decay?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSpotLight: boolean;
    /**
     * The spot light points from its position to the
     * target's position.
     *
     * For the target's position to be changed to anything other
     * than the default, it must be added to the scene.
     *
     * It is also possible to set the target to be another 3D object
     * in the scene. The light will now track the target object.
     *
     * @type {Object3D}
     */
    target: Object3D;
    /**
     * Maximum range of the light. `0` means no limit.
     *
     * @type {number}
     * @default 0
     */
    distance: number;
    /**
     * Maximum angle of light dispersion from its direction whose upper bound is `Math.PI/2`.
     *
     * @type {number}
     * @default Math.PI/3
     */
    angle: number;
    /**
     * Percent of the spotlight cone that is attenuated due to penumbra.
     * Value range is `[0,1]`.
     *
     * @type {number}
     * @default 0
     */
    penumbra: number;
    /**
     * The exponent of the light's distance falloff (`1 / distance^decay`). The
     * default `2` gives physically correct inverse-square falloff and should not
     * be changed in context of physically-correct rendering.
     *
     * @type {number}
     * @default 2
     */
    decay: number;
    /**
     * A texture projected from the light that modulates its color. The spot light
     * color is multiplied by the RGB value of this texture. The projection uses the
     * frustum of the shadow camera (see {@link SpotLightShadow#focus}) and works
     * whether or not {@link Object3D#castShadow} is enabled.
     *
     * @type {?Texture}
     * @default null
     */
    map: Texture | null;
    /**
     * This property holds the light's shadow configuration.
     *
     * @type {SpotLightShadow}
     */
    shadow: SpotLightShadow;
    set power(power: number);
    /**
     * The light's power. Power is the luminous power of the light measured in lumens (lm).
     *  Changing the power will also change the light's intensity.
     *
     * @type {number}
     */
    get power(): number;
    copy(source: any, recursive: any): this;
}
import { Light } from './Light.js';
import { Object3D } from '../core/Object3D.js';
import { SpotLightShadow } from './SpotLightShadow.js';
