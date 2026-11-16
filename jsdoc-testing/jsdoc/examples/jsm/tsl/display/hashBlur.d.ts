/**
 * Applies a hash blur effect to the given texture node.
 *
 * The approach of this blur is different compared to Gaussian and box blur since
 * it does not rely on a kernel to apply a convolution. Instead, it reads the base
 * texture multiple times in a random pattern and then averages the samples. A
 * typical artifact of this technique is a slightly noisy appearance of the blur which
 * can be mitigated by increasing the number of iterations (see `repeats` parameter).
 * Compared to Gaussian blur, hash blur requires just a single pass.
 *
 * Reference: {@link https://www.shadertoy.com/view/4lXXWn}.
 *
 * @tsl
 * @function
 * @param {Node<vec4>} textureNode - The texture node that should be blurred.
 * @param {Node<float>} [bluramount=float(0.1)] - This node determines the amount of blur.
 * @param {Object} [options={}] - Additional options for the hash blur effect.
 * @param {Node<float>} [options.repeats=float(45)] - The number of iterations for the blur effect.
 * @param {boolean} [options.premultipliedAlpha=false] - Whether to use premultiplied alpha for the blur effect.
 * @return {Node<vec4>} The blurred texture node.
 */
export const hashBlur: () => void;
