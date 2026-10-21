export default Lighting;
/**
 * This renderer module manages the lights nodes which are unique
 * per scene + camera + lighting combination.
 *
 * The lights node itself is later configured in the render list
 * with the actual lights from the scene.
 *
 * @private
 */
declare class Lighting {
    /**
     * Whether this lighting manager is enabled or not.
     *
     * @type {boolean}
     * @default true
     */
    enabled: boolean;
    /**
     * A stack of light arrays saved per render via {@link Lighting#beginRender}.
     *
     * @private
     * @type {Array<Array<Light>>}
     */
    private _cache;
    /**
     * A map of lights nodes per scene.
     *
     * @private
     * @type {WeakMap<Scene, LightsNode>}
     */
    private _lightsNodeMap;
    /**
     * Weak references to the lights nodes created by this lighting manager, so they
     * can be disposed with {@link Lighting#dispose} without keeping scenes alive.
     *
     * @private
     * @type {Set<WeakRef<LightsNode>>}
     */
    private _tracked;
    /**
     * Removes weak references from `_tracked` when their lights node has been
     * garbage collected without an explicit `dispose()`.
     *
     * @private
     * @type {FinalizationRegistry}
     */
    private _registry;
    /**
     * Creates a new lights node for the given array of lights.
     *
     * @param {Array<Light>} lights - The render object.
     * @return {LightsNode} The lights node.
     */
    createNode(lights?: Array<Light>): LightsNode;
    /**
     * Returns a lights node for the given scene.
     *
     * @param {Scene} scene - The scene.
     * @return {LightsNode} The lights node.
     */
    getNode(scene: Scene): LightsNode;
    /**
     * Tracks the given lights node so it is disposed with {@link Lighting#dispose}.
     * Subclasses creating additional lights nodes should track them as well.
     *
     * @private
     * @param {LightsNode} node - The lights node.
     */
    private _track;
    /**
     * Saves the current lights of the scene's lights node so they can be restored
     * in {@link Lighting#finishRender}. Must be paired with a `finishRender()` call
     * to avoid memory leaks.
     *
     * Nested render calls might mutate the lights array so a save/restore is required
     * for each render call.
     *
     * @param {Scene} scene - The scene.
     */
    beginRender(scene: Scene): void;
    /**
     * Restores the lights saved by the matching {@link Lighting#beginRender} call.
     *
     * @param {Scene} scene - The scene.
     */
    finishRender(scene: Scene): void;
    /**
     * Frees the resources of the lights nodes created by this lighting manager. Called by
     * the renderer when it is disposed, or by the app after replacing the lighting system.
     * The lighting manager must not be used for rendering anymore after this call.
     */
    dispose(): void;
}
import { LightsNode } from '../../nodes/Nodes.js';
