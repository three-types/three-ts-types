/**
 * Creates barrel-distorted UV coordinates.
 * The center of the screen appears to bulge outward (convex distortion).
 *
 * @tsl
 * @function
 * @param {Node<float>} [curvature=0.1] - The amount of curvature (0 = flat, 0.5 = very curved).
 * @param {Node<vec2>} [coord=uv()] - The input UV coordinates.
 * @return {Node<vec2>} The distorted UV coordinates.
 */
export const barrelUV: () => void;
/**
 * Checks if UV coordinates are inside the valid 0-1 range.
 * Useful for masking areas inside the distorted screen.
 *
 * @tsl
 * @function
 * @param {Node<vec2>} coord - The UV coordinates to check.
 * @return {Node<float>} 1.0 if inside bounds, 0.0 if outside.
 */
export const barrelMask: () => void;
/**
 * Applies color bleeding effect to simulate horizontal color smearing.
 * Simulates the analog signal bleeding in CRT displays where colors
 * "leak" into adjacent pixels horizontally.
 *
 * @tsl
 * @function
 * @param {Node} color - The input texture node.
 * @param {Node<float>} [amount=0.002] - The amount of color bleeding (0-0.01).
 * @return {Node<vec3>} The color with bleeding effect applied.
 */
export const colorBleeding: () => void;
/**
 * Applies scanline effect to simulate CRT monitor horizontal lines with animation.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} color - The input color.
 * @param {Node<float>} [intensity=0.3] - The intensity of the scanlines (0-1).
 * @param {Node<float>} [count=240] - The number of scanlines (typically matches vertical resolution).
 * @param {Node<float>} [speed=0.0] - The scroll speed of scanlines (0 = static, 1 = normal CRT roll).
 * @param {Node<vec2>} [coord=uv()] - The UV coordinates to use for scanlines.
 * @return {Node<vec3>} The color with scanlines applied.
 */
export const scanlines: () => void;
/**
 * Applies vignette effect to darken the edges of the screen.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} color - The input color.
 * @param {Node<float>} [intensity=0.4] - The intensity of the vignette (0-1).
 * @param {Node<float>} [smoothness=0.5] - The smoothness of the vignette falloff.
 * @param {Node<vec2>} [coord=uv()] - The UV coordinates to use for vignette calculation.
 * @return {Node<vec3>} The color with vignette applied.
 */
export const vignette: () => void;
