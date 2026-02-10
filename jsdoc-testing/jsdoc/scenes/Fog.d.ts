/**
 * This class can be used to define a linear fog that grows linearly denser
 * with the distance.
 *
 * ```js
 * const scene = new THREE.Scene();
 * scene.fog = new THREE.Fog( 0xcccccc, 10, 15 );
 * ```
 */
export class Fog {
    /**
     * Constructs a new fog.
     *
     * @param {number|Color} color - The fog's color.
     * @param {number} [near=1] - The minimum distance to start applying fog.
     * @param {number} [far=1000] - The maximum distance at which fog stops being calculated and applied.
     */
    constructor(color: number | Color, near?: number, far?: number);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isFog: boolean;
    /**
     * The name of the fog.
     *
     * @type {string}
     */
    name: string;
    /**
     * The fog's color.
     *
     * @type {Color}
     */
    color: Color;
    /**
     * The minimum distance to start applying fog. Objects that are less than
     * `near` units from the active camera won't be affected by fog.
     *
     * @type {number}
     * @default 1
     */
    near: number;
    /**
     * The maximum distance at which fog stops being calculated and applied.
     * Objects that are more than `far` units away from the active camera won't
     * be affected by fog.
     *
     * @type {number}
     * @default 1000
     */
    far: number;
    /**
     * Returns a new fog with copied values from this instance.
     *
     * @return {Fog} A clone of this instance.
     */
    clone(): Fog;
    /**
     * Serializes the fog into JSON.
     *
     * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
     * @return {Object} A JSON object representing the serialized fog
     */
    toJSON(): Object;
}
import { Color } from '../math/Color.js';
