export default RenderLists;
/**
 * This renderer module manages the render lists which are unique
 * per scene and camera combination.
 *
 * @private
 */
declare class RenderLists {
    /**
     * The internal chain map which holds the render lists.
     *
     * @type {ChainMap}
     */
    lists: ChainMap;
    /**
     * The render lists which are currently in use. Lists are removed
     * as soon as they become stale.
     *
     * @private
     * @type {Set<RenderList>}
     */
    private _activeLists;
    /**
     * The current frame ID.
     *
     * @private
     * @type {number}
     */
    private _frameId;
    /**
     * Returns a render list for the given scene and camera.
     *
     * @param {Scene} scene - The scene.
     * @param {Camera} camera - The camera.
     * @param {Lighting} lighting - The lighting manager.
     * @return {RenderList} The render list.
     */
    get(scene: Scene, camera: Camera, lighting: Lighting): RenderList;
    /**
     * Must be called when a new frame begins.
     *
     * @param {number} frameId - The current frame ID.
     */
    update(frameId: number): void;
    /**
     * Frees all internal resources.
     */
    dispose(): void;
}
import ChainMap from './ChainMap.js';
import RenderList from './RenderList.js';
