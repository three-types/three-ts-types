/**
 * Replaces every visible, shadow-casting `SunLight` in the scene with a
 * directional light fitted to the shadow casters. SunLight shadow cascades are
 * fitted to the active camera every render, which the frozen shadow maps of a
 * bake cannot provide.
 *
 * @param {Scene} scene - The scene to bake.
 * @return {?Array<Object>} The replacements to pass to {@link restoreSunLights}, or `null` if the scene has no such lights.
 */
export function replaceSunLights(scene: Scene): Array<Object> | null;
/**
 * Restores the sun lights replaced by {@link replaceSunLights}.
 *
 * @param {Scene} scene - The baked scene.
 * @param {Array<Object>} replacements - The replacements to undo.
 */
export function restoreSunLights(scene: Scene, replacements: Array<Object>): void;
