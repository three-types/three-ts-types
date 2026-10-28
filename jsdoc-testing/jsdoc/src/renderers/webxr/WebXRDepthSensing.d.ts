/**
 * A XR module that manages the access to the Depth Sensing API.
 */
export class WebXRDepthSensing {
    /**
     * An opaque texture representing the depth of the user's environment.
     *
     * @type {?ExternalTexture}
     */
    texture: ExternalTexture | null;
    /**
     * A plane mesh for visualizing the depth texture.
     *
     * @type {?Mesh}
     */
    mesh: Mesh | null;
    /**
     * The depth near value.
     *
     * @type {number}
     */
    depthNear: number;
    /**
     * The depth near far.
     *
     * @type {number}
     */
    depthFar: number;
    /**
     * Inits the depth sensing module
     *
     * @param {XRWebGLDepthInformation} depthData - The XR depth data.
     * @param {XRRenderState} renderState - The XR render state.
     */
    init(depthData: XRWebGLDepthInformation, renderState: XRRenderState): void;
    /**
     * Returns a plane mesh that visualizes the depth texture.
     *
     * @param {ArrayCamera} cameraXR - The XR camera.
     * @return {?Mesh} The plane mesh.
     */
    getMesh(cameraXR: ArrayCamera): Mesh | null;
    /**
     * Resets the module
     */
    reset(): void;
    /**
     * Returns a texture representing the depth of the user's environment.
     *
     * @return {?ExternalTexture} The depth texture.
     */
    getDepthTexture(): ExternalTexture | null;
}
import { ExternalTexture } from '../../textures/ExternalTexture.js';
import { Mesh } from '../../objects/Mesh.js';
