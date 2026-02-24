export default Animation;
/**
 * This module manages the internal animation loop of the renderer.
 *
 * @private
 */
declare class Animation {
    /**
     * Constructs a new animation loop management component.
     *
     * @param {Renderer} renderer - A reference to the main renderer.
     * @param {Nodes} nodes - Renderer component for managing nodes related logic.
     * @param {Info} info - Renderer component for managing metrics and monitoring data.
     */
    constructor(renderer: Renderer, nodes: Nodes, info: Info);
    /**
     * A reference to the main renderer.
     *
     * @type {Renderer}
     */
    renderer: Renderer;
    /**
     * Renderer component for managing nodes related logic.
     *
     * @type {Nodes}
     */
    nodes: Nodes;
    /**
     * Renderer component for managing metrics and monitoring data.
     *
     * @type {Info}
     */
    info: Info;
    /**
     * A reference to the context from `requestAnimationFrame()` can
     * be called (usually `window`).
     *
     * @type {?(Window|XRSession)}
     */
    _context: (Window | XRSession) | null;
    /**
     * The user-defined animation loop.
     *
     * @type {?Function}
     * @default null
     */
    _animationLoop: Function | null;
    /**
     * The requestId which is returned from the `requestAnimationFrame()` call.
     * Can be used to cancel the stop the animation loop.
     *
     * @type {?number}
     * @default null
     */
    _requestId: number | null;
    /**
     * Starts the internal animation loop.
     */
    start(): void;
    /**
     * Stops the internal animation loop.
     */
    stop(): void;
    /**
     * Returns the user-level animation loop.
     *
     * @return {?Function} The animation loop.
     */
    getAnimationLoop(): Function | null;
    /**
     * Defines the user-level animation loop.
     *
     * @param {?Function} callback - The animation loop.
     */
    setAnimationLoop(callback: Function | null): void;
    /**
     * Returns the animation context.
     *
     * @return {Window|XRSession} The animation context.
     */
    getContext(): Window | XRSession;
    /**
     * Defines the context in which `requestAnimationFrame()` is executed.
     *
     * @param {Window|XRSession} context - The context to set.
     */
    setContext(context: Window | XRSession): void;
    /**
     * Frees all internal resources and stops the animation loop.
     */
    dispose(): void;
}
