import { OrthographicCamera } from "../cameras/OrthographicCamera.js";
import { LightShadow } from "./LightShadow.js";

/**
 * Represents the shadow configuration of directional lights.
 *
 * @augments LightShadow
 */
export class DirectionalLightShadow extends LightShadow<OrthographicCamera> {
    /**
     * Constructs a new directional light shadow.
     */
    constructor();
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isDirectionalLightShadow: boolean;
}
