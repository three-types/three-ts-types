/**
 *
 * Temporal Anti-Aliasing Render Pass.
 *
 * When there is no motion in the scene, the TAA render pass accumulates jittered camera
 * samples across frames to create a high quality anti-aliased result.
 *
 * Note: This effect uses no reprojection so it is no TRAA implementation.
 *
 * ```js
 * const taaRenderPass = new TAARenderPass( scene, camera );
 * taaRenderPass.unbiased = false;
 * composer.addPass( taaRenderPass );
 * ```
 *
 * @augments SSAARenderPass
 * @three_import import { TAARenderPass } from 'three/addons/postprocessing/TAARenderPass.js';
 */
export class TAARenderPass extends SSAARenderPass {
    /**
     * Constructs a new TAA render pass.
     *
     * @param {Scene} scene - The scene to render.
     * @param {Camera} camera - The camera.
     * @param {?(number|Color|string)} [clearColor=0x000000] - The clear color of the render pass.
     * @param {?number} [clearAlpha=0] - The clear alpha of the render pass.
     */
    constructor(scene: Scene, camera: Camera, clearColor?: (number | Color | string) | null, clearAlpha?: number | null);
    /**
     * Whether to accumulate frames or not. This enables
     * the TAA.
     *
     * @type {boolean}
     * @default false
     */
    accumulate: boolean;
    /**
     * The accumulation index.
     *
     * @type {number}
     * @default -1
     */
    accumulateIndex: number;
    _holdRenderTarget: WebGLRenderTarget | null;
    /**
     * Performs the TAA render pass.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
     * destination for the pass.
     * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
     * previous pass from this buffer.
     * @param {number} deltaTime - The delta time in seconds.
     * @param {boolean} maskActive - Whether masking is active or not.
     */
    render(renderer: WebGLRenderer, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number): void;
}
import { SSAARenderPass } from './SSAARenderPass.js';
import { WebGLRenderTarget } from 'three';
