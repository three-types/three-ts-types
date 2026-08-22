/**
 * Applies a box blur effect to the given texture node.
 *
 * Compared to Gaussian blur, box blur produces a more blocky result but with better performance when correctly
 * configured. It is intended for mobile devices or performance restricted use cases where Gaussian is too heavy.
 *
 * The (kernel) `size` parameter should be small (1, 2 or 3) since it determines the number of samples based on (size * 2 + 1)^2.
 * This implementation uses a single pass approach so the kernel is not applied as a separable filter. That means larger
 * kernels won't perform well. Use Gaussian instead if you need a more high-quality blur.
 *
 * To produce wider blurs, increase the `separation` parameter instead which has no influence on the performance.
 *
 * Reference: {@link https://github.com/lettier/3d-game-shaders-for-beginners/blob/master/demonstration/shaders/fragment/box-blur.frag}.
 *
 * @tsl
 * @function
 * @param {Node<vec4>} textureNode - The texture node that should be blurred.
 * @param {Object} [options={}] - Additional options for the hash blur effect.
 * @param {Node<int>} [options.size=int(1)] - Controls the blur's kernel. For performant results, the range should within [1, 3].
 * @param {Node<int>} [options.separation=int(1)] - Spreads out the blur without having to sample additional fragments. Ranges from [1, Infinity].
 * @param {boolean} [options.premultipliedAlpha=false] - Whether to use premultiplied alpha for the blur effect.
 * @return {Node<vec4>} The blurred texture node.
 */
export const boxBlur: () => void;
