/**
 * Orbit controls allow the camera to orbit around a target.
 *
 * OrbitControls performs orbiting, dollying (zooming), and panning. Unlike {@link TrackballControls},
 * it maintains the "up" direction `object.up` (+Y by default).
 *
 * - Orbit: Left mouse / touch: one-finger move.
 * - Zoom: Middle mouse, or mousewheel / touch: two-finger spread or squish.
 * - Pan: Right mouse, or left mouse + ctrl/meta/shiftKey, or arrow keys / touch: two-finger move.
 *
 * ```js
 * const controls = new OrbitControls( camera, renderer.domElement );
 *
 * // controls.update() must be called after any manual changes to the camera's transform
 * camera.position.set( 0, 20, 100 );
 * controls.update();
 *
 * function animate() {
 *
 * 	// required if controls.enableDamping or controls.autoRotate are set to true
 * 	controls.update();
 *
 * 	renderer.render( scene, camera );
 *
 * }
 * ```
 *
 * @augments Controls
 * @three_import import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
 */
export class OrbitControls extends Controls {
    /**
     * Constructs a new controls instance.
     *
     * @param {Object3D} object - The object that is managed by the controls.
     * @param {?HTMLElement} domElement - The HTML element used for event listeners.
     */
    constructor(object: Object3D, domElement?: HTMLElement | null);
    /**
     * The focus point of the controls, the `object` orbits around this.
     * It can be updated manually at any point to change the focus of the controls.
     *
     * @type {Vector3}
     */
    target: Vector3;
    /**
     * The focus point of the `minTargetRadius` and `maxTargetRadius` limits.
     * It can be updated manually at any point to change the center of interest
     * for the `target`.
     *
     * @type {Vector3}
     */
    cursor: Vector3;
    /**
     * How far you can dolly in (perspective camera only).
     *
     * @type {number}
     * @default 0
     */
    minDistance: number;
    /**
     * How far you can dolly out (perspective camera only).
     *
     * @type {number}
     * @default Infinity
     */
    maxDistance: number;
    /**
     * How far you can zoom in (orthographic camera only).
     *
     * @type {number}
     * @default 0
     */
    minZoom: number;
    /**
     * How far you can zoom out (orthographic camera only).
     *
     * @type {number}
     * @default Infinity
     */
    maxZoom: number;
    /**
     * How close you can get the target to the 3D `cursor`.
     *
     * @type {number}
     * @default 0
     */
    minTargetRadius: number;
    /**
     * How far you can move the target from the 3D `cursor`.
     *
     * @type {number}
     * @default Infinity
     */
    maxTargetRadius: number;
    /**
     * How far you can orbit vertically, lower limit. Range is `[0, Math.PI]` radians.
     *
     * @type {number}
     * @default 0
     */
    minPolarAngle: number;
    /**
     * How far you can orbit vertically, upper limit. Range is `[0, Math.PI]` radians.
     *
     * @type {number}
     * @default Math.PI
     */
    maxPolarAngle: number;
    /**
     * How far you can orbit horizontally, lower limit. If set, the interval `[ min, max ]`
     * must be a sub-interval of `[ - 2 PI, 2 PI ]`, with `( max - min < 2 PI )`.
     *
     * @type {number}
     * @default -Infinity
     */
    minAzimuthAngle: number;
    /**
     * How far you can orbit horizontally, upper limit. If set, the interval `[ min, max ]`
     * must be a sub-interval of `[ - 2 PI, 2 PI ]`, with `( max - min < 2 PI )`.
     *
     * @type {number}
     * @default -Infinity
     */
    maxAzimuthAngle: number;
    /**
     * Set to `true` to enable damping (inertia), which can be used to give a sense of weight
     * to the controls. Note that if this is enabled, you must call `update()` in your animation
     * loop.
     *
     * @type {boolean}
     * @default false
     */
    enableDamping: boolean;
    /**
     * The damping inertia used if `enableDamping` is set to `true`.
     *
     * Note that for this to work, you must call `update()` in your animation loop.
     *
     * @type {number}
     * @default 0.05
     */
    dampingFactor: number;
    /**
     * Enable or disable zooming (dollying) of the camera.
     *
     * @type {boolean}
     * @default true
     */
    enableZoom: boolean;
    /**
     * Speed of zooming / dollying.
     *
     * @type {number}
     * @default 1
     */
    zoomSpeed: number;
    /**
     * Enable or disable horizontal and vertical rotation of the camera.
     *
     * Note that it is possible to disable a single axis by setting the min and max of the
     * `minPolarAngle` or `minAzimuthAngle` to the same value, which will cause the vertical
     * or horizontal rotation to be fixed at that value.
     *
     * @type {boolean}
     * @default true
     */
    enableRotate: boolean;
    /**
     * Speed of rotation.
     *
     * @type {number}
     * @default 1
     */
    rotateSpeed: number;
    /**
     * How fast to rotate the camera when the keyboard is used.
     *
     * @type {number}
     * @default 1
     */
    keyRotateSpeed: number;
    /**
     * Enable or disable camera panning.
     *
     * @type {boolean}
     * @default true
     */
    enablePan: boolean;
    /**
     * Speed of panning.
     *
     * @type {number}
     * @default 1
     */
    panSpeed: number;
    /**
     * Defines how the camera's position is translated when panning. If `true`, the camera pans
     * in screen space. Otherwise, the camera pans in the plane orthogonal to the camera's up
     * direction.
     *
     * @type {boolean}
     * @default true
     */
    screenSpacePanning: boolean;
    /**
     * How fast to pan the camera when the keyboard is used in
     * pixels per keypress.
     *
     * @type {number}
     * @default 7
     */
    keyPanSpeed: number;
    /**
     * Setting this property to `true` allows to zoom to the cursor's position.
     *
     * @type {boolean}
     * @default false
     */
    zoomToCursor: boolean;
    /**
     * Set to true to automatically rotate around the target
     *
     * Note that if this is enabled, you must call `update()` in your animation loop.
     * If you want the auto-rotate speed to be independent of the frame rate (the refresh
     * rate of the display), you must pass the time `deltaTime`, in seconds, to `update()`.
     *
     * @type {boolean}
     * @default false
     */
    autoRotate: boolean;
    /**
     * How fast to rotate around the target if `autoRotate` is `true`. The default  equates to 30 seconds
     * per orbit at 60fps.
     *
     * Note that if `autoRotate` is enabled, you must call `update()` in your animation loop.
     *
     * @type {number}
     * @default 2
     */
    autoRotateSpeed: number;
    /**
     * Used internally by `saveState()` and `reset()`.
     *
     * @type {Vector3}
     */
    target0: Vector3;
    /**
     * Used internally by `saveState()` and `reset()`.
     *
     * @type {Vector3}
     */
    position0: Vector3;
    /**
     * Used internally by `saveState()` and `reset()`.
     *
     * @type {number}
     */
    zoom0: number;
    _cursorStyle: string;
    _domElementKeyEvents: HTMLElement | null;
    _lastPosition: Vector3;
    _lastQuaternion: Quaternion;
    _lastTargetPosition: Vector3;
    _quat: Quaternion;
    _quatInverse: Quaternion;
    _spherical: Spherical;
    _sphericalDelta: Spherical;
    _scale: number;
    _panOffset: Vector3;
    _rotateStart: Vector2;
    _rotateEnd: Vector2;
    _rotateDelta: Vector2;
    _panStart: Vector2;
    _panEnd: Vector2;
    _panDelta: Vector2;
    _dollyStart: Vector2;
    _dollyEnd: Vector2;
    _dollyDelta: Vector2;
    _dollyDirection: Vector3;
    _mouse: Vector2;
    _performCursorZoom: boolean;
    _pointers: any[];
    _pointerPositions: {};
    _controlActive: boolean;
    _onPointerMove: typeof onPointerMove;
    _onPointerDown: typeof onPointerDown;
    _onPointerUp: typeof onPointerUp;
    _onContextMenu: typeof onContextMenu;
    _onMouseWheel: typeof onMouseWheel;
    _onKeyDown: typeof onKeyDown;
    _onTouchStart: typeof onTouchStart;
    _onTouchMove: typeof onTouchMove;
    _onMouseDown: typeof onMouseDown;
    _onMouseMove: typeof onMouseMove;
    _interceptControlDown: typeof interceptControlDown;
    _interceptControlUp: typeof interceptControlUp;
    /**
     * Defines the visual representation of the cursor.
     *
     * @type {('auto'|'grab')}
     * @default 'auto'
     */
    set cursorStyle(type: string);
    get cursorStyle(): string;
    connect(element: any): void;
    /**
     * Get the current vertical rotation, in radians.
     *
     * @return {number} The current vertical rotation, in radians.
     */
    getPolarAngle(): number;
    /**
     * Get the current horizontal rotation, in radians.
     *
     * @return {number} The current horizontal rotation, in radians.
     */
    getAzimuthalAngle(): number;
    /**
     * Returns the distance from the camera to the target.
     *
     * @return {number} The distance from the camera to the target.
     */
    getDistance(): number;
    /**
     * Adds key event listeners to the given DOM element.
     * `window` is a recommended argument for using this method.
     *
     * @param {HTMLElement} domElement - The DOM element
     */
    listenToKeyEvents(domElement: HTMLElement): void;
    /**
     * Removes the key event listener previously defined with `listenToKeyEvents()`.
     */
    stopListenToKeyEvents(): void;
    /**
     * Save the current state of the controls. This can later be recovered with `reset()`.
     */
    saveState(): void;
    /**
     * Reset the controls to their state from either the last time the `saveState()`
     * was called, or the initial state.
     */
    reset(): void;
    /**
     * Programmatically pan the camera.
     *
     * @param {number} deltaX - The horizontal pan amount in pixels.
     * @param {number} deltaY - The vertical pan amount in pixels.
     */
    pan(deltaX: number, deltaY: number): void;
    /**
     * Programmatically dolly in (zoom in for perspective camera).
     *
     * @param {number} dollyScale - The dolly scale factor.
     */
    dollyIn(dollyScale: number): void;
    /**
     * Programmatically dolly out (zoom out for perspective camera).
     *
     * @param {number} dollyScale - The dolly scale factor.
     */
    dollyOut(dollyScale: number): void;
    /**
     * Programmatically rotate the camera left (around the vertical axis).
     *
     * @param {number} angle - The rotation angle in radians.
     */
    rotateLeft(angle: number): void;
    /**
     * Programmatically rotate the camera up (around the horizontal axis).
     *
     * @param {number} angle - The rotation angle in radians.
     */
    rotateUp(angle: number): void;
    update(deltaTime?: null): boolean;
    _getAutoRotationAngle(deltaTime: any): number;
    _getZoomScale(delta: any): number;
    _rotateLeft(angle: any): void;
    _rotateUp(angle: any): void;
    _panLeft(distance: any, objectMatrix: any): void;
    _panUp(distance: any, objectMatrix: any): void;
    _pan(deltaX: any, deltaY: any): void;
    _dollyOut(dollyScale: any): void;
    _dollyIn(dollyScale: any): void;
    _updateZoomParameters(x: any, y: any): void;
    _clampDistance(dist: any): number;
    _handleMouseDownRotate(event: any): void;
    _handleMouseDownDolly(event: any): void;
    _handleMouseDownPan(event: any): void;
    _handleMouseMoveRotate(event: any): void;
    _handleMouseMoveDolly(event: any): void;
    _handleMouseMovePan(event: any): void;
    _handleMouseWheel(event: any): void;
    _handleKeyDown(event: any): void;
    _handleTouchStartRotate(event: any): void;
    _handleTouchStartPan(event: any): void;
    _handleTouchStartDolly(event: any): void;
    _handleTouchStartDollyPan(event: any): void;
    _handleTouchStartDollyRotate(event: any): void;
    _handleTouchMoveRotate(event: any): void;
    _handleTouchMovePan(event: any): void;
    _handleTouchMoveDolly(event: any): void;
    _handleTouchMoveDollyPan(event: any): void;
    _handleTouchMoveDollyRotate(event: any): void;
    _addPointer(event: any): void;
    _removePointer(event: any): void;
    _isTrackingPointer(event: any): boolean;
    _trackPointer(event: any): void;
    _getSecondPointerPosition(event: any): any;
    _customWheelEvent(event: any): {
        clientX: any;
        clientY: any;
        deltaY: any;
    };
}
import { Controls } from 'three';
import { Vector3 } from 'three';
import { Quaternion } from 'three';
import { Spherical } from 'three';
import { Vector2 } from 'three';
declare function onPointerMove(event: any): void;
declare function onPointerDown(event: any): void;
declare function onPointerUp(event: any): void;
declare class onPointerUp {
    constructor(event: any);
    state: number | undefined;
}
declare function onContextMenu(event: any): void;
declare function onMouseWheel(event: any): void;
declare function onKeyDown(event: any): void;
declare function onTouchStart(event: any): void;
declare class onTouchStart {
    constructor(event: any);
    state: number | undefined;
}
declare function onTouchMove(event: any): void;
declare class onTouchMove {
    constructor(event: any);
    state: number;
}
declare function onMouseDown(event: any): void;
declare class onMouseDown {
    constructor(event: any);
    state: number | undefined;
}
declare function onMouseMove(event: any): void;
declare function interceptControlDown(event: any): void;
declare class interceptControlDown {
    constructor(event: any);
    _controlActive: boolean | undefined;
}
declare function interceptControlUp(event: any): void;
declare class interceptControlUp {
    constructor(event: any);
    _controlActive: boolean | undefined;
}
export {};
