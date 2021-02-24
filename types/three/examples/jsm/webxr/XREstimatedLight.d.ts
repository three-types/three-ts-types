import { DirectionalLight, Group, LightProbe, XRFrame, WebGLRenderer, Texture } from '../../../src/Three';

export class SessionLightProbe<TLight extends THREE.Group = THREE.Group> {
    xrLight: TLight;
    renderer: WebGLRenderer;
    lightProbe: unknown;
    xrWebGLBinding: unknown | null;
    estimationStartCallback: () => void;
    frameCallback: (time: number, xrFrame: XRFrame) => void;

    constructor(
        xrLight: TLight,
        renderer: WebGLRenderer,
        lightProbe: unknown,
        environmentEstimation: boolean,
        estimationStartCallback: () => void,
    );

    updateReflection: () => void;

    onXRFrame: (time: number, xrFrame: XRFrame) => void;

    dispose: () => void;
}

export class XREstimatedLight extends Group {
    lightProbe: LightProbe;
    directionalLight: DirectionalLight;
    environment: Texture;

    constructor(renderer: WebGLRenderer, environmentEstimation?: boolean);
}
