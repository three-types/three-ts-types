import { Camera, EventDispatcher } from '../../../src/Three.js';

interface FlyControlsEventMap {
    change: {};
}

export class FlyControls extends EventDispatcher<FlyControlsEventMap> {
    constructor(object: Camera, domElement?: HTMLElement);

    autoForward: boolean;
    domElement: HTMLElement | Document;
    dragToLook: boolean;
    enabled: boolean;
    movementSpeed: number;
    object: Camera;
    rollSpeed: number;

    dispose(): void;
    update(delta: number): void;
}

export {};
