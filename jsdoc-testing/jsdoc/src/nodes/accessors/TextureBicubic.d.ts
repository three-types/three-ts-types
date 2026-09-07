/**
 * Applies mipped bicubic texture filtering to the given texture node.
 *
 * @tsl
 * @function
 * @param {TextureNode} textureNode - The texture node that should be filtered.
 * @param {Node<float>} lodNode - Defines the LOD to sample from.
 * @return {Node} The filtered texture sample.
 */
export const textureBicubicLevel: () => void;
/**
 * Applies mipped bicubic texture filtering to the given texture node.
 *
 * @tsl
 * @function
 * @param {TextureNode} textureNode - The texture node that should be filtered.
 * @param {Node<float>} [strength] - Defines the strength of the bicubic filtering.
 * @return {Node} The filtered texture sample.
 */
export const textureBicubic: () => void;
