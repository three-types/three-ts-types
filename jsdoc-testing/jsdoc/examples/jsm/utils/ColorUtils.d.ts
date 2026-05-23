/**
 * @module ColorUtils
 * @three_import import * as ColorUtils from 'three/addons/utils/ColorUtils.js';
 */
/**
 * Sets the given color from a color temperature in Kelvin.
 *
 * Converts a correlated color temperature (CTT) to an approximate sRGB color
 * using Tanner Helland's algorithm. Useful for physically-based lighting
 * setups — e.g. candle flame (~1900K), tungsten bulb (~3200K), daylight
 * (~6500K), or clear blue sky (~10000K). Values outside [1000, 40000] are
 * clamped.
 *
 * Reference: https://tannerhelland.com/2012/09/18/convert-temperature-rgb-algorithm-code.html
 *
 * @param {Color} color - The color to set.
 * @param {number} kelvin - Color temperature in Kelvin. Clamped to [1000, 40000].
 * @return {Color} The updated color.
 */
export function setKelvin(color: Color, kelvin: number): Color;
