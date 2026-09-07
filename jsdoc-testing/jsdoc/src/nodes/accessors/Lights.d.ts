/**
 * TSL function for getting a shadow matrix uniform node for the given light.
 *
 * @tsl
 * @function
 * @param {Light} light -The light source.
 * @returns {UniformNode<mat4>} The shadow matrix uniform node.
 */
export function lightShadowMatrix(light: Light): UniformNode<mat4>;
/**
 * TSL function for getting projected uv coordinates for the given light.
 * Relevant when using maps with spot lights.
 *
 * @tsl
 * @function
 * @param {Light} light -The light source.
 * @param {Node<vec3>} [position=positionWorld] -The position to project.
 * @returns {Node<vec3>} The projected uvs.
 */
export function lightProjectionUV(light: Light, position?: Node<vec3>): Node<vec3>;
/**
 * TSL function for getting the position in world space for the given light.
 *
 * @tsl
 * @function
 * @param {Light} light -The light source.
 * @returns {UniformNode<vec3>} The light's position in world space.
 */
export function lightPosition(light: Light): UniformNode<vec3>;
/**
 * TSL function for getting the light target position in world space for the given light.
 *
 * @tsl
 * @function
 * @param {Light} light -The light source.
 * @returns {UniformNode<vec3>} The light target position in world space.
 */
export function lightTargetPosition(light: Light): UniformNode<vec3>;
/**
 * TSL function for getting the position in view space for the given light.
 *
 * @tsl
 * @function
 * @param {Light} light - The light source.
 * @returns {UniformNode<vec3>} The light's position in view space.
 */
export function lightViewPosition(light: Light): UniformNode<vec3>;
export function lightTargetDirection(light: Light): Node<vec3>;
