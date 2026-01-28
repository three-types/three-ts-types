import { Texture } from "../../textures/Texture.js";
import { SpotLight } from "../SpotLight.js";

/**
 * A IES version of {@link SpotLight}. Can only be used with {@link WebGPURenderer}.
 */
declare class IESSpotLight extends SpotLight {
    /**
     * TODO
     *
     * @default null
     */
    iesMap: Texture | null;
    copy(source: IESSpotLight, recursive?: boolean): this;
}

export default IESSpotLight;
