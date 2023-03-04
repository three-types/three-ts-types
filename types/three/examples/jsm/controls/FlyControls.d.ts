import { Camera, EmptyEvent, EventDispatcher } from '../../../src/Three';

interface FlyControlsEventMap {
    change: EmptyEvent;
}

export class FlyControls extends EventDispatcher<FlyControlsEventMap> {
    constructor(object: Camera, domElement?: HTMLElement);

    object: Camera;
    domElement: HTMLElement | Document;

    movementSpeed: number;
    rollSpeed: number;
    dragToLook: boolean;
    autoForward: boolean;

    update(delta: number): void;
    dispose(): void;
}

export {};
