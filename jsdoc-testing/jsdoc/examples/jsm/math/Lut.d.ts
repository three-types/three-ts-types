/**
 * Represents a lookup table for colormaps. It is used to determine the color
 * values from a range of data values.
 *
 * ```js
 * const lut = new Lut( 'rainbow', 512 );
 * const color = lut.getColor( 0.5 );
 * ```
 *
 * @three_import import { Lut } from 'three/addons/math/Lut.js';
 */
export class Lut {
    /**
     * Constructs a new Lut.
     *
     * @param {('rainbow'|'cooltowarm'|'blackbody'|'grayscale')} [colormap='rainbow'] - Sets a colormap from predefined list of colormaps.
     * @param {number} [count=32] - Sets the number of colors used to represent the data array.
     */
    constructor(colormap?: ("rainbow" | "cooltowarm" | "blackbody" | "grayscale"), count?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLut: boolean;
    /**
     * The lookup table for the selected color map
     *
     * @type {Array<Color>}
     */
    lut: Array<Color>;
    /**
     * The currently selected color map.
     *
     * @type {Array<Array<number>>}
     */
    map: Array<Array<number>>;
    /**
     * The number of colors of the current selected color map.
     *
     * @type {number}
     * @default 32
     */
    n: number;
    /**
     * The minimum value to be represented with the lookup table.
     *
     * @type {number}
     * @default 0
     */
    minV: number;
    /**
     * The maximum value to be represented with the lookup table.
     *
     * @type {number}
     * @default 1
     */
    maxV: number;
    /**
     * Sets the given LUT.
     *
     * @param {Lut} value - The LUT to set.
     * @return {Lut} A reference to this LUT.
     */
    set(value: Lut): Lut;
    /**
     * Sets the minimum value to be represented with this LUT.
     *
     * @param {number} min - The minimum value to be represented with the lookup table.
     * @return {Lut} A reference to this LUT.
     */
    setMin(min: number): Lut;
    /**
     * Sets the maximum value to be represented with this LUT.
     *
     * @param {number} max - The maximum value to be represented with the lookup table.
     * @return {Lut} A reference to this LUT.
     */
    setMax(max: number): Lut;
    /**
     * Configure the lookup table for the given color map and number of colors.
     *
     * @param {string} colormap - The name of the color map.
     * @param {number} [count=32] - The number of colors.
     * @return {Lut} A reference to this LUT.
     */
    setColorMap(colormap: string, count?: number): Lut;
    /**
     * Copies the given lut.
     *
     * @param {Lut} lut - The LUT to copy.
     * @return {Lut} A reference to this LUT.
     */
    copy(lut: Lut): Lut;
    /**
     * Returns an instance of Color for the given data value.
     *
     * @param {number} alpha - The value to lookup.
     * @return {Color} The color from the LUT.
     */
    getColor(alpha: number): Color;
    /**
     * Adds a color map to this Lut instance.
     *
     * @param {string} name - The name of the color map.
     * @param {Array<Array<number>>} arrayOfColors - An array of color values. Each value is an array
     * holding a threshold and the actual color value as a hexadecimal number.
     * @return {Lut} A reference to this LUT.
     */
    addColorMap(name: string, arrayOfColors: Array<Array<number>>): Lut;
    /**
     * Creates a canvas in order to visualize the lookup table as a texture.
     *
     * @return {HTMLCanvasElement} The created canvas.
     */
    createCanvas(): HTMLCanvasElement;
    /**
     * Updates the given canvas with the Lut's data.
     *
     * @param {HTMLCanvasElement} canvas - The canvas to update.
     * @return {HTMLCanvasElement} The updated canvas.
     */
    updateCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement;
}
export namespace ColorMapKeywords {
    let rainbow: number[][];
    let cooltowarm: number[][];
    let blackbody: number[][];
    let grayscale: number[][];
}
import { Color } from 'three';
