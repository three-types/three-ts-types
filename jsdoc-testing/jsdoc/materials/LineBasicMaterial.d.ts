/**
 * A material for rendering line primitives.
 *
 * Materials define the appearance of renderable 3D objects.
 *
 * ```js
 * const material = new THREE.LineBasicMaterial( { color: 0xffffff } );
 * ```
 *
 * @augments Material
 */
export class LineBasicMaterial extends Material {
    /**
     * Constructs a new line basic material.
     *
     * @param {Object} [parameters] - An object with one or more properties
     * defining the material's appearance. Any property of the material
     * (including any property from inherited materials) can be passed
     * in here. Color values can be passed any type of value accepted
     * by {@link Color#set}.
     */
    constructor(parameters?: Object);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLineBasicMaterial: boolean;
    type: string;
    /**
     * Color of the material.
     *
     * @type {Color}
     * @default (1,1,1)
     */
    color: Color;
    /**
     * Sets the color of the lines using data from a texture. The texture map
     * color is modulated by the diffuse `color`.
     *
     * @type {?Texture}
     * @default null
     */
    map: Texture | null;
    /**
     * Controls line thickness or lines.
     *
     * Can only be used with {@link SVGRenderer}. WebGL and WebGPU
     * ignore this setting and always render line primitives with a
     * width of one pixel.
     *
     * @type {number}
     * @default 1
     */
    linewidth: number;
    /**
     * Defines appearance of line ends.
     *
     * Can only be used with {@link SVGRenderer}.
     *
     * @type {('butt'|'round'|'square')}
     * @default 'round'
     */
    linecap: ("butt" | "round" | "square");
    /**
     * Defines appearance of line joints.
     *
     * Can only be used with {@link SVGRenderer}.
     *
     * @type {('round'|'bevel'|'miter')}
     * @default 'round'
     */
    linejoin: ("round" | "bevel" | "miter");
    /**
     * Whether the material is affected by fog or not.
     *
     * @type {boolean}
     * @default true
     */
    fog: boolean;
    copy(source: any): this;
}
import { Material } from './Material.js';
import { Color } from '../math/Color.js';
