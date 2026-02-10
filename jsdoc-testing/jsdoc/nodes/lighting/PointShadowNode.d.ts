export const BasicPointShadowFilter: () => void;
/**
 * A shadow filtering function for point lights using Vogel disk sampling and IGN.
 *
 * Uses 5 samples distributed via Vogel disk pattern in tangent space around the
 * sample direction, rotated per-pixel using Interleaved Gradient Noise (IGN).
 *
 * @method
 * @param {Object} inputs - The input parameter object.
 * @param {CubeDepthTexture} inputs.depthTexture - A reference to the shadow cube map.
 * @param {Node<vec3>} inputs.bd3D - The normalized direction from light to fragment.
 * @param {Node<float>} inputs.dp - The depth value to compare against.
 * @param {LightShadow} inputs.shadow - The light shadow.
 * @return {Node<float>} The filtering result.
 */
export const PointShadowFilter: () => void;
export default PointShadowNode;
export function pointShadow(light: PointLight, shadow?: PointLightShadow | null): PointShadowNode;
/**
 * Represents the shadow implementation for point light nodes.
 *
 * @augments ShadowNode
 */
declare class PointShadowNode extends ShadowNode {
    /**
     * Overwrites the default implementation to only use point light specific
     * shadow filter functions.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @param {Object} inputs - A configuration object that defines the shadow filtering.
     * @param {Function} inputs.filterFn - This function defines the filtering type of the shadow map e.g. PCF.
     * @param {DepthTexture} inputs.depthTexture - A reference to the shadow map's depth texture.
     * @param {Node<vec3>} inputs.shadowCoord - Shadow coordinates which are used to sample from the shadow map.
     * @param {LightShadow} inputs.shadow - The light shadow.
     * @return {Node<float>} The result node of the shadow filtering.
     */
    setupShadowFilter(builder: NodeBuilder, { filterFn, depthTexture, shadowCoord, shadow }: {
        filterFn: Function;
        depthTexture: DepthTexture;
        shadowCoord: Node<any>;
        shadow: LightShadow;
    }): Node<any>;
    /**
     * Overwrites the default implementation to create a CubeRenderTarget with CubeDepthTexture.
     *
     * @param {LightShadow} shadow - The light shadow object.
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @return {Object} An object containing the shadow map and depth texture.
     */
    setupRenderTarget(shadow: LightShadow, builder: NodeBuilder): Object;
}
import ShadowNode from './ShadowNode.js';
