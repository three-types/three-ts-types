/**
 * ~Options
 */
export type Water = {
    /**
     * - The texture width. A higher value results in more clear reflections but is also more expensive.
     */
    textureWidth?: number | undefined;
    /**
     * - The texture height. A higher value results in more clear reflections but is also more expensive.
     */
    textureHeight?: number | undefined;
    /**
     * - The clip bias.
     */
    clipBias?: number | undefined;
    /**
     * - The alpha value.
     */
    alpha?: number | undefined;
    /**
     * - The time value.
     */
    time?: number | undefined;
    /**
     * - The water's normal map.
     */
    waterNormals?: Texture | null;
    /**
     * - The sun direction.
     */
    sunDirection?: Vector3 | undefined;
    /**
     * - The sun color.
     */
    sunColor?: string | number | Color | undefined;
    /**
     * - The water color.
     */
    waterColor?: string | number | Color | undefined;
    /**
     * - The eye vector.
     */
    eye?: Vector3 | undefined;
    /**
     * - The distortion scale.
     */
    distortionScale?: number | undefined;
    /**
     * - The water material's `side` property.
     */
    side?: (number | BackSide | DoubleSide);
    /**
     * - Whether the water should be affected by fog or not.
     */
    fog?: boolean | undefined;
};
import { Vector3 } from 'three';
import { Color } from 'three';
/**
 * A basic flat, reflective water effect.
 *
 * Note that this class can only be used with {@link WebGLRenderer}.
 * When using {@link WebGPURenderer}, use {@link WaterMesh}.
 *
 * References:
 *
 * - [Flat mirror for three.js](https://github.com/Slayvin)
 * - [An implementation of water shader based on the flat mirror](https://home.adelphi.edu/~stemkoski/)
 * - [Water shader explanations in WebGL](http://29a.ch/slides/2012/webglwater/ )
 *
 * @augments Mesh
 * @three_import import { Water } from 'three/addons/objects/Water.js';
 */
export class Water extends Mesh {
    /**
     * Constructs a new water instance.
     *
     * @param {BufferGeometry} geometry - The water's geometry.
     * @param {Water~Options} [options] - The configuration options.
     */
    constructor(geometry: BufferGeometry, options?: {});
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isWater: boolean;
}
import { Mesh } from 'three';
