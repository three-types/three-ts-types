/**
 * An implementation of Cascade Shadow Maps (CSM).
 *
 * This module can only be used with {@link WebGLRenderer}. When using {@link WebGPURenderer},
 * use {@link CSMShadowNode} instead.
 *
 * @three_import import { CSM } from 'three/addons/csm/CSM.js';
 */
export class CSM {
    /**
     * Constructs a new CSM instance.
     *
     * @param {CSM~Data} data - The CSM data.
     */
    constructor(data: any);
    /**
     * The scene's camera.
     *
     * @type {Camera}
     */
    camera: Camera;
    /**
     * The parent object, usually the scene.
     *
     * @type {Object3D}
     */
    parent: Object3D;
    /**
     * The number of cascades.
     *
     * @type {number}
     * @default 3
     */
    cascades: number;
    /**
     * The maximum far value.
     *
     * @type {number}
     * @default 100000
     */
    maxFar: number;
    /**
     * The frustum split mode.
     *
     * @type {('practical'|'uniform'|'logarithmic'|'custom')}
     * @default 'practical'
     */
    mode: ("practical" | "uniform" | "logarithmic" | "custom");
    /**
     * The shadow map size.
     *
     * @type {number}
     * @default 2048
     */
    shadowMapSize: number;
    /**
     * The shadow bias.
     *
     * @type {number}
     * @default 0.000001
     */
    shadowBias: number;
    /**
     * The light direction.
     *
     * @type {Vector3}
     */
    lightDirection: Vector3;
    /**
     * The light intensity.
     *
     * @type {number}
     * @default 3
     */
    lightIntensity: number;
    /**
     * The light near value.
     *
     * @type {number}
     * @default 1
     */
    lightNear: number;
    /**
     * The light far value.
     *
     * @type {number}
     * @default 2000
     */
    lightFar: number;
    /**
     * The light margin.
     *
     * @type {number}
     * @default 200
     */
    lightMargin: number;
    /**
     * Custom split callback when using `mode='custom'`.
     *
     * @type {Function}
     */
    customSplitsCallback: Function;
    /**
     * Whether to fade between cascades or not.
     *
     * @type {boolean}
     * @default false
     */
    fade: boolean;
    /**
     * The main frustum.
     *
     * @type {CSMFrustum}
     */
    mainFrustum: CSMFrustum;
    /**
     * An array of frustums representing the cascades.
     *
     * @type {Array<CSMFrustum>}
     */
    frustums: Array<CSMFrustum>;
    /**
     * An array of numbers in the range `[0,1]` the defines how the
     * mainCSM frustum should be split up.
     *
     * @type {Array<number>}
     */
    breaks: Array<number>;
    /**
     * An array of directional lights which cast the shadows for
     * the different cascades. There is one directional light for each
     * cascade.
     *
     * @type {Array<DirectionalLight>}
     */
    lights: Array<DirectionalLight>;
    /**
     * A Map holding enhanced material shaders.
     *
     * @type {Map<Material,Object>}
     */
    shaders: Map<Material, Object>;
    /**
     * Creates the directional lights of this CSM instance.
     *
     * @private
     */
    private _createLights;
    /**
     * Inits the cascades according to the scene's camera and breaks configuration.
     *
     * @private
     */
    private _initCascades;
    /**
     * Updates the shadow bounds of this CSM instance.
     *
     * @private
     */
    private _updateShadowBounds;
    /**
     * Computes the breaks of this CSM instance based on the scene's camera, number of cascades
     * and the selected split mode.
     *
     * @private
     */
    private _getBreaks;
    /**
     * Updates the CSM. This method must be called in your animation loop before
     * calling `renderer.render()`.
     */
    update(): void;
    /**
     * Injects the CSM shader enhancements into the built-in materials.
     *
     * @private
     */
    private _injectInclude;
    /**
     * Applications must call this method for all materials that should be affected by CSM.
     *
     * @param {Material} material - The material to setup for CSM support.
     */
    setupMaterial(material: Material): void;
    /**
     * Updates the CSM uniforms.
     *
     * @private
     */
    private _updateUniforms;
    /**
     * Computes the extended breaks for the CSM uniforms.
     *
     * @private
     * @param {Array<Vector2>} target - The target array that holds the extended breaks.
     */
    private _getExtendedBreaks;
    /**
     * Applications must call this method every time they change camera or CSM settings.
     */
    updateFrustums(): void;
    /**
     * Applications must call this method when they remove the CSM usage from their scene.
     */
    remove(): void;
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever this instance is no longer used in your app.
     */
    dispose(): void;
}
import { Vector3 } from 'three';
import { CSMFrustum } from './CSMFrustum.js';
import { DirectionalLight } from 'three';
