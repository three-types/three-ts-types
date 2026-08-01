/**
 * TSL object that represents the refraction ratio of the material used for rendering the current object.
 *
 * @tsl
 * @type {UniformNode<float>}
 */
export const materialRefractionRatio: UniformNode<float>;
/**
 * TSL object that represents the intensity of environment maps of PBR materials.
 * When `material.envMap` is set, the value is `material.envMapIntensity` otherwise `scene.environmentIntensity`.
 *
 * @tsl
 * @type {Node<float>}
 */
export const materialEnvIntensity: Node<float>;
/**
 * TSL object that represents the rotation of environment maps.
 * When `material.envMap` is set, the value is `material.envMapRotation`. `scene.environmentRotation` controls the
 * rotation of `scene.environment` instead.
 *
 * @tsl
 * @type {Node<mat4>}
 */
export const materialEnvRotation: Node<mat4>;
