export default InspectorBase;
/**
 * InspectorBase is the base class for all inspectors.
 *
 * @class InspectorBase
 */
declare class InspectorBase {
    /**
     * The renderer associated with this inspector.
     *
     * @type {WebGLRenderer}
     * @private
     */
    private _renderer;
    /**
     * The current frame being processed.
     *
     * @type {Object}
     */
    currentFrame: Object;
    /**
     * Returns the node frame for the current renderer.
     *
     * @return {Object} The node frame.
     */
    get nodeFrame(): Object;
    /**
     * Sets the renderer for this inspector.
     *
     * @param {WebGLRenderer} renderer - The renderer to associate with this inspector.
     * @return {InspectorBase} This inspector instance.
     */
    setRenderer(renderer: WebGLRenderer): InspectorBase;
    /**
     * Returns the renderer associated with this inspector.
     *
     * @return {WebGLRenderer} The associated renderer.
     */
    getRenderer(): WebGLRenderer;
    /**
     * Initializes the inspector.
     */
    init(): void;
    /**
     * Called when a frame begins.
     */
    begin(): void;
    /**
     * Called when a frame ends.
     */
    finish(): void;
    /**
     * Inspects a node.
     *
     * @param {Node} node - The node to inspect.
     */
    inspect(): void;
    /**
     * When a compute operation is performed.
     *
     * @param {ComputeNode} computeNode - The compute node being executed.
     * @param {number|Array<number>} dispatchSizeOrCount - The dispatch size or count.
     */
    computeAsync(): void;
    /**
     * Called when a compute operation begins.
     *
     * @param {string} uid - A unique identifier for the render context.
     * @param {ComputeNode} computeNode - The compute node being executed.
     */
    beginCompute(): void;
    /**
     * Called when a compute operation ends.
     *
     * @param {string} uid - A unique identifier for the render context.
     * @param {ComputeNode} computeNode - The compute node being executed.
     */
    finishCompute(): void;
    /**
     * Called when a render operation begins.
     *
     * @param {string} uid - A unique identifier for the render context.
     * @param {Scene} scene - The scene being rendered.
     * @param {Camera} camera - The camera being used for rendering.
     * @param {?WebGLRenderTarget} renderTarget - The render target, if any.
     */
    beginRender(): void;
    /**
     * Called when an animation loop ends.
     *
     * @param {string} uid - A unique identifier for the render context.
     */
    finishRender(): void;
    /**
     * Called when a texture copy operation is performed.
     *
     * @param {Texture} srcTexture - The source texture.
     * @param {Texture} dstTexture - The destination texture.
     */
    copyTextureToTexture(): void;
    /**
     * Called when a framebuffer copy operation is performed.
     *
     * @param {Texture} framebufferTexture - The texture associated with the framebuffer.
     */
    copyFramebufferToTexture(): void;
}
