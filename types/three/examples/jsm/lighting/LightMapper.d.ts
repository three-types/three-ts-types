import { Light, Mesh, Node, Texture, TextureNode, WebGPURenderer } from "three/webgpu";

/**
 * Bakes indirect diffuse irradiance into a light map. The irradiance is defined by a
 * function that returns a TSL node for a world-space position and normal, e.g. a prepared
 * {@link RayTracedRadiosity} via `rayTracedRadiosityIrradiance()`.
 *
 * Meshes need light map UVs in the `uv1` attribute, e.g. generated with {@link unwrapUVs}.
 * Each sample rasterizes the meshes in UV space with a sub-texel jitter and accumulates
 * the result. The function also receives the sample index, so stochastic sources can
 * vary their samples and converge as they accumulate. Call `update()` once per frame
 * to bake progressively, or pass a sample count to bake at once.
 * Samples accumulate in float precision with the 'float32-blendable' renderer feature. Without it,
 * they accumulate in half float precision with jittered weights, up to 1024 samples; further
 * samples are ignored.
 * Keep the source geometry and GI data static while accumulating. Call `reset()`
 * after changing transforms or lighting. Atlas charts need at least three texels
 * of padding; the resolve fills two texels around covered surfaces.
 * Irradiance uses linear BT.709/sRGB primaries in lux.
 * Do not include material ambient occlusion, base color, or exposure in the source
 * irradiance. Material occlusion is applied once at runtime. Keep any contributions
 * included in the bake out of runtime diffuse lighting to avoid counting them twice.
 * The `variance` and `guides` options also bake the inputs of a denoiser like
 * {@link DenoiseNode}: the noise of each texel and the surface that it lies on,
 * see {@link LightMapper#getTextureNode}.
 *
 * ```js
 * const radiosity = new RayTracedRadiosity();
 * radiosity.update( renderer, scene );
 *
 * const lightMapper = new LightMapper( renderer, size, rayTracedRadiosityIrradiance( radiosity ) );
 * lightMapper.addObjects( meshes );
 * lightMapper.update( 64 );
 *
 * material.lightMap = lightMapper.texture;
 * ```
 *
 * This class can only be used with {@link WebGPURenderer}.
 *
 * @three_import import { LightMapper } from 'three/addons/lighting/LightMapper.js';
 */
export class LightMapper {
    /**
     * Constructs a new light mapper.
     *
     * @param {WebGPURenderer} renderer - The renderer.
     * @param {number} size - The light map size in texels.
     * @param {function(Node<vec3>, Node<vec3>, Node<float>): Node<vec3>} irradianceNode - Returns the irradiance for a world-space position, normal and sample index.
     * @param {Object} [options] - Bake options.
     * @param {Array<Light>} [options.lights=[]] - Direct lights to include in the diffuse bake. Render their shadows in the source scene first and disable shadow updates during the UV bake.
     * @param {boolean} [options.variance=false] - Whether to also estimate the noise of each texel into {@link LightMapper#varianceTexture}. Requires the 'float32-blendable' renderer feature.
     * @param {boolean} [options.guides=false] - Whether to also rasterize the surface of each texel into {@link LightMapper#positionTexture} and {@link LightMapper#normalTexture}.
     */
    constructor(
        renderer: WebGPURenderer,
        size: number,
        irradianceNode: (position: Node<"vec3">, normal: Node<"vec3">, sample: Node<"float">) => Node<"vec3">,
        { lights, variance, guides }?: {
            lights?: Light[] | undefined;
            variance?: boolean | undefined;
            guides?: boolean | undefined;
        },
    );
    /**
     * The renderer.
     *
     * @type {WebGPURenderer}
     */
    renderer: WebGPURenderer;
    /**
     * The source of indirect irradiance.
     *
     * @type {function(Node<vec3>, Node<vec3>, Node<float>): Node<vec3>}
     */
    irradianceNode: (position: Node<"vec3">, normal: Node<"vec3">, sample: Node<"float">) => Node<"vec3">;
    /**
     * The light map size in texels.
     *
     * @type {number}
     */
    size: number;
    /**
     * The number of accumulated samples.
     *
     * @type {number}
     * @readonly
     * @default 0
     */
    readonly samples: number;
    /**
     * The baked light map. It stores linear diffuse irradiance in lux, without baked
     * albedo, material ambient occlusion, or display exposure, and uses `uv1`.
     * Values are not divided by pi, matching the runtime light map input.
     *
     * @type {Texture}
     */
    texture: Texture;
    /**
     * The variance of the luminance of each texel of the light map, the variance of the mean of its
     * samples, in the red channel. Texels without samples are -1. Only with the `variance` option and
     * the 'float32-blendable' renderer feature, else `null`.
     *
     * @type {?Texture}
     * @readonly
     */
    readonly varianceTexture: Texture | null;
    /**
     * The world-space position of the surface of each texel, with the index of its chart + 1 in alpha,
     * or 0 in alpha for texels without a surface. A chart is a set of triangles that are connected in
     * the light map. Only with the `guides` option, else `null`.
     *
     * @type {?Texture}
     * @readonly
     */
    readonly positionTexture: Texture | null;
    /**
     * The world-space normal of the surface of each texel. Only with the `guides` option, else `null`.
     *
     * @type {?Texture}
     * @readonly
     */
    readonly normalTexture: Texture | null;
    /**
     * Returns a texture of the light mapper: `'color'`, the light map, or the inputs of a denoiser like
     * {@link DenoiseNode}: `'variance'` with the `variance` option, `'position'` and `'normal'` with
     * the `guides` option.
     *
     * @param {('color'|'variance'|'position'|'normal')} [name='color'] - The name of the texture.
     * @return {Texture} The texture.
     */
    getTexture(name?: "color" | "variance" | "position" | "normal"): Texture;
    /**
     * Returns a texture of the light mapper as a texture node, see {@link LightMapper#getTexture}. The
     * nodes sample the light map UVs, e.g. `material.lightMapNode = lightMapper.getTextureNode()`.
     *
     * @param {('color'|'variance'|'position'|'normal')} [name='color'] - The name of the texture.
     * @return {TextureNode} The texture node.
     */
    getTextureNode(name?: "color" | "variance" | "position" | "normal"): TextureNode;
    /**
     * Adds meshes to the light map. Their geometries must provide `uv1`.
     * Skinned and instanced meshes are not supported.
     *
     * @param {Array<Mesh>} objects - The meshes to add.
     */
    addObjects(objects: Array<Mesh>): void;
    /**
     * Accumulates samples into the light map.
     *
     * @param {number} [samples=1] - The number of samples to add.
     */
    update(samples?: number): void;
    /**
     * Discards the accumulated samples.
     */
    reset(): void;
    /**
     * Frees all internal resources.
     */
    dispose(): void;
}
