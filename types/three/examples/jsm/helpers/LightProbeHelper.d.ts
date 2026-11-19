import { LightProbe, Mesh } from "three";

/**
 * This helper no longer renders anything.
 *
 * @deprecated since r188. Use {@link LightProbeGridHelperWebGL} instead.
 */
declare class LightProbeHelper extends Mesh {
    lightProbe: LightProbe;
    size: number;

    /**
     * @deprecated since r188. Use {@link LightProbeGridHelperWebGL} instead.
     */
    constructor(lightProbe: LightProbe, size?: number);

    dispose(): void;
}

export { LightProbeHelper };
