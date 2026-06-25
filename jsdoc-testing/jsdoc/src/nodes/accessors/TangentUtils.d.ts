/**
 * Tangent vector in view space, computed dynamically from geometry and UV derivatives.
 * Useful for normal mapping without precomputed tangents.
 *
 * Reference: http://www.thetenthplanet.de/archives/1180
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const tangentViewFrame: Node<vec3>;
/**
 * Bitangent vector in view space, computed dynamically from geometry and UV derivatives.
 * Complements the tangentViewFrame for constructing the tangent space basis.
 *
 * Reference: http://www.thetenthplanet.de/archives/1180
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const bitangentViewFrame: Node<vec3>;
