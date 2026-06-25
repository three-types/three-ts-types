/**
 * Represents an Oculus hand pointer model.
 *
 * @augments Object3D
 * @three_import import { OculusHandPointerModel } from 'three/addons/webxr/OculusHandPointerModel.js';
 */
export class OculusHandPointerModel extends Object3D {
    /**
     * Constructs a new Oculus hand model.
     *
     * @param {Group} hand - The hand controller.
     * @param {Group} controller - The WebXR controller in target ray space.
     */
    constructor(hand: Group, controller: Group);
    /**
     * The hand controller.
     *
     * @type {Group}
     */
    hand: Group;
    /**
     * The WebXR controller in target ray space.
     *
     * @type {Group}
     */
    controller: Group;
    motionController: any;
    envMap: any;
    mesh: any;
    /**
     * The pointer geometry.
     *
     * @type {?BufferGeometry}
     * @default null
     */
    pointerGeometry: BufferGeometry | null;
    /**
     * The pointer mesh.
     *
     * @type {?Mesh}
     * @default null
     */
    pointerMesh: Mesh | null;
    /**
     * The pointer object that holds the pointer mesh.
     *
     * @type {?Object3D}
     * @default null
     */
    pointerObject: Object3D | null;
    /**
     * Whether the model is pinched or not.
     *
     * @type {?boolean}
     * @default false
     */
    pinched: boolean | null;
    /**
     * Whether the model is attached or not.
     *
     * @type {boolean}
     * @default false
     */
    attached: boolean;
    /**
     * The cursor object.
     *
     * @type {?Mesh}
     * @default null
     */
    cursorObject: Mesh | null;
    /**
     * The internal raycaster used for detecting
     * intersections.
     *
     * @type {?Raycaster}
     * @default null
     */
    raycaster: Raycaster | null;
    _onConnected(event: any): void;
    _onDisconnected(): void;
    xrInputSource: any;
    _drawVerticesRing(vertices: any, baseVector: any, ringIndex: any): void;
    _updatePointerVertices(rearRadius: any): void;
    /**
     * Creates a pointer mesh and adds it to this model.
     */
    createPointer(): void;
    _updateRaycaster(): void;
    _updatePointer(): void;
    /**
     * Returns `true` is the model is pinched.
     *
     * @return {boolean} Whether the model is pinched or not.
     */
    isPinched(): boolean;
    /**
     * Sets the attached state.
     *
     * @param {boolean} attached - Whether the model is attached or not.
     */
    setAttached(attached: boolean): void;
    /**
     * Returns `true` is the model is attached.
     *
     * @return {boolean} Whether the model is attached or not.
     */
    isAttached(): boolean;
    /**
     * Performs an intersection test with the model's raycaster and the given object.
     *
     * @param {Object3D} object - The 3D object to check for intersection with the ray.
     * @param {boolean} [recursive=true] - If set to `true`, it also checks all descendants.
     * Otherwise it only checks intersection with the object.
     * @return {Array<Raycaster~Intersection>} An array holding the intersection points.
     */
    intersectObject(object: Object3D, recursive?: boolean): Array<Raycaster>;
    /**
     * Performs an intersection test with the model's raycaster and the given objects.
     *
     * @param {Array<Object3D>} objects - The 3D objects to check for intersection with the ray.
     * @param {boolean} [recursive=true] - If set to `true`, it also checks all descendants.
     * Otherwise it only checks intersection with the object.
     * @return {Array<Raycaster~Intersection>} An array holding the intersection points.
     */
    intersectObjects(objects: Array<Object3D>, recursive?: boolean): Array<Raycaster>;
    /**
     * Checks for intersections between the model's raycaster and the given objects. The method
     * updates the cursor object to the intersection point.
     *
     * @param {Array<Object3D>} objects - The 3D objects to check for intersection with the ray.
     * @param {boolean} [recursive=false] - If set to `true`, it also checks all descendants.
     * Otherwise it only checks intersection with the object.
     */
    checkIntersections(objects: Array<Object3D>, recursive?: boolean): void;
    /**
     * Sets the cursor to the given distance.
     *
     * @param {number} distance - The distance to set the cursor to.
     */
    setCursor(distance: number): void;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     */
    dispose(): void;
}
import { Object3D } from 'three';
import { BufferGeometry } from 'three';
import { Mesh } from 'three';
import { Raycaster } from 'three';
