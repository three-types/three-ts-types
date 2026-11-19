import { LightProbe } from "three";

/**
 * @deprecated since r188. Use {@link LightProbeGrid} or {@link Scene#environment} instead.
 */
declare class LightProbeGenerator {
    /**
     * @deprecated since r188. Use {@link LightProbeGrid} or {@link Scene#environment} instead.
     */
    static fromCubeTexture(): LightProbe;
    /**
     * @deprecated since r188. Use {@link LightProbeGrid} or {@link Scene#environment} instead.
     */
    static fromCubeRenderTarget(): Promise<LightProbe>;
}

export { LightProbeGenerator };
