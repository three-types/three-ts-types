// https://threejs.org/docs/#api/en/renderers/webxr/WebXRManager

/// <reference types="webxr" />

import { ArrayCamera } from "../../cameras/ArrayCamera.js";
import { PerspectiveCamera } from "../../cameras/PerspectiveCamera.js";
import { EventDispatcher } from "../../core/EventDispatcher.js";
import { Vector4 } from "../../math/Vector4.js";
import { WebGLRenderer } from "../WebGLRenderer.js";
import { XRGripSpace, XRHandSpace, XRTargetRaySpace } from "./WebXRController.js";

export type WebXRCamera = PerspectiveCamera & { viewport: Vector4 };
export type WebXRArrayCamera = Omit<ArrayCamera, "cameras"> & { cameras: [WebXRCamera, WebXRCamera] };

export interface WebXRManagerEventMap {
    sessionstart: {};
    sessionend: {};
    planeadded: { data: XRPlane };
    planeremoved: { data: XRPlane };
    planechanged: { data: XRPlane };
    planesdetected: { data: XRPlaneSet };
}

export class WebXRManager extends EventDispatcher<WebXRManagerEventMap> {
    constructor(renderer: WebGLRenderer, gl: WebGLRenderingContext);

    /**
     * @default false
     */
    enabled: boolean;

    /**
     * @default false
     */
    isPresenting: boolean;

    /**
     * @default true
     */
    cameraAutoUpdate: boolean;

    getController(index: number): XRTargetRaySpace;

    getControllerGrip(index: number): XRGripSpace;

    getHand(index: number): XRHandSpace;

    setFramebufferScaleFactor(value: number): void;

    setReferenceSpaceType(value: XRReferenceSpaceType): void;

    getReferenceSpace(): XRReferenceSpace | null;

    setReferenceSpace(value: XRReferenceSpace): void;

    getBaseLayer(): XRWebGLLayer | XRProjectionLayer;

    getBinding(): XRWebGLBinding;

    getFrame(): XRFrame;

    getSession(): XRSession | null;

    setSession(value: XRSession | null): Promise<void>;

    getCamera(): WebXRArrayCamera;

    updateCamera(camera: PerspectiveCamera): void;

    setAnimationLoop(callback: XRFrameRequestCallback | null): void;

    getFoveation(): number | undefined;

    setFoveation(value: number): void;

    dispose(): void;
}
