/**
 * This class can be used to represent the environmental light of
 * a XR session. It relies on the WebXR Lighting Estimation API.
 *
 * @augments Group
 * @three_import import { XREstimatedLight } from 'three/addons/webxr/XREstimatedLight.js';
 */
export class XREstimatedLight extends Group {
    /**
     * Constructs a new light.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {boolean} [environmentEstimation=true] - Whether to use environment estimation or not.
     */
    constructor(renderer: WebGLRenderer, environmentEstimation?: boolean);
    /**
     * The light probe that represents the estimated light.
     *
     * @type {LightProbe}
     */
    lightProbe: LightProbe;
    /**
     * Represents the primary light from the XR environment.
     *
     * @type {DirectionalLight}
     */
    directionalLight: DirectionalLight;
    /**
     * Will be set to a cube map in the SessionLightProbe if environment estimation is
     * available and requested.
     *
     * @type {?Texture}
     * @default null
     */
    environment: Texture | null;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     */
    dispose: () => void;
}
import { Group } from 'three';
import { LightProbe } from 'three';
import { DirectionalLight } from 'three';
