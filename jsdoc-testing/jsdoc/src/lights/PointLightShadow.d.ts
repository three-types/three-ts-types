/**
 * Represents the shadow configuration of point lights.
 *
 * @augments LightShadow
 */
export class PointLightShadow extends LightShadow {
    /**
     * Constructs a new point light shadow.
     */
    constructor();
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isPointLightShadow: boolean;
}
import { LightShadow } from './LightShadow.js';
