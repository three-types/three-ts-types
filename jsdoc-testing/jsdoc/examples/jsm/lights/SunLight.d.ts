/**
 * A sun-like light that gets emitted in a specific direction, with rays that
 * are all parallel, and casts cascaded shadow maps via {@link SunLightShadow},
 * suited for lighting large scenes.
 *
 * Unlike {@link DirectionalLight}, the light has no target: like
 * {@link HemisphereLight}, its direction is defined by its position. The
 * light shines from its position towards the origin and points straight
 * down by default.
 *
 * ```js
 * const sun = new SunLight( 0xfff2e3, 3 );
 * sun.position.set( 1, 1, 1 );
 * sun.castShadow = true;
 * scene.add( sun );
 * ```
 *
 * This light is only supported by `WebGLRenderer`. When using `WebGPURenderer`,
 * use {@link DirectionalLight} with `CSMShadowNode` instead.
 *
 * @augments Light
 * @three_import import { SunLight } from 'three/addons/lights/SunLight.js';
 */
export class SunLight extends Light {
    /**
     * Constructs a new sun light.
     *
     * @param {(number|Color|string)} [color=0xffffff] - The light's color.
     * @param {number} [intensity=1] - The light's strength/intensity.
     */
    constructor(color?: (number | Color | string), intensity?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSunLight: boolean;
    /**
     * This property holds the light's shadow configuration.
     *
     * @type {SunLightShadow}
     */
    shadow: SunLightShadow;
    copy(source: any): this;
}
import { Light } from 'three';
import { SunLightShadow } from './SunLightShadow.js';
