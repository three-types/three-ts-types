/**
 * A pass for a basic SSAO effect.
 *
 * {@link SAOPass} and {@link GTAPass} produce a more advanced AO but are also
 * more expensive.
 *
 * ```js
 * const ssaoPass = new SSAOPass( scene, camera, width, height );
 * composer.addPass( ssaoPass );
 * ```
 *
 * @augments Pass
 * @three_import import { SSAOPass } from 'three/addons/postprocessing/SSAOPass.js';
 */
export class SSAOPass extends Pass {
    /**
     * Constructs a new SSAO pass.
     *
     * @param {Scene} scene - The scene to compute the AO for.
     * @param {Camera} camera - The camera.
     * @param {number} [width=512] - The width of the effect.
     * @param {number} [height=512] - The height of the effect.
     * @param {number} [kernelSize=32] - The kernel size.
     */
    constructor(scene: Scene, camera: Camera, width?: number, height?: number, kernelSize?: number);
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
     * The kernel radius controls how wide the
     * AO spreads.
     *
     * @type {number}
     * @default 8
     */
    kernelRadius: number;
    kernel: any[];
    noiseTexture: DataTexture | null;
    /**
     * The output configuration.
     *
     * @type {number}
     * @default 0
     */
    output: number;
    /**
     * Defines the minimum distance that should be
     * affected by the AO.
     *
     * @type {number}
     * @default 0.005
     */
    minDistance: number;
    /**
     * Defines the maximum distance that should be
     * affected by the AO.
     *
     * @type {number}
     * @default 0.1
     */
    maxDistance: number;
    _visibilityCache: any[];
    normalRenderTarget: WebGLRenderTarget;
    ssaoRenderTarget: WebGLRenderTarget;
    blurRenderTarget: import("three").RenderTarget;
    ssaoMaterial: ShaderMaterial;
    normalMaterial: MeshNormalMaterial;
    blurMaterial: ShaderMaterial;
    depthRenderMaterial: ShaderMaterial;
    copyMaterial: ShaderMaterial;
    _fsQuad: FullScreenQuad;
    _originalClearColor: Color;
    /**
     * Performs the SSAO pass.
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
    /**
     * Sets the size of the pass.
     *
     * @param {number} width - The width to set.
     * @param {number} height - The height to set.
     */
    setSize(width: number, height: number): void;
    _renderPass(renderer: any, passMaterial: any, renderTarget: any, clearColor: any, clearAlpha: any): void;
    _renderOverride(renderer: any, overrideMaterial: any, renderTarget: any, clearColor: any, clearAlpha: any): void;
    _generateSampleKernel(kernelSize: any): void;
    _generateRandomKernelRotations(): void;
    _overrideVisibility(): void;
    _restoreVisibility(): void;
}
export namespace SSAOPass {
    namespace OUTPUT {
        let Default: number;
        let SSAO: number;
        let Blur: number;
        let Depth: number;
        let Normal: number;
    }
}
import { Pass } from './Pass.js';
import { DataTexture } from 'three';
import { WebGLRenderTarget } from 'three';
import { ShaderMaterial } from 'three';
import { MeshNormalMaterial } from 'three';
import { FullScreenQuad } from './Pass.js';
import { Color } from 'three';
