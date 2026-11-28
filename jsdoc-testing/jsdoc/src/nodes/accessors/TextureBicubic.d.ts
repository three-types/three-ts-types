/**
 * Applies mipped bicubic texture filtering to the given texture node.
 *
 * @tsl
 * @function
 * @param {TextureNode} textureNode - The texture node that should be filtered. It must define
 * an explicit uv node, e.g. `texture( map, uv() )`.
 * @param {Node<float>} lodNode - Defines the LOD to sample from.
 * @return {Node} The filtered texture sample.
 */
export const textureBicubicLevel: () => void;
/**
 * Applies mipped bicubic texture filtering to the given texture node.
 *
 * @tsl
 * @function
 * @param {TextureNode} textureNode - The texture node that should be filtered. It must define
 * an explicit uv node, e.g. `texture( map, uv() )`.
 * @param {Node<float>} strength - The LOD to sample from, as a fraction in the range `[0, 1]` of the
 * texture's max mip level (`0` samples the base level).
 * @return {Node} The filtered texture sample.
 */
export const textureBicubic: () => void;
