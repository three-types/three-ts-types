/**
 * TSL object that represents the clip space position of the current rendered object.
 *
 * @tsl
 * @type {VaryingNode<vec4>}
 */
export const clipSpace: VaryingNode<any>;
/**
 * TSL object that represents the position attribute of the current rendered object.
 *
 * @tsl
 * @type {AttributeNode<vec3>}
 */
export const positionGeometry: AttributeNode<any>;
/**
 * TSL object that represents the transformed vertex position in local space of the current rendered object.
 *
 * The term "transformed" indicates that an object or material's properties, such as skinning, batch,
 * instancing, or displacement mapping, will change the vertex position of the node when present.
 * To use the pre-transformed local space position of the object, use {@link positionGeometry}.
 *
 * @tsl
 * @type {AttributeNode<vec3>}
 */
export const positionLocal: AttributeNode<any>;
/**
 * TSL object that represents the previous vertex position in local space of the current rendered object.
 * Used in context of {@link VelocityNode} for rendering motion vectors.
 *
 * @tsl
 * @type {AttributeNode<vec3>}
 */
export const positionPrevious: AttributeNode<any>;
/**
 * TSL object that represents the vertex position in world space of the current rendered object.
 *
 * @tsl
 * @type {VaryingNode<vec3>}
 */
export const positionWorld: VaryingNode<any>;
/**
 * TSL object that represents the normalized direction from the origin of the current rendered
 * object to the vertex in world space. The rotation and scale of the world matrix are applied,
 * the translation is ignored.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const positionWorldDirection: Node<any>;
/**
 * TSL object that represents the vertex position in view space of the current rendered object.
 *
 * @tsl
 * @type {VaryingNode<vec3>}
 */
export const positionView: VaryingNode<any>;
/**
 * TSL object that represents the normalized direction from the fragment toward the camera
 * in view space. For orthographic cameras, the value is `( 0, 0, 1 )`.
 *
 * @tsl
 * @type {VaryingNode<vec3>}
 */
export const positionViewDirection: VaryingNode<any>;
