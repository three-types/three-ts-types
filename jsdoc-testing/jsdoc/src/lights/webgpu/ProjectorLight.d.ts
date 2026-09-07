export default ProjectorLight;
/**
 * A projector light version of {@link SpotLight}. Can only be used with {@link WebGPURenderer}.
 *
 * @augments SpotLight
 */
declare class ProjectorLight extends SpotLight {
    /**
     * Aspect ratio of the light. Set to `null` to use the texture aspect ratio.
     *
     * @type {?number}
     * @default null
     */
    aspect: number | null;
    copy(source: any, recursive: any): this;
}
import { SpotLight } from '../SpotLight.js';
