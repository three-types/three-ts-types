/**
 * This helper no longer renders anything.
 *
 * @deprecated since r188. Use {@link LightProbeGridHelperWebGL} instead.
 * @augments Mesh
 * @three_import import { LightProbeHelper } from 'three/addons/helpers/LightProbeHelper.js';
 */
export class LightProbeHelper extends Mesh {
    /**
     * Constructs a new light probe helper.
     *
     * @deprecated since r188. Use {@link LightProbeGridHelperWebGL} instead.
     * @param {LightProbe} lightProbe - The light probe.
     * @param {number} [size=1] - The size of the helper.
     */
    constructor(lightProbe: LightProbe, size?: number);
    /**
     * The light probe.
     *
     * @type {LightProbe}
     */
    lightProbe: LightProbe;
    /**
     * The size of the helper.
     *
     * @type {number}
     * @default 1
     */
    size: number;
}
import { Mesh } from 'three';
