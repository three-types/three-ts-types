export default DirectRenderPipeline;
/**
 * An alternative render pipeline that applies output processing directly in
 * material shaders. This avoids the intermediate framebuffer and output pass
 * used by {@link Renderer}.
 *
 * ```js
 * const renderPipeline = new DirectRenderPipeline( renderer );
 * renderPipeline.render( scene, camera );
 * ```
 *
 * Limitations:
 * - Blending of transparent materials is incorrect since it happens after output processing.
 * - Materials that sample the framebuffer, such as transmissive materials, are not supported.
 * - With the WebGL backend, `antialias` has no effect.
 * - {@link Renderer#compileAsync} does not compile the pipelines used by this module.
 *
 * Note: This module can only be used with `WebGPURenderer`.
 *
 * @augments RenderPipeline
 */
declare class DirectRenderPipeline extends RenderPipeline {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isDirectRenderPipeline: boolean;
    /**
     * The context node used to apply output processing in material shaders.
     *
     * @private
     * @type {?ContextNode}
     * @default null
     */
    private _contextNode;
    /**
     * The renderer context node wrapped by this pipeline.
     *
     * @private
     * @type {?ContextNode}
     * @default null
     */
    private _rendererContextNode;
    /**
     * Cached node representations of solid scene backgrounds.
     *
     * @private
     * @type {WeakMap<Color, UniformNode>}
     */
    private _backgroundNodes;
    /**
     * Renders the scene with output processing applied directly in material shaders.
     *
     * @param {Object3D} scene - The scene or object to render.
     * @param {Camera} camera - The camera.
     */
    render(scene: Object3D, camera: Camera): void;
    /**
     * Returns a node representation of a solid scene background so it receives
     * the same inline output processing as material fragments.
     *
     * @private
     * @param {Object3D} scene - The scene or object to render.
     * @return {?UniformNode} The background node.
     */
    private _getBackgroundNode;
}
import RenderPipeline from './RenderPipeline.js';
