/**
 * Utility class for creating instances of {@link LightProbe}.
 *
 * @deprecated since r188. Use {@link LightProbeGrid} or {@link Scene#environment} instead.
 * @hideconstructor
 * @three_import import { LightProbeGenerator } from 'three/addons/lights/LightProbeGenerator.js';
 */
export class LightProbeGenerator {
    /**
     * @deprecated since r188. Use {@link LightProbeGrid} or {@link Scene#environment} instead.
     * @return {LightProbe} An empty light probe.
     */
    static fromCubeTexture(): LightProbe;
    /**
     * @async
     * @deprecated since r188. Use {@link LightProbeGrid} or {@link Scene#environment} instead.
     * @return {Promise<LightProbe>} A Promise that resolves with an empty light probe.
     */
    static fromCubeRenderTarget(): Promise<LightProbe>;
}
import { LightProbe } from 'three';
