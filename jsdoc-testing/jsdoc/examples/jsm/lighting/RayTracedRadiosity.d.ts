/**
 * Approximates diffuse global illumination with ray traced radiosity, as a source of irradiance for
 * {@link LightMapper}. Every sample casts cosine-distributed rays from each point through a
 * {@link https://github.com/gkjohnson/three-mesh-bvh three-mesh-bvh} BVH of the scene, and looks up
 * the light leaving the hit surfaces in a light map of the bounces. Emissive surfaces and the sky are
 * also sampled directly with shadow rays, so small area lights and suns converge quickly.
 *
 * The bounces are cached in a light map that `update()` solves iteratively, so the meshes need light
 * map UVs in `uv1`, e.g. generated with {@link unwrapUVs}. Meshes without them block light but do not
 * reflect it.
 *
 * ```js
 * const radiosity = new RayTracedRadiosity();
 * radiosity.update( renderer, scene );
 *
 * const lightMapper = new LightMapper( renderer, size, rayTracedRadiosityIrradiance( radiosity ) );
 * ```
 *
 * The scene is collected by `update()`: call it again after changing the scene or the lighting and
 * create new samplers afterwards. The direct light of directional, point and spot lights is left to
 * the materials, like with the other irradiance sources, but the cached bounces include it with shadow
 * rays, so their indirect light is baked. The light of emissive surfaces is baked, since materials do
 * not light each other, and so is the light of an equirectangular or cube texture in `scene.background`,
 * scaled by `scene.backgroundIntensity`; background colors are ignored. Only the colors of the
 * materials are used, texture maps are ignored and all surfaces are opaque. Other lights, and skinned,
 * instanced and batched meshes are ignored.
 *
 * This class can only be used with {@link WebGPURenderer} and a WebGPU backend.
 * Requires `three-mesh-bvh` 0.9.18 or later.
 *
 * @three_import import { RayTracedRadiosity, rayTracedRadiosityIrradiance } from 'three/addons/lighting/RayTracedRadiosity.js';
 */
export class RayTracedRadiosity {
    /**
     * Constructs a new ray traced radiosity solver.
     *
     * @param {Object} [options] - The options.
     * @param {number} [options.rays=8] - The number of rays cast per point and sample.
     * @param {number} [options.bounces=16] - The number of iterations used to solve the cached bounces. Each iteration adds one bounce, `0` disables the cache.
     * @param {number} [options.cacheSamples=32] - The number of samples accumulated into the bounce cache after the iterations.
     * @param {number} [options.cacheSize=256] - The size of the bounce cache light map in texels.
     */
    constructor({ rays, bounces, cacheSamples, cacheSize }?: {
        rays?: number | undefined;
        bounces?: number | undefined;
        cacheSamples?: number | undefined;
        cacheSize?: number | undefined;
    });
    /**
     * The number of rays cast per point and sample. It can change between samples, e.g. to keep the
     * frame rate of a progressive bake: the samples continue the same sequences of rays.
     *
     * @type {number}
     * @default 8
     */
    rays: number;
    /**
     * The number of iterations used to solve the cached bounces.
     *
     * @type {number}
     * @default 16
     */
    bounces: number;
    /**
     * The number of samples accumulated into the bounce cache after the iterations.
     *
     * @type {number}
     * @default 32
     */
    cacheSamples: number;
    /**
     * The size of the bounce cache light map in texels.
     *
     * @type {number}
     * @default 256
     */
    cacheSize: number;
    /**
     * World space distance that rays start above the receiving face, to avoid hitting it.
     *
     * @type {number}
     * @default 0.001
     */
    bias: number;
    _bvh: any;
    _geometry: BufferGeometry | null;
    _trace: any;
    _surface: any;
    _visibility: any;
    _triangles: import("three/tsl").StorageBufferNode | null;
    _materials: any;
    _lights: any;
    _lightCount: number;
    _emitters: any;
    _emitterCount: number;
    _lightMapMeshes: any[];
    _cache: LightMapper | null;
    _environment: any;
    _sky: import("three/tsl").StorageBufferNode | null;
    _environmentIntensity: import("three/tsl").UniformNode;
    _environmentRotation: import("three/tsl").UniformNode;
    _environmentInverseRotation: import("three/tsl").UniformNode;
    _firstRay: number;
    _firstRayNode: import("three/tsl").Node;
    _raysNode: import("three/tsl").Node;
    _biasNode: import("three/tsl").Node;
    /**
     * Collects the meshes of the scene, builds the BVH and solves the cached bounces. Call this again
     * after changing the scene or the lighting.
     *
     * @param {WebGPURenderer} renderer - The renderer.
     * @param {Scene} scene - The scene.
     */
    update(renderer: WebGPURenderer, scene: Scene): void;
    /**
     * Frees all internal resources.
     */
    dispose(): void;
    /**
     * Disposes the BVH, the scene buffers and the bounce cache.
     *
     * @private
     */
    private _clear;
    /**
     * Merges the visible meshes into one world space geometry, builds its BVH and stores the
     * materials, emissive triangles and lights.
     *
     * @private
     * @param {Scene} scene - The scene.
     */
    private _collect;
    /**
     * Builds the table that samples the sky by the power of its latitude-longitude cells, measured on
     * the GPU from the radiance that the rays see. So any equirectangular or cube texture works, also
     * without data on the CPU, like the textures of TextureLoader and CubeTextureLoader, and render
     * targets. A cell stores its power and the sum of the powers of its row up to it. Then an item per
     * row stores the power of the row, the sum of the powers of the rows up to it, and the factor that
     * turns the power of a cell of the row into its density over the solid angle.
     *
     * @private
     * @param {WebGPURenderer} renderer - The renderer.
     */
    private _createSky;
    /**
     * Creates the functions that trace rays through the BVH.
     *
     * @private
     */
    private _createTrace;
    /**
     * Solves the cached bounces. Every iteration gathers one sample from the previous one, then the
     * converged estimate is refined by accumulating samples.
     *
     * @private
     */
    private _solve;
    /**
     * Returns the irradiance gathered with rays at a world-space position and normal.
     *
     * @private
     * @param {Node<vec3>} positionNode - The world-space position.
     * @param {Node<vec3>} normalNode - The world-space normal.
     * @param {boolean} analyticLights - Whether to add the direct light of the analytic lights.
     * @return {Node<vec3>} The irradiance.
     */
    private _gather;
}
/**
 * Creates a world-space diffuse irradiance sampler for a prepared {@link RayTracedRadiosity}, for
 * {@link LightMapper}. Call `radiosity.update( renderer, scene )` before creating it. Every render
 * call that uses the sampler continues the ray sequences, so the samples of a light mapper converge.
 *
 * @param {RayTracedRadiosity} radiosity - The prepared radiosity solver.
 * @param {Object} [options] - The options.
 * @param {boolean} [options.analyticLights=false] - Whether to also gather the direct light of the directional, point and spot lights, with shadow rays. Otherwise it is left to the materials.
 * @return {function(Node<vec3>, Node<vec3>): Node<vec3>} The irradiance sampler.
 */
export function rayTracedRadiosityIrradiance(radiosity: RayTracedRadiosity, { analyticLights }?: {
    analyticLights?: boolean | undefined;
}): (arg0: Node<any>, arg1: Node<any>) => Node<any>;
import { BufferGeometry } from 'three/webgpu';
import { LightMapper } from './LightMapper.js';
