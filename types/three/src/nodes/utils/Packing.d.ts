import { Vector2 } from "../../math/Vector2.js";
import { Vector3 } from "../../math/Vector3.js";
import Node from "../core/Node.js";

/**
 * Packs a normal vector into a color value.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} node - The direction to pack.
 * @return {Node<vec3>} The color.
 */
export const packNormalToRGB: (node: Node<"vec3"> | Vector3) => Node<"vec3">;

/**
 * Unpacks a color value into a normal vector.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} node - The color to unpack.
 * @return {Node<vec3>} The direction.
 */
export const unpackRGBToNormal: (node: Node<"vec3"> | Node<"vec4"> | Vector3) => Node<"vec3">;

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
export const packNormalToOctahedral: (normal: Node<"vec3"> | Vector3) => Node<"vec2">;

/**
 * Decodes signed octahedral coordinates into a unit direction.
 *
 * @tsl
 * @function
 * @param {Node<vec2>} encoded - The signed octahedral coordinates in `[-1, 1]`.
 * @return {Node<vec3>} The normalized direction.
 */
export const unpackOctahedralToNormal: (encoded: Node<"vec2"> | Vector2) => Node<"vec3">;

/**
 * Unpacks a tangent space normal, reconstructing the Z component by projecting the X,Y coordinates onto the hemisphere.
 * The X,Y coordinates are expected to be in the [-1, 1] range.
 *
 * @tsl
 * @function
 * @param {Node<vec2>} xy - The X,Y coordinates of the normal.
 * @return {Node<vec3>} The resulting normal.
 */
export const unpackNormal: (xy: Node<"vec2"> | Vector2) => Node<"vec3">;

/**
 * @tsl
 * @function
 * @deprecated since r185. Use {@link packNormalToRGB} instead.
 * @param {Node<vec3>} node - The direction to pack.
 * @returns {Node<vec3>}
 */
export const directionToColor: (node: Node<"vec3"> | Vector3) => Node<"vec3">;

/**
 * @tsl
 * @function
 * @deprecated since r185. Use {@link unpackRGBToNormal} instead.
 * @param {Node<vec3>} node - The color to unpack.
 * @returns {Node<vec3>}
 */
export const colorToDirection: (node: Node<"vec3"> | Node<"vec4"> | Vector3) => Node<"vec3">;
