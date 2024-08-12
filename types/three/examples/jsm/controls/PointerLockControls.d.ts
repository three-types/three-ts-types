import { Camera, EventDispatcher, Vector3 } from "three";

export interface PointerLockControlsEventMap {
    change: {};
    lock: {};
    unlock: {};
}

export class PointerLockControls extends EventDispatcher<PointerLockControlsEventMap> {
    constructor(camera: Camera, domElement?: HTMLElement);

    camera: Camera;
    domElement: HTMLElement;

    // API

    isLocked: boolean;

    minPolarAngle: number;
    maxPolarAngle: number;

    pointerSpeed: number;

    connect(): void;
    disconnect(): void;
    dispose(): void;
    getObject(): Camera;
    getDirection(v: Vector3): Vector3;
    moveForward(distance: number): void;
    moveRight(distance: number): void;
    lock(): void;
    unlock(): void;
}
