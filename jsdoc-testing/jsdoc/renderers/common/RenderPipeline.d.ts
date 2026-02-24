export default RenderPipeline;
/**
 * This module is responsible to manage the rendering pipeline setups in apps.
 * You usually create a single instance of this class and use it to define
 * the output of your render pipeline and post processing effect chain.
 * ```js
 * const renderPipeline = new RenderPipeline( renderer );
 *
 * const scenePass = pass( scene, camera );
 *
 * renderPipeline.outputNode = scenePass;
 * ```
 *
 * Note: This module can only be used with `WebGPURenderer`.
 */
declare class RenderPipeline {
    /**
     * Constructs a new render pipeline management module.
     *
     * @param {Renderer} renderer - A reference to the renderer.
     * @param {Node<vec4>} outputNode - An optional output node.
     */
    constructor(renderer: Renderer, outputNode?: Node<any>);
    /**
     * A reference to the renderer.
     *
     * @type {Renderer}
     */
    renderer: Renderer;
    /**
     * A node which defines the final output of the rendering
     * pipeline. This is usually the last node in a chain
     * of effect nodes.
     *
     * @type {Node<vec4>}
     */
    outputNode: Node<any>;
    /**
     * Whether the default output tone mapping and color
     * space transformation should be enabled or not.
     *
     * It is enabled by default by it must be disabled when
     * effects must be executed after tone mapping and color
     * space conversion. A typical example is FXAA which
     * requires sRGB input.
     *
     * When set to `false`, the app must control the output
     * transformation with `RenderOutputNode`.
     *
     * ```js
     * const outputPass = renderOutput( scenePass );
     * ```
     *
     * @type {boolean}
     */
    outputColorTransform: boolean;
    /**
     * Must be set to `true` when the output node changes.
     *
     * @type {Node<vec4>}
     */
    needsUpdate: Node<any>;
    /**
     * The full screen quad that is used to render
     * the effects.
     *
     * @private
     * @type {QuadMesh}
     */
    private _quadMesh;
    /**
     * The context of the render pipeline stack.
     *
     * @private
     * @type {?Object}
     * @default null
     */
    private _context;
    /**
     * When `RenderPipeline` is used to apply rendering pipeline and post processing effects,
     * the application must use this version of `render()` inside
     * its animation loop (not the one from the renderer).
     */
    render(): void;
    /**
     * Returns the current context of the render pipeline stack.
     *
     * @readonly
     * @type {?Object}
     */
    readonly get context(): Object | null;
    /**
     * Frees internal resources.
     */
    dispose(): void;
    /**
     * Updates the state of the module.
     *
     * @private
     */
    private _update;
    /**
     * When `RenderPipeline` is used to apply rendering pipeline and post processing effects,
     * the application must use this version of `renderAsync()` inside
     * its animation loop (not the one from the renderer).
     *
     * @async
     * @deprecated
     * @return {Promise} A Promise that resolves when the render has been finished.
     */
    renderAsync(): Promise<any>;
}
