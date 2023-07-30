import { Group } from '../../objects/Group.js';
import { Vector3 } from '../../math/Vector3.js';
import { Object3DEventMap } from '../../core/Object3D.js';
import { EventListener } from '../../core/EventDispatcher.js';

export type XRControllerEventType = XRSessionEventType | XRInputSourceEventType | 'disconnected' | 'connected';

export class XRJointSpace extends Group {
    readonly jointRadius: number | undefined;
}

export type XRHandJoints = Record<XRHandJoint, XRJointSpace>;

export interface XRHandInputState {
    pinching: boolean;
}

export interface WebXRSpaceEventMap extends Object3DEventMap {
    select: { data: XRInputSource };
    selectstart: { data: XRInputSource };
    selectend: { data: XRInputSource };
    squeeze: { data: XRInputSource };
    squeezestart: { data: XRInputSource };
    squeezeend: { data: XRInputSource };

    connected: { data: XRInputSource };
    disconnected: { data: XRInputSource };

    pinchend: { handedness: XRHandedness; target: WebXRController }; // This Event break the THREE.EventDispatcher contract, replacing the target to the wrong instance.
    pinchstart: { handedness: XRHandedness; target: WebXRController }; // This Event break the THREE.EventDispatcher contract, replacing the target to the wrong instance.

    move: {};
}

export class XRHandSpace extends Group {
    readonly joints: Partial<XRHandJoints>;
    readonly inputState: XRHandInputState;

    addEventListener<T extends Extract<keyof WebXRSpaceEventMap, string>>(
        type: T,
        listener: EventListener<WebXRSpaceEventMap[T], T, this>,
    ): void;
    addEventListener<T extends string>(type: T, listener: EventListener<{}, T, this>): void;

    hasEventListener<T extends Extract<keyof WebXRSpaceEventMap, string>>(
        type: T,
        listener: EventListener<WebXRSpaceEventMap[T], T, this>,
    ): boolean;
    hasEventListener<T extends string>(type: T, listener: EventListener<{}, T, this>): boolean;

    removeEventListener<E extends Extract<keyof WebXRSpaceEventMap, string>>(
        type: E,
        listener: EventListener<WebXRSpaceEventMap[E], E, this>,
    ): void;
    removeEventListener<E extends string>(type: E, listener: EventListener<{}, E, this>): void;

    dispatchEvent(event: WebXRSpaceEventMap[Extract<keyof WebXRSpaceEventMap, string>]): void;
}

export class XRTargetRaySpace extends Group {
    hasLinearVelocity: boolean;
    readonly linearVelocity: Vector3;
    hasAngularVelocity: boolean;
    readonly angularVelocity: Vector3;

    addEventListener<T extends Extract<keyof WebXRSpaceEventMap, string>>(
        type: T,
        listener: EventListener<WebXRSpaceEventMap[T], T, this>,
    ): void;
    addEventListener<T extends string>(type: T, listener: EventListener<{}, T, this>): void;

    hasEventListener<T extends Extract<keyof WebXRSpaceEventMap, string>>(
        type: T,
        listener: EventListener<WebXRSpaceEventMap[T], T, this>,
    ): boolean;
    hasEventListener<T extends string>(type: T, listener: EventListener<{}, T, this>): boolean;

    removeEventListener<E extends Extract<keyof WebXRSpaceEventMap, string>>(
        type: E,
        listener: EventListener<WebXRSpaceEventMap[E], E, this>,
    ): void;
    removeEventListener<E extends string>(type: E, listener: EventListener<{}, E, this>): void;

    dispatchEvent(event: WebXRSpaceEventMap[Extract<keyof WebXRSpaceEventMap, string>]): void;
}

export class XRGripSpace extends Group {
    hasLinearVelocity: boolean;
    readonly linearVelocity: Vector3;
    hasAngularVelocity: boolean;
    readonly angularVelocity: Vector3;

    addEventListener<T extends Extract<keyof WebXRSpaceEventMap, string>>(
        type: T,
        listener: EventListener<WebXRSpaceEventMap[T], T, this>,
    ): void;
    addEventListener<T extends string>(type: T, listener: EventListener<{}, T, this>): void;

    hasEventListener<T extends Extract<keyof WebXRSpaceEventMap, string>>(
        type: T,
        listener: EventListener<WebXRSpaceEventMap[T], T, this>,
    ): boolean;
    hasEventListener<T extends string>(type: T, listener: EventListener<{}, T, this>): boolean;

    removeEventListener<E extends Extract<keyof WebXRSpaceEventMap, string>>(
        type: E,
        listener: EventListener<WebXRSpaceEventMap[E], E, this>,
    ): void;
    removeEventListener<E extends string>(type: E, listener: EventListener<{}, E, this>): void;

    dispatchEvent(event: WebXRSpaceEventMap[Extract<keyof WebXRSpaceEventMap, string>]): void;
}

export class WebXRController {
    constructor();

    getHandSpace(): XRHandSpace;
    getTargetRaySpace(): XRTargetRaySpace;
    getGripSpace(): XRGripSpace;
    dispatchEvent(event: { type: XRControllerEventType; data?: XRInputSource }): this;
    connect(inputSource: XRInputSource): this;
    disconnect(inputSource: XRInputSource): this;
    update(inputSource: XRInputSource, frame: XRFrame, referenceSpace: XRReferenceSpace): this;
}
