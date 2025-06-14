/**
 * TSL object that represents the position attribute of the current rendered object.
 *
 * @tsl
 * @type {AttributeNode<vec3>}
 */
export const positionGeometry: AttributeNode<vec3>;
/**
 * TSL object that represents the vertex position in local space of the current rendered object.
 *
 * @tsl
 * @type {AttributeNode<vec3>}
 */
export const positionLocal: AttributeNode<vec3>;
/**
 * TSL object that represents the previous vertex position in local space of the current rendered object.
 * Used in context of {@link VelocityNode} for rendering motion vectors.
 *
 * @tsl
 * @type {AttributeNode<vec3>}
 */
export const positionPrevious: AttributeNode<vec3>;
/**
 * TSL object that represents the vertex position in world space of the current rendered object.
 *
 * @tsl
 * @type {VaryingNode<vec3>}
 */
export const positionWorld: VaryingNode<vec3>;
/**
 * TSL object that represents the position world direction of the current rendered object.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const positionWorldDirection: Node<vec3>;
/**
 * TSL object that represents the vertex position in view space of the current rendered object.
 *
 * @tsl
 * @type {VaryingNode<vec3>}
 */
export const positionView: VaryingNode<vec3>;
/**
 * TSL object that represents the position view direction of the current rendered object.
 *
 * @tsl
 * @type {VaryingNode<vec3>}
 */
export const positionViewDirection: VaryingNode<vec3>;
