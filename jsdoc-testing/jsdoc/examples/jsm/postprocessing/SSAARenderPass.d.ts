/**
 * Supersample Anti-Aliasing Render Pass.
 *
 * This manual approach to SSAA re-renders the scene ones for each sample with camera jitter and accumulates the results.
 *
 * ```js
 * const ssaaRenderPass = new SSAARenderPass( scene, camera );
 * ssaaRenderPass.sampleLevel = 3;
 * composer.addPass( ssaaRenderPass );
 * ```
 *
 * @augments Pass
 * @three_import import { SSAARenderPass } from 'three/addons/postprocessing/SSAARenderPass.js';
 */
export class SSAARenderPass extends Pass {
    /**
     * Constructs a new SSAA render pass.
     *
     * @param {Scene} scene - The scene to render.
     * @param {Camera} camera - The camera.
     * @param {?(number|Color|string)} [clearColor=0x000000] - The clear color of the render pass.
     * @param {?number} [clearAlpha=0] - The clear alpha of the render pass.
     */
    constructor(scene: Scene, camera: Camera, clearColor?: (number | Color | string) | null, clearAlpha?: number | null);
    /**
     * The scene to render.
     *
     * @type {Scene}
     */
    scene: Scene;
    /**
     * The camera.
     *
     * @type {Camera}
     */
    camera: Camera;
    /**
     * The sample level. Specified as n, where the number of
     * samples is 2^n, so sampleLevel = 4, is 2^4 samples, 16.
     *
     * @type {number}
     * @default 4
     */
    sampleLevel: number;
    /**
     * Whether the pass should be unbiased or not. This property has the most
     * visible effect when rendering to a RGBA8 buffer because it mitigates
     * rounding errors. By default RGBA16F is used.
     *
     * @type {boolean}
     * @default true
     */
    unbiased: boolean;
    /**
     * Whether to use a stencil buffer or not. This property can't
     * be changed after the first render.
     *
     * @type {boolean}
     * @default false
     */
    stencilBuffer: boolean;
    /**
     * The clear color of the render pass.
     *
     * @type {?(number|Color|string)}
     * @default 0x000000
     */
    clearColor: (number | Color | string) | null;
    /**
     * The clear alpha of the render pass.
     *
     * @type {?number}
     * @default 0
     */
    clearAlpha: number | null;
    _sampleRenderTarget: WebGLRenderTarget | null;
    _oldClearColor: Color;
    _copyUniforms: Object;
    _copyMaterial: ShaderMaterial;
    _fsQuad: FullScreenQuad;
    /**
     * Sets the size of the pass.
     *
     * @param {number} width - The width to set.
     * @param {number} height - The height to set.
     */
    setSize(width: number, height: number): void;
    /**
     * Performs the SSAA render pass.
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
}
import { Pass } from './Pass.js';
import { Color } from 'three';
import { WebGLRenderTarget } from 'three';
import { ShaderMaterial } from 'three';
import { FullScreenQuad } from './Pass.js';
