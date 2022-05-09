import { Group } from '../../objects/Group';
import { Vector3 } from '../../math/Vector3';
import { XREventType, XRHandJoint, XRFrame, XRInputSource, XRReferenceSpace } from './WebXR';

export type XRControllerEventType = XREventType | 'disconnected' | 'connected';

export type XRHandJoints = { [key in keyof typeof XRHandJoint]: number };

export interface XRHandInputState {
    pinching: boolean;
}

export class XRHandSpace extends Group {
    readonly joints: Partial<XRHandJoints>;
    readonly inputState: XRHandInputState;
}

export class XRTargetRaySpace extends Group {
    hasLinearVelocity: boolean;
    readonly linearVelocity: Vector3;
    hasAngularVelocity: boolean;
    readonly angularVelocity: Vector3;
}

export class XRGripSpace extends Group {
    hasLinearVelocity: boolean;
    readonly linearVelocity: Vector3;
    hasAngularVelocity: boolean;
    readonly angularVelocity: Vector3;
}

export class WebXRController {
    constructor();

    getHandSpace(): XRHandSpace;
    getTargetRaySpace(): XRTargetRaySpace;
    getGripSpace(): XRGripSpace;
    dispatchEvent(event: { type: XRControllerEventType; data?: XRInputSource }): this;
    disconnect(inputSource: XRInputSource): this;
    update(inputSource: XRInputSource, frame: XRFrame, referenceSpace: XRReferenceSpace): this;
}
