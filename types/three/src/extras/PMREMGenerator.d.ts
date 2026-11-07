import { Vector3 } from "../math/Vector3.js";
import { WebGLCubeRenderTarget } from "../renderers/WebGLCubeRenderTarget.js";
import { WebGLRenderer } from "../renderers/WebGLRenderer.js";
import { Scene } from "../scenes/Scene.js";
import { CubeTexture } from "../textures/CubeTexture.js";
import { Texture } from "../textures/Texture.js";

export interface PMREMGeneratorOptions {
    size?: number | undefined;
    position?: Vector3 | undefined;
}

/**
 * Generates a Prefiltered, Mipmapped Radiance Environment Map (PMREM) for
 * image-based lighting. The result is a cube render target whose mip levels
 * store GGX-filtered radiance at increasing roughness, from a mirror at level 0
 * to roughness 1. See {@link PMREMGenerator.lodToRoughness} for the mapping.
 *
 * Filtering assumes the view direction equals the surface normal. Sharp levels
 * use GGX visible normal sampling (Heitz, 2018), while rough levels integrate a
 * lower-resolution source cubemap.
 *
 * @see {@link https://jcgt.org/published/0007/04/01/ | Sampling the GGX Distribution of Visible Normals}
 */
export class PMREMGenerator {
    /**
     * Returns the roughness a mip level of a PMREM has been prefiltered for.
     * The inverse mapping is used by the renderers when sampling a PMREM.
     *
     * @param {number} lod - The mip level.
     * @param {number} maxLod - The last mip level of the PMREM.
     * @return {number} The roughness.
     */
    static lodToRoughness(lod: number, maxLod: number): number;
    /**
     * Constructs a new PMREM generator.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     */
    constructor(renderer: WebGLRenderer);
    /**
     * Generates a PMREM from a scene, optionally applying a Gaussian blur before
     * GGX filtering.
     *
     * @param {Scene} scene - The scene to be captured.
     * @param {number} [sigma=0] - The blur radius in radians.
     * @param {number} [near=0.1] - The near plane distance.
     * @param {number} [far=100] - The far plane distance.
     * @param {Object} [options={}] - The configuration options.
     * @param {number} [options.size=256] - The texture size of the PMREM, rounded down to a power of two and at least 256.
     * @param {Vector3} [options.position=origin] - The position of the internal cube camera that renders the scene.
     * @return {WebGLCubeRenderTarget} The resulting PMREM.
     */
    fromScene(
        scene: Scene,
        sigma?: number,
        near?: number,
        far?: number,
        options?: PMREMGeneratorOptions,
    ): WebGLCubeRenderTarget;
    /**
     * Generates a PMREM from an LDR or HDR equirectangular texture. The cube face
     * size is one quarter of the image width, rounded down to a power of two and
     * at least 256.
     *
     * @param {Texture} equirectangular - The equirectangular texture to be converted.
     * @param {?WebGLCubeRenderTarget} [renderTarget=null] - The render target to use.
     * @return {WebGLCubeRenderTarget} The resulting PMREM.
     */
    fromEquirectangular(equirectangular: Texture, renderTarget?: WebGLCubeRenderTarget | null): WebGLCubeRenderTarget;
    /**
     * Generates a PMREM from an LDR or HDR cubemap. The cube face size matches
     * the input, rounded down to a power of two and at least 256.
     *
     * @param {Texture} cubemap - The cubemap texture to be converted.
     * @param {?WebGLCubeRenderTarget} [renderTarget=null] - The render target to use.
     * @return {WebGLCubeRenderTarget} The resulting PMREM.
     */
    fromCubemap(cubemap: CubeTexture, renderTarget?: WebGLCubeRenderTarget | null): WebGLCubeRenderTarget;
    /**
     * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
     * your texture's network fetch for increased concurrency.
     */
    compileCubemapShader(): void;
    /**
     * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
     * your texture's network fetch for increased concurrency.
     */
    compileEquirectangularShader(): void;
    /**
     * Disposes of the PMREMGenerator's internal memory. The PMREMs it returned
     * belong to the caller and are not disposed.
     */
    dispose(): void;
}
