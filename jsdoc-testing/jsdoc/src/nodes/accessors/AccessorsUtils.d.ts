/**
 * TSL object that represents the TBN matrix in view space.
 *
 * @tsl
 * @type {Node<mat3>}
 */
export const TBNViewMatrix: Node<any>;
/**
 * TSL object that represents the parallax direction, which is the surface-to-camera
 * direction in tangent space.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const parallaxDirection: Node<vec3>;
export function parallaxUV(uv: Node<vec2>, scale: Node<vec2>): Node<vec2>;
/**
 * TSL object that represents the bent normal in view space, used for
 * anisotropic image-based lighting.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const bentNormalView: Node<vec3>;
