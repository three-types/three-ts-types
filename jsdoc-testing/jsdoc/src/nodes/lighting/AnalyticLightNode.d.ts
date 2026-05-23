export default AnalyticLightNode;
/**
 * Base class for analytic light nodes.
 *
 * @augments LightingNode
 */
declare class AnalyticLightNode extends LightingNode {
    /**
     * Constructs a new analytic light node.
     *
     * @param {?Light} [light=null] - The light source.
     */
    constructor(light?: Light | null);
    /**
     * The light source.
     *
     * @type {?Light}
     * @default null
     */
    light: Light | null;
    /**
     * The light's color value.
     *
     * @type {Color}
     */
    color: Color;
    /**
     * The light's color node. Points to `colorNode` of the light source, if set. Otherwise
     * it creates a uniform node based on {@link AnalyticLightNode#color}.
     *
     * @type {Node}
     */
    colorNode: Node;
    /**
     * This property is used to retain a reference to the original value of {@link AnalyticLightNode#colorNode}.
     * The final color node is represented by a different node when using shadows.
     *
     * @type {?Node}
     * @default null
     */
    baseColorNode: Node | null;
    /**
     * Represents the light's shadow.
     *
     * @type {?ShadowNode}
     * @default null
     */
    shadowNode: ShadowNode | null;
    /**
     * Represents the light's shadow color.
     *
     * @type {?Node}
     * @default null
     */
    shadowColorNode: Node | null;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isAnalyticLightNode: boolean;
    _shadowDisposeListener: (() => void) | undefined;
    /**
     * Frees internal resources related to shadows.
     */
    disposeShadow(): void;
    getHash(): any;
    /**
     * Returns a node representing a direction vector which points from the current
     * position in view space to the light's position in view space.
     *
     * @param {NodeBuilder} builder - The builder object used for setting up the light.
     * @return {Node<vec3>} The light vector node.
     */
    getLightVector(builder: NodeBuilder): Node<vec3>;
    /**
     * Sets up the direct lighting for the analytic light node.
     *
     * @abstract
     * @param {NodeBuilder} builder - The builder object used for setting up the light.
     * @return {Object|undefined} The direct light data (color and direction).
     */
    setupDirect(): Object | undefined;
    /**
     * Sets up the direct rect area lighting for the analytic light node.
     *
     * @abstract
     * @param {NodeBuilder} builder - The builder object used for setting up the light.
     * @return {Object|undefined} The direct rect area light data.
     */
    setupDirectRectArea(): Object | undefined;
    /**
     * Setups the shadow node for this light. The method exists so concrete light classes
     * can setup different types of shadow nodes.
     *
     * @return {ShadowNode} The created shadow node.
     */
    setupShadowNode(): ShadowNode;
    /**
     * Setups the shadow for this light. This method is only executed if the light
     * cast shadows and the current build object receives shadows. It incorporates
     * shadows into the lighting computation.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    setupShadow(builder: NodeBuilder): void;
    /**
     * Unlike most other nodes, lighting nodes do not return a output node in {@link Node#setup}.
     * The main purpose of lighting nodes is to configure the current {@link LightingModel} and/or
     * invocate the respective interface methods.
     *
     * @param {NodeBuilder} builder - The current node builder.
     */
    setup(builder: NodeBuilder): void;
    /**
     * The update method is used to update light uniforms per frame.
     * Potentially overwritten in concrete light nodes to update light
     * specific uniforms.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    update(): void;
}
import LightingNode from './LightingNode.js';
import { Color } from '../../math/Color.js';
