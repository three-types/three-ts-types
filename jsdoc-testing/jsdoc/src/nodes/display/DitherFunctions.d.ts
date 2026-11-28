/**
 * Adds a small amount of screen-space noise to the given color to remove
 * the appearance of banding. The noise is in the range of ±0.5/255 and should
 * be applied to the final color right before it is written to an 8-bit target.
 *
 * Based on Iestyn's RGB dither from {@link https://alex.vlachos.com/graphics/Alex_Vlachos_Advanced_VR_Rendering_GDC2015.pdf}.
 *
 * @tsl
 * @function
 * @param {Node<vec4>} color - The input color.
 * @return {Node<vec4>} The dithered color.
 */
export const dither: () => void;
