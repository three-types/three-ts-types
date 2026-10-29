/**
 * Used to implement post-processing effects in three.js.
 * The class manages a chain of post-processing passes to produce the final visual result.
 * Post-processing passes are executed in order of their addition/insertion.
 * The last pass is automatically rendered to screen.
 *
 * This module can only be used with {@link WebGLRenderer}.
 *
 * ```js
 * const composer = new EffectComposer( renderer );
 *
 * // adding some passes
 * const renderPass = new RenderPass( scene, camera );
 * composer.addPass( renderPass );
 *
 * const glitchPass = new GlitchPass();
 * composer.addPass( glitchPass );
 *
 * const outputPass = new OutputPass()
 * composer.addPass( outputPass );
 *
 * function animate() {
 *
 * 	composer.render(); // instead of renderer.render()
 *
 * }
 * ```
 *
 * @three_import import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
 */
export class EffectComposer {
    /**
     * Constructs a new effect composer.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {WebGLRenderTarget} [renderTarget] - This render target and a clone will
     * be used as the internal read and write buffers. If not given, the composer creates
     * the buffers automatically.
     */
    constructor(renderer: WebGLRenderer, renderTarget?: WebGLRenderTarget);
    /**
     * The renderer.
     *
     * @type {WebGLRenderer}
     */
    renderer: WebGLRenderer;
    _pixelRatio: any;
    _width: any;
    _height: any;
    renderTarget1: WebGLRenderTarget;
    renderTarget2: import("three").RenderTarget;
    /**
     * A reference to the internal write buffer. Passes usually write
     * their result into this buffer.
     *
     * @type {WebGLRenderTarget}
     */
    writeBuffer: WebGLRenderTarget;
    /**
     * A reference to the internal read buffer. Passes usually read
     * the previous render result from this buffer.
     *
     * @type {WebGLRenderTarget}
     */
    readBuffer: WebGLRenderTarget;
    /**
     * Whether the final pass is rendered to the screen (default framebuffer) or not.
     *
     * @type {boolean}
     * @default true
     */
    renderToScreen: boolean;
    /**
     * An array representing the (ordered) chain of post-processing passes.
     *
     * @type {Array<Pass>}
     */
    passes: Array<Pass>;
    /**
     * A copy pass used for internal swap operations.
     *
     * @private
     * @type {ShaderPass}
     */
    private copyPass;
    /**
     * The internal timer for managing time data.
     *
     * @private
     * @type {Timer}
     */
    private timer;
    /**
     * Swaps the internal read/write buffers.
     */
    swapBuffers(): void;
    /**
     * Adds the given pass to the pass chain.
     *
     * @param {Pass} pass - The pass to add.
     */
    addPass(pass: Pass): void;
    /**
     * Inserts the given pass at a given index.
     *
     * @param {Pass} pass - The pass to insert.
     * @param {number} index - The index into the pass chain.
     */
    insertPass(pass: Pass, index: number): void;
    /**
     * Removes the given pass from the pass chain.
     *
     * @param {Pass} pass - The pass to remove.
     */
    removePass(pass: Pass): void;
    /**
     * Returns `true` if the pass for the given index is the last enabled pass in the pass chain.
     *
     * @param {number} passIndex - The pass index.
     * @return {boolean} Whether the pass for the given index is the last pass in the pass chain.
     */
    isLastEnabledPass(passIndex: number): boolean;
    /**
     * Executes all enabled post-processing passes in order to produce the final frame.
     *
     * @param {number} deltaTime - The delta time in seconds. If not given, the composer computes
     * its own time delta value.
     */
    render(deltaTime: number): void;
    /**
     * Resets the internal state of the EffectComposer.
     *
     * @param {WebGLRenderTarget} [renderTarget] - This render target has the same purpose like
     * the one from the constructor. If set, it is used to setup the read and write buffers.
     */
    reset(renderTarget?: WebGLRenderTarget): void;
    /**
     * Resizes the internal read and write buffers as well as all passes. Similar to {@link WebGLRenderer#setSize},
     * this method honors the current pixel ration.
     *
     * @param {number} width - The width in logical pixels.
     * @param {number} height - The height in logical pixels.
     */
    setSize(width: number, height: number): void;
    /**
     * Sets device pixel ratio. This is usually used for HiDPI device to prevent blurring output.
     * Setting the pixel ratio will automatically resize the composer.
     *
     * @param {number} pixelRatio - The pixel ratio to set.
     */
    setPixelRatio(pixelRatio: number): void;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever the composer is no longer used in your app.
     */
    dispose(): void;
}
import { WebGLRenderTarget } from 'three';
