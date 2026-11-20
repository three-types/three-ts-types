/**
 * TSL object that represents the bitangent attribute of the current rendered object.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const bitangentGeometry: Node<vec3>;
/**
 * TSL object that represents the vertex bitangent in local space of the current rendered object.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const bitangentLocal: Node<vec3>;
/**
 * TSL object that represents the bitangent in view space of the current rendered object.
 * In the fragment stage, it is derived from the shading normal {@link normalView}, so it
 * follows normal or bump mapping.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const bitangentView: Node<vec3>;
/**
 * TSL object that represents the bitangent in world space of the current rendered object.
 * In the fragment stage, it is derived from the shading normal {@link normalWorld}, so it
 * follows normal or bump mapping.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const bitangentWorld: Node<vec3>;
