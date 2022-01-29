import { Group } from '../../objects/Group';
import { PerspectiveCamera } from '../../cameras/PerspectiveCamera';
import { EventDispatcher } from '../../core/EventDispatcher';
import {
    XRFrameRequestCallback,
    XRReferenceSpace,
    XRReferenceSpaceType,
    XRSession,
    XRFrame,
    XRCamera,
    XRWebGLLayer,
    // XRProjectionLayer,
    // XRWebGLBinding
} from './WebXR';

export class WebXRManager extends EventDispatcher {
    constructor(renderer: any, gl: WebGLRenderingContext);

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

    getController(index: number): Group;
    getControllerGrip(index: number): Group;
    getHand(index: number): Group;
    setFramebufferScaleFactor(value: number): void;
    setReferenceSpaceType(value: XRReferenceSpaceType): void;
    getReferenceSpace(): XRReferenceSpace | null;
    getBaseLayer(): XRWebGLLayer | any // XRProjectionLayer
    getBinding(): any // XRWebGLBinding
    getFrame(): XRFrame
    getSession(): XRSession | null;
    setSession(value: XRSession): Promise<void>;
    getCamera(): XRCamera;
    updateCamera(camera: PerspectiveCamera): void;
    setAnimationLoop(callback: XRFrameRequestCallback | null): void;
    getFoveation(): number | undefined;
    setFoveation(foveation: number): void;
    dispose(): void;
}
