/**
 * This is the base class for most objects in three.js and provides a set of
 * properties and methods for manipulating objects in 3D space.
 *
 * @augments EventDispatcher
 */
export class Object3D extends EventDispatcher {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isObject3D: boolean;
    /**
     * The UUID of the 3D object.
     *
     * @type {string}
     * @readonly
     */
    readonly uuid: string;
    /**
     * The name of the 3D object.
     *
     * @type {string}
     */
    name: string;
    /**
     * The type property is used for detecting the object type
     * in context of serialization/deserialization.
     *
     * @type {string}
     * @readonly
     */
    readonly type: string;
    /**
     * A reference to the parent object.
     *
     * @type {?Object3D}
     * @default null
     */
    parent: Object3D | null;
    /**
     * An array holding the child 3D objects of this instance.
     *
     * @type {Array<Object3D>}
     */
    children: Array<Object3D>;
    /**
     * Defines the `up` direction of the 3D object which influences
     * the orientation via methods like {@link Object3D#lookAt}.
     *
     * The default values for all 3D objects is defined by `Object3D.DEFAULT_UP`.
     *
     * @type {Vector3}
     */
    up: Vector3;
    /**
     * Represents the object's transformation matrix in local space.
     *
     * @type {Matrix4}
     */
    matrix: Matrix4;
    /**
     * Represents the object's transformation matrix in world space.
     * If the 3D object has no parent, then it's identical to the local transformation matrix
     *
     * @type {Matrix4}
     */
    matrixWorld: Matrix4;
    /**
     * When set to `true`, the engine automatically computes the local matrix from position,
     * rotation and scale every frame. If set to `false`, the app is responsible for recomputing
     * the local matrix by calling `updateMatrix()`.
     *
     * The default values for all 3D objects is defined by `Object3D.DEFAULT_MATRIX_AUTO_UPDATE`.
     *
     * @type {boolean}
     * @default true
     */
    matrixAutoUpdate: boolean;
    /**
     * When set to `true`, the engine automatically computes the world matrix from the current local
     * matrix and the object's transformation hierarchy. If set to `false`, the app is responsible for
     * recomputing the world matrix by directly updating the `matrixWorld` property.
     *
     * The default values for all 3D objects is defined by `Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE`.
     *
     * @type {boolean}
     * @default true
     */
    matrixWorldAutoUpdate: boolean;
    /**
     * When set to `true`, it calculates the world matrix in that frame and resets this property
     * to `false`.
     *
     * @type {boolean}
     * @default false
     */
    matrixWorldNeedsUpdate: boolean;
    /**
     * The layer membership of the 3D object. The 3D object is only visible if it has
     * at least one layer in common with the camera in use. This property can also be
     * used to filter out unwanted objects in ray-intersection tests when using {@link Raycaster}.
     *
     * @type {Layers}
     */
    layers: Layers;
    /**
     * When set to `true`, the 3D object gets rendered.
     *
     * @type {boolean}
     * @default true
     */
    visible: boolean;
    /**
     * When set to `true`, the 3D object gets rendered into shadow maps.
     *
     * @type {boolean}
     * @default false
     */
    castShadow: boolean;
    /**
     * When set to `true`, the 3D object is affected by shadows in the scene.
     *
     * @type {boolean}
     * @default false
     */
    receiveShadow: boolean;
    /**
     * When set to `true`, the 3D object is honored by view frustum culling.
     *
     * @type {boolean}
     * @default true
     */
    frustumCulled: boolean;
    /**
     * This value allows the default rendering order of scene graph objects to be
     * overridden although opaque and transparent objects remain sorted independently.
     * When this property is set for an instance of {@link Group},all descendants
     * objects will be sorted and rendered together. Sorting is from lowest to highest
     * render order.
     *
     * @type {number}
     * @default 0
     */
    renderOrder: number;
    /**
     * An array holding the animation clips of the 3D object.
     *
     * @type {Array<AnimationClip>}
     */
    animations: Array<AnimationClip>;
    /**
     * Custom depth material to be used when rendering to the depth map. Can only be used
     * in context of meshes. When shadow-casting with a {@link DirectionalLight} or {@link SpotLight},
     * if you are modifying vertex positions in the vertex shader you must specify a custom depth
     * material for proper shadows.
     *
     * Only relevant in context of {@link WebGLRenderer}.
     *
     * @type {(Material|undefined)}
     * @default undefined
     */
    customDepthMaterial: (Material | undefined);
    /**
     * Same as {@link Object3D#customDepthMaterial}, but used with {@link PointLight}.
     *
     * Only relevant in context of {@link WebGLRenderer}.
     *
     * @type {(Material|undefined)}
     * @default undefined
     */
    customDistanceMaterial: (Material | undefined);
    /**
     * Whether the 3D object is supposed to be static or not. If set to `true`, it means
     * the 3D object is not going to be changed after the initial renderer. This includes
     * geometry and material settings. A static 3D object can be processed by the renderer
     * slightly faster since certain state checks can be bypassed.
     *
     * Only relevant in context of {@link WebGPURenderer}.
     *
     * @type {boolean}
     * @default false
     */
    static: boolean;
    /**
     * An object that can be used to store custom data about the 3D object. It
     * should not hold references to functions as these will not be cloned.
     *
     * @type {Object}
     */
    userData: Object;
    /**
     * The pivot point for rotation and scale transformations.
     * When set, rotation and scale are applied around this point
     * instead of the object's origin.
     *
     * @type {?Vector3}
     * @default null
     */
    pivot: Vector3 | null;
    /**
     * A callback that is executed immediately before a 3D object is rendered to a shadow map.
     *
     * @param {Renderer|WebGLRenderer} renderer - The renderer.
     * @param {Object3D} object - The 3D object.
     * @param {Camera} camera - The camera that is used to render the scene.
     * @param {Camera} shadowCamera - The shadow camera.
     * @param {BufferGeometry} geometry - The 3D object's geometry.
     * @param {Material} depthMaterial - The depth material.
     * @param {Object} group - The geometry group data.
     */
    onBeforeShadow(): void;
    /**
     * A callback that is executed immediately after a 3D object is rendered to a shadow map.
     *
     * @param {Renderer|WebGLRenderer} renderer - The renderer.
     * @param {Object3D} object - The 3D object.
     * @param {Camera} camera - The camera that is used to render the scene.
     * @param {Camera} shadowCamera - The shadow camera.
     * @param {BufferGeometry} geometry - The 3D object's geometry.
     * @param {Material} depthMaterial - The depth material.
     * @param {Object} group - The geometry group data.
     */
    onAfterShadow(): void;
    /**
     * A callback that is executed immediately before a 3D object is rendered.
     *
     * @param {Renderer|WebGLRenderer} renderer - The renderer.
     * @param {Object3D} object - The 3D object.
     * @param {Camera} camera - The camera that is used to render the scene.
     * @param {BufferGeometry} geometry - The 3D object's geometry.
     * @param {Material} material - The 3D object's material.
     * @param {Object} group - The geometry group data.
     */
    onBeforeRender(): void;
    /**
     * A callback that is executed immediately after a 3D object is rendered.
     *
     * @param {Renderer|WebGLRenderer} renderer - The renderer.
     * @param {Object3D} object - The 3D object.
     * @param {Camera} camera - The camera that is used to render the scene.
     * @param {BufferGeometry} geometry - The 3D object's geometry.
     * @param {Material} material - The 3D object's material.
     * @param {Object} group - The geometry group data.
     */
    onAfterRender(): void;
    /**
     * Applies the given transformation matrix to the object and updates the object's position,
     * rotation and scale.
     *
     * @param {Matrix4} matrix - The transformation matrix.
     */
    applyMatrix4(matrix: Matrix4): void;
    /**
     * Applies a rotation represented by given the quaternion to the 3D object.
     *
     * @param {Quaternion} q - The quaternion.
     * @return {Object3D} A reference to this instance.
     */
    applyQuaternion(q: Quaternion): Object3D;
    /**
     * Sets the given rotation represented as an axis/angle couple to the 3D object.
     *
     * @param {Vector3} axis - The (normalized) axis vector.
     * @param {number} angle - The angle in radians.
     */
    setRotationFromAxisAngle(axis: Vector3, angle: number): void;
    /**
     * Sets the given rotation represented as Euler angles to the 3D object.
     *
     * @param {Euler} euler - The Euler angles.
     */
    setRotationFromEuler(euler: Euler): void;
    /**
     * Sets the given rotation represented as rotation matrix to the 3D object.
     *
     * @param {Matrix4} m - Although a 4x4 matrix is expected, the upper 3x3 portion must be
     * a pure rotation matrix (i.e, unscaled).
     */
    setRotationFromMatrix(m: Matrix4): void;
    /**
     * Sets the given rotation represented as a Quaternion to the 3D object.
     *
     * @param {Quaternion} q - The Quaternion
     */
    setRotationFromQuaternion(q: Quaternion): void;
    /**
     * Rotates the 3D object along an axis in local space.
     *
     * @param {Vector3} axis - The (normalized) axis vector.
     * @param {number} angle - The angle in radians.
     * @return {Object3D} A reference to this instance.
     */
    rotateOnAxis(axis: Vector3, angle: number): Object3D;
    /**
     * Rotates the 3D object along an axis in world space.
     *
     * @param {Vector3} axis - The (normalized) axis vector.
     * @param {number} angle - The angle in radians.
     * @return {Object3D} A reference to this instance.
     */
    rotateOnWorldAxis(axis: Vector3, angle: number): Object3D;
    /**
     * Rotates the 3D object around its X axis in local space.
     *
     * @param {number} angle - The angle in radians.
     * @return {Object3D} A reference to this instance.
     */
    rotateX(angle: number): Object3D;
    /**
     * Rotates the 3D object around its Y axis in local space.
     *
     * @param {number} angle - The angle in radians.
     * @return {Object3D} A reference to this instance.
     */
    rotateY(angle: number): Object3D;
    /**
     * Rotates the 3D object around its Z axis in local space.
     *
     * @param {number} angle - The angle in radians.
     * @return {Object3D} A reference to this instance.
     */
    rotateZ(angle: number): Object3D;
    /**
     * Translate the 3D object by a distance along the given axis in local space.
     *
     * @param {Vector3} axis - The (normalized) axis vector.
     * @param {number} distance - The distance in world units.
     * @return {Object3D} A reference to this instance.
     */
    translateOnAxis(axis: Vector3, distance: number): Object3D;
    /**
     * Translate the 3D object by a distance along its X-axis in local space.
     *
     * @param {number} distance - The distance in world units.
     * @return {Object3D} A reference to this instance.
     */
    translateX(distance: number): Object3D;
    /**
     * Translate the 3D object by a distance along its Y-axis in local space.
     *
     * @param {number} distance - The distance in world units.
     * @return {Object3D} A reference to this instance.
     */
    translateY(distance: number): Object3D;
    /**
     * Translate the 3D object by a distance along its Z-axis in local space.
     *
     * @param {number} distance - The distance in world units.
     * @return {Object3D} A reference to this instance.
     */
    translateZ(distance: number): Object3D;
    /**
     * Converts the given vector from this 3D object's local space to world space.
     *
     * @param {Vector3} vector - The vector to convert.
     * @return {Vector3} The converted vector.
     */
    localToWorld(vector: Vector3): Vector3;
    /**
     * Converts the given vector from this 3D object's world space to local space.
     *
     * @param {Vector3} vector - The vector to convert.
     * @return {Vector3} The converted vector.
     */
    worldToLocal(vector: Vector3): Vector3;
    /**
     * Rotates the object to face a point in world space.
     *
     * This method does not support objects having non-uniformly-scaled parent(s).
     *
     * @param {number|Vector3} x - The x coordinate in world space. Alternatively, a vector representing a position in world space
     * @param {number} [y] - The y coordinate in world space.
     * @param {number} [z] - The z coordinate in world space.
     */
    lookAt(x: number | Vector3, y?: number, z?: number): void;
    /**
     * Adds the given 3D object as a child to this 3D object. An arbitrary number of
     * objects may be added. Any current parent on an object passed in here will be
     * removed, since an object can have at most one parent.
     *
     * @fires Object3D#added
     * @fires Object3D#childadded
     * @param {Object3D} object - The 3D object to add.
     * @return {Object3D} A reference to this instance.
     */
    add(object: Object3D, ...args: any[]): Object3D;
    /**
     * Removes the given 3D object as child from this 3D object.
     * An arbitrary number of objects may be removed.
     *
     * @fires Object3D#removed
     * @fires Object3D#childremoved
     * @param {Object3D} object - The 3D object to remove.
     * @return {Object3D} A reference to this instance.
     */
    remove(object: Object3D, ...args: any[]): Object3D;
    /**
     * Removes this 3D object from its current parent.
     *
     * @fires Object3D#removed
     * @fires Object3D#childremoved
     * @return {Object3D} A reference to this instance.
     */
    removeFromParent(): Object3D;
    /**
     * Removes all child objects.
     *
     * @fires Object3D#removed
     * @fires Object3D#childremoved
     * @return {Object3D} A reference to this instance.
     */
    clear(): Object3D;
    /**
     * Adds the given 3D object as a child of this 3D object, while maintaining the object's world
     * transform. This method does not support scene graphs having non-uniformly-scaled nodes(s).
     *
     * @fires Object3D#added
     * @fires Object3D#childadded
     * @param {Object3D} object - The 3D object to attach.
     * @return {Object3D} A reference to this instance.
     */
    attach(object: Object3D): Object3D;
    /**
     * Searches through the 3D object and its children, starting with the 3D object
     * itself, and returns the first with a matching ID.
     *
     * @param {number} id - The id.
     * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
     */
    getObjectById(id: number): Object3D | undefined;
    /**
     * Searches through the 3D object and its children, starting with the 3D object
     * itself, and returns the first with a matching name.
     *
     * @param {string} name - The name.
     * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
     */
    getObjectByName(name: string): Object3D | undefined;
    /**
     * Searches through the 3D object and its children, starting with the 3D object
     * itself, and returns the first with a matching property value.
     *
     * @param {string} name - The name of the property.
     * @param {any} value - The value.
     * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
     */
    getObjectByProperty(name: string, value: any): Object3D | undefined;
    /**
     * Searches through the 3D object and its children, starting with the 3D object
     * itself, and returns all 3D objects with a matching property value.
     *
     * @param {string} name - The name of the property.
     * @param {any} value - The value.
     * @param {Array<Object3D>} result - The method stores the result in this array.
     * @return {Array<Object3D>} The found 3D objects.
     */
    getObjectsByProperty(name: string, value: any, result?: Array<Object3D>): Array<Object3D>;
    /**
     * Returns a vector representing the position of the 3D object in world space.
     *
     * @param {Vector3} target - The target vector the result is stored to.
     * @return {Vector3} The 3D object's position in world space.
     */
    getWorldPosition(target: Vector3): Vector3;
    /**
     * Returns a Quaternion representing the position of the 3D object in world space.
     *
     * @param {Quaternion} target - The target Quaternion the result is stored to.
     * @return {Quaternion} The 3D object's rotation in world space.
     */
    getWorldQuaternion(target: Quaternion): Quaternion;
    /**
     * Returns a vector representing the scale of the 3D object in world space.
     *
     * @param {Vector3} target - The target vector the result is stored to.
     * @return {Vector3} The 3D object's scale in world space.
     */
    getWorldScale(target: Vector3): Vector3;
    /**
     * Returns a vector representing the ("look") direction of the 3D object in world space.
     *
     * @param {Vector3} target - The target vector the result is stored to.
     * @return {Vector3} The 3D object's direction in world space.
     */
    getWorldDirection(target: Vector3): Vector3;
    /**
     * Abstract method to get intersections between a casted ray and this
     * 3D object. Renderable 3D objects such as {@link Mesh}, {@link Line} or {@link Points}
     * implement this method in order to use raycasting.
     *
     * @abstract
     * @param {Raycaster} raycaster - The raycaster.
     * @param {Array<Object>} intersects - An array holding the result of the method.
     */
    raycast(): void;
    /**
     * Executes the callback on this 3D object and all descendants.
     *
     * Note: Modifying the scene graph inside the callback is discouraged.
     *
     * @param {Function} callback - A callback function that allows to process the current 3D object.
     */
    traverse(callback: Function): void;
    /**
     * Like {@link Object3D#traverse}, but the callback will only be executed for visible 3D objects.
     * Descendants of invisible 3D objects are not traversed.
     *
     * Note: Modifying the scene graph inside the callback is discouraged.
     *
     * @param {Function} callback - A callback function that allows to process the current 3D object.
     */
    traverseVisible(callback: Function): void;
    /**
     * Like {@link Object3D#traverse}, but the callback will only be executed for all ancestors.
     *
     * Note: Modifying the scene graph inside the callback is discouraged.
     *
     * @param {Function} callback - A callback function that allows to process the current 3D object.
     */
    traverseAncestors(callback: Function): void;
    /**
     * Updates the transformation matrix in local space by computing it from the current
     * position, rotation and scale values.
     */
    updateMatrix(): void;
    /**
     * Updates the transformation matrix in world space of this 3D objects and its descendants.
     *
     * To ensure correct results, this method also recomputes the 3D object's transformation matrix in
     * local space. The computation of the local and world matrix can be controlled with the
     * {@link Object3D#matrixAutoUpdate} and {@link Object3D#matrixWorldAutoUpdate} flags which are both
     * `true` by default.  Set these flags to `false` if you need more control over the update matrix process.
     *
     * @param {boolean} [force=false] - When set to `true`, a recomputation of world matrices is forced even
     * when {@link Object3D#matrixWorldNeedsUpdate} is `false`.
     */
    updateMatrixWorld(force?: boolean): void;
    /**
     * An alternative version of {@link Object3D#updateMatrixWorld} with more control over the
     * update of ancestor and descendant nodes.
     *
     * @param {boolean} [updateParents=false] Whether ancestor nodes should be updated or not.
     * @param {boolean} [updateChildren=false] Whether descendant nodes should be updated or not.
     */
    updateWorldMatrix(updateParents?: boolean, updateChildren?: boolean): void;
    /**
     * Serializes the 3D object into JSON.
     *
     * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
     * @return {Object} A JSON object representing the serialized 3D object.
     * @see {@link ObjectLoader#parse}
     */
    toJSON(meta: (Object | string) | null): Object;
    /**
     * Returns a new 3D object with copied values from this instance.
     *
     * @param {boolean} [recursive=true] - When set to `true`, descendants of the 3D object are also cloned.
     * @return {Object3D} A clone of this instance.
     */
    clone(recursive?: boolean): Object3D;
    /**
     * Copies the values of the given 3D object to this instance.
     *
     * @param {Object3D} source - The 3D object to copy.
     * @param {boolean} [recursive=true] - When set to `true`, descendants of the 3D object are cloned.
     * @return {Object3D} A reference to this instance.
     */
    copy(source: Object3D, recursive?: boolean): Object3D;
}
export namespace Object3D {
    let DEFAULT_UP: Vector3;
    let DEFAULT_MATRIX_AUTO_UPDATE: boolean;
    let DEFAULT_MATRIX_WORLD_AUTO_UPDATE: boolean;
}
import { EventDispatcher } from './EventDispatcher.js';
import { Vector3 } from '../math/Vector3.js';
import { Matrix4 } from '../math/Matrix4.js';
import { Layers } from './Layers.js';
import { Quaternion } from '../math/Quaternion.js';
import { Euler } from '../math/Euler.js';
