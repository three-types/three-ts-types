/**
 * A Color instance is represented by RGB components in the linear <i>working
 * color space</i>, which defaults to `LinearSRGBColorSpace`. Inputs
 * conventionally using `SRGBColorSpace` (such as hexadecimals and CSS
 * strings) are converted to the working color space automatically.
 *
 * ```js
 * // converted automatically from SRGBColorSpace to LinearSRGBColorSpace
 * const color = new THREE.Color().setHex( 0x112233 );
 * ```
 * Source color spaces may be specified explicitly, to ensure correct conversions.
 * ```js
 * // assumed already LinearSRGBColorSpace; no conversion
 * const color = new THREE.Color().setRGB( 0.5, 0.5, 0.5 );
 *
 * // converted explicitly from SRGBColorSpace to LinearSRGBColorSpace
 * const color = new THREE.Color().setRGB( 0.5, 0.5, 0.5, SRGBColorSpace );
 * ```
 * If THREE.ColorManagement is disabled, no conversions occur. For details,
 * see <i>Color management</i>. Iterating through a Color instance will yield
 * its components (r, g, b) in the corresponding order. A Color can be initialised
 * in any of the following ways:
 * ```js
 * //empty constructor - will default white
 * const color1 = new THREE.Color();
 *
 * //Hexadecimal color (recommended)
 * const color2 = new THREE.Color( 0xff0000 );
 *
 * //RGB string
 * const color3 = new THREE.Color("rgb(255, 0, 0)");
 * const color4 = new THREE.Color("rgb(100%, 0%, 0%)");
 *
 * //X11 color name - all 140 color names are supported.
 * //Note the lack of CamelCase in the name
 * const color5 = new THREE.Color( 'skyblue' );
 * //HSL string
 * const color6 = new THREE.Color("hsl(0, 100%, 50%)");
 *
 * //Separate RGB values between 0 and 1
 * const color7 = new THREE.Color( 1, 0, 0 );
 * ```
 */
export class Color {
    /**
     * Constructs a new color.
     *
     * Note that standard method of specifying color in three.js is with a hexadecimal triplet,
     * and that method is used throughout the rest of the documentation.
     *
     * @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are
     * not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.
     * @param {number} [g] - The green component.
     * @param {number} [b] - The blue component.
     */
    constructor(r?: (number | string | Color), g?: number, b?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isColor: boolean;
    /**
     * The red component.
     *
     * @type {number}
     * @default 1
     */
    r: number;
    /**
     * The green component.
     *
     * @type {number}
     * @default 1
     */
    g: number;
    /**
     * The blue component.
     *
     * @type {number}
     * @default 1
     */
    b: number;
    /**
     * Sets the colors's components from the given values.
     *
     * @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are
     * not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.
     * @param {number} [g] - The green component.
     * @param {number} [b] - The blue component.
     * @return {Color} A reference to this color.
     */
    set(r?: (number | string | Color), g?: number, b?: number): Color;
    /**
     * Sets the colors's components to the given scalar value.
     *
     * @param {number} scalar - The scalar value.
     * @return {Color} A reference to this color.
     */
    setScalar(scalar: number): Color;
    /**
     * Sets this color from a hexadecimal value.
     *
     * @param {number} hex - The hexadecimal value.
     * @param {string} [colorSpace=SRGBColorSpace] - The color space.
     * @return {Color} A reference to this color.
     */
    setHex(hex: number, colorSpace?: string): Color;
    /**
     * Sets this color from RGB values.
     *
     * @param {number} r - Red channel value between `0.0` and `1.0`.
     * @param {number} g - Green channel value between `0.0` and `1.0`.
     * @param {number} b - Blue channel value between `0.0` and `1.0`.
     * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
     * @return {Color} A reference to this color.
     */
    setRGB(r: number, g: number, b: number, colorSpace?: string): Color;
    /**
     * Sets this color from RGB values.
     *
     * @param {number} h - Hue value between `0.0` and `1.0`.
     * @param {number} s - Saturation value between `0.0` and `1.0`.
     * @param {number} l - Lightness value between `0.0` and `1.0`.
     * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
     * @return {Color} A reference to this color.
     */
    setHSL(h: number, s: number, l: number, colorSpace?: string): Color;
    /**
     * Sets this color from a CSS-style string. For example, `rgb(250, 0,0)`,
     * `rgb(100%, 0%, 0%)`, `hsl(0, 100%, 50%)`, `#ff0000`, `#f00`, or `red` ( or
     * any [X11 color name](https://en.wikipedia.org/wiki/X11_color_names#Color_name_chart) -
     * all 140 color names are supported).
     *
     * @param {string} style - Color as a CSS-style string.
     * @param {string} [colorSpace=SRGBColorSpace] - The color space.
     * @return {Color} A reference to this color.
     */
    setStyle(style: string, colorSpace?: string): Color;
    /**
     * Sets this color from a color name. Faster than {@link Color#setStyle} if
     * you don't need the other CSS-style formats.
     *
     * For convenience, the list of names is exposed in `Color.NAMES` as a hash.
     * ```js
     * Color.NAMES.aliceblue // returns 0xF0F8FF
     * ```
     *
     * @param {string} style - The color name.
     * @param {string} [colorSpace=SRGBColorSpace] - The color space.
     * @return {Color} A reference to this color.
     */
    setColorName(style: string, colorSpace?: string): Color;
    /**
     * Returns a new color with copied values from this instance.
     *
     * @return {Color} A clone of this instance.
     */
    clone(): Color;
    /**
     * Copies the values of the given color to this instance.
     *
     * @param {Color} color - The color to copy.
     * @return {Color} A reference to this color.
     */
    copy(color: Color): Color;
    /**
     * Copies the given color into this color, and then converts this color from
     * `SRGBColorSpace` to `LinearSRGBColorSpace`.
     *
     * @param {Color} color - The color to copy/convert.
     * @return {Color} A reference to this color.
     */
    copySRGBToLinear(color: Color): Color;
    /**
     * Copies the given color into this color, and then converts this color from
     * `LinearSRGBColorSpace` to `SRGBColorSpace`.
     *
     * @param {Color} color - The color to copy/convert.
     * @return {Color} A reference to this color.
     */
    copyLinearToSRGB(color: Color): Color;
    /**
     * Converts this color from `SRGBColorSpace` to `LinearSRGBColorSpace`.
     *
     * @return {Color} A reference to this color.
     */
    convertSRGBToLinear(): Color;
    /**
     * Converts this color from `LinearSRGBColorSpace` to `SRGBColorSpace`.
     *
     * @return {Color} A reference to this color.
     */
    convertLinearToSRGB(): Color;
    /**
     * Returns the hexadecimal value of this color.
     *
     * @param {string} [colorSpace=SRGBColorSpace] - The color space.
     * @return {number} The hexadecimal value.
     */
    getHex(colorSpace?: string): number;
    /**
     * Returns the hexadecimal value of this color as a string (for example, 'FFFFFF').
     *
     * @param {string} [colorSpace=SRGBColorSpace] - The color space.
     * @return {string} The hexadecimal value as a string.
     */
    getHexString(colorSpace?: string): string;
    /**
     * Converts the colors RGB values into the HSL format and stores them into the
     * given target object.
     *
     * @param {{h:number,s:number,l:number}} target - The target object that is used to store the method's result.
     * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
     * @return {{h:number,s:number,l:number}} The HSL representation of this color.
     */
    getHSL(target: {
        h: number;
        s: number;
        l: number;
    }, colorSpace?: string): {
        h: number;
        s: number;
        l: number;
    };
    /**
     * Returns the RGB values of this color and stores them into the given target object.
     *
     * @param {Color} target - The target color that is used to store the method's result.
     * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
     * @return {Color} The RGB representation of this color.
     */
    getRGB(target: Color, colorSpace?: string): Color;
    /**
     * Returns the value of this color as a CSS style string. Example: `rgb(255,0,0)`.
     *
     * @param {string} [colorSpace=SRGBColorSpace] - The color space.
     * @return {string} The CSS representation of this color.
     */
    getStyle(colorSpace?: string): string;
    /**
     * Adds the given HSL values to this color's values.
     * Internally, this converts the color's RGB values to HSL, adds HSL
     * and then converts the color back to RGB.
     *
     * @param {number} h - Hue value between `0.0` and `1.0`.
     * @param {number} s - Saturation value between `0.0` and `1.0`.
     * @param {number} l - Lightness value between `0.0` and `1.0`.
     * @return {Color} A reference to this color.
     */
    offsetHSL(h: number, s: number, l: number): Color;
    /**
     * Adds the RGB values of the given color to the RGB values of this color.
     *
     * @param {Color} color - The color to add.
     * @return {Color} A reference to this color.
     */
    add(color: Color): Color;
    /**
     * Adds the RGB values of the given colors and stores the result in this instance.
     *
     * @param {Color} color1 - The first color.
     * @param {Color} color2 - The second color.
     * @return {Color} A reference to this color.
     */
    addColors(color1: Color, color2: Color): Color;
    /**
     * Adds the given scalar value to the RGB values of this color.
     *
     * @param {number} s - The scalar to add.
     * @return {Color} A reference to this color.
     */
    addScalar(s: number): Color;
    /**
     * Subtracts the RGB values of the given color from the RGB values of this color.
     *
     * @param {Color} color - The color to subtract.
     * @return {Color} A reference to this color.
     */
    sub(color: Color): Color;
    /**
     * Multiplies the RGB values of the given color with the RGB values of this color.
     *
     * @param {Color} color - The color to multiply.
     * @return {Color} A reference to this color.
     */
    multiply(color: Color): Color;
    /**
     * Multiplies the given scalar value with the RGB values of this color.
     *
     * @param {number} s - The scalar to multiply.
     * @return {Color} A reference to this color.
     */
    multiplyScalar(s: number): Color;
    /**
     * Linearly interpolates this color's RGB values toward the RGB values of the
     * given color. The alpha argument can be thought of as the ratio between
     * the two colors, where `0.0` is this color and `1.0` is the first argument.
     *
     * @param {Color} color - The color to converge on.
     * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
     * @return {Color} A reference to this color.
     */
    lerp(color: Color, alpha: number): Color;
    /**
     * Linearly interpolates between the given colors and stores the result in this instance.
     * The alpha argument can be thought of as the ratio between the two colors, where `0.0`
     * is the first and `1.0` is the second color.
     *
     * @param {Color} color1 - The first color.
     * @param {Color} color2 - The second color.
     * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
     * @return {Color} A reference to this color.
     */
    lerpColors(color1: Color, color2: Color, alpha: number): Color;
    /**
     * Linearly interpolates this color's HSL values toward the HSL values of the
     * given color. It differs from {@link Color#lerp} by not interpolating straight
     * from one color to the other, but instead going through all the hues in between
     * those two colors. The alpha argument can be thought of as the ratio between
     * the two colors, where 0.0 is this color and 1.0 is the first argument.
     *
     * @param {Color} color - The color to converge on.
     * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
     * @return {Color} A reference to this color.
     */
    lerpHSL(color: Color, alpha: number): Color;
    /**
     * Sets the color's RGB components from the given 3D vector.
     *
     * @param {Vector3} v - The vector to set.
     * @return {Color} A reference to this color.
     */
    setFromVector3(v: Vector3): Color;
    /**
     * Transforms this color with the given 3x3 matrix.
     *
     * @param {Matrix3} m - The matrix.
     * @return {Color} A reference to this color.
     */
    applyMatrix3(m: Matrix3): Color;
    /**
     * Returns `true` if this color is equal with the given one.
     *
     * @param {Color} c - The color to test for equality.
     * @return {boolean} Whether this bounding color is equal with the given one.
     */
    equals(c: Color): boolean;
    /**
     * Sets this color's RGB components from the given array.
     *
     * @param {Array<number>} array - An array holding the RGB values.
     * @param {number} [offset=0] - The offset into the array.
     * @return {Color} A reference to this color.
     */
    fromArray(array: Array<number>, offset?: number): Color;
    /**
     * Writes the RGB components of this color to the given array. If no array is provided,
     * the method returns a new instance.
     *
     * @param {Array<number>} [array=[]] - The target array holding the color components.
     * @param {number} [offset=0] - Index of the first element in the array.
     * @return {Array<number>} The color components.
     */
    toArray(array?: Array<number>, offset?: number): Array<number>;
    /**
     * Sets the components of this color from the given buffer attribute.
     *
     * @param {BufferAttribute} attribute - The buffer attribute holding color data.
     * @param {number} index - The index into the attribute.
     * @return {Color} A reference to this color.
     */
    fromBufferAttribute(attribute: BufferAttribute, index: number): Color;
    /**
     * This methods defines the serialization result of this class. Returns the color
     * as a hexadecimal value.
     *
     * @return {number} The hexadecimal value.
     */
    toJSON(): number;
    [Symbol.iterator](): Generator<number, void, unknown>;
}
export namespace Color {
    export { _colorKeywords as NAMES };
}
declare namespace _colorKeywords {
    let aliceblue: number;
    let antiquewhite: number;
    let aqua: number;
    let aquamarine: number;
    let azure: number;
    let beige: number;
    let bisque: number;
    let black: number;
    let blanchedalmond: number;
    let blue: number;
    let blueviolet: number;
    let brown: number;
    let burlywood: number;
    let cadetblue: number;
    let chartreuse: number;
    let chocolate: number;
    let coral: number;
    let cornflowerblue: number;
    let cornsilk: number;
    let crimson: number;
    let cyan: number;
    let darkblue: number;
    let darkcyan: number;
    let darkgoldenrod: number;
    let darkgray: number;
    let darkgreen: number;
    let darkgrey: number;
    let darkkhaki: number;
    let darkmagenta: number;
    let darkolivegreen: number;
    let darkorange: number;
    let darkorchid: number;
    let darkred: number;
    let darksalmon: number;
    let darkseagreen: number;
    let darkslateblue: number;
    let darkslategray: number;
    let darkslategrey: number;
    let darkturquoise: number;
    let darkviolet: number;
    let deeppink: number;
    let deepskyblue: number;
    let dimgray: number;
    let dimgrey: number;
    let dodgerblue: number;
    let firebrick: number;
    let floralwhite: number;
    let forestgreen: number;
    let fuchsia: number;
    let gainsboro: number;
    let ghostwhite: number;
    let gold: number;
    let goldenrod: number;
    let gray: number;
    let green: number;
    let greenyellow: number;
    let grey: number;
    let honeydew: number;
    let hotpink: number;
    let indianred: number;
    let indigo: number;
    let ivory: number;
    let khaki: number;
    let lavender: number;
    let lavenderblush: number;
    let lawngreen: number;
    let lemonchiffon: number;
    let lightblue: number;
    let lightcoral: number;
    let lightcyan: number;
    let lightgoldenrodyellow: number;
    let lightgray: number;
    let lightgreen: number;
    let lightgrey: number;
    let lightpink: number;
    let lightsalmon: number;
    let lightseagreen: number;
    let lightskyblue: number;
    let lightslategray: number;
    let lightslategrey: number;
    let lightsteelblue: number;
    let lightyellow: number;
    let lime: number;
    let limegreen: number;
    let linen: number;
    let magenta: number;
    let maroon: number;
    let mediumaquamarine: number;
    let mediumblue: number;
    let mediumorchid: number;
    let mediumpurple: number;
    let mediumseagreen: number;
    let mediumslateblue: number;
    let mediumspringgreen: number;
    let mediumturquoise: number;
    let mediumvioletred: number;
    let midnightblue: number;
    let mintcream: number;
    let mistyrose: number;
    let moccasin: number;
    let navajowhite: number;
    let navy: number;
    let oldlace: number;
    let olive: number;
    let olivedrab: number;
    let orange: number;
    let orangered: number;
    let orchid: number;
    let palegoldenrod: number;
    let palegreen: number;
    let paleturquoise: number;
    let palevioletred: number;
    let papayawhip: number;
    let peachpuff: number;
    let peru: number;
    let pink: number;
    let plum: number;
    let powderblue: number;
    let purple: number;
    let rebeccapurple: number;
    let red: number;
    let rosybrown: number;
    let royalblue: number;
    let saddlebrown: number;
    let salmon: number;
    let sandybrown: number;
    let seagreen: number;
    let seashell: number;
    let sienna: number;
    let silver: number;
    let skyblue: number;
    let slateblue: number;
    let slategray: number;
    let slategrey: number;
    let snow: number;
    let springgreen: number;
    let steelblue: number;
    let tan: number;
    let teal: number;
    let thistle: number;
    let tomato: number;
    let turquoise: number;
    let violet: number;
    let wheat: number;
    let white: number;
    let whitesmoke: number;
    let yellow: number;
    let yellowgreen: number;
}
export {};
