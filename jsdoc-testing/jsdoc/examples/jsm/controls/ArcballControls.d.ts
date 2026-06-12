/**
 * Arcball controls allow the camera to be controlled by a virtual trackball with full touch support and advanced navigation functionality.
 * Cursor/finger positions and movements are mapped over a virtual trackball surface represented by a gizmo and mapped in intuitive and
 * consistent camera movements. Dragging cursor/fingers will cause camera to orbit around the center of the trackball in a conservative
 * way (returning to the starting point will make the camera return to its starting orientation).
 *
 * In addition to supporting pan, zoom and pinch gestures, double clicking/tapping focuses on a point, intuitively moving the object's
 * point of interest to the center of the virtual trackball. Focus allows a much better inspection and navigation in complex environment.
 * Moreover Arcball controls allow FOV manipulation (in a vertigo-style method) and z-rotation. Saving and restoring of Camera State
 * is supported also through clipboard (use ctrl+c and ctrl+v shortcuts for copy and paste the state).
 *
 * Unlike {@link OrbitControls} and {@link TrackballControls}, `ArcballControls` doesn't require `update()` to be called externally in an
 * animation loop when animations are on.
 *
 * @augments Controls
 * @three_import import { ArcballControls } from 'three/addons/controls/ArcballControls.js';
 */
export class ArcballControls extends Controls {
    /**
     * Constructs a new controls instance.
     *
     * @param {Camera} camera - The camera to be controlled. The camera must not be a child of another object, unless that object is the scene itself.
     * @param {?HTMLElement} [domElement=null] - The HTML element used for event listeners.
     * @param {?Scene} [scene=null] The scene rendered by the camera. If not given, gizmos cannot be shown.
     */
    constructor(camera: Camera, domElement?: HTMLElement | null, scene?: Scene | null);
    /**
     * The scene rendered by the camera. If not given, gizmos cannot be shown.
     *
     * @type {?Scene}
     * @default null
     */
    scene: Scene | null;
    /**
     * The control's focus point.
     *
     * @type {Vector3}
     */
    target: Vector3;
    _currentTarget: Vector3;
    /**
     * The size of the gizmo relative to the screen width and height.
     *
     * @type {number}
     * @default 0.67
     */
    radiusFactor: number;
    /**
     * Holds the mouse actions of this controls. This property is maintained by the methods
     * `setMouseAction()` and `unsetMouseAction()`.
     *
     * @type {Array<Object>}
     */
    mouseActions: Array<Object>;
    _mouseOp: any;
    _v2_1: Vector2;
    _v3_1: Vector3;
    _v3_2: Vector3;
    _m4_1: Matrix4;
    _m4_2: Matrix4;
    _quat: Quaternion;
    _translationMatrix: Matrix4;
    _rotationMatrix: Matrix4;
    _scaleMatrix: Matrix4;
    _rotationAxis: Vector3;
    _cameraMatrixState: Matrix4;
    _cameraProjectionState: Matrix4;
    _fovState: number;
    _upState: Vector3;
    _zoomState: number;
    _nearPos: number;
    _farPos: number;
    _gizmoMatrixState: Matrix4;
    _up0: Vector3;
    _zoom0: number;
    _fov0: number;
    _initialNear: number;
    _nearPos0: number;
    _initialFar: number;
    _farPos0: number;
    _cameraMatrixState0: Matrix4;
    _gizmoMatrixState0: Matrix4;
    _target0: Vector3;
    _button: number;
    _touchStart: any[];
    _touchCurrent: any[];
    _input: symbol;
    _switchSensibility: number;
    _startFingerDistance: number;
    _currentFingerDistance: number;
    _startFingerRotation: number;
    _currentFingerRotation: number;
    _devPxRatio: number;
    _downValid: boolean;
    _nclicks: number;
    _downEvents: any[];
    _downStart: number;
    _clickStart: number;
    _maxDownTime: number;
    _maxInterval: number;
    _posThreshold: number;
    _movementThreshold: number;
    _currentCursorPosition: Vector3;
    _startCursorPosition: Vector3;
    _grid: GridHelper | null;
    _gridPosition: Vector3;
    _gizmos: Group;
    _curvePts: number;
    _timeStart: number;
    _animationId: number;
    /**
     * Duration of focus animations in ms.
     *
     * @type {number}
     * @default 500
     */
    focusAnimationTime: number;
    _timePrev: number;
    _timeCurrent: number;
    _anglePrev: number;
    _angleCurrent: number;
    _cursorPosPrev: Vector3;
    _cursorPosCurr: Vector3;
    _wPrev: number;
    _wCurr: number;
    /**
     * If set to `true`, the camera's near and far values will be adjusted every time zoom is
     * performed trying to maintain the same visible portion given by initial near and far
     * values. Only works with perspective cameras.
     *
     * This feature only works as expected if the camera's initial state (position, near and far values)
     * is correctly configured before creating the controls. Otherwise {@link ArcballControls#setCamera}
     * must be called by the application.
     *
     * @type {boolean}
     * @default false
     */
    adjustNearFar: boolean;
    /**
     * The scaling factor used when performing zoom operation.
     *
     * @type {number}
     * @default 1.1
     */
    scaleFactor: number;
    /**
     * The damping inertia used if 'enableAnimations` is set to `true`.
     *
     * @type {number}
     * @default 25
     */
    dampingFactor: number;
    /**
     * Maximum angular velocity allowed on rotation animation start.
     *
     * @type {number}
     * @default 20
     */
    wMax: number;
    /**
     * Set to `true` to enable animations for rotation (damping) and focus operation.
     *
     * @type {boolean}
     * @default true
     */
    enableAnimations: boolean;
    /**
     * If set to `true`, a grid will appear when panning operation is being performed
     * (desktop interaction only).
     *
     * @type {boolean}
     * @default false
     */
    enableGrid: boolean;
    /**
     * Set to `true` to make zoom become cursor centered.
     *
     * @type {boolean}
     * @default false
     */
    cursorZoom: boolean;
    /**
     * The minimum FOV in degrees.
     *
     * @type {number}
     * @default 5
     */
    minFov: number;
    /**
     * The maximum FOV in degrees.
     *
     * @type {number}
     * @default 90
     */
    maxFov: number;
    /**
     * Speed of rotation.
     *
     * @type {number}
     * @default 1
     */
    rotateSpeed: number;
    /**
     * Enable or disable camera panning.
     *
     * @type {boolean}
     * @default true
     */
    enablePan: boolean;
    /**
     * Enable or disable camera rotation.
     *
     * @type {boolean}
     * @default true
     */
    enableRotate: boolean;
    /**
     * Enable or disable camera zoom.
     *
     * @type {boolean}
     * @default true
     */
    enableZoom: boolean;
    /**
     * Enable or disable gizmos.
     *
     * @type {boolean}
     * @default true
     */
    enableGizmos: boolean;
    /**
     * Enable or disable camera focusing on double-tap (or click) operations.
     *
     * @type {boolean}
     * @default true
     */
    enableFocus: boolean;
    /**
     * How far you can dolly in. For perspective cameras only.
     *
     * @type {number}
     * @default 0
     */
    minDistance: number;
    /**
     * How far you can dolly out. For perspective cameras only.
     *
     * @type {number}
     * @default Infinity
     */
    maxDistance: number;
    /**
     * How far you can zoom in. For orthographic cameras only.
     *
     * @type {number}
     * @default 0
     */
    minZoom: number;
    /**
     * How far you can zoom out. For orthographic cameras only.
     *
     * @type {number}
     * @default Infinity
     */
    maxZoom: number;
    _tbRadius: number;
    _state: symbol;
    _onContextMenu: typeof onContextMenu;
    _onWheel: typeof onWheel;
    _onPointerUp: typeof onPointerUp;
    _onPointerMove: typeof onPointerMove;
    _onPointerDown: typeof onPointerDown;
    _onPointerCancel: typeof onPointerCancel;
    _onWindowResize: typeof onWindowResize;
    connect(element: any): void;
    onSinglePanStart(event: any, operation: any): void;
    onSinglePanMove(event: any, opState: any): void;
    onSinglePanEnd(): void;
    onDoubleTap(event: any): void;
    onDoublePanStart(): void;
    onDoublePanMove(): void;
    onDoublePanEnd(): void;
    onRotateStart(): void;
    onRotateMove(): void;
    onRotateEnd(): void;
    onPinchStart(): void;
    onPinchMove(): void;
    onPinchEnd(): void;
    onTriplePanStart(): void;
    onTriplePanMove(): void;
    onTriplePanEnd(): void;
    /**
     * Set _center's x/y coordinates.
     *
     * @private
     * @param {number} clientX - The x coordinate.
     * @param {number} clientY - The y coordinate.
     */
    private setCenter;
    /**
     * Set default mouse actions.
     *
     * @private
     */
    private initializeMouseActions;
    /**
     * Compare two mouse actions.
     *
     * @private
     * @param {Object} action1 - The first mouse action.
     * @param {Object} action2 - The second mouse action.
     * @returns {boolean} `true` if action1 and action 2 are the same mouse action, `false` otherwise.
     */
    private compareMouseAction;
    /**
     * Set a new mouse action by specifying the operation to be performed and a mouse/key combination. In case of conflict, replaces the existing one.
     *
     * @param {'PAN'|'ROTATE'|'ZOOM'|'FOV'} operation - The operation to be performed ('PAN', 'ROTATE', 'ZOOM', 'FOV').
     * @param {0|1|2|'WHEEL'} mouse - A mouse button (0, 1, 2) or 'WHEEL' for wheel notches.
     * @param {?('CTRL'|'SHIFT')} [key=null] - The keyboard modifier ('CTRL', 'SHIFT') or null if key is not needed.
     * @returns {boolean} `true` if the mouse action has been successfully added, `false` otherwise.
     */
    setMouseAction(operation: "PAN" | "ROTATE" | "ZOOM" | "FOV", mouse: 0 | 1 | 2 | "WHEEL", key?: ("CTRL" | "SHIFT") | null): boolean;
    /**
     * Remove a mouse action by specifying its mouse/key combination.
     *
     * @param {0|1|2|'WHEEL'} mouse - A mouse button (0, 1, 2) or 'WHEEL' for wheel notches.
     * @param {?('CTRL'|'SHIFT')} key - The keyboard modifier ('CTRL', 'SHIFT') or null if key is not needed.
     * @returns {boolean} `true` if the operation has been successfully removed, `false` otherwise.
     */
    unsetMouseAction(mouse: 0 | 1 | 2 | "WHEEL", key?: ("CTRL" | "SHIFT") | null): boolean;
    /**
     * Return the operation associated to a mouse/keyboard combination.
     *
     * @private
     * @param {0|1|2|'WHEEL'} mouse - Mouse button index (0, 1, 2) or 'WHEEL' for wheel notches.
     * @param {?('CTRL'|'SHIFT')} key - Keyboard modifier.
     * @returns {?('PAN'|'ROTATE'|'ZOOM'|'FOV')} The operation if it has been found, `null` otherwise.
     */
    private getOpFromAction;
    /**
     * Get the operation associated to mouse and key combination and returns the corresponding FSA state.
     *
     * @private
     * @param {0|1|2} mouse - Mouse button index (0, 1, 2)
     * @param {?('CTRL'|'SHIFT')} key - Keyboard modifier
     * @returns {?STATE} The FSA state obtained from the operation associated to mouse/keyboard combination.
     */
    private getOpStateFromAction;
    /**
     * Calculate the angle between two pointers.
     *
     * @private
     * @param {PointerEvent} p1 - The first pointer event.
     * @param {PointerEvent} p2 - The second pointer event.
     * @returns {number} The angle between two pointers in degrees.
     */
    private getAngle;
    /**
     * Updates a PointerEvent inside current pointerevents array.
     *
     * @private
     * @param {PointerEvent} event - The pointer event.
     */
    private updateTouchEvent;
    /**
     * Applies a transformation matrix, to the camera and gizmos.
     *
     * @private
     * @param {Object} transformation - Object containing matrices to apply to camera and gizmos.
     */
    private applyTransformMatrix;
    /**
     * Calculates the angular speed.
     *
     * @private
     * @param {number} p0 - Position at t0.
     * @param {number} p1 - Position at t1.
     * @param {number} t0 - Initial time in milliseconds.
     * @param {number} t1 - Ending time in milliseconds.
     * @returns {number} The angular speed.
     */
    private calculateAngularSpeed;
    /**
     * Calculates the distance between two pointers.
     *
     * @private
     * @param {PointerEvent} p0 - The first pointer.
     * @param {PointerEvent} p1 - The second pointer.
     * @returns {number} The distance between the two pointers.
     */
    private calculatePointersDistance;
    /**
     * Calculates the rotation axis as the vector perpendicular between two vectors.
     *
     * @private
     * @param {Vector3} vec1 - The first vector.
     * @param {Vector3} vec2 - The second vector.
     * @returns {Vector3} The normalized rotation axis.
     */
    private calculateRotationAxis;
    /**
     * Calculates the trackball radius so that gizmo's diameter will be 2/3 of the minimum side of the camera frustum.
     *
     * @private
     * @param {Camera} camera - The camera.
     * @returns {number} The trackball radius.
     */
    private calculateTbRadius;
    /**
     * Focus operation consist of positioning the point of interest in front of the camera and a slightly zoom in.
     *
     * @private
     * @param {Vector3} point - The point of interest.
     * @param {number} size - Scale factor.
     * @param {number} [amount=1] - Amount of operation to be completed (used for focus animations, default is complete full operation).
     */
    private focus;
    /**
     * Creates a grid if necessary and adds it to the scene.
     *
     * @private
     */
    private drawGrid;
    /**
     * Removes the grid from the scene.
     */
    disposeGrid(): void;
    /**
     * Computes the easing out cubic function for ease out effect in animation.
     *
     * @private
     * @param {number} t - The absolute progress of the animation in the bound of `0` (beginning of the) and `1` (ending of animation).
     * @returns {number} Result of easing out cubic at time `t`.
     */
    private easeOutCubic;
    /**
     * Makes rotation gizmos more or less visible.
     *
     * @param {boolean} isActive - If set to `true`, gizmos are more visible.
     */
    activateGizmos(isActive: boolean): void;
    /**
     * Calculates the cursor position in NDC.
     *
     * @private
     * @param {number} cursorX - Cursor horizontal coordinate within the canvas.
     * @param {number} cursorY - Cursor vertical coordinate within the canvas.
     * @param {HTMLElement} canvas - The canvas where the renderer draws its output.
     * @returns {Vector2} Cursor normalized position inside the canvas.
     */
    private getCursorNDC;
    /**
     * Calculates the cursor position inside the canvas x/y coordinates with the origin being in the center of the canvas.
     *
     * @private
     * @param {number} cursorX - Cursor horizontal coordinate within the canvas.
     * @param {number} cursorY - Cursor vertical coordinate within the canvas.
     * @param {HTMLElement} canvas - The canvas where the renderer draws its output.
     * @returns {Vector2} Cursor position inside the canvas.
     */
    private getCursorPosition;
    /**
     * Sets the camera to be controlled.  Must be called in order to set a new camera to be controlled.
     *
     * @param {Camera} camera - The camera to be controlled.
     */
    setCamera(camera: Camera): void;
    /**
     * Sets gizmos visibility.
     *
     * @param {boolean} value - Value of gizmos visibility.
     */
    setGizmosVisible(value: boolean): void;
    /**
     * Sets gizmos radius factor and redraws gizmos.
     *
     * @param {number} value - Value of radius factor.
     */
    setTbRadius(value: number): void;
    /**
     * Creates the rotation gizmos matching trackball center and radius.
     *
     * @private
     * @param {Vector3} tbCenter - The trackball center.
     * @param {number} tbRadius - The trackball radius.
     */
    private makeGizmos;
    /**
     * Performs animation for focus operation.
     *
     * @private
     * @param {number} time - Instant in which this function is called as performance.now().
     * @param {Vector3} point - Point of interest for focus operation.
     * @param {Matrix4} cameraMatrix - Camera matrix.
     * @param {Matrix4} gizmoMatrix - Gizmos matrix.
     */
    private onFocusAnim;
    /**
     * Performs animation for rotation operation.
     *
     * @private
     * @param {number} time - Instant in which this function is called as performance.now().
     * @param {Vector3} rotationAxis - Rotation axis.
     * @param {number} w0 - Initial angular velocity.
     */
    private onRotationAnim;
    /**
     * Performs pan operation moving camera between two points.
     *
     * @private
     * @param {Vector3} p0 - Initial point.
     * @param {Vector3} p1 - Ending point.
     * @param {boolean} [adjust=false] - If movement should be adjusted considering camera distance (Perspective only).
     * @returns {Object}
     */
    private pan;
    /**
     * Resets the controls.
     */
    reset(): void;
    /**
     * Rotates the camera around an axis passing by trackball's center.
     *
     * @private
     * @param {Vector3} axis - Rotation axis.
     * @param {number} angle - Angle in radians.
     * @returns {Object} Object with 'camera' field containing transformation matrix resulting from the operation to be applied to the camera.
     */
    private rotate;
    /**
     * Copy the current state to clipboard (as a readable JSON text).
     */
    copyState(): void;
    /**
     * Set the controls state from the clipboard, assumes that the clipboard stores a JSON
     * text as saved from `copyState()`.
     */
    pasteState(): void;
    /**
     * Saves the current state of the control. This can later be recover with `reset()`.
     */
    saveState(): void;
    /**
     * Performs uniform scale operation around a given point.
     *
     * @private
     * @param {number} size - Scale factor.
     * @param {Vector3} point - Point around which scale.
     * @param {boolean} scaleGizmos - If gizmos should be scaled (Perspective only).
     * @returns {Object} Object with 'camera' and 'gizmo' fields containing transformation matrices resulting from the operation to be applied to the camera and gizmos.
     */
    private scale;
    /**
     * Sets camera fov.
     *
     * @private
     * @param {number} value - The FOV to be set.
     */
    private setFov;
    /**
     * Sets values in transformation object.
     *
     * @private
     * @param {?Matrix4} [camera=null] - Transformation to be applied to the camera.
     * @param {?Matrix4} [gizmos=null] - Transformation to be applied to gizmos.
     */
    private setTransformationMatrices;
    /**
     * Rotates camera around its direction axis passing by a given point by a given angle.
     *
     * @private
     * @param {Vector3} point - The point where the rotation axis is passing trough.
     * @param {number} angle - Angle in radians.
     * @returns {Object} The computed transformation matrix.
     */
    private zRotate;
    /**
     * Returns the raycaster that is used for user interaction. This object is shared between all
     * instances of `ArcballControls`.
     *
     * @returns {Raycaster} The internal raycaster.
     */
    getRaycaster(): Raycaster;
    /**
     * Unprojects the cursor on the 3D object surface.
     *
     * @private
     * @param {Vector2} cursor - Cursor coordinates in NDC.
     * @param {Camera} camera - Virtual camera.
     * @returns {?Vector3} The point of intersection with the model, if exist, null otherwise.
     */
    private unprojectOnObj;
    /**
     * Unproject the cursor on the trackball surface.
     *
     * @private
     * @param {Camera} camera - The virtual camera.
     * @param {number} cursorX - Cursor horizontal coordinate on screen.
     * @param {number} cursorY - Cursor vertical coordinate on screen.
     * @param {HTMLElement} canvas - The canvas where the renderer draws its output.
     * @param {number} tbRadius - The trackball radius.
     * @returns {Vector3} The unprojected point on the trackball surface.
     */
    private unprojectOnTbSurface;
    /**
     * Unprojects the cursor on the plane passing through the center of the trackball orthogonal to the camera.
     *
     * @private
     * @param {Camera} camera - The virtual camera.
     * @param {number} cursorX - Cursor horizontal coordinate on screen.
     * @param {number} cursorY - Cursor vertical coordinate on screen.
     * @param {HTMLElement} canvas - The canvas where the renderer draws its output.
     * @param {boolean} [initialDistance=false] - If initial distance between camera and gizmos should be used for calculations instead of current (Perspective only).
     * @returns {Vector3} The unprojected point on the trackball plane.
     */
    private unprojectOnTbPlane;
    /**
     * Updates camera and gizmos state.
     *
     * @private
     */
    private updateMatrixState;
    /**
     * Updates the trackball FSA.
     *
     * @private
     * @param {STATE} newState - New state of the FSA.
     * @param {boolean} updateMatrices - If matrices state should be updated.
     */
    private updateTbState;
    setStateFromJSON(json: any): void;
}
import { Controls } from 'three';
import { Vector3 } from 'three';
import { Vector2 } from 'three';
import { Matrix4 } from 'three';
import { Quaternion } from 'three';
import { GridHelper } from 'three';
import { Group } from 'three';
declare function onContextMenu(event: any): void;
declare function onWheel(event: any): void;
declare function onPointerUp(event: any): void;
declare class onPointerUp {
    constructor(event: any);
    _input: symbol | undefined;
    _button: number | undefined;
    _nclicks: number | undefined;
    _clickStart: number | undefined;
    _downValid: boolean | undefined;
}
declare function onPointerMove(event: any): void;
declare class onPointerMove {
    constructor(event: any);
    _input: symbol | undefined;
    _downValid: boolean | undefined;
}
declare function onPointerDown(event: any): void;
declare class onPointerDown {
    constructor(event: any);
    _downValid: boolean;
    _downStart: number | undefined;
    _input: symbol | undefined;
    _mouseOp: any;
    _button: any;
}
declare function onPointerCancel(): void;
declare class onPointerCancel {
    _input: symbol;
}
declare function onWindowResize(): void;
declare class onWindowResize {
    _tbRadius: any;
}
import { Raycaster } from 'three';
export {};
