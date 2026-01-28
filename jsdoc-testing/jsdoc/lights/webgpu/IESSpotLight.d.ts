export default IESSpotLight;
/**
 * A IES version of {@link SpotLight}. Can only be used with {@link WebGPURenderer}.
 *
 * @augments SpotLight
 */
declare class IESSpotLight extends SpotLight {
    /**
     * TODO
     *
     * @type {?Texture}
     * @default null
     */
    iesMap: Texture | null;
    copy(source: any, recursive: any): this;
}
import { SpotLight } from '../SpotLight.js';
