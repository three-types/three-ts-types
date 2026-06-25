export default IESSpotLight;
/**
 * A IES version of {@link SpotLight}. Can only be used with {@link WebGPURenderer}.
 *
 * @augments SpotLight
 */
declare class IESSpotLight extends SpotLight {
    /**
     * The IES map. It's a lookup table that stores normalized attenuation factors
     * (0.0 to 1.0) that represent the light's intensity at a specific angle.
     *
     * @type {?Texture}
     * @default null
     */
    iesMap: Texture | null;
    copy(source: any, recursive: any): this;
}
import { SpotLight } from '../SpotLight.js';
