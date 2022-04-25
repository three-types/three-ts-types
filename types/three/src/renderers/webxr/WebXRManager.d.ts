import { Group } from '../../objects/Group';
import { Vector4 } from '../../math/Vector4';
import { ArrayCamera } from '../../cameras/ArrayCamera';
import { PerspectiveCamera } from '../../cameras/PerspectiveCamera';
import { EventDispatcher } from '../../core/EventDispatcher';
import {
    XRFrameRequestCallback,
    XRReferenceSpace,
    XRReferenceSpaceType,
    XRSession,
    XRFrame,
    XRWebGLLayer,
    // XRProjectionLayer,
    // XRWebGLBinding
} from './WebXR';

export type WebXRCamera = PerspectiveCamera & { viewport: Vector4 };
export type WebXRArrayCamera = Omit<ArrayCamera, 'cameras'> & { cameras: [WebXRCamera, WebXRCamera] };

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
    getCamera(): WebXRArrayCamera;
    updateCamera(camera: PerspectiveCamera): void;
    setAnimationLoop(callback: XRFrameRequestCallback | null): void;
    getFoveation(): number | undefined;
    setFoveation(foveation: number): void;
    dispose(): void;
}
