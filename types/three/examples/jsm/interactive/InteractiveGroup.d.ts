import {
    Camera,
    EventListener,
    Group,
    Object3D,
    Object3DEventMap,
    Vector2,
    WebGLRenderer,
} from '../../../src/Three.js';

export interface InteractiveObject3DEventMap extends Object3DEventMap {
    hoveron: { data: Vector2 };
    pointerdown: { data: Vector2 };
    pointerup: { data: Vector2 };
    pointermove: { data: Vector2 };
    mousedown: { data: Vector2 };
    mouseup: { data: Vector2 };
    mousemove: { data: Vector2 };
    click: { data: Vector2 };
}

export class InteractiveObject3D extends Object3D {
    addEventListener<T extends Extract<keyof InteractiveObject3DEventMap, string>>(
        type: T,
        listener: EventListener<InteractiveObject3DEventMap[T], T, this>,
    ): void;
    addEventListener<T extends string>(type: T, listener: EventListener<{}, T, this>): void;

    hasEventListener<T extends Extract<keyof InteractiveObject3DEventMap, string>>(
        type: T,
        listener: EventListener<InteractiveObject3DEventMap[T], T, this>,
    ): boolean;
    hasEventListener<T extends string>(type: T, listener: EventListener<{}, T, this>): boolean;

    removeEventListener<E extends Extract<keyof InteractiveObject3DEventMap, string>>(
        type: E,
        listener: EventListener<InteractiveObject3DEventMap[E], E, this>,
    ): void;
    removeEventListener<E extends string>(type: E, listener: EventListener<{}, E, this>): void;

    dispatchEvent(event: InteractiveObject3DEventMap[Extract<keyof InteractiveObject3DEventMap, string>]): void;
}

export class InteractiveGroup extends Group {
    constructor(renderer: WebGLRenderer, camera: Camera);
}
