import { Node, Scene, WebGPURenderer } from "three/webgpu";

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
}): (position: Node<"vec3">, normal: Node<"vec3">) => Node<"vec3">;
