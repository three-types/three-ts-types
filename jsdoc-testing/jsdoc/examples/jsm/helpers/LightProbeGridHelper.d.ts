/**
 * Visualizes an {@link LightProbeGrid} by rendering a sphere at each
 * probe position, shaded with the probe's L2 spherical harmonics.
 *
 * Uses a single `InstancedMesh` draw call for all probes.
 *
 * ```js
 * const helper = new LightProbeGridHelper( probes );
 * scene.add( helper );
 * ```
 *
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
    /**
     * Rebuilds instance matrices and UVW attributes from the current probe grid.
     * Call this after changing `probes` or after re-baking.
     */
    update(): void;
}
import { InstancedMesh } from 'three';
