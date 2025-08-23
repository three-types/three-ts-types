/**
 * Represents a "Color Burn" blend mode.
 *
 * It's designed to darken the base layer's colors based on the color of the blend layer.
 * It significantly increases the contrast of the base layer, making the colors more vibrant and saturated.
 * The darker the color in the blend layer, the stronger the darkening and contrast effect on the base layer.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} base - The base color.
 * @param {Node<vec3>} blend - The blend color. A white (#ffffff) blend color does not alter the base color.
 * @return {Node<vec3>} The result.
 */
export const blendBurn: any;
/**
 * Represents a "Color Dodge" blend mode.
 *
 * It's designed to lighten the base layer's colors based on the color of the blend layer.
 * It significantly increases the brightness of the base layer, making the colors lighter and more vibrant.
 * The brighter the color in the blend layer, the stronger the lightening and contrast effect on the base layer.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} base - The base color.
 * @param {Node<vec3>} blend - The blend color. A black (#000000) blend color does not alter the base color.
 * @return {Node<vec3>} The result.
 */
export const blendDodge: any;
/**
 * Represents a "Screen" blend mode.
 *
 * Similar to `blendDodge()`, this mode also lightens the base layer's colors based on the color of the blend layer.
 * The "Screen" blend mode is better for general brightening whereas the "Dodge" results in more subtle and nuanced
 * effects.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} base - The base color.
 * @param {Node<vec3>} blend - The blend color. A black (#000000) blend color does not alter the base color.
 * @return {Node<vec3>} The result.
 */
export const blendScreen: any;
/**
 * Represents a "Overlay" blend mode.
 *
 * It's designed to increase the contrast of the base layer based on the color of the blend layer.
 * It amplifies the existing colors and contrast in the base layer, making lighter areas lighter and darker areas darker.
 * The color of the blend layer significantly influences the resulting contrast and color shift in the base layer.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} base - The base color.
 * @param {Node<vec3>} blend - The blend color
 * @return {Node<vec3>} The result.
 */
export const blendOverlay: any;
/**
 * This function blends two color based on their alpha values by replicating the behavior of `THREE.NormalBlending`.
 * It assumes both input colors have non-premultiplied alpha.
 *
 * @tsl
 * @function
 * @param {Node<vec4>} base - The base color.
 * @param {Node<vec4>} blend - The blend color
 * @return {Node<vec4>} The result.
 */
export const blendColor: any;
/**
 * Premultiplies the RGB channels of a color by its alpha channel.
 *
 * This function is useful for converting a non-premultiplied alpha color
 * into a premultiplied alpha format, where the RGB values are scaled
 * by the alpha value. Premultiplied alpha is often used in graphics
 * rendering for certain operations, such as compositing and image processing.
 *
 * @tsl
 * @function
 * @param {Node<vec4>} color - The input color with non-premultiplied alpha.
 * @return {Node<vec4>} The color with premultiplied alpha.
 */
export const premultiplyAlpha: () => void;
/**
 * Unpremultiplies the RGB channels of a color by its alpha channel.
 *
 * This function is useful for converting a premultiplied alpha color
 * back into a non-premultiplied alpha format, where the RGB values are
 * divided by the alpha value. Unpremultiplied alpha is often used in graphics
 * rendering for certain operations, such as compositing and image processing.
 *
 * @tsl
 * @function
 * @param {Node<vec4>} color - The input color with premultiplied alpha.
 * @return {Node<vec4>} The color with non-premultiplied alpha.
 */
export const unpremultiplyAlpha: () => void;
export function burn(...params: any[]): Function;
export function dodge(...params: any[]): Function;
export function screen(...params: any[]): Function;
export function overlay(...params: any[]): Function;
