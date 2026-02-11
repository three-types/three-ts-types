export default Background;
/**
 * This renderer module manages the background.
 *
 * @private
 * @augments DataMap
 */
declare class Background extends DataMap {
    /**
     * Constructs a new background management component.
     *
     * @param {Renderer} renderer - The renderer.
     * @param {Nodes} nodes - Renderer component for managing nodes related logic.
     */
    constructor(renderer: Renderer, nodes: Nodes);
    /**
     * The renderer.
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
     * Updates the background for the given scene. Depending on how `Scene.background`
     * or `Scene.backgroundNode` are configured, this method might configure a simple clear
     * or add a mesh to the render list for rendering the background as a textured plane
     * or skybox.
     *
     * @param {Scene} scene - The scene.
     * @param {RenderList} renderList - The current render list.
     * @param {RenderContext} renderContext - The current render context.
     */
    update(scene: Scene, renderList: RenderList, renderContext: RenderContext): void;
}
import DataMap from './DataMap.js';
