export default DynamicLightsNode;
export function dynamicLights(options?: Object): DynamicLightsNode;
/**
 * A custom version of `LightsNode` that batches supported analytic lights into
 * uniform arrays and loops.
 *
 * Unsupported lights, node lights, shadow-casting lights, and projected spot
 * lights keep the default per-light path.
 *
 * @augments LightsNode
 * @three_import import { DynamicLightsNode } from 'three/addons/tsl/lighting/DynamicLightsNode.js';
 */
declare class DynamicLightsNode extends LightsNode {
    /**
     * Constructs a new dynamic lights node.
     *
     * @param {Object} [options={}] - Dynamic lighting configuration.
     * @param {number} [options.maxDirectionalLights=8] - Maximum number of batched directional lights.
     * @param {number} [options.maxPointLights=16] - Maximum number of batched point lights.
     * @param {number} [options.maxSpotLights=16] - Maximum number of batched spot lights.
     * @param {number} [options.maxHemisphereLights=4] - Maximum number of batched hemisphere lights.
     */
    constructor(options?: {
        maxDirectionalLights?: number | undefined;
        maxPointLights?: number | undefined;
        maxSpotLights?: number | undefined;
        maxHemisphereLights?: number | undefined;
    });
    maxDirectionalLights: number;
    maxPointLights: number;
    maxSpotLights: number;
    maxHemisphereLights: number;
    _dataNodes: Map<any, any>;
    setupLightsNode(builder: any): any[];
    setLights(lights: any): this;
    _updateDataNodeLights(lights: any): void;
}
import { LightsNode } from 'three/webgpu';
