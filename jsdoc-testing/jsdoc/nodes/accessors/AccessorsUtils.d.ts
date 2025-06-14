/**
 * TSL object that represents the TBN matrix in view space.
 *
 * @tsl
 * @type {Node<mat3>}
 */
export const TBNViewMatrix: Node<any>;
/**
 * TSL object that represents the parallax direction.
 *
 * @tsl
 * @type {Node<mat3>}
 */
export const parallaxDirection: Node<any>;
export function parallaxUV(uv: Node<vec2>, scale: Node<vec2>): Node<vec2>;
/**
 * TSL function for computing bent normals.
 *
 * @tsl
 * @function
 * @returns {Node<vec3>} Bent normals.
 */
export const transformedBentNormalView: any;
