/**
 * This class is similar to {@link OrbitControls}. However, it does not maintain a constant camera
 * `up` vector. That means if the camera orbits over the “north” and “south” poles, it does not flip
 * to stay "right side up".
 *
 * @augments Controls
 * @three_import import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
 */
export class TrackballControls extends Controls {
    /**
     * Constructs a new controls instance.
     *
     * @param {Object3D} object - The object that is managed by the controls.
     * @param {?HTMLElement} domElement - The HTML element used for event listeners.
     */
    constructor(object: Object3D, domElement?: HTMLElement | null);
    /**
     * Represents the properties of the screen. Automatically set when `handleResize()` is called.
     *
     * @type {Object}
     * @readonly
     */
    readonly screen: Object;
    /**
     * The rotation speed.
     *
     * @type {number}
     * @default 1
     */
    rotateSpeed: number;
    /**
     * The zoom speed.
     *
     * @type {number}
     * @default 1.2
     */
    zoomSpeed: number;
    /**
     * The pan speed.
     *
     * @type {number}
     * @default 0.3
     */
    panSpeed: number;
    /**
     * Whether rotation is disabled or not.
     *
     * @type {boolean}
     * @default false
     */
    noRotate: boolean;
    /**
     * Whether zooming is disabled or not.
     *
     * @type {boolean}
     * @default false
     */
    noZoom: boolean;
    /**
     * Whether panning is disabled or not.
     *
     * @type {boolean}
     * @default false
     */
    noPan: boolean;
    /**
     * Whether damping is disabled or not.
     *
     * @type {boolean}
     * @default false
     */
    staticMoving: boolean;
    /**
     * Defines the intensity of damping. Only considered if `staticMoving` is set to `false`.
     *
     * @type {number}
     * @default 0.2
     */
    dynamicDampingFactor: number;
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
     * The focus point of the controls.
     *
     * @type {Vector3}
     */
    target: Vector3;
    keyState: number;
    _lastPosition: Vector3;
    _lastZoom: number;
    _touchZoomDistanceStart: number;
    _touchZoomDistanceEnd: number;
    _lastAngle: number;
    _eye: Vector3;
    _movePrev: Vector2;
    _moveCurr: Vector2;
    _lastAxis: Vector3;
    _zoomStart: Vector2;
    _zoomEnd: Vector2;
    _panStart: Vector2;
    _panEnd: Vector2;
    _pointers: any[];
    _pointerPositions: {};
    _onPointerMove: typeof onPointerMove;
    _onPointerDown: typeof onPointerDown;
    _onPointerUp: typeof onPointerUp;
    _onPointerCancel: typeof onPointerCancel;
    _onContextMenu: typeof onContextMenu;
    _onMouseWheel: typeof onMouseWheel;
    _onKeyDown: typeof onKeyDown;
    _onKeyUp: typeof onKeyUp;
    _onTouchStart: typeof onTouchStart;
    _onTouchMove: typeof onTouchMove;
    _onTouchEnd: typeof onTouchEnd;
    _onMouseDown: typeof onMouseDown;
    _onMouseMove: typeof onMouseMove;
    _onMouseUp: typeof onMouseUp;
    _target0: Vector3;
    _position0: any;
    _up0: Vector3;
    _zoom0: any;
    connect(element: any): void;
    /**
     * Must be called if the application window is resized.
     */
    handleResize(): void;
    /**
     * Resets the controls to its initial state.
     */
    reset(): void;
    _panCamera(): void;
    _rotateCamera(): void;
    _zoomCamera(): void;
    _getMouseOnScreen(pageX: any, pageY: any): Vector2;
    _getMouseOnCircle(pageX: any, pageY: any): Vector2;
    _addPointer(event: any): void;
    _removePointer(event: any): void;
    _trackPointer(event: any): void;
    _getSecondPointerPosition(event: any): any;
    _checkDistances(): void;
}
import { Controls } from 'three';
import { Vector3 } from 'three';
import { Vector2 } from 'three';
declare function onPointerMove(event: any): void;
declare function onPointerDown(event: any): void;
declare function onPointerUp(event: any): void;
declare function onPointerCancel(event: any): void;
declare function onContextMenu(event: any): void;
declare function onMouseWheel(event: any): void;
declare function onKeyDown(event: any): void;
declare class onKeyDown {
    constructor(event: any);
    keyState: number | undefined;
}
declare function onKeyUp(): void;
declare class onKeyUp {
    keyState: number | undefined;
}
declare function onTouchStart(event: any): void;
declare class onTouchStart {
    constructor(event: any);
    state: number;
    _touchZoomDistanceEnd: number | undefined;
    _touchZoomDistanceStart: number | undefined;
}
declare function onTouchMove(event: any): void;
declare class onTouchMove {
    constructor(event: any);
    _touchZoomDistanceEnd: number | undefined;
}
declare function onTouchEnd(event: any): void;
declare class onTouchEnd {
    constructor(event: any);
    state: number | undefined;
}
declare function onMouseDown(event: any): void;
declare class onMouseDown {
    constructor(event: any);
    state: number;
}
declare function onMouseMove(event: any): void;
declare function onMouseUp(): void;
declare class onMouseUp {
    state: number;
}
export {};
