/**
 * Replaces the default UV coordinates used in texture lookups.
 *
 * ```js
 *material.contextNode = replaceDefaultUV( ( textureNode ) => {
 *
 *	// ...
 *	return customUVCoordinates;
 *
 *} );
 *```
 *
 * @tsl
 * @function
 * @param {function(Node):Node<vec2>|Node<vec2>} callback - A callback that receives the texture node
 * and must return the new uv coordinates.
 * @param {Node} [node=null] - An optional node to which the context will be applied.
 * @return {ContextNode} A context node that replaces the default UV coordinates.
 */
export function replaceDefaultUV(callback: (arg0: Node) => Node<any> | Node<any>, node?: Node): ContextNode;
/**
 * Rotates the given uv coordinates around a center point
 *
 * @tsl
 * @function
 * @param {Node<vec2>} uv - The uv coordinates.
 * @param {Node<float>} rotation - The rotation defined in radians.
 * @param {Node<vec2>} center - The center of rotation
 * @return {Node<vec2>} The rotated uv coordinates.
 */
export const rotateUV: () => void;
/**
 * Applies a spherical warping effect to the given uv coordinates.
 *
 * @tsl
 * @function
 * @param {Node<vec2>} uv - The uv coordinates.
 * @param {Node<float>} strength - The strength of the effect.
 * @param {Node<vec2>} center - The center point
 * @return {Node<vec2>} The updated uv coordinates.
 */
export const spherizeUV: () => void;
