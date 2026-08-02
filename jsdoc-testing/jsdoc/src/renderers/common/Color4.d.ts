export default Color4;
/**
 * A four-component version of {@link Color} which is internally
 * used by the renderer to represents clear color with alpha as
 * one object.
 *
 * @private
 * @augments Color
 */
declare class Color4 extends Color {
    /**
     * Constructs a new four-component color.
     * You can also pass a single THREE.Color, hex or
     * string argument to this constructor.
     *
     * @param {number|string} [r=1] - The red value.
     * @param {number} [g=1] - The green value.
     * @param {number} [b=1] - The blue value.
     * @param {number} [a=1] - The alpha value.
     */
    constructor(r?: number | string, g?: number, b?: number, a?: number);
    a: number;
    /**
     * Overwrites the default to honor alpha.
     * You can also pass a single THREE.Color, hex or
     * string argument to this method.
     *
     * @param {number|string|Color} r - The red value.
     * @param {number} [g] - The green value.
     * @param {number} [b] - The blue value.
     * @param {number} [a=1] - The alpha value.
     * @return {Color4} A reference to this object.
     */
    set(r: number | string | Color, g?: number, b?: number, a?: number): Color4;
    /**
     * Overwrites the default to honor alpha.
     *
     * @param {Color4} color - The color to copy.
     * @return {Color4} A reference to this object.
     */
    copy(color: Color4): Color4;
    /**
     * Overwrites the default to honor alpha.
     *
     * @return {Color4} The cloned color.
     */
    clone(): Color4;
}
import { Color } from '../../math/Color.js';
