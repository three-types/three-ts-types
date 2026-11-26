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
 * TSL object that represents the shading normal of the current rendered object in view space.
 * In the fragment stage, the value is the material's `normalNode` if set, otherwise the
 * normal with the material's normal or bump mapping applied, flipped on back faces
 * (`MeshBasicNodeMaterial` always uses the vertex normal). Use {@link normalViewGeometry}
 * for the unperturbed vertex normal.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const normalView: Node<any>;
/**
 * TSL object that represents the shading normal of the current rendered object in world space.
 * It is derived from {@link normalView}, so it includes normal or bump mapping. Use
 * {@link normalWorldGeometry} for the unperturbed vertex normal.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const normalWorld: Node<any>;
/**
 * TSL object that represents the clearcoat normal of the current rendered object in view space.
 * In the fragment stage, the value includes the material's `clearcoatNormalMap` (or `clearcoatNormalNode`).
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const clearcoatNormalView: Node<any>;
/**
 * Transforms the normal by the normal matrix of the given matrix and then normalizes the result.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} normal - The normal.
 * @param {Node<mat3|mat4>} [matrix=modelWorldMatrix] - The matrix.
 * @return {Node<vec3>} The transformed normal.
 */
export const transformNormal: () => void;
/**
 * Transforms the given normal from local to view space.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} normal - The normal.
 * @return {Node<vec3>} The transformed normal.
 */
export const transformNormalToView: () => void;
