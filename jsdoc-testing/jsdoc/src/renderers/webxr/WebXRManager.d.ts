/**
 * This class represents an abstraction of the WebXR Device API and is
 * internally used by {@link WebGLRenderer}. `WebXRManager` also provides a public
 * interface that allows users to enable/disable XR and perform XR related
 * tasks like for instance retrieving controllers.
 *
 * @augments EventDispatcher
 * @hideconstructor
 */
export class WebXRManager extends EventDispatcher {
    /**
     * Constructs a new WebGL renderer.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {WebGL2RenderingContext} gl - The rendering context.
     */
    constructor(renderer: WebGLRenderer, gl: WebGL2RenderingContext);
    /**
     * Whether the manager's XR camera should be automatically updated or not.
     *
     * @type {boolean}
     * @default true
     */
    cameraAutoUpdate: boolean;
    /**
     * This flag notifies the renderer to be ready for XR rendering. Set it to `true`
     * if you are going to use XR in your app.
     *
     * @type {boolean}
     * @default false
     */
    enabled: boolean;
    /**
     * Whether XR presentation is active or not.
     *
     * @type {boolean}
     * @readonly
     * @default false
     */
    readonly isPresenting: boolean;
    /**
     * Returns a group representing the `target ray` space of the XR controller.
     * Use this space for visualizing 3D objects that support the user in pointing
     * tasks like UI interaction.
     *
     * @param {number} index - The index of the controller.
     * @return {Group} A group representing the `target ray` space.
     */
    getController: (index: number) => Group;
    /**
     * Returns a group representing the `grip` space of the XR controller.
     * Use this space for visualizing 3D objects that support the user in pointing
     * tasks like UI interaction.
     *
     * Note: If you want to show something in the user's hand AND offer a
     * pointing ray at the same time, you'll want to attached the handheld object
     * to the group returned by `getControllerGrip()` and the ray to the
     * group returned by `getController()`. The idea is to have two
     * different groups in two different coordinate spaces for the same WebXR
     * controller.
     *
     * @param {number} index - The index of the controller.
     * @return {Group} A group representing the `grip` space.
     */
    getControllerGrip: (index: number) => Group;
    /**
     * Returns a group representing the `hand` space of the XR controller.
     * Use this space for visualizing 3D objects that support the user in pointing
     * tasks like UI interaction.
     *
     * @param {number} index - The index of the controller.
     * @return {Group} A group representing the `hand` space.
     */
    getHand: (index: number) => Group;
    /**
     * Sets the framebuffer scale factor.
     *
     * This method can not be used during a XR session.
     *
     * @param {number} value - The framebuffer scale factor.
     */
    setFramebufferScaleFactor: (value: number) => void;
    /**
     * Sets the reference space type. Can be used to configure a spatial relationship with the user's physical
     * environment. Depending on how the user moves in 3D space, setting an appropriate reference space can
     * improve tracking. Default is `local-floor`. Valid values can be found here
     * https://developer.mozilla.org/en-US/docs/Web/API/XRReferenceSpace#reference_space_types.
     *
     * This method can not be used during a XR session.
     *
     * @param {string} value - The reference space type.
     */
    setReferenceSpaceType: (value: string) => void;
    /**
     * Returns the XR reference space.
     *
     * @return {XRReferenceSpace} The XR reference space.
     */
    getReferenceSpace: () => XRReferenceSpace;
    /**
     * Sets a custom XR reference space.
     *
     * @param {XRReferenceSpace} space - The XR reference space.
     */
    setReferenceSpace: (space: XRReferenceSpace) => void;
    /**
     * Returns the current base layer.
     *
     * This is an `XRProjectionLayer` when the targeted XR device supports the
     * WebXR Layers API, or an `XRWebGLLayer` otherwise.
     *
     * @return {?(XRWebGLLayer|XRProjectionLayer)} The XR base layer.
     */
    getBaseLayer: () => (XRWebGLLayer | XRProjectionLayer) | null;
    /**
     * Returns the current XR binding.
     *
     * Creates a new binding if needed and the browser is
     * capable of doing so.
     *
     * @return {?XRWebGLBinding} The XR binding. Returns `null` if one cannot be created.
     */
    getBinding: () => XRWebGLBinding | null;
    /**
     * Returns the current XR frame.
     *
     * @return {?XRFrame} The XR frame. Returns `null` when used outside a XR session.
     */
    getFrame: () => XRFrame | null;
    /**
     * Returns the current XR session.
     *
     * @return {?XRSession} The XR session. Returns `null` when used outside a XR session.
     */
    getSession: () => XRSession | null;
    /**
     * After a XR session has been requested usually with one of the `*Button` modules, it
     * is injected into the renderer with this method. This method triggers the start of
     * the actual XR rendering.
     *
     * @async
     * @param {XRSession} value - The XR session to set.
     * @return {Promise} A Promise that resolves when the session has been set.
     */
    setSession: (value: XRSession) => Promise<any>;
    /**
     * Returns the environment blend mode from the current XR session.
     *
     * @return {'opaque'|'additive'|'alpha-blend'|undefined} The environment blend mode. Returns `undefined` when used outside of a XR session.
     */
    getEnvironmentBlendMode: () => "opaque" | "additive" | "alpha-blend" | undefined;
    /**
     * Returns the current depth texture computed via depth sensing.
     *
     * See {@link WebXRDepthSensing#getDepthTexture}.
     *
     * @return {?Texture} The depth texture.
     */
    getDepthTexture: () => Texture | null;
    /**
     * Updates the state of the XR camera. Use this method on app level if you
     * set `cameraAutoUpdate` to `false`. The method requires the non-XR
     * camera of the scene as a parameter. The passed in camera's transformation
     * is automatically adjusted to the position of the XR camera when calling
     * this method.
     *
     * @param {Camera} camera - The camera.
     */
    updateCamera: (camera: Camera) => void;
    /**
     * Returns an instance of {@link ArrayCamera} which represents the XR camera
     * of the active XR session. For each view it holds a separate camera object.
     *
     * The camera's `fov` is currently not used and does not reflect the fov of
     * the XR camera. If you need the fov on app level, you have to compute in
     * manually from the XR camera's projection matrices.
     *
     * @return {ArrayCamera} The XR camera.
     */
    getCamera: () => ArrayCamera;
    /**
     * Returns the amount of foveation used by the XR compositor for the projection layer.
     *
     * @return {number|undefined} The amount of foveation.
     */
    getFoveation: () => number | undefined;
    /**
     * Sets the foveation value.
     *
     * @param {number} value - A number in the range `[0,1]` where `0` means no foveation (full resolution)
     * and `1` means maximum foveation (the edges render at lower resolution).
     */
    setFoveation: (value: number) => void;
    /**
     * Returns `true` if depth sensing is supported.
     *
     * @return {boolean} Whether depth sensing is supported or not.
     */
    hasDepthSensing: () => boolean;
    /**
     * Returns the depth sensing mesh.
     *
     * See {@link WebXRDepthSensing#getMesh}.
     *
     * @return {Mesh} The depth sensing mesh.
     */
    getDepthSensingMesh: () => Mesh;
    /**
     * Retrieves an opaque texture from the view-aligned {@link XRCamera}.
     * Only available during the current animation loop.
     *
     * @param {XRCamera} xrCamera - The camera to query.
     * @return {?Texture} An opaque texture representing the current raw camera frame.
     */
    getCameraTexture: (xrCamera: XRCamera) => Texture | null;
    setAnimationLoop: (callback: any) => void;
    dispose: () => void;
}
import { EventDispatcher } from '../../core/EventDispatcher.js';
import { ArrayCamera } from '../../cameras/ArrayCamera.js';
