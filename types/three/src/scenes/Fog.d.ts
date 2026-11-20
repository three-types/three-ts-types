import { Color, ColorRepresentation } from "../math/Color.js";

export interface FogJSON {
    type: string;
    name: string;
    color: number;
    near: number;
    far: number;
}

/**
 * This class can be used to define a range fog that smoothly grows denser
 * from no fog at `near` to full fog at `far`. The distance is measured as
 * depth along the camera's view direction.
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
     * @param {number} [far=1000] - The distance at which fog reaches full density.
     */
    constructor(color: ColorRepresentation, near?: number, far?: number);
    /**
     * This flag can be used for type testing.
     *
     * @default true
     */
    readonly isFog: boolean;
    /**
     * The name of the fog.
     */
    name: string;
    /**
     * The fog's color.
     */
    color: Color;
    /**
     * The minimum distance to start applying fog. Objects that are less than
     * `near` units from the active camera won't be affected by fog.
     *
     * @default 1
     */
    near: number;
    /**
     * The distance at which fog reaches full density. Objects that are more
     * than `far` units away from the active camera are rendered entirely in
     * the fog color.
     *
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
    toJSON(): FogJSON;
}
