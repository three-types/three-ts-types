/**
 * ~Options
 */
export type XRHandPrimitiveModel = {
    /**
     * - The primitive type.
     */
    primitive?: "sphere" | "box" | undefined;
};
/**
 * Represents one of the hand model types {@link XRHandModelFactory} might produce
 * depending on the selected profile. `XRHandPrimitiveModel` represents a hand
 * with sphere or box primitives according to the selected `primitive` option.
 *
 * @three_import import { XRHandPrimitiveModel } from 'three/addons/webxr/XRHandPrimitiveModel.js';
 */
export class XRHandPrimitiveModel {
    /**
     * Constructs a new XR hand primitive model.
     *
     * @param {XRHandModel} handModel - The hand model.
     * @param {Group} controller - The WebXR controller.
     * @param {string} path - The model path.
     * @param {XRHandedness} handedness - The handedness of the XR input source.
     * @param {XRHandPrimitiveModel~Options} options - The model options.
     */
    constructor(handModel: XRHandModel, controller: Group, path: string, handedness: XRHandedness, options: any);
    /**
     * The WebXR controller.
     *
     * @type {Group}
     */
    controller: Group;
    /**
     * The hand model.
     *
     * @type {XRHandModel}
     */
    handModel: XRHandModel;
    /**
     * The model's environment map.
     *
     * @type {?Texture}
     * @default null
     */
    envMap: Texture | null;
    handMesh: InstancedMesh;
    joints: string[];
    /**
     * Updates the mesh based on the tracked XR joints data.
     */
    updateMesh(): void;
}
import { InstancedMesh } from 'three';
