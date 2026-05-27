/**
 * Constructs a new range factor node.
 *
 * @tsl
 * @function
 * @param {Node} near - Defines the near value.
 * @param {Node} far - Defines the far value.
 */
export const rangeFogFactor: () => void;
/**
 * Represents an exponential squared fog. This type of fog gives
 * a clear view near the camera and a faster than exponentially
 * densening fog farther from the camera.
 *
 * @tsl
 * @function
 * @param {Node} density - Defines the fog density.
 */
export const densityFogFactor: () => void;
/**
 * Constructs a new height fog factor node. This fog factor requires a Y-up coordinate system.
 *
 * @tsl
 * @function
 * @param {Node} density - Defines the fog density.
 * @param {Node} height - The height threshold in world space. Everything below this y-coordinate is affected by fog.
 */
export const exponentialHeightFogFactor: () => void;
/**
 * This class can be used to configure a fog for the scene.
 * Nodes of this type are assigned to `Scene.fogNode`.
 *
 * @tsl
 * @function
 * @param {Node} color - Defines the color of the fog.
 * @param {Node} factor - Defines how the fog is factored in the scene.
 */
export const fog: () => void;
