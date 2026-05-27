/**
 * Performs a depth-aware blend between a base scene and a secondary effect (like godrays).
 * This function uses a Poisson disk sampling pattern to detect depth discontinuities
 * in the neighborhood of the current pixel. If an edge is detected, it shifts the
 * sampling coordinate for the blend node away from the edge to prevent light leaking/haloing.
 *
 * @param {Node} baseNode - The main scene/beauty pass texture node.
 * @param {Node} blendNode - The effect to be blended (e.g., Godrays, Bloom).
 * @param {Node} depthNode - The scene depth texture node.
 * @param {Camera} camera - The camera used for the scene.
 * @param {Object} [options={}] - Configuration for the blend effect.
 * @param {Node|Color} [options.blendColor=Color(0xff0000)] - The color applied to the blend node.
 * @param {Node<int> | number} [options.edgeRadius=2] - The search radius (in pixels) for detecting depth edges.
 * @param {Node<float> | number} [options.edgeStrength=2] - How far to "push" the UV away from detected edges.
 * @returns {Node<vec4>} The resulting blended color node.
 */
export const depthAwareBlend: () => void;
