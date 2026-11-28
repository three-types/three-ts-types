/**
 * This class can be used to represent the environmental light of
 * a XR session. It relies on the WebXR Lighting Estimation API.
 *
 * @augments Group
 * @three_import import { XREstimatedLight } from 'three/addons/webxr/XREstimatedLight.js';
 */
export class XREstimatedLight extends Group {
    /**
     * Constructs a new light.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {boolean} [environmentEstimation=true] - Whether to use environment estimation or not.
     */
    constructor(renderer: WebGLRenderer, environmentEstimation?: boolean);
    /**
     * A 1x1x1 light probe grid that represents the estimated spherical harmonics irradiance.
     *
     * @type {LightProbeGridWebGL}
     */
    lightProbe: LightProbeGridWebGL;
    /**
     * Represents the primary light from the XR environment.
     *
     * @type {DirectionalLight}
     */
    directionalLight: DirectionalLight;
    /**
     * Will be set to a cube map in the SessionLightProbe if environment estimation is
     * available and requested.
     *
     * @type {?Texture}
     * @default null
     */
    environment: Texture | null;
    _renderer: WebGLRenderer;
    _environmentEstimation: boolean;
    _sessionLightProbe: any;
    _estimationStarted: boolean;
    _onSessionStart: typeof onSessionStart;
    _onSessionEnd: typeof onSessionEnd;
}
import { Group } from 'three';
import { LightProbeGridWebGL } from '../lighting/LightProbeGridWebGL.js';
import { DirectionalLight } from 'three';
declare function onSessionStart(): void;
declare class onSessionStart {
    _sessionLightProbe: SessionLightProbe;
    _estimationStarted: boolean;
}
declare function onSessionEnd(): void;
declare class onSessionEnd {
    _sessionLightProbe: any;
}
declare class SessionLightProbe {
    constructor(xrLight: any, renderer: any, lightProbe: any, environmentEstimation: any, estimationStartCallback: any);
    xrLight: any;
    renderer: any;
    lightProbe: any;
    xrWebGLBinding: any;
    estimationStartCallback: any;
    frameCallback: (time: any, xrFrame: any) => void;
    updateReflection(): void;
    onXRFrame(time: any, xrFrame: any): void;
    dispose(): void;
}
export {};
