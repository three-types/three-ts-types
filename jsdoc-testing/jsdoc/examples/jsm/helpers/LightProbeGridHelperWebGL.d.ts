/**
 * Visualizes an {@link LightProbeGridWebGL} by rendering a sphere at each
 * probe position, shaded with the probe's L2 spherical harmonics.
 *
 * Uses a single `InstancedMesh` draw call for all probes.
 *
 * ```js
 * const helper = new LightProbeGridHelperWebGL( probes );
 * scene.add( helper );
 * ```
 *
 * @augments InstancedMesh
 * @three_import import { LightProbeGridHelperWebGL } from 'three/addons/helpers/LightProbeGridHelperWebGL.js';
 */
export class LightProbeGridHelperWebGL extends InstancedMesh {
    /**
     * Constructs a new irradiance probe grid helper.
     *
     * @param {LightProbeGridWebGL} probes - The probe grid to visualize.
     * @param {number} [sphereSize=0.12] - The radius of each probe sphere.
     */
    constructor(probes: LightProbeGridWebGL, sphereSize?: number);
    /**
     * The probe grid to visualize.
     *
     * @type {LightProbeGridWebGL}
     */
    probes: LightProbeGridWebGL;
    /**
     * Rebuilds instance matrices and UVW attributes from the current probe grid.
     * Call this after changing `probes` or after re-baking.
     */
    update(): void;
}
import { InstancedMesh } from 'three';
