/**
 * Class for representing a XR controller with its
 * different coordinate systems.
 *
 * @private
 */
export class WebXRController {
    /**
     * A group representing the target ray space
     * of the XR controller.
     *
     * @private
     * @type {?Group}
     * @default null
     */
    private _targetRay;
    /**
     * A group representing the grip space
     * of the XR controller.
     *
     * @private
     * @type {?Group}
     * @default null
     */
    private _grip;
    /**
     * A group representing the hand space
     * of the XR controller.
     *
     * @private
     * @type {?Group}
     * @default null
     */
    private _hand;
    /**
     * Returns a group representing the hand space of the XR controller.
     *
     * @return {Group} A group representing the hand space of the XR controller.
     */
    getHandSpace(): Group;
    /**
     * Returns a group representing the target ray space of the XR controller.
     *
     * @return {Group} A group representing the target ray space of the XR controller.
     */
    getTargetRaySpace(): Group;
    /**
     * Returns a group representing the grip space of the XR controller.
     *
     * @return {Group} A group representing the grip space of the XR controller.
     */
    getGripSpace(): Group;
    /**
     * Dispatches the given event to the groups representing
     * the different coordinate spaces of the XR controller.
     *
     * @param {Object} event - The event to dispatch.
     * @return {WebXRController} A reference to this instance.
     */
    dispatchEvent(event: Object): WebXRController;
    /**
     * Connects the controller with the given XR input source.
     *
     * @param {XRInputSource} inputSource - The input source.
     * @return {WebXRController} A reference to this instance.
     */
    connect(inputSource: XRInputSource): WebXRController;
    /**
     * Disconnects the controller from the given XR input source.
     *
     * @param {XRInputSource} inputSource - The input source.
     * @return {WebXRController} A reference to this instance.
     */
    disconnect(inputSource: XRInputSource): WebXRController;
    /**
     * Updates the controller with the given input source, XR frame and reference space.
     * This updates the transformations of the groups that represent the different
     * coordinate systems of the controller.
     *
     * @param {XRInputSource} inputSource - The input source.
     * @param {XRFrame} frame - The XR frame.
     * @param {XRReferenceSpace} referenceSpace - The reference space.
     * @return {WebXRController} A reference to this instance.
     */
    update(inputSource: XRInputSource, frame: XRFrame, referenceSpace: XRReferenceSpace): WebXRController;
    /**
     * Returns a group representing the hand joint for the given input joint.
     *
     * @private
     * @param {Group} hand - The group representing the hand space.
     * @param {XRJointSpace} inputjoint - The hand joint data.
     * @return {Group} A group representing the hand joint for the given input joint.
     */
    private _getHandJoint;
}
import { Group } from '../../objects/Group.js';
