/**
 * Saves the state of the given renderer and stores it into the given state object.
 *
 * If not state object is provided, the function creates one.
 *
 * @private
 * @function
 * @param {Renderer} renderer - The renderer.
 * @param {Object} [state={}] - The state.
 * @return {Object} The state.
 */
export function saveRendererState(renderer: Renderer, state?: Object): Object;
/**
 * Saves the state of the given renderer and stores it into the given state object.
 * Besides, the function also resets the state of the renderer to its default values.
 *
 * If not state object is provided, the function creates one.
 *
 * @private
 * @function
 * @param {Renderer} renderer - The renderer.
 * @param {Object} [state={}] - The state.
 * @return {Object} The state.
 */
export function resetRendererState(renderer: Renderer, state?: Object): Object;
/**
 * Restores the state of the given renderer from the given state object.
 *
 * @private
 * @function
 * @param {Renderer} renderer - The renderer.
 * @param {Object} state - The state to restore.
 */
export function restoreRendererState(renderer: Renderer, state: Object): void;
/**
 * Saves the state of the given scene and stores it into the given state object.
 *
 * If not state object is provided, the function creates one.
 *
 * @private
 * @function
 * @param {Scene} scene - The scene.
 * @param {Object} [state={}] - The state.
 * @return {Object} The state.
 */
export function saveSceneState(scene: Scene, state?: Object): Object;
/**
 * Saves the state of the given scene and stores it into the given state object.
 * Besides, the function also resets the state of the scene to its default values.
 *
 * If not state object is provided, the function creates one.
 *
 * @private
 * @function
 * @param {Scene} scene - The scene.
 * @param {Object} [state={}] - The state.
 * @return {Object} The state.
 */
export function resetSceneState(scene: Scene, state?: Object): Object;
/**
 * Restores the state of the given scene from the given state object.
 *
 * @private
 * @function
 * @param {Scene} scene - The scene.
 * @param {Object} state - The state to restore.
 */
export function restoreSceneState(scene: Scene, state: Object): void;
/**
 * Saves the state of the given renderer and scene and stores it into the given state object.
 *
 * If not state object is provided, the function creates one.
 *
 * @private
 * @function
 * @param {Renderer} renderer - The renderer.
 * @param {Scene} scene - The scene.
 * @param {Object} [state={}] - The state.
 * @return {Object} The state.
 */
export function saveRendererAndSceneState(renderer: Renderer, scene: Scene, state?: Object): Object;
/**
 * Saves the state of the given renderer and scene and stores it into the given state object.
 * Besides, the function also resets the state of the renderer and scene to its default values.
 *
 * If not state object is provided, the function creates one.
 *
 * @private
 * @function
 * @param {Renderer} renderer - The renderer.
 * @param {Scene} scene - The scene.
 * @param {Object} [state={}] - The state.
 * @return {Object} The state.
 */
export function resetRendererAndSceneState(renderer: Renderer, scene: Scene, state?: Object): Object;
/**
 * Restores the state of the given renderer and scene from the given state object.
 *
 * @private
 * @function
 * @param {Renderer} renderer - The renderer.
 * @param {Scene} scene - The scene.
 * @param {Object} state - The state to restore.
 */
export function restoreRendererAndSceneState(renderer: Renderer, scene: Scene, state: Object): void;
