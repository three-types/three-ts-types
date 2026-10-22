/**
 * Represents an Oculus hand model.
 *
 * @augments Object3D
 * @three_import import { OculusHandModel } from 'three/addons/webxr/OculusHandModel.js';
 */
export class OculusHandModel extends Object3D {
    /**
     * Constructs a new Oculus hand model.
     *
     * @param {Group} controller - The hand controller.
     * @param {?Loader} [loader=null] - A loader that is used to load hand models.
     * @param {?Function} [onLoad=null] - A callback that is executed when a hand model has been loaded.
     */
    constructor(controller: Group, loader?: Loader | null, onLoad?: Function | null);
    /**
     * The hand controller.
     *
     * @type {Group}
     */
    controller: Group;
    /**
     * The motion controller.
     *
     * @type {?MotionController}
     * @default null
     */
    motionController: MotionController | null;
    /**
     * The model's environment map.
     *
     * @type {?Texture}
     * @default null
     */
    envMap: Texture | null;
    /**
     * A loader that is used to load hand models.
     *
     * @type {?Loader}
     * @default null
     */
    loader: Loader | null;
    /**
     * A callback that is executed when a hand model has been loaded.
     *
     * @type {?Function}
     * @default null
     */
    onLoad: Function | null;
    /**
     * The path to the model repository.
     *
     * @type {?string}
     * @default null
     */
    path: string | null;
    /**
     * The model mesh.
     *
     * @type {Mesh}
     * @default null
     */
    mesh: Mesh;
    xrInputSource: any;
    /**
     * Returns the pointer position which is the position of the index finger tip.
     *
     * @return {?Vector3} The pointer position. Returns `null` if not index finger tip joint was found.
     */
    getPointerPosition(): Vector3 | null;
    /**
     * Returns `true` if the current pointer position (the index finger tip) intersections
     * with the given box object.
     *
     *  @param {Mesh} boxObject - The box object.
     * @return {boolean} Whether an intersection was found or not.
     */
    intersectBoxObject(boxObject: Mesh): boolean;
    /**
     * Executed actions depending on the interaction state with
     * the given button.
     *
     *  @param {Object} button - The button.
     */
    checkButton(button: Object): void;
}
import { Object3D } from 'three';
