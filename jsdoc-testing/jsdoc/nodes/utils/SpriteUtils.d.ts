/**
 * This can be used to achieve a billboarding behavior for flat meshes. That means they are
 * oriented always towards the camera.
 *
 * ```js
 * material.vertexNode = billboarding();
 * ```
 *
 * @tsl
 * @function
 * @param {Object} config - The configuration object.
 * @param {?Node<vec3>} [config.position=null] - Can be used to define the vertex positions in world space.
 * @param {boolean} [config.horizontal=true] - Whether to follow the camera rotation horizontally or not.
 * @param {boolean} [config.vertical=false] - Whether to follow the camera rotation vertically or not.
 * @return {Node<vec3>} The updated vertex position in clip space.
 */
export const billboarding: () => void;
