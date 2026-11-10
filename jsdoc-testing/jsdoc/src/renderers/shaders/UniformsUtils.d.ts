/**
 * Provides utility functions for managing uniforms.
 *
 * @module UniformsUtils
 */
/**
 * Clones the given uniform definitions by performing a deep-copy. That means
 * if the value of a uniform refers to an object like a Vector3 or Texture,
 * the cloned uniform will refer to a new object reference.
 *
 * @param {Object} src - An object representing uniform definitions.
 * @return {Object} The cloned uniforms.
 */
export function cloneUniforms(src: Object): Object;
/**
 * Merges the given uniform definitions into a single object. Since the
 * method internally uses cloneUniforms(), it performs a deep-copy when
 * producing the merged uniform definitions.
 *
 * @param {Array} uniforms - An array of objects containing uniform definitions.
 * @return {Object} The merged uniforms.
 */
export function mergeUniforms(uniforms: any[]): Object;
export function cloneUniformsGroups(src: any): any[];
export function getUnlitUniformColorSpace(renderer: any): any;
export namespace UniformsUtils {
    export { cloneUniforms as clone };
    export { mergeUniforms as merge };
}
