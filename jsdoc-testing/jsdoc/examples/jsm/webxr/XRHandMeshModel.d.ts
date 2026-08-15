/**
 * Represents one of the hand model types {@link XRHandModelFactory} might produce
 * depending on the selected profile. `XRHandMeshModel` represents a hand with a
 * custom asset.
 *
 * @three_import import { XRHandMeshModel } from 'three/addons/webxr/XRHandMeshModel.js';
 */
export class XRHandMeshModel {
    /**
     * Constructs a new XR hand mesh model.
     *
     * @param {XRHandModel} handModel - The hand model.
     * @param {Group} controller - The WebXR controller.
     * @param {?string} path - The model path.
     * @param {XRHandedness} handedness - The handedness of the XR input source.
     * @param {?Loader} [loader=null] - The loader. If not provided, an instance of `GLTFLoader` will be used to load models.
     * @param {?Function} [onLoad=null] - A callback that is executed when a controller model has been loaded.
     * @param {?Object} [customCache=null] - An optional shared cache object for storing and reusing loaded assets across instances.
     */
    constructor(handModel: XRHandModel, controller: Group, path: string | null, handedness: XRHandedness, loader?: Loader | null, onLoad?: Function | null, customCache?: Object | null);
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
     * An array of bones representing the bones
     * of the hand skeleton.
     *
     * @type {Array<Bone>}
     */
    bones: Array<Bone>;
    /**
     * Updates the mesh based on the tracked XR joints data.
     */
    updateMesh(): void;
}
