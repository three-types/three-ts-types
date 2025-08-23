export default PMREMGenerator;
/**
 * This class generates a Prefiltered, Mipmapped Radiance Environment Map
 * (PMREM) from a cubeMap environment texture. This allows different levels of
 * blur to be quickly accessed based on material roughness. It is packed into a
 * special CubeUV format that allows us to perform custom interpolation so that
 * we can support nonlinear formats such as RGBE. Unlike a traditional mipmap
 * chain, it only goes down to the LOD_MIN level (above), and then creates extra
 * even more filtered 'mips' at the same LOD_MIN resolution, associated with
 * higher roughness levels. In this way we maintain resolution to smoothly
 * interpolate diffuse lighting while limiting sampling computation.
 *
 * Paper: Fast, Accurate Image-Based Lighting:
 * {@link https://drive.google.com/file/d/15y8r_UpKlU9SvV4ILb0C3qCPecS8pvLz/view}
*/
declare class PMREMGenerator {
    /**
     * Constructs a new PMREM generator.
     *
     * @param {Renderer} renderer - The renderer.
     */
    constructor(renderer: Renderer);
    _renderer: Renderer;
    _pingPongRenderTarget: RenderTarget | null;
    _lodMax: number;
    _cubeSize: number;
    _lodPlanes: any[];
    _sizeLods: any[];
    _sigmas: any[];
    _lodMeshes: any[];
    _blurMaterial: NodeMaterial | null;
    _cubemapMaterial: NodeMaterial | null;
    _equirectMaterial: NodeMaterial | null;
    _backgroundBox: any;
    get _hasInitialized(): any;
    /**
     * Generates a PMREM from a supplied Scene, which can be faster than using an
     * image if networking bandwidth is low. Optional sigma specifies a blur radius
     * in radians to be applied to the scene before PMREM generation. Optional near
     * and far planes ensure the scene is rendered in its entirety.
     *
     * @param {Scene} scene - The scene to be captured.
     * @param {number} [sigma=0] - The blur radius in radians.
     * @param {number} [near=0.1] - The near plane distance.
     * @param {number} [far=100] - The far plane distance.
     * @param {Object} [options={}] - The configuration options.
     * @param {number} [options.size=256] - The texture size of the PMREM.
     * @param {Vector3} [options.renderTarget=origin] - The position of the internal cube camera that renders the scene.
     * @param {?RenderTarget} [options.renderTarget=null] - The render target to use.
     * @return {RenderTarget} The resulting PMREM.
     * @see {@link PMREMGenerator#fromSceneAsync}
     */
    fromScene(scene: Scene, sigma?: number, near?: number, far?: number, options?: {
        size?: number | undefined;
        renderTarget?: Vector3 | undefined;
        renderTarget?: Vector3 | undefined;
    }): RenderTarget;
    /**
     * Generates a PMREM from a supplied Scene, which can be faster than using an
     * image if networking bandwidth is low. Optional sigma specifies a blur radius
     * in radians to be applied to the scene before PMREM generation. Optional near
     * and far planes ensure the scene is rendered in its entirety (the cubeCamera
     * is placed at the origin).
     *
     * @param {Scene} scene - The scene to be captured.
     * @param {number} [sigma=0] - The blur radius in radians.
     * @param {number} [near=0.1] - The near plane distance.
     * @param {number} [far=100] - The far plane distance.
     * @param {Object} [options={}] - The configuration options.
     * @param {number} [options.size=256] - The texture size of the PMREM.
     * @param {Vector3} [options.position=origin] - The position of the internal cube camera that renders the scene.
     * @param {?RenderTarget} [options.renderTarget=null] - The render target to use.
     * @return {Promise<RenderTarget>} A Promise that resolve with the PMREM when the generation has been finished.
     * @see {@link PMREMGenerator#fromScene}
     */
    fromSceneAsync(scene: Scene, sigma?: number, near?: number, far?: number, options?: {
        size?: number | undefined;
        position?: Vector3 | undefined;
        renderTarget?: RenderTarget | null | undefined;
    }): Promise<RenderTarget>;
    /**
     * Generates a PMREM from an equirectangular texture, which can be either LDR
     * or HDR. The ideal input image size is 1k (1024 x 512),
     * as this matches best with the 256 x 256 cubemap output.
     *
     * @param {Texture} equirectangular - The equirectangular texture to be converted.
     * @param {?RenderTarget} [renderTarget=null] - The render target to use.
     * @return {RenderTarget} The resulting PMREM.
     * @see {@link PMREMGenerator#fromEquirectangularAsync}
     */
    fromEquirectangular(equirectangular: Texture, renderTarget?: RenderTarget | null): RenderTarget;
    /**
     * Generates a PMREM from an equirectangular texture, which can be either LDR
     * or HDR. The ideal input image size is 1k (1024 x 512),
     * as this matches best with the 256 x 256 cubemap output.
     *
     * @param {Texture} equirectangular - The equirectangular texture to be converted.
     * @param {?RenderTarget} [renderTarget=null] - The render target to use.
     * @return {Promise<RenderTarget>} The resulting PMREM.
     * @see {@link PMREMGenerator#fromEquirectangular}
     */
    fromEquirectangularAsync(equirectangular: Texture, renderTarget?: RenderTarget | null): Promise<RenderTarget>;
    /**
     * Generates a PMREM from an cubemap texture, which can be either LDR
     * or HDR. The ideal input cube size is 256 x 256,
     * as this matches best with the 256 x 256 cubemap output.
     *
     * @param {Texture} cubemap - The cubemap texture to be converted.
     * @param {?RenderTarget} [renderTarget=null] - The render target to use.
     * @return {RenderTarget} The resulting PMREM.
     * @see {@link PMREMGenerator#fromCubemapAsync}
     */
    fromCubemap(cubemap: Texture, renderTarget?: RenderTarget | null): RenderTarget;
    /**
     * Generates a PMREM from an cubemap texture, which can be either LDR
     * or HDR. The ideal input cube size is 256 x 256,
     * with the 256 x 256 cubemap output.
     *
     * @param {Texture} cubemap - The cubemap texture to be converted.
     * @param {?RenderTarget} [renderTarget=null] - The render target to use.
     * @return {Promise<RenderTarget>} The resulting PMREM.
     * @see {@link PMREMGenerator#fromCubemap}
     */
    fromCubemapAsync(cubemap: Texture, renderTarget?: RenderTarget | null): Promise<RenderTarget>;
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
     * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
     * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
     * one of them will cause any others to also become unusable.
     */
    dispose(): void;
    _setSizeFromTexture(texture: any): void;
    _setSize(cubeSize: any): void;
    _dispose(): void;
    _cleanup(outputTarget: any): void;
    _fromTexture(texture: any, renderTarget: any): any;
    _allocateTarget(): RenderTarget;
    _init(renderTarget: any): void;
    _compileMaterial(material: any): Promise<void>;
    _sceneToCubeUV(scene: any, near: any, far: any, cubeUVRenderTarget: any, position: any): void;
    _textureToCubeUV(texture: any, cubeUVRenderTarget: any): void;
    _applyPMREM(cubeUVRenderTarget: any): void;
    /**
     * This is a two-pass Gaussian blur for a cubemap. Normally this is done
     * vertically and horizontally, but this breaks down on a cube. Here we apply
     * the blur latitudinally (around the poles), and then longitudinally (towards
     * the poles) to approximate the orthogonally-separable blur. It is least
     * accurate at the poles, but still does a decent job.
     *
     * @private
     * @param {RenderTarget} cubeUVRenderTarget - The cubemap render target.
     * @param {number} lodIn - The input level-of-detail.
     * @param {number} lodOut - The output level-of-detail.
     * @param {number} sigma - The blur radius in radians.
     * @param {Vector3} [poleAxis] - The pole axis.
     */
    private _blur;
    _halfBlur(targetIn: any, targetOut: any, lodIn: any, lodOut: any, sigmaRadians: any, direction: any, poleAxis: any): void;
}
import { RenderTarget } from '../../../core/RenderTarget.js';
import NodeMaterial from '../../../materials/nodes/NodeMaterial.js';
import { Vector3 } from '../../../math/Vector3.js';
