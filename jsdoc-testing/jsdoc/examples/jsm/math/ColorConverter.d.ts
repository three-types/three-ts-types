/**
 * A utility class with helper functions for color conversion.
 *
 * @hideconstructor
 * @three_import import { ColorConverter } from 'three/addons/math/ColorConverter.js';
 */
export class ColorConverter {
    /**
     * Sets the given HSV color definition to the given color object.
     *
     * @param {Color} color - The color to set.
     * @param {number} h - The hue.
     * @param {number} s - The saturation.
     * @param {number} v - The value.
     * @return {Color} The update color.
     */
    static setHSV(color: Color, h: number, s: number, v: number): Color;
    /**
     * Returns a HSV color representation of the given color object.
     *
     * @param {Color} color - The color to get HSV values from.
     * @param {{h:number,s:number,v:number}} target - The target object that is used to store the method's result.
     * @return {{h:number,s:number,v:number}} The HSV color.
     */
    static getHSV(color: Color, target: {
        h: number;
        s: number;
        v: number;
    }): {
        h: number;
        s: number;
        v: number;
    };
}
