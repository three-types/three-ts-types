/**
 * This class can be used to select 3D objects in a scene with a selection box.
 * It is recommended to visualize the selected area with the help of {@link SelectionHelper}.
 *
 * ```js
 * const selectionBox = new SelectionBox( camera, scene );
 * const selectedObjects = selectionBox.select( startPoint, endPoint );
 * ```
 *
 * @three_import import { SelectionBox } from 'three/addons/interactive/SelectionBox.js';
 */
export class SelectionBox {
    /**
     * Constructs a new selection box.
     *
     * @param {Camera} camera - The camera the scene is rendered with.
     * @param {Scene} scene - The scene.
     * @param {number} [deep=Number.MAX_VALUE] - How deep the selection frustum of perspective cameras should extend.
     */
    constructor(camera: Camera, scene: Scene, deep?: number);
    /**
     * The camera the scene is rendered with.
     *
     * @type {Camera}
     */
    camera: Camera;
    /**
     * The camera the scene is rendered with.
     *
     * @type {Scene}
     */
    scene: Scene;
    /**
     * The start point of the selection.
     *
     * @type {Vector3}
     */
    startPoint: Vector3;
    /**
     * The end point of the selection.
     *
     * @type {Vector3}
     */
    endPoint: Vector3;
    /**
     * The selected 3D objects.
     *
     * @type {Array<Object3D>}
     */
    collection: Array<Object3D>;
    /**
     * The selected instance IDs of instanced meshes.
     *
     * @type {Object}
     */
    instances: Object;
    /**
     * The selected batches of batched meshes.
     *
     * @type {Object}
     */
    batches: Object;
    /**
     * How deep the selection frustum of perspective cameras should extend.
     *
     * @type {number}
     * @default Number.MAX_VALUE
     */
    deep: number;
    /**
     * This method selects 3D objects in the scene based on the given start
     * and end point. If no parameters are provided, the method uses the start
     * and end values of the respective members.
     *
     * @param {Vector3} [startPoint] - The start point.
     * @param {Vector3} [endPoint] - The end point.
     * @return {Array<Object3D>} The selected 3D objects.
     */
    select(startPoint?: Vector3, endPoint?: Vector3): Array<Object3D>;
    _updateFrustum(startPoint: any, endPoint: any): void;
    _searchChildInFrustum(frustum: any, object: any): void;
}
import { Vector3 } from 'three';
