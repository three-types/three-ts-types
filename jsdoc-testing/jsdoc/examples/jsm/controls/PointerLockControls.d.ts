/**
 * The implementation of this class is based on the [Pointer Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API).
 * `PointerLockControls` is a perfect choice for first person 3D games.
 *
 * ```js
 * const controls = new PointerLockControls( camera, document.body );
 *
 * // add event listener to show/hide a UI (e.g. the game's menu)
 * controls.addEventListener( 'lock', function () {
 *
 * 	menu.style.display = 'none';
 *
 * } );
 *
 * controls.addEventListener( 'unlock', function () {
 *
 * 	menu.style.display = 'block';
 *
 * } );
 * ```
 *
 * @augments Controls
 * @three_import import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
 */
export class PointerLockControls extends Controls {
    /**
     * Constructs a new controls instance.
     *
     * @param {Camera} camera - The camera that is managed by the controls.
     * @param {?HTMLElement} domElement - The HTML element used for event listeners.
     */
    constructor(camera: Camera, domElement?: HTMLElement | null);
    /**
     * Whether the controls are locked or not.
     *
     * @type {boolean}
     * @readonly
     * @default false
     */
    readonly isLocked: boolean;
    /**
     * Camera pitch, lower limit. Range is '[0, Math.PI]' in radians.
     *
     * @type {number}
     * @default 0
     */
    minPolarAngle: number;
    /**
     * Camera pitch, upper limit. Range is '[0, Math.PI]' in radians.
     *
     * @type {number}
     * @default Math.PI
     */
    maxPolarAngle: number;
    /**
     * Multiplier for how much the pointer movement influences the camera rotation.
     *
     * @type {number}
     * @default 1
     */
    pointerSpeed: number;
    _onMouseMove: typeof onMouseMove;
    _onPointerlockChange: typeof onPointerlockChange;
    _onPointerlockError: typeof onPointerlockError;
    connect(element: any): void;
    /**
     * Returns the look direction of the camera.
     *
     * @param {Vector3} v - The target vector that is used to store the method's result.
     * @return {Vector3} The normalized direction vector.
     */
    getDirection(v: Vector3): Vector3;
    /**
     * Moves the camera forward parallel to the xz-plane. Assumes camera.up is y-up.
     *
     * @param {number} distance - The signed distance.
     */
    moveForward(distance: number): void;
    /**
     * Moves the camera sidewards parallel to the xz-plane.
     *
     * @param {number} distance - The signed distance.
     */
    moveRight(distance: number): void;
    /**
     * Activates the pointer lock.
     *
     * @param {boolean} [unadjustedMovement=false] - Disables OS-level adjustment for mouse acceleration, and accesses raw mouse input instead.
     * Setting it to true will disable mouse acceleration.
     */
    lock(unadjustedMovement?: boolean): void;
    /**
     * Exits the pointer lock.
     */
    unlock(): void;
}
import { Controls } from 'three';
declare function onMouseMove(event: any): void;
declare function onPointerlockChange(): void;
declare class onPointerlockChange {
    isLocked: boolean;
}
declare function onPointerlockError(): void;
import { Vector3 } from 'three';
export {};
