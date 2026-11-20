import { JSONMeta } from "../core/Object3D.js";
import { SphericalHarmonics3 } from "../math/SphericalHarmonics3.js";
import { Light, LightJSON } from "./Light.js";

export interface LightProbeJSON extends LightJSON {
    sh: number[];
}

/**
 * Light probes are an alternative way of adding light to a 3D scene. Unlike
 * classical light sources (e.g. directional, point or spot lights), light
 * probes do not emit light. Instead they store information about light
 * passing through 3D space.
 *
 * Note: Light probes are no longer evaluated by `WebGLRenderer` or `WebGPURenderer`,
 * so adding one to a scene has no effect. Use {@link LightProbeGrid} or
 * {@link Scene#environment} instead.
 *
 * @deprecated since r188.
 */
export class LightProbe extends Light {
    /**
     * Constructs a new light probe.
     *
     * @deprecated since r188.
     * @param {SphericalHarmonics3} [sh] - The spherical harmonics which represents encoded lighting information.
     * @param {number} [intensity=1] - The light's strength/intensity.
     */
    constructor(sh?: SphericalHarmonics3, intensity?: number);
    /**
     * This flag can be used for type testing.
     *
     * @default true
     */
    readonly isLightProbe: boolean;
    /**
     * A light probe uses spherical harmonics to encode lighting information.
     */
    sh: SphericalHarmonics3;
    copy(source: LightProbe, recursive?: boolean): this;
    toJSON(meta?: JSONMeta): LightProbeJSON;
}
