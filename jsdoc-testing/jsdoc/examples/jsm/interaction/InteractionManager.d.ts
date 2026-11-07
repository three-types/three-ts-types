/**
 * Manages interaction for 3D objects independently of the scene graph.
 *
 * For objects with an {@link HTMLTexture}, the manager computes CSS `matrix3d`
 * transforms each frame so the underlying HTML elements stay aligned with
 * their meshes. Because the elements are children of the canvas, the browser
 * dispatches pointer events to them natively.
 *
 * ```js
 * const interactions = new InteractionManager();
 * interactions.connect( renderer, camera );
 *
 * // Objects live anywhere in the scene graph
 * scene.add( mesh );
 *
 * // Register for interaction separately
 * interactions.add( mesh );
 *
 * // In the animation loop
 * interactions.update();
 * ```
 * @three_import import { InteractionManager } from 'three/addons/interaction/InteractionManager.js';
 */
export class InteractionManager {
    /**
     * The registered interactive objects.
     *
     * @type {Array<Object3D>}
     */
    objects: Array<Object3D>;
    /**
     * The canvas element.
     *
     * @type {?HTMLCanvasElement}
     * @default null
     */
    element: HTMLCanvasElement | null;
    /**
     * The camera used for computing the element transforms.
     *
     * @type {?Camera}
     * @default null
     */
    camera: Camera | null;
    _cachedCssW: number;
    _cachedCssH: number;
    /**
     * Adds one or more objects to the manager.
     *
     * @param {...Object3D} objects - The objects to add.
     * @return {this}
     */
    add(...objects: Object3D[]): this;
    /**
     * Removes one or more objects from the manager.
     *
     * @param {...Object3D} objects - The objects to remove.
     * @return {this}
     */
    remove(...objects: Object3D[]): this;
    /**
     * Stores the renderer and camera needed for computing element transforms.
     *
     * @param {(WebGPURenderer|WebGLRenderer)} renderer - The renderer.
     * @param {Camera} camera - The camera.
     */
    connect(renderer: (WebGPURenderer | WebGLRenderer), camera: Camera): void;
    /**
     * Updates the element transforms for all registered objects.
     * Call this once per frame in the animation loop.
     */
    update(): void;
    /**
     * Disconnects this manager, clearing the renderer and camera references.
     */
    disconnect(): void;
}
