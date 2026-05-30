/**
 * Similar to {@link XRControllerModelFactory}, this class allows to create hand models
 * for WebXR controllers that can be added as a visual representation to your scene.
 *
 * ```js
 * const handModelFactory = new XRHandModelFactory();
 *
 * const hand = renderer.xr.getHand( 0 );
 * hand.add( handModelFactory.createHandModel( hand ) );
 * scene.add( hand );
 * ```
 *
 * @three_import import { XRHandModelFactory } from 'three/addons/webxr/XRHandModelFactory.js';
 */
export class XRHandModelFactory {
    /**
     * Constructs a new XR hand model factory.
     *
     * @param {?GLTFLoader} [gltfLoader=null] - A glTF loader that is used to load hand models.
     * @param {?Function} [onLoad=null] - A callback that is executed when a hand model has been loaded.
     */
    constructor(gltfLoader?: GLTFLoader | null, onLoad?: Function | null);
    /**
     * A glTF loader that is used to load hand models.
     *
     * @type {?GLTFLoader}
     * @default null
     */
    gltfLoader: GLTFLoader | null;
    /**
     * The path to the model repository.
     *
     * @type {?string}
     * @default null
     */
    path: string | null;
    _assetCache: {};
    /**
     * A callback that is executed when a hand model has been loaded.
     *
     * @type {?Function}
     * @default null
     */
    onLoad: Function | null;
    /**
     * Sets the path to the hand model repository.
     *
     * @param {string} path - The path to set.
     * @return {XRHandModelFactory} A reference to this instance.
     */
    setPath(path: string): XRHandModelFactory;
    /**
     * Creates a controller model for the given WebXR hand controller.
     *
     * @param {Group} controller - The hand controller.
     * @param {('spheres'|'boxes'|'mesh')} [profile] - The model profile that defines the model type.
     * @return {XRHandModel} The XR hand model.
     */
    createHandModel(controller: Group, profile?: ("spheres" | "boxes" | "mesh")): XRHandModel;
}
/**
 * Represents a XR hand model.
 *
 * @augments Object3D
 */
declare class XRHandModel extends Object3D {
    /**
     * Constructs a new XR hand model.
     *
     * @param {Group} controller - The hand controller.
     */
    constructor(controller: Group);
    /**
     * The hand controller.
     *
     * @type {Group}
     */
    controller: Group;
    /**
     * The motion controller.
     *
     * @type {?MotionController}
     * @default null
     */
    motionController: MotionController | null;
    /**
     * The controller's environment map.
     *
     * @type {?Texture}
     * @default null
     */
    envMap: Texture | null;
    /**
     * The model mesh.
     *
     * @type {Mesh}
     * @default null
     */
    mesh: Mesh;
}
import { Object3D } from 'three';
export {};
