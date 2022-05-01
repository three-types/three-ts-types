import { Camera, EventDispatcher } from '../../../src/Three';

export class FlyControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement);

    object: Camera;
    domElement: HTMLElement | HTMLDocument;

    movementSpeed: number;
    rollSpeed: number;
    dragToLook: boolean;
    autoForward: boolean;

    update(delta: number): void;
    dispose(): void;
}

export interface FlyControlsConstructor {
    new (object: Camera, domElement?: HTMLElement): FlyControls;
    prototype: FlyControls;
}
