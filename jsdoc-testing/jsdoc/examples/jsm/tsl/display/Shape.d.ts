/**
 * Returns a radial gradient from center (white) to edges (black).
 * Useful for masking effects based on distance from center.
 *
 * @tsl
 * @function
 * @param {Node<float>} [scale=1.0] - Controls the size of the gradient (0 = all black, 1 = full circle).
 * @param {Node<float>} [softness=0.5] - Controls the edge softness (0 = hard edge, 1 = soft gradient).
 * @param {Node<vec2>} [coord=uv()] - The input UV coordinates.
 * @return {Node<float>} 1.0 at center, 0.0 at edges.
 */
export const circle: () => void;
