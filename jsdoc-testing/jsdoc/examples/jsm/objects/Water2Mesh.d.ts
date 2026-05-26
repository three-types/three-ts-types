/**
 * :Water2Mesh~Options
 */
export type module = {
    /**
     * - The water color.
     */
    color?: string | number | Color | undefined;
    /**
     * - The water's flow direction.
     */
    flowDirection?: Vector2 | undefined;
    /**
     * - The water's flow speed.
     */
    flowSpeed?: number | undefined;
    /**
     * - The water's reflectivity.
     */
    reflectivity?: number | undefined;
    /**
     * - The water's scale.
     */
    scale?: number | undefined;
    /**
     * - The flow map. If no flow map is assigned, the water flow is defined by `flowDirection`.
     */
    flowMap?: Texture | null;
    /**
     * - The first water normal map.
     */
    normalMap0: Texture;
    /**
     * - The second water normal map.
     */
    normalMap1: Texture;
};
/** @module Water2Mesh */
/**
 * An advanced water effect that supports reflections, refractions and flow maps.
 *
 * Note that this class can only be used with {@link WebGPURenderer}.
 * When using {@link WebGLRenderer}, use {@link module:Water2}.
 *
 * References:
 *
 * - {@link https://alex.vlachos.com/graphics/Vlachos-SIGGRAPH10-WaterFlow.pdf}
 * - {@link http://graphicsrunner.blogspot.de/2010/08/water-using-flow-maps.html}
 *
 * @augments Mesh
 * @three_import import { WaterMesh } from 'three/addons/objects/Water2Mesh.js';
 */
export class WaterMesh extends Mesh {
    /**
     * Constructs a new water mesh.
     *
     * @param {BufferGeometry} geometry - The water's geometry.
     * @param {module:Water2~Options} [options] - The configuration options.
     */
    constructor(geometry: BufferGeometry, options?: any);
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isWater: boolean;
}
import { Color } from 'three/webgpu';
import { Vector2 } from 'three/webgpu';
import { Mesh } from 'three/webgpu';
