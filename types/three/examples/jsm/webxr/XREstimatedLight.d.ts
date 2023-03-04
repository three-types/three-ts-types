import {
    DirectionalLight,
    Group,
    LightProbe,
    Texture,
    WebGLRenderer,
    Object3DEventMap,
    EmptyEvent,
} from '../../../src/Three';

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

interface XREstimatedLightEventMap extends Object3DEventMap {
    estimationstart: EmptyEvent;
    estimationend: EmptyEvent;
}

export class XREstimatedLight extends Group<XREstimatedLightEventMap> {
    lightProbe: LightProbe;
    directionalLight: DirectionalLight;
    environment: Texture;

    constructor(renderer: WebGLRenderer, environmentEstimation?: boolean);
}

export {};
