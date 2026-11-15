/**
 * Allows to create controller models for WebXR controllers that can be added as a visual
 * representation to your scene. `XRControllerModelFactory` will automatically fetch controller
 * models that match what the user is holding as closely as possible. The models should be
 * attached to the object returned from getControllerGrip in order to match the orientation of
 * the held device.
 *
 * This module depends on the [motion-controllers](https://github.com/immersive-web/webxr-input-profiles/blob/main/packages/motion-controllers/README.md)
 * third-part library.
 *
 * ```js
 * const controllerModelFactory = new XRControllerModelFactory();
 *
 * const controllerGrip = renderer.xr.getControllerGrip( 0 );
 * controllerGrip.add( controllerModelFactory.createControllerModel( controllerGrip ) );
 * scene.add( controllerGrip );
 * ```
 *
 * @three_import import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
 */
export class XRControllerModelFactory {
    /**
     * Constructs a new XR controller model factory.
     *
     * @param {?GLTFLoader} [gltfLoader=null] - A glTF loader that is used to load controller models.
     * @param {?Function} [onLoad=null] - A callback that is executed when a controller model has been loaded.
     */
    constructor(gltfLoader?: GLTFLoader | null, onLoad?: Function | null);
    /**
     * A glTF loader that is used to load controller models.
     *
     * @type {?GLTFLoader}
     * @default null
     */
    gltfLoader: GLTFLoader | null;
    /**
     * The path to the model repository.
     *
     * @type {string}
     */
    path: string;
    _assetCache: {};
    /**
     * A callback that is executed when a controller model has been loaded.
     *
     * @type {?Function}
     * @default null
     */
    onLoad: Function | null;
    /**
     * Sets the path to the model repository.
     *
     * @param {string} path - The path to set.
     * @return {XRControllerModelFactory} A reference to this instance.
     */
    setPath(path: string): XRControllerModelFactory;
    /**
     * Creates a controller model for the given WebXR controller.
     *
     * @param {Group} controller - The controller.
     * @return {XRControllerModel} The XR controller model.
     */
    createControllerModel(controller: Group): XRControllerModel;
}
import { GLTFLoader } from '../loaders/GLTFLoader.js';
/**
 * Represents a XR controller model.
 *
 * @augments Object3D
 */
declare class XRControllerModel extends Object3D {
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
     * Sets an environment map that is applied to the controller model.
     *
     * @param {?Texture} envMap - The environment map to apply.
     * @return {XRControllerModel} A reference to this instance.
     */
    setEnvironmentMap(envMap: Texture | null): XRControllerModel;
}
import { Object3D } from 'three';
import { MotionController } from '../libs/motion-controllers.module.js';
export {};
