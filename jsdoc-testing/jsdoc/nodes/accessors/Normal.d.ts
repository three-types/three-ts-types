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
export function transformNormal(...params: any[]): any;
export namespace transformNormal { }
export function transformNormal(...params: any[]): any;
export namespace transformNormal { }
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
