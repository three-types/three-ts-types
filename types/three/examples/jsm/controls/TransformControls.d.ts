import {
    Object3D,
    Camera,
    MOUSE,
    Raycaster,
    Mesh,
    Vector3,
    Quaternion,
    Object3DEventMap,
    EmptyEvent,
    EventListener,
    BaseEvent,
    EventTypeValidator,
} from '../../../src/Three.js';

declare enum TransformControlsPropertiesWithEventsChanged {
    'camera',
    'object',
    'enabled',
    'axis',
    'mode',
    'translationSnap',
    'rotationSnap',
    'scaleSnap',
    'space',
    'size',
    'dragging',
    'showX',
    'showY',
    'showZ',
    'worldPosition',
    'worldPositionStart',
    'worldQuaternion',
    'worldQuaternionStart',
    'cameraPosition',
    'cameraQuaternion',
    'pointStart',
    'pointEnd',
    'rotationAxis',
    'rotationAngle',
    'eye',
}

type EnumToEventNamesHelper<T> = {
    [K in keyof T & string as `${K}-changed`]: { value: unknown };
};
type TransformControlsPropertiesChangedEventMap = EnumToEventNamesHelper<
    typeof TransformControlsPropertiesWithEventsChanged
>;

interface TransformControlsEventMap extends Object3DEventMap, TransformControlsPropertiesChangedEventMap {
    change: EmptyEvent;
    mouseDown: EmptyEvent;
    mouseUp: EmptyEvent;
    objectChange: EmptyEvent;
}

export class TransformControls extends Object3D {
    constructor(object: Camera, domElement?: HTMLElement);

    domElement: HTMLElement;

    // API

    camera: Camera;
    object: Object3D | undefined;
    enabled: boolean;
    axis: 'X' | 'Y' | 'Z' | 'E' | 'XY' | 'YZ' | 'XZ' | 'XYZ' | 'XYZE' | null;
    mode: 'translate' | 'rotate' | 'scale';
    translationSnap: number | null;
    rotationSnap: number | null;
    space: 'world' | 'local';
    size: number;
    dragging: boolean;
    showX: boolean;
    showY: boolean;
    showZ: boolean;

    readonly isTransformControls: true;
    mouseButtons: { LEFT: MOUSE; MIDDLE: MOUSE; RIGHT: MOUSE };

    attach(object: Object3D): this;
    detach(): this;
    getMode(): 'translate' | 'rotate' | 'scale';
    getRaycaster(): Raycaster;
    setMode(mode: 'translate' | 'rotate' | 'scale'): void;
    setTranslationSnap(translationSnap: number | null): void;
    setRotationSnap(rotationSnap: number | null): void;
    setScaleSnap(scaleSnap: number | null): void;
    setSize(size: number): void;
    setSpace(space: 'world' | 'local'): void;
    reset(): void;
    dispose(): void;

    addEventListener<T extends Extract<keyof TransformControlsEventMap, string>>(
        type: T,
        listener: EventListener<TransformControlsEventMap[T], T, this>,
    ): void;
    addEventListener<T extends string>(type: T, listener: EventListener<{}, T, this>): void;

    hasEventListener<T extends Extract<keyof TransformControlsEventMap, string>>(
        type: T,
        listener: EventListener<TransformControlsEventMap[T], T, this>,
    ): boolean;
    hasEventListener<T extends string>(type: T, listener: EventListener<{}, T, this>): boolean;

    removeEventListener<E extends Extract<keyof TransformControlsEventMap, string>>(
        type: E,
        listener: EventListener<TransformControlsEventMap[E], E, this>,
    ): void;
    removeEventListener<E extends string>(type: E, listener: EventListener<{}, E, this>): void;

    dispatchEvent<E extends BaseEvent, Map extends TransformControlsEventMap>(event: EventTypeValidator<E, Map>): void;
    dispatchEvent<E extends BaseEvent, Map extends Object3DEventMap>(event: EventTypeValidator<E, Map>): void;
}

export class TransformControlsGizmo extends Object3D {
    type: 'TransformControlsGizmo';
    isTransformControlsGizmo: true;

    gizmo: {
        translate: Object3D;
        rotate: Object3D;
        scale: Object3D;
    };
    helper: {
        translate: Object3D;
        rotate: Object3D;
        scale: Object3D;
    };
    picker: {
        translate: Object3D;
        rotate: Object3D;
        scale: Object3D;
    };

    constructor();
}

export class TransformControlsPlane extends Mesh {
    type: 'TransformControlsPlane';
    isTransformControlsPlane: true;

    constructor();

    mode: 'translate' | 'scale' | 'rotate';

    axis: 'X' | 'Y' | 'Z' | 'XY' | 'YZ' | 'XZ' | 'XYZ' | 'E';

    space: 'local' | 'world';

    eye: Vector3;
    worldPosition: Vector3;
    worldQuaternion: Quaternion;
}

export {};
