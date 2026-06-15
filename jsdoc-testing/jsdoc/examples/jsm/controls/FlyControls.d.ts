/**
 * This class enables a navigation similar to fly modes in DCC tools like Blender.
 * You can arbitrarily transform the camera in 3D space without any limitations
 * (e.g. focus on a specific target).
 *
 * @augments Controls
 * @three_import import { FlyControls } from 'three/addons/controls/FlyControls.js';
 */
export class FlyControls extends Controls {
    /**
     * Constructs a new controls instance.
     *
     * @param {Object3D} object - The object that is managed by the controls.
     * @param {?HTMLElement} domElement - The HTML element used for event listeners.
     */
    constructor(object: Object3D, domElement?: HTMLElement | null);
    /**
     * The movement speed.
     *
     * @type {number}
     * @default 1
     */
    movementSpeed: number;
    /**
     * The rotation speed.
     *
     * @type {number}
     * @default 0.005
     */
    rollSpeed: number;
    /**
     * If set to `true`, you can only look around by performing a drag interaction.
     *
     * @type {boolean}
     * @default false
     */
    dragToLook: boolean;
    /**
     * If set to `true`, the camera automatically moves forward (and does not stop) when initially translated.
     *
     * @type {boolean}
     * @default false
     */
    autoForward: boolean;
    _moveState: {
        up: number;
        down: number;
        left: number;
        right: number;
        forward: number;
        back: number;
        pitchUp: number;
        pitchDown: number;
        yawLeft: number;
        yawRight: number;
        rollLeft: number;
        rollRight: number;
    };
    _moveVector: Vector3;
    _rotationVector: Vector3;
    _lastQuaternion: Quaternion;
    _lastPosition: Vector3;
    _status: number;
    _onKeyDown: typeof onKeyDown;
    _onKeyUp: typeof onKeyUp;
    _onPointerMove: typeof onPointerMove;
    _onPointerDown: typeof onPointerDown;
    _onPointerUp: typeof onPointerUp;
    _onPointerCancel: typeof onPointerCancel;
    _onContextMenu: typeof onContextMenu;
    connect(element: any): void;
    update(delta: any): void;
    _updateMovementVector(): void;
    _updateRotationVector(): void;
    _getContainerDimensions(): {
        size: number[];
        offset: number[];
    };
}
import { Controls } from 'three';
import { Vector3 } from 'three';
import { Quaternion } from 'three';
declare function onKeyDown(event: any): void;
declare class onKeyDown {
    constructor(event: any);
    movementSpeedMultiplier: number | undefined;
}
declare function onKeyUp(event: any): void;
declare class onKeyUp {
    constructor(event: any);
    movementSpeedMultiplier: number | undefined;
}
declare function onPointerMove(event: any): void;
declare function onPointerDown(event: any): void;
declare function onPointerUp(event: any): void;
declare function onPointerCancel(): void;
declare class onPointerCancel {
    _status: number | undefined;
}
declare function onContextMenu(event: any): void;
export {};
