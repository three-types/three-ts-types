/**
 * A shadow filtering function performing basic filtering. This is in fact an unfiltered version of the shadow map
 * with a binary `[0,1]` result.
 *
 * @method
 * @param {Object} inputs - The input parameter object.
 * @param {DepthTexture} inputs.depthTexture - A reference to the shadow map's texture data.
 * @param {Node<vec3>} inputs.shadowCoord - The shadow coordinates.
 * @return {Node<float>} The filtering result.
 */
export const BasicShadowFilter: () => void;
/**
 * A shadow filtering function performing PCF filtering with Vogel disk sampling and IGN.
 *
 * Uses 5 samples distributed via Vogel disk pattern, rotated per-pixel using Interleaved
 * Gradient Noise (IGN) to break up banding artifacts. Combined with hardware PCF (4-tap
 * filtering per sample), this effectively provides 20 filtered taps with better distribution.
 *
 * @method
 * @param {Object} inputs - The input parameter object.
 * @param {DepthTexture} inputs.depthTexture - A reference to the shadow map's texture data.
 * @param {Node<vec3>} inputs.shadowCoord - The shadow coordinates.
 * @param {LightShadow} inputs.shadow - The light shadow.
 * @return {Node<float>} The filtering result.
 */
export const PCFShadowFilter: () => void;
/**
 * A shadow filtering function performing PCF soft filtering.
 *
 * @method
 * @param {Object} inputs - The input parameter object.
 * @param {DepthTexture} inputs.depthTexture - A reference to the shadow map's texture data.
 * @param {Node<vec3>} inputs.shadowCoord - The shadow coordinates.
 * @param {LightShadow} inputs.shadow - The light shadow.
 * @return {Node<float>} The filtering result.
 */
export const PCFSoftShadowFilter: () => void;
/**
 * A shadow filtering function performing VSM filtering.
 *
 * @method
 * @param {Object} inputs - The input parameter object.
 * @param {DepthTexture} inputs.depthTexture - A reference to the shadow map's texture data.
 * @param {Node<vec3>} inputs.shadowCoord - The shadow coordinates.
 * @return {Node<float>} The filtering result.
 */
export const VSMShadowFilter: () => void;
export function getShadowMaterial(light: Light): NodeMaterial;
export function disposeShadowMaterial(light: Light): void;
import NodeMaterial from '../../materials/nodes/NodeMaterial.js';
