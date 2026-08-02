/**
 * Visualizes a {@link LightProbeGrid} by rendering a sphere at each probe
 * position, shaded with the probe's L2 spherical harmonics. Uses a single
 * `InstancedMesh` draw call for all probes.
 *
 * This helper can only be used with {@link WebGPURenderer}.
 * When using {@link WebGLRenderer}, import from `LightProbeGridHelperWebGL.js`.
 *
 * ```js
 * const helper = new LightProbeGridHelper( probes );
 * scene.add( helper );
 * ```
 *
 * @private
 * @augments InstancedMesh
 * @three_import import { LightProbeGridHelper } from 'three/addons/helpers/LightProbeGridHelper.js';
 */
export class LightProbeGridHelper extends InstancedMesh {
    /**
     * Constructs a new irradiance probe grid helper.
     *
     * @param {LightProbeGrid} probes - The probe grid to visualize.
     * @param {number} [sphereSize=0.12] - The radius of each probe sphere.
     */
    constructor(probes: LightProbeGrid, sphereSize?: number);
    /**
     * The probe grid to visualize.
     *
     * @type {LightProbeGrid}
     */
    probes: LightProbeGrid;
    _atlas: any;
    _resolution: import("three/webgpu").UniformNode;
    /**
     * Rebuilds instance matrices and UVW attributes from the current probe grid,
     * and rebinds the shading node to its atlas. Call this after changing
     * `probes` or after re-baking.
     */
    update(): void;
}
import { InstancedMesh } from 'three/webgpu';
