export const ATLAS_PADDING: 1;
/**
 * The light node that applies a {@link LightProbeGrid} to the scene. It samples
 * the baked L2 spherical-harmonic atlas at the surface position and adds the
 * resulting irradiance to the lighting context, so every standard node material
 * picks up the grid automatically (same role as the WebGL `lights_fragment_begin`
 * integration).
 *
 * @private
 * @augments AnalyticLightNode
 */
export class LightProbeGridNode extends AnalyticLightNode {
    constructor(light?: null);
    _min: import("three/tsl").UniformNode;
    _max: import("three/tsl").UniformNode;
    _resolution: import("three/tsl").UniformNode;
    _intensity: import("three/tsl").UniformNode;
    _falloff: import("three/tsl").UniformNode;
    setup(builder: any): void;
}
import { AnalyticLightNode } from 'three/webgpu';
