/**
 * TSL object that represents the normal attribute of the current rendered object in local space.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const normalGeometry: Node<any>;
/**
 * TSL object that represents the vertex normal of the current rendered object in local space.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const normalLocal: Node<any>;
/**
 * TSL object that represents the flat vertex normal of the current rendered object in view space.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const normalFlat: Node<any>;
/**
 * TSL object that represents the vertex normal of the current rendered object in view space.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const normalViewGeometry: Node<any>;
/**
 * TSL object that represents the vertex normal of the current rendered object in world space.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const normalWorldGeometry: Node<any>;
/**
 * TSL object that represents the vertex normal of the current rendered object in view space.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const normalView: Node<any>;
/**
 * TSL object that represents the vertex normal of the current rendered object in world space.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const normalWorld: Node<any>;
/**
 * TSL object that represents the clearcoat vertex normal of the current rendered object in view space.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const clearcoatNormalView: Node<any>;
/**
 * Transforms the normal with the given matrix.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} normal - The normal.
 * @param {Node<mat3>} [matrix=modelWorldMatrix] - The matrix.
 * @return {Node<vec3>} The transformed normal.
 */
export const transformNormal: () => void;
/**
 * Transforms the given normal from local to view space.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} normal - The normal.
 * @param {NodeBuilder} builder - The current node builder.
 * @return {Node<vec3>} The transformed normal.
 */
export const transformNormalToView: () => void;
/**
 * TSL object that represents the transformed vertex normal of the current rendered object in view space.
 *
 * @tsl
 * @type {Node<vec3>}
 * @deprecated since r178. Use `normalView` instead.
 */
export const transformedNormalView: Node<any>;
/**
 * TSL object that represents the transformed vertex normal of the current rendered object in world space.
 *
 * @tsl
 * @type {Node<vec3>}
 * @deprecated since r178. Use `normalWorld` instead.
 */
export const transformedNormalWorld: Node<any>;
/**
 * TSL object that represents the transformed clearcoat vertex normal of the current rendered object in view space.
 *
 * @tsl
 * @type {Node<vec3>}
 * @deprecated since r178. Use `clearcoatNormalView` instead.
 */
export const transformedClearcoatNormalView: Node<any>;
