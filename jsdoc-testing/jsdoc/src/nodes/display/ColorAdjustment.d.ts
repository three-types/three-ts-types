/**
 * Computes a grayscale value for the given RGB color value.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} color - The color value to compute the grayscale for.
 * @return {Node<vec3>} The grayscale color.
 */
export const grayscale: () => void;
/**
 * Super-saturates or desaturates the given RGB color.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} color - The input color.
 * @param {Node<float>} [adjustment=1] - Specifies the amount of the conversion. A value under `1` desaturates the color, a value over `1` super-saturates it.
 * @return {Node<vec3>} The saturated color.
 */
export const saturation: () => void;
/**
 * Selectively enhance the intensity of less saturated RGB colors. Can result
 * in a more natural and visually appealing image with enhanced color depth
 * compared to {@link ColorAdjustment#saturation}.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} color - The input color.
 * @param {Node<float>} [adjustment=1] - Controls the intensity of the vibrance effect.
 * @return {Node<vec3>} The updated color.
 */
export const vibrance: () => void;
/**
 * Updates the hue component of the given RGB color while preserving its luminance and saturation.
 *
 * @tsl
 * @function
 * @param {Node<vec3>} color - The input color.
 * @param {Node<float>} [adjustment=1] - Defines the degree of hue rotation in radians. A positive value rotates the hue clockwise, while a negative value rotates it counterclockwise.
 * @return {Node<vec3>} The updated color.
 */
export const hue: () => void;
export function luminance(color: Node<any>, luminanceCoefficients?: Node<any> | null): Node<any>;
/**
 * Color Decision List (CDL) v1.2
 *
 * Compact representation of color grading information, defined by slope, offset, power, and
 * saturation. The CDL should be typically be given input in a log space (such as LogC, ACEScc,
 * or AgX Log), and will return output in the same space. Output may require clamping >=0.
 *
 * @tsl
 * @function
 * @param {Node<vec4>} color Input (-Infinity < input < +Infinity)
 * @param {Node<vec3>} slope Slope (0 ≤ slope < +Infinity)
 * @param {Node<vec3>} offset Offset (-Infinity < offset < +Infinity; typically -1 < offset < 1)
 * @param {Node<vec3>} power Power (0 < power < +Infinity)
 * @param {Node<float>} saturation Saturation (0 ≤ saturation < +Infinity; typically 0 ≤ saturation < 4)
 * @param {Node<vec3>} luminanceCoefficients Luminance coefficients for saturation term, typically Rec. 709
 * @return {Node<vec4>} Output, -Infinity < output < +Infinity
 *
 * References:
 * - ASC CDL v1.2
 * - {@link https://blender.stackexchange.com/a/55239/43930}
 * - {@link https://docs.acescentral.com/specifications/acescc/}
 */
export const cdl: () => void;
/**
 * TSL function for creating a posterize effect which reduces the number of colors
 * in an image, resulting in a more blocky and stylized appearance.
 *
 * @tsl
 * @function
 * @param {Node} sourceNode - The input color.
 * @param {Node} stepsNode - Controls the intensity of the posterization effect. A lower number results in a more blocky appearance.
 * @returns {Node} The posterized color.
 */
export const posterize: () => void;
