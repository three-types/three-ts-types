/**
 * This TSL function can be used to sample a Bayer16 texture which is a 16x16 texture with a Bayer Matrix pattern.
 * It can be used for dithering effects but also as an alternative to blue-noise. When used with Ray Marching
 * specifically in {@link VolumeNodeMaterial#offsetNode}, it reduces banding problem, thus being able to use
 * fewer steps without affecting the visuals as much.
 *
 * @tsl
 * @function
 * @param {Node<vec2>} uv - The uv to sample the bayer16 texture.
 * @return {Node<vec4>} The sampled bayer value.
 */
export const bayer16: () => void;
/**
 * This TSL function applies Bayer dithering to a color input. It uses a 4x4 Bayer matrix
 * pattern to add structured noise before color quantization, which helps reduce visible
 * color banding when limiting color depth.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} color - The input color to apply dithering to.
 * @param {Node<float>} [steps=32] - The number of color steps per channel.
 * @return {Node<vec3>} The dithered color ready for quantization.
 *
 * @example
 * // Apply dithering with posterize
 * const ditheredColor = bayerDither( inputColor, 32 );
 * const finalColor = posterize( ditheredColor, 32 );
 */
export const bayerDither: () => void;
