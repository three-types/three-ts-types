/**
 * A pass for an GTAO effect.
 *
 * `GTAOPass` provides better quality than {@link SSAOPass} but is also more expensive.
 *
 * ```js
 * const gtaoPass = new GTAOPass( scene, camera, width, height );
 * gtaoPass.output = GTAOPass.OUTPUT.Denoise;
 * composer.addPass( gtaoPass );
 * ```
 *
 * @augments Pass
 * @three_import import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
 */
export class GTAOPass extends Pass {
    /**
     * Constructs a new GTAO pass.
     *
     * @param {Scene} scene - The scene to compute the AO for.
     * @param {Camera} camera - The camera.
     * @param {number} [width=512] - The width of the effect.
     * @param {number} [height=512] - The height of the effect.
     * @param {Object} [parameters] - The pass parameters.
     * @param {Object} [aoParameters] - The AO parameters.
     * @param {Object} [pdParameters] - The denoise parameters.
     */
    constructor(scene: Scene, camera: Camera, width?: number, height?: number, parameters?: Object, aoParameters?: Object, pdParameters?: Object);
    /**
     * The width of the effect.
     *
     * @type {number}
     * @default 512
     */
    width: number;
    /**
     * The height of the effect.
     *
     * @type {number}
     * @default 512
     */
    height: number;
    /**
     * The camera.
     *
     * @type {Camera}
     */
    camera: Camera;
    /**
     * The scene to render the AO for.
     *
     * @type {Scene}
     */
    scene: Scene;
    /**
     * The output configuration.
     *
     * @type {number}
     * @default 0
     */
    output: number;
    _renderGBuffer: boolean;
    _visibilityCache: any[];
    /**
     * The AO blend intensity.
     *
     * @type {number}
     * @default 1
     */
    blendIntensity: number;
    /**
     * The number of Poisson Denoise rings.
     *
     * @type {number}
     * @default 2
     */
    pdRings: number;
    /**
     * The Poisson Denoise radius exponent.
     *
     * @type {number}
     * @default 2
     */
    pdRadiusExponent: number;
    /**
     * The Poisson Denoise sample count.
     *
     * @type {number}
     * @default 16
     */
    pdSamples: number;
    gtaoNoiseTexture: DataTexture;
    pdNoiseTexture: DataTexture;
    gtaoRenderTarget: WebGLRenderTarget;
    pdRenderTarget: import("three").RenderTarget;
    gtaoMaterial: ShaderMaterial;
    normalMaterial: MeshNormalMaterial;
    pdMaterial: ShaderMaterial;
    depthRenderMaterial: ShaderMaterial;
    copyMaterial: ShaderMaterial;
    blendMaterial: ShaderMaterial;
    _fsQuad: FullScreenQuad;
    _originalClearColor: Color;
    /**
     * Sets the size of the pass.
     *
     * @param {number} width - The width to set.
     * @param {number} height - The height to set.
     */
    setSize(width: number, height: number): void;
    /**
     * A texture holding the computed AO.
     *
     * @type {Texture}
     * @readonly
     */
    readonly get gtaoMap(): Texture;
    /**
     * Configures the GBuffer of this pass. If no arguments are passed,
     * the pass creates an internal render target for holding depth
     * and normal data.
     *
     * @param {DepthTexture} [depthTexture] - The depth texture.
     * @param {DepthTexture} [normalTexture] - The normal texture.
     */
    setGBuffer(depthTexture?: DepthTexture, normalTexture?: DepthTexture): void;
    depthTexture: DepthTexture | undefined;
    normalTexture: import("three").Texture | DepthTexture | undefined;
    normalRenderTarget: WebGLRenderTarget | undefined;
    /**
     * Configures the clip box of the GTAO shader with the given AABB.
     *
     * @param {?Box3} box - The AABB enclosing the scene that should receive AO. When passing
     * `null`, to clip box is used.
     */
    setSceneClipBox(box: Box3 | null): void;
    /**
     * Updates the GTAO material from the given parameter object.
     *
     * @param {Object} parameters - The GTAO material parameters.
     */
    updateGtaoMaterial(parameters: Object): void;
    /**
     * Updates the Denoise material from the given parameter object.
     *
     * @param {Object} parameters - The denoise parameters.
     */
    updatePdMaterial(parameters: Object): void;
    /**
     * Performs the GTAO pass.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
     * destination for the pass.
     * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
     * previous pass from this buffer.
     * @param {number} deltaTime - The delta time in seconds.
     * @param {boolean} maskActive - Whether masking is active or not.
     */
    render(renderer: WebGLRenderer, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget): void;
    _renderPass(renderer: any, passMaterial: any, renderTarget: any, clearColor: any, clearAlpha: any): void;
    _renderOverride(renderer: any, overrideMaterial: any, renderTarget: any, clearColor: any, clearAlpha: any): void;
    _overrideVisibility(): void;
    _restoreVisibility(): void;
    _generateNoise(size?: number): DataTexture;
}
export namespace GTAOPass {
    namespace OUTPUT {
        let Off: number;
        let Default: number;
        let Diffuse: number;
        let Depth: number;
        let Normal: number;
        let AO: number;
        let Denoise: number;
    }
}
import { Pass } from './Pass.js';
import { DataTexture } from 'three';
import { WebGLRenderTarget } from 'three';
import { ShaderMaterial } from 'three';
import { MeshNormalMaterial } from 'three';
import { FullScreenQuad } from './Pass.js';
import { Color } from 'three';
import { DepthTexture } from 'three';
