/**
 * Represents the shadow configuration of directional lights.
 *
 * @augments LightShadow
 */
export class DirectionalLightShadow extends LightShadow {
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
import { LightShadow } from './LightShadow.js';
