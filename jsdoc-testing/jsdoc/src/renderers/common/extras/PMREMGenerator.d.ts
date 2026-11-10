export default PMREMGenerator;
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
declare class PMREMGenerator {
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
     * @param {Renderer} renderer - The renderer.
     */
    constructor(renderer: Renderer);
    _renderer: Renderer;
    _cubeSize: number;
    _sourceTarget: any;
    _cubeCamera: CubeCamera;
    _boxMesh: Mesh;
    _cubemapMaterial: NodeMaterial | null;
    _equirectMaterial: NodeMaterial | null;
    _blurMaterial: NodeMaterial | null;
    _ggxMaterial: NodeMaterial | null;
    _integrationMaterial: NodeMaterial | null;
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
     * @param {?CubeRenderTarget} [options.renderTarget=null] - The render target to use.
     * @return {CubeRenderTarget} The resulting PMREM.
     */
    fromScene(scene: Scene, sigma?: number, near?: number, far?: number, options?: {
        size?: number | undefined;
        position?: Vector3 | undefined;
        renderTarget?: CubeRenderTarget | null | undefined;
    }): CubeRenderTarget;
    /**
     * Asynchronous version of {@link PMREMGenerator#fromScene}.
     *
     * @deprecated
     * @param {Scene} scene - The scene to be captured.
     * @param {number} [sigma=0] - The blur radius in radians.
     * @param {number} [near=0.1] - The near plane distance.
     * @param {number} [far=100] - The far plane distance.
     * @param {Object} [options={}] - The configuration options.
     * @param {number} [options.size=256] - The texture size of the PMREM, rounded down to a power of two and at least 256.
     * @param {Vector3} [options.position=origin] - The position of the internal cube camera that renders the scene.
     * @param {?CubeRenderTarget} [options.renderTarget=null] - The render target to use.
     * @return {Promise<CubeRenderTarget>} A Promise that resolves with the PMREM.
     * @see {@link PMREMGenerator#fromScene}
     */
    fromSceneAsync(scene: Scene, sigma?: number, near?: number, far?: number, options?: {
        size?: number | undefined;
        position?: Vector3 | undefined;
        renderTarget?: CubeRenderTarget | null | undefined;
    }): Promise<CubeRenderTarget>;
    /**
     * Generates a PMREM from an LDR or HDR equirectangular texture. The cube face
     * size is one quarter of the image width, rounded down to a power of two and
     * at least 256.
     *
     * @param {Texture} equirectangular - The equirectangular texture to be converted.
     * @param {?CubeRenderTarget} [renderTarget=null] - The render target to use.
     * @return {CubeRenderTarget} The resulting PMREM.
     * @see {@link PMREMGenerator#fromEquirectangularAsync}
     */
    fromEquirectangular(equirectangular: Texture, renderTarget?: CubeRenderTarget | null): CubeRenderTarget;
    /**
     * Asynchronous version of {@link PMREMGenerator#fromEquirectangular}.
     *
     * @deprecated
     * @param {Texture} equirectangular - The equirectangular texture to be converted.
     * @param {?CubeRenderTarget} [renderTarget=null] - The render target to use.
     * @return {Promise<CubeRenderTarget>} The resulting PMREM.
     * @see {@link PMREMGenerator#fromEquirectangular}
     */
    fromEquirectangularAsync(equirectangular: Texture, renderTarget?: CubeRenderTarget | null): Promise<CubeRenderTarget>;
    /**
     * Generates a PMREM from an LDR or HDR cubemap. The cube face size matches
     * the input, rounded down to a power of two and at least 256.
     *
     * @param {Texture} cubemap - The cubemap texture to be converted.
     * @param {?CubeRenderTarget} [renderTarget=null] - The render target to use.
     * @return {CubeRenderTarget} The resulting PMREM.
     * @see {@link PMREMGenerator#fromCubemapAsync}
     */
    fromCubemap(cubemap: Texture, renderTarget?: CubeRenderTarget | null): CubeRenderTarget;
    /**
     * Asynchronous version of {@link PMREMGenerator#fromCubemap}.
     *
     * @deprecated
     * @param {Texture} cubemap - The cubemap texture to be converted.
     * @param {?CubeRenderTarget} [renderTarget=null] - The render target to use.
     * @return {Promise<CubeRenderTarget>} The resulting PMREM.
     * @see {@link PMREMGenerator#fromCubemap}
     */
    fromCubemapAsync(cubemap: Texture, renderTarget?: CubeRenderTarget | null): Promise<CubeRenderTarget>;
    /**
     * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
     * your texture's network fetch for increased concurrency.
     *
     * @returns {Promise}
     */
    compileCubemapShader(): Promise<any>;
    /**
     * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
     * your texture's network fetch for increased concurrency.
     *
     * @returns {Promise}
     */
    compileEquirectangularShader(): Promise<any>;
    /**
     * Disposes of the PMREMGenerator's internal memory. The PMREMs it returned
     * belong to the caller and are not disposed.
     */
    dispose(): void;
    _setSize(cubeSize: any): void;
    _fromTexture(texture: any, renderTarget: any): any;
    _allocateTarget(): CubeRenderTarget;
    _getSourceTarget(depthBuffer?: boolean): CubeRenderTarget | null;
    _compileMaterial(material: any): Promise<void>;
    /**
     * Renders the box mesh with the given material into all six faces of a cube render target.
     *
     * @private
     * @param {CubeRenderTarget} target - The render target.
     * @param {number} lod - The mip level to render into.
     * @param {NodeMaterial} material - The material.
     */
    private _renderCube;
    _textureToCubemap(texture: any): void;
    /**
     * Prefilters the source cubemap into the mip levels of the PMREM. The sharp levels
     * integrate the GGX lobe of their roughness with VNDF importance sampling, reading the
     * mip level of the source that matches the solid angle of each sample. The rough
     * levels weight every texel of a small source mip with the GGX lobe instead.
     *
     * @private
     * @param {CubeRenderTarget} pmremTarget - The PMREM.
     */
    private _applyPMREM;
    /**
     * Applies the initial fromScene() blur in two passes using a golden-angle
     * spiral kernel. Level 0 of the PMREM serves as the intermediate target.
     *
     * @private
     * @param {CubeRenderTarget} pmremTarget - The PMREM.
     * @param {number} sigma - The blur radius in radians.
     */
    private _blur;
}
import { CubeCamera } from '../../../cameras/CubeCamera.js';
import { Mesh } from '../../../objects/Mesh.js';
import NodeMaterial from '../../../materials/nodes/NodeMaterial.js';
import { Vector3 } from '../../../math/Vector3.js';
import CubeRenderTarget from '../CubeRenderTarget.js';
