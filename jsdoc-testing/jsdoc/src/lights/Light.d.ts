/**
 * Abstract base class for lights - all other light types inherit the
 * properties and methods described here.
 *
 * @abstract
 * @augments Object3D
 */
export class Light extends Object3D {
    /**
     * Constructs a new light.
     *
     * @param {(number|Color|string)} [color=0xffffff] - The light's color.
     * @param {number} [intensity=1] - The light's strength/intensity.
     */
    constructor(color?: (number | Color | string), intensity?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isLight: boolean;
    type: string;
    /**
     * The light's color.
     *
     * @type {Color}
     */
    color: Color;
    /**
     * The light's intensity.
     *
     * @type {number}
     * @default 1
     */
    intensity: number;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     */
    dispose(): void;
    copy(source: any, recursive: any): this;
    toJSON(meta: any): Object;
}
import { Object3D } from '../core/Object3D.js';
import { Color } from '../math/Color.js';
