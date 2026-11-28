/**
 * Permutation polynomial for noise generation.
 *
 * @tsl
 * @function
 * @param {Node<vec4>} x - Input vector.
 * @return {Node<vec4>} Permuted vector.
 */
export const permute: () => void;
/**
 * 3D Simplex noise implementation in TSL.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} v - Input coordinate vector.
 * @return {Node<float>} Simplex noise value.
 */
export const snoise: () => void;
/**
 * 3D Simplex noise vector. Returns a vec3 containing three independent noise samples.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} x - Input coordinate vector.
 * @return {Node<vec3>} Vector of three noise values.
 */
export const snoiseVec3: () => void;
/**
 * 3D Curl noise in TSL. Generates a divergence-free vector field from simplex noise.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} p - Input coordinate vector.
 * @return {Node<vec3>} Curl noise vector.
 */
export const curlNoise: () => void;
