import {
    DirectionalLight,
    Group,
    LightProbe,
    Texture,
    WebGLRenderer,
    Object3DEventMap,
    EventListener,
    BaseEvent,
    EventTypeValidator,
} from '../../../src/Three.js';

export class SessionLightProbe {
    xrLight: XREstimatedLight;
    renderer: WebGLRenderer;
    lightProbe: LightProbe;
    xrWebGLBinding: XRWebGLBinding | null;
    estimationStartCallback: () => void;
    frameCallback: (this: SessionLightProbe, time: number, xrFrame: XRFrame) => void;

    constructor(
        xrLight: XREstimatedLight,
        renderer: WebGLRenderer,
        lightProbe: LightProbe,
        environmentEstimation: boolean,
        estimationStartCallback: () => void,
    );

    updateReflection: () => void;

    onXRFrame: XRFrameRequestCallback;

    dispose: () => void;
}

export interface XREstimatedLightEventMap extends Object3DEventMap {
    estimationstart: {};
    estimationend: {};
}

export class XREstimatedLight extends Group {
    lightProbe: LightProbe;
    directionalLight: DirectionalLight;
    environment: Texture;

    constructor(renderer: WebGLRenderer, environmentEstimation?: boolean);

    addEventListener<T extends Extract<keyof XREstimatedLightEventMap, string>>(
        type: T,
        listener: EventListener<XREstimatedLightEventMap[T], T, this>,
    ): void;
    addEventListener<T extends string>(type: T, listener: EventListener<{}, T, this>): void;

    hasEventListener<T extends Extract<keyof XREstimatedLightEventMap, string>>(
        type: T,
        listener: EventListener<XREstimatedLightEventMap[T], T, this>,
    ): boolean;
    hasEventListener<T extends string>(type: T, listener: EventListener<{}, T, this>): boolean;

    removeEventListener<E extends Extract<keyof XREstimatedLightEventMap, string>>(
        type: E,
        listener: EventListener<XREstimatedLightEventMap[E], E, this>,
    ): void;
    removeEventListener<E extends string>(type: E, listener: EventListener<{}, E, this>): void;

    dispatchEvent<E extends BaseEvent, Map extends XREstimatedLightEventMap>(event: EventTypeValidator<E, Map>): void;
    dispatchEvent<E extends BaseEvent, Map extends Object3DEventMap>(event: EventTypeValidator<E, Map>): void;
}
