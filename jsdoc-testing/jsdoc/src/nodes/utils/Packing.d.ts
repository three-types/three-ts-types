export function packNormalToRGB(node: Node<any>): Node<any>;
export function unpackRGBToNormal(node: Node<any>): Node<any>;
/**
 * Encodes a nonzero direction as signed octahedral coordinates in `[-1, 1]`
 * (Cigolle et al., {@link https://jcgt.org/published/0003/02/01/ A Survey of Efficient Representations for Independent Unit Vectors}, 2014).
 * Store the result in a signed two-channel format such as RG16F or RG16 snorm. The input does not need to be normalized.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} normal - The nonzero direction to encode.
 * @return {Node<vec2>} The signed octahedral coordinates.
 */
export const packNormalToOctahedral: () => void;
/**
 * Decodes signed octahedral coordinates into a unit direction.
 *
 * @tsl
 * @function
 * @param {Node<vec2>} encoded - The signed octahedral coordinates in `[-1, 1]`.
 * @return {Node<vec3>} The normalized direction.
 */
export const unpackOctahedralToNormal: () => void;
export function unpackNormal(xy: Node<any>): Node<any>;
export function directionToColor(node: Node<any>): Node<any>;
export function colorToDirection(node: Node<any>): Node<any>;
