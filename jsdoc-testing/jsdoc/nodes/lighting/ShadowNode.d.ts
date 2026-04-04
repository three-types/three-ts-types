export function getShadowRenderObjectFunction(renderer: Renderer, shadow: LightShadow, shadowType: number, useVelocity: boolean): shadowRenderObjectFunction;
export default ShadowNode;
export function shadow(light: Light, shadow?: LightShadow | null): ShadowNode;
/**
 * Represents the default shadow implementation for lighting nodes.
 *
 * @augments ShadowBaseNode
 */
declare class ShadowNode extends ShadowBaseNode {
    /**
     * Constructs a new shadow node.
     *
     * @param {Light} light - The shadow casting light.
     * @param {?LightShadow} [shadow=null] - An optional light shadow.
     */
    constructor(light: Light, shadow?: LightShadow | null);
    /**
     * The light shadow which defines the properties light's
     * shadow.
     *
     * @type {?LightShadow}
     * @default null
     */
    shadow: LightShadow | null;
    /**
     * A reference to the shadow map which is a render target.
     *
     * @type {?RenderTarget}
     * @default null
     */
    shadowMap: RenderTarget | null;
    /**
     * Only relevant for VSM shadows. Render target for the
     * first VSM render pass.
     *
     * @type {?RenderTarget}
     * @default null
     */
    vsmShadowMapVertical: RenderTarget | null;
    /**
     * Only relevant for VSM shadows. Render target for the
     * second VSM render pass.
     *
     * @type {?RenderTarget}
     * @default null
     */
    vsmShadowMapHorizontal: RenderTarget | null;
    /**
     * Only relevant for VSM shadows. Node material which
     * is used to render the first VSM pass.
     *
     * @type {?NodeMaterial}
     * @default null
     */
    vsmMaterialVertical: NodeMaterial | null;
    /**
     * Only relevant for VSM shadows. Node material which
     * is used to render the second VSM pass.
     *
     * @type {?NodeMaterial}
     * @default null
     */
    vsmMaterialHorizontal: NodeMaterial | null;
    /**
     * A reference to the output node which defines the
     * final result of this shadow node.
     *
     * @type {?Node}
     * @private
     * @default null
     */
    private _node;
    /**
     * The current shadow map type of this shadow node.
     *
     * @type {?number}
     * @private
     * @default null
     */
    private _currentShadowType;
    /**
     * A Weak Map holding the current frame ID per camera. Used
     * to control the update of shadow maps.
     *
     * @type {WeakMap<Camera,number>}
     * @private
     */
    private _cameraFrameId;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isShadowNode: boolean;
    /**
     * This index can be used when overriding setupRenderTarget with a RenderTarget Array to specify the depth layer.
     *
     * @type {number}
     * @readonly
     * @default true
     */
    readonly depthLayer: number;
    /**
     * Setups the shadow filtering.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @param {Object} inputs - A configuration object that defines the shadow filtering.
     * @param {Function} inputs.filterFn - This function defines the filtering type of the shadow map e.g. PCF.
     * @param {DepthTexture} inputs.depthTexture - A reference to the shadow map's texture data.
     * @param {Node<vec3>} inputs.shadowCoord - Shadow coordinates which are used to sample from the shadow map.
     * @param {LightShadow} inputs.shadow - The light shadow.
     * @return {Node<float>} The result node of the shadow filtering.
     */
    setupShadowFilter(builder: NodeBuilder, { filterFn, depthTexture, shadowCoord, shadow, depthLayer }: {
        filterFn: Function;
        depthTexture: DepthTexture;
        shadowCoord: Node<any>;
        shadow: LightShadow;
    }): Node<any>;
    /**
     * Setups the shadow coordinates.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @param {Node<vec3>} shadowPosition - A node representing the shadow position.
     * @return {Node<vec3>} The shadow coordinates.
     */
    setupShadowCoord(builder: NodeBuilder, shadowPosition: Node<any>): Node<any>;
    /**
     * Returns the shadow filtering function for the given shadow type.
     *
     * @param {number} type - The shadow type.
     * @return {Function} The filtering function.
     */
    getShadowFilterFn(type: number): Function;
    setupRenderTarget(shadow: any, builder: any): {
        shadowMap: any;
        depthTexture: DepthTexture;
    };
    /**
     * Setups the shadow output node.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @return {Node<vec3>} The shadow output node.
     */
    setupShadow(builder: NodeBuilder): Node<any>;
    /**
     * The implementation performs the setup of the output node. An output is only
     * produces if shadow mapping is globally enabled in the renderer.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @return {ShaderCallNodeInternal} The output node.
     */
    setup(builder: NodeBuilder): ShaderCallNodeInternal;
    /**
     * Renders the shadow. The logic of this function could be included
     * into {@link ShadowNode#updateShadow} however more specialized shadow
     * nodes might require a custom shadow map rendering. By having a
     * dedicated method, it's easier to overwrite the default behavior.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    renderShadow(frame: NodeFrame): void;
    /**
     * Updates the shadow.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    updateShadow(frame: NodeFrame): void;
    _depthVersionCached: any;
    /**
     * For VSM additional render passes are required.
     *
     * @param {Renderer} renderer - A reference to the current renderer.
     */
    vsmPass(renderer: Renderer): void;
    /**
     * Resets the resouce state of this shadow node.
     *
     * @private
     */
    private _reset;
    /**
     * The implementation performs the update of the shadow map if necessary.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    updateBefore(frame: NodeFrame): void;
}
import ShadowBaseNode from './ShadowBaseNode.js';
import NodeMaterial from '../../materials/nodes/NodeMaterial.js';
import { DepthTexture } from '../../textures/DepthTexture.js';
