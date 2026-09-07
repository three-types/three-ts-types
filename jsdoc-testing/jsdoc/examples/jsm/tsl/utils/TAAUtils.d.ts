/**
 * Computes a sequence of Halton(2, 3) jitter offsets in the range [0, 1].
 *
 * @private
 * @function
 * @param {number} length - The number of offsets.
 * @return {Array<Array<number>>} The jitter offsets.
 */
export function computeHaltonOffsets(length: number): Array<Array<number>>;
/**
 * Optimized version of AABB clipping.
 *
 * Reference: {@link https://github.com/playdeadgames/temporal}
 *
 * @tsl
 * @private
 * @function
 * @param {Node<vec4>} currentColor - The current color.
 * @param {Node<vec4>} historyColor - The history color.
 * @param {Node<vec4>} minColor - The minimum color of the AABB.
 * @param {Node<vec4>} maxColor - The maximum color of the AABB.
 * @return {Node<vec4>} The clipped history color.
 */
export const clipAABB: any;
/**
 * Blends the current and history color with a flicker reduction based on luminance weighing.
 *
 * @tsl
 * @private
 * @function
 * @param {Node<vec4>} currentColor - The current color.
 * @param {Node<vec4>} historyColor - The history color.
 * @param {Node<float>} currentWeight - The weight of the current color.
 * @return {Node<vec4>} The blended color.
 */
export const flickerReduction: any;
/**
 * Samples the 3×3 neighborhood of the given texel position in the depth buffer and returns
 * the closest depth, its texel position and the farthest depth. Reversed and logarithmic depth
 * values are converted to perspective depth.
 *
 * @tsl
 * @private
 * @function
 * @param {TextureNode} depthNode - The depth buffer.
 * @param {Node<vec2>} positionTexel - The texel position.
 * @param {Node<vec2>} cameraNearFar - The camera's near and far.
 * @return {Node<struct>} A struct with the members `closestDepth`, `closestPositionTexel` and `farthestDepth`.
 */
export const sampleCurrentDepth: () => void;
/**
 * Samples the previous depth buffer and reprojects the depth into the current view.
 *
 * @tsl
 * @private
 * @function
 * @param {TextureNode} previousDepthNode - The previous depth buffer.
 * @param {Node<vec2>} uv - The uv coordinates.
 * @param {Node<mat4>} previousCameraProjectionMatrixInverse - The previous camera projection matrix inverse.
 * @param {Node<mat4>} previousCameraWorldMatrix - The previous camera world matrix.
 * @param {Node<mat4>} cameraWorldMatrixInverse - The current camera world matrix inverse.
 * @param {Node<vec2>} cameraNearFar - The camera's near and far.
 * @param {Camera} camera - The camera.
 * @return {Node<float>} The reprojected depth.
 */
export const samplePreviousDepth: () => void;
