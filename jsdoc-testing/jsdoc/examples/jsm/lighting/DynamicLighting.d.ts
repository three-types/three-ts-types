/**
 * A custom lighting implementation that batches supported analytic lights into
 * uniform arrays so light count changes do not recompile materials.
 *
 * ```js
 * const lighting = new DynamicLighting( { maxPointLights: 64 } );
 * renderer.lighting = lighting;
 * ```
 *
 * @augments Lighting
 * @three_import import { DynamicLighting } from 'three/addons/lighting/DynamicLighting.js';
 */
export class DynamicLighting extends Lighting {
    /**
     * Constructs a new dynamic lighting system.
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
    options: {
        maxDirectionalLights: number;
        maxPointLights: number;
        maxSpotLights: number;
        maxHemisphereLights: number;
    };
    _nodes: WeakMap<object, any>;
    /**
     * Creates a new dynamic lights node for the given array of lights.
     *
     * @param {Array<Light>} lights - The lights to bind to the node.
     * @return {DynamicLightsNode} The dynamic lights node.
     */
    createNode(lights?: Array<Light>): DynamicLightsNode;
    /**
     * Returns a lights node for the given scene.
     *
     * @param {Scene} scene - The scene.
     * @return {LightsNode} The lights node.
     */
    getNode(scene: Scene): LightsNode;
}
export default DynamicLighting;
import { Lighting } from 'three/webgpu';
import DynamicLightsNode from '../tsl/lighting/DynamicLightsNode.js';
import { LightsNode } from 'three/webgpu';
