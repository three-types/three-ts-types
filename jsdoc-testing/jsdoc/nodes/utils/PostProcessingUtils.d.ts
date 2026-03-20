/**
 * Computes a position in view space based on a fragment's screen position expressed as uv coordinates, the fragments
 * depth value and the camera's inverse projection matrix.
 *
 * @tsl
 * @function
 * @param {Node<vec2>} screenPosition - The fragment's screen position expressed as uv coordinates.
 * @param {Node<float>} depth - The fragment's depth value.
 * @param {Node<mat4>} projectionMatrixInverse - The camera's inverse projection matrix.
 * @return {Node<vec3>} The fragments position in view space.
 */
export const getViewPosition: () => void;
/**
 * Computes a screen position expressed as uv coordinates based on a fragment's position in view space
 * and the camera's projection matrix
 *
 * @tsl
 * @function
 * @param {Node<vec3>} viewPosition - The fragments position in view space.
 * @param {Node<mat4>} projectionMatrix - The camera's projection matrix.
 * @return {Node<vec2>} The fragment's screen position expressed as uv coordinates.
 */
export const getScreenPosition: () => void;
/**
 * Computes a normal vector based on depth data. Can be used as a fallback when no normal render
 * target is available or if flat surface normals are required.
 *
 * @tsl
 * @function
 * @param {Node<vec2>} uv - The texture coordinate.
 * @param {DepthTexture} depthTexture - The depth texture.
 * @param {Node<mat4>} projectionMatrixInverse - The camera's inverse projection matrix.
 * @return {Node<vec3>} The computed normal vector.
 */
export const getNormalFromDepth: () => void;
/**
 * Interleaved Gradient Noise (IGN) from Jimenez 2014.
 *
 * IGN has "low discrepancy" resulting in evenly distributed samples. It's superior compared to
 * default white noise, blue noise or Bayer.
 *
 * References:
 * - {@link https://www.iryoku.com/next-generation-post-processing-in-call-of-duty-advanced-warfare/}
 * - {@link https://blog.demofox.org/2022/01/01/interleaved-gradient-noise-a-different-kind-of-low-discrepancy-sequence/}
 *
 * @tsl
 * @function
 * @param {Node<vec2>} position - The input position, usually screen coordinates.
 * @return {Node<float>} The noise value.
 */
export const interleavedGradientNoise: any;
/**
 * Vogel disk sampling for uniform circular distribution.
 *
 * This function generates sample points distributed uniformly on a disk using the golden angle,
 * resulting in an efficient low-discrepancy sequence for sampling. The rotation parameter (phi)
 * allows randomizing the pattern per-pixel when combined with IGN.
 *
 * @tsl
 * @function
 * @param {Node<int>} sampleIndex - The index of the current sample (0-based).
 * @param {Node<int>} samplesCount - The total number of samples.
 * @param {Node<float>} phi - Rotation angle in radians (typically from IGN * 2π).
 * @return {Node<vec2>} A 2D point on the unit disk.
 */
export const vogelDiskSample: any;
