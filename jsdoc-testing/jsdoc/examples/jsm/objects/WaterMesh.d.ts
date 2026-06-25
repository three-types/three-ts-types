/**
 * ~Options
 */
export type WaterMesh = {
    /**
     * - The resolution scale.
     */
    resolutionScale?: number | undefined;
    /**
     * - The water's normal map.
     */
    waterNormals?: Texture | null;
    /**
     * - The alpha value.
     */
    alpha?: number | undefined;
    /**
     * - The size value.
     */
    size?: number | undefined;
    /**
     * - The sun color.
     */
    sunColor?: string | number | Color | undefined;
    /**
     * - The sun direction.
     */
    sunDirection?: Vector3 | undefined;
    /**
     * - The water color.
     */
    waterColor?: string | number | Color | undefined;
    /**
     * - The distortion scale.
     */
    distortionScale?: number | undefined;
};
import { Color } from 'three/webgpu';
import { Vector3 } from 'three/webgpu';
/**
 * A basic flat, reflective water effect.
 *
 * Note that this class can only be used with {@link WebGPURenderer}.
 * When using {@link WebGLRenderer}, use {@link Water}.
 *
 * References:
 *
 * - [Flat mirror for three.js](https://github.com/Slayvin)
 * - [An implementation of water shader based on the flat mirror](https://home.adelphi.edu/~stemkoski/)
 * - [Water shader explanations in WebGL](http://29a.ch/slides/2012/webglwater/ )
 *
 * @augments Mesh
 * @three_import import { WaterMesh } from 'three/addons/objects/WaterMesh.js';
 */
export class WaterMesh extends Mesh {
    /**
     * Constructs a new water mesh.
     *
     * @param {BufferGeometry} geometry - The water mesh's geometry.
     * @param {WaterMesh~Options} [options] - The configuration options.
     */
    constructor(geometry: BufferGeometry, options: any);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isWaterMesh: boolean;
    /**
     * The effect's resolution scale.
     *
     * @type {number}
     * @default 0.5
     */
    resolutionScale: number;
    /**
     * The water's normal map.
     *
     * @type {TextureNode}
     */
    waterNormals: TextureNode;
    /**
     * The alpha value.
     *
     * @type {UniformNode<float>}
     * @default 1
     */
    alpha: UniformNode<any>;
    /**
     * The size value.
     *
     * @type {UniformNode<float>}
     * @default 1
     */
    size: UniformNode<any>;
    /**
     * The sun color.
     *
     * @type {UniformNode<color>}
     * @default 0xffffff
     */
    sunColor: UniformNode<color>;
    /**
     * The sun direction.
     *
     * @type {UniformNode<vec3>}
     * @default (0.70707,0.70707,0.0)
     */
    sunDirection: UniformNode<vec3>;
    /**
     * The water color.
     *
     * @type {UniformNode<color>}
     * @default 0x7f7f7f
     */
    waterColor: UniformNode<color>;
    /**
     * The distortion scale.
     *
     * @type {UniformNode<float>}
     * @default 20
     */
    distortionScale: UniformNode<any>;
}
import { Mesh } from 'three/webgpu';
