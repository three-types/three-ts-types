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
 * @augments Light
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
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLightProbe: boolean;
    /**
     * A light probe uses spherical harmonics to encode lighting information.
     *
     * @type {SphericalHarmonics3}
     */
    sh: SphericalHarmonics3;
    copy(source: any, recursive: any): this;
}
import { Light } from './Light.js';
import { SphericalHarmonics3 } from '../math/SphericalHarmonics3.js';
