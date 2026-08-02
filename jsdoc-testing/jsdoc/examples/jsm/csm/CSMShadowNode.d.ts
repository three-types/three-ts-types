/**
 * ~Data
 */
export type CSMShadowNode = {
    /**
     * - The number of cascades.
     */
    cascades?: number | undefined;
    /**
     * - The maximum far value.
     */
    maxFar?: number | undefined;
    /**
     * - The frustum split mode.
     */
    mode?: "uniform" | "custom" | "practical" | "logarithmic" | undefined;
    /**
     * - Custom split callback when using `mode='custom'`.
     */
    customSplitsCallback?: Function | undefined;
    /**
     * - The light margin.
     */
    lightMargin?: number | undefined;
};
/**
 * An implementation of Cascade Shadow Maps (CSM).
 *
 * This module can only be used with {@link WebGPURenderer}. When using {@link WebGLRenderer},
 * use {@link CSM} instead.
 *
 * @augments ShadowBaseNode
 * @three_import import { CSMShadowNode } from 'three/addons/csm/CSMShadowNode.js';
 */
export class CSMShadowNode extends ShadowBaseNode {
    /**
     * Constructs a new CSM shadow node.
     *
     * @param {DirectionalLight} light - The CSM light.
     * @param {CSMShadowNode~Data} [data={}] - The CSM data.
     */
    constructor(light: DirectionalLight, data?: {});
    /**
     * The scene's camera.
     *
     * @type {?Camera}
     * @default null
     */
    camera: Camera | null;
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
     * An array of numbers in the range `[0,1]` the defines how the
     * mainCSM frustum should be split up.
     *
     * @type {Array<number>}
     */
    breaks: Array<number>;
    _cascades: any[];
    /**
     * The main frustum.
     *
     * @type {?CSMFrustum}
     * @default null
     */
    mainFrustum: CSMFrustum | null;
    /**
     * An array of frustums representing the cascades.
     *
     * @type {Array<CSMFrustum>}
     */
    frustums: Array<CSMFrustum>;
    /**
     * An array of directional lights which cast the shadows for
     * the different cascades. There is one directional light for each
     * cascade.
     *
     * @type {Array<DirectionalLight>}
     */
    lights: Array<DirectionalLight>;
    _shadowNodes: any[];
    /**
     * Inits the CSM shadow node.
     *
     * @private
     * @param {NodeBuilder} builder - The node builder.
     */
    private _init;
    /**
     * Inits the cascades according to the scene's camera and breaks configuration.
     *
     * @private
     */
    private _initCascades;
    /**
     * Computes the breaks of this CSM instance based on the scene's camera, number of cascades
     * and the selected split mode.
     *
     * @private
     */
    private _getBreaks;
    /**
     * Sets the light breaks.
     *
     * @private
     */
    private _setLightBreaks;
    /**
     * Updates the shadow bounds of this CSM instance.
     *
     * @private
     */
    private _updateShadowBounds;
    /**
     * Applications must call this method every time they change camera or CSM settings.
     */
    updateFrustums(): void;
    /**
     * Setups the TSL when using fading.
     *
     * @private
     * @return {ShaderCallNodeInternal}
     */
    private _setupFade;
    /**
     * Setups the TSL when no fading (default).
     *
     * @private
     * @return {ShaderCallNodeInternal}
     */
    private _setupStandard;
    setup(builder: any): any;
    updateBefore(): void;
}
import { ShadowBaseNode } from 'three/webgpu';
import { CSMFrustum } from './CSMFrustum.js';
