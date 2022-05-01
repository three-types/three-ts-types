import { DirectionalLight, Group, LightProbe, XRFrame, WebGLRenderer, Texture } from '../../../src/Three';

export class SessionLightProbe {
    xrLight: XREstimatedLight;
    renderer: WebGLRenderer;
    lightProbe: unknown;
    xrWebGLBinding: unknown | null;
    estimationStartCallback: () => void;
    frameCallback: (this: SessionLightProbe, time: number, xrFrame: XRFrame) => void;

    constructor(
        xrLight: XREstimatedLight,
        renderer: WebGLRenderer,
        lightProbe: unknown,
        environmentEstimation: boolean,
        estimationStartCallback: () => void,
    );

    updateReflection: () => void;

    onXRFrame: (time: number, xrFrame: XRFrame) => void;

    dispose: () => void;
}

export interface SessionLightProbeConstructor {
    new (
        xrLight: XREstimatedLight,
        renderer: WebGLRenderer,
        lightProbe: unknown,
        environmentEstimation: boolean,
        estimationStartCallback: () => void,
    ): SessionLightProbe;
    prototype: SessionLightProbe;
}

export class XREstimatedLight extends Group {
    lightProbe: LightProbe;
    directionalLight: DirectionalLight;
    environment: Texture;

    constructor(renderer: WebGLRenderer, environmentEstimation?: boolean);
}

export interface XREstimatedLightConstructor {
    new (renderer: WebGLRenderer, environmentEstimation?: boolean): XREstimatedLight;
    prototype: XREstimatedLight;
}
