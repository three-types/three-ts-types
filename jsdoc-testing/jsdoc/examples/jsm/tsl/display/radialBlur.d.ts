/**
 * This TSL function blurs an image in a circular pattern, radiating from a configurable center point in screen space.
 *
 * Radial blurs can be used for different kind of effects like producing simple faked lighting effects also known as
 * "light shafts". The major limitation of this specific usage is the center point can only be defined in 2D so the
 * effect does not honor the depth of 3D objects. Consequently, it is not intended for physically correct lit scenes.
 *
 * @tsl
 * @function
 * @param {Node<vec4>} textureNode - The texture node that should be blurred.
 * @param {Object} [options={}] - Additional options for the radial blur effect.
 * @param {Node<vec2>} [options.center=vec2(0.5, 0.5)] - The center of the light in screen uvs.
 * @param {Node<int>} [options.weight=float(0.9)] - Base weight factor for each sample in the range `[0,1]`.
 * @param {Node<int>} [options.decay=float(0.95)] - Decreases the weight factor so each iteration adds less to the sum. Must be in the range `[0,1]`.
 * If you increase the sample count, you have to increase this option as well to avoid a darking effect.
 * @param {Node<int>} [options.count=int(32)] - The number if iterations. Should be in the range `[16,64]`.
 * @param {Node<int>} [options.exposure=float(5)] - Exposure control of the blur.
 * @return {Node<vec4>} The blurred texture node.
 */
export const radialBlur: () => void;
