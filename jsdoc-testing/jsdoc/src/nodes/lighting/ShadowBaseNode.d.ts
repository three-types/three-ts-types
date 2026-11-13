/**
 * TSL object that represents the vertex position in world space during the shadow pass.
 *
 * @tsl
 * @type {Node<vec3>}
 */
export const shadowPositionWorld: Node<vec3>;
export default ShadowBaseNode;
import Node from '../core/Node.js';
/**
 * Base class for all shadow nodes.
 *
 * Shadow nodes encapsulate shadow related logic and are always coupled to lighting nodes.
 * Lighting nodes might share the same shadow node type or use specific ones depending on
 * their requirements.
 *
 * @augments Node
 */
declare class ShadowBaseNode extends Node {
    /**
     * Constructs a new shadow base node.
     *
     * @param {Light} light - The shadow casting light.
     */
    constructor(light: Light);
    /**
     * The shadow casting light.
     *
     * @type {Light}
     */
    light: Light;
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isShadowBaseNode: boolean;
    /**
     * Retrieves or creates a shadow material for the shadow casting light source.
     *
     * This method checks if a shadow material already exists for the provided light in the internal library.
     * If not, it creates a new `NodeMaterial` configured for shadow rendering and stores it for future use.
     *
     * @return {NodeMaterial} The shadow material associated with the given light.
     */
    getShadowMaterial(): NodeMaterial;
    /**
     * Disposes the shadow material for the shadow casting light source.
     */
    disposeShadowMaterial(): void;
    /**
     * Returns a function to render shadow objects in a scene for the given light shadow and renderer.
     *
     * @param {Renderer} renderer - The renderer.
     * @param {LightShadow} [shadow=this.light.shadow] - The light shadow object containing shadow properties.
     * @return {Function} A function that renders shadow objects.
     */
    getShadowRenderObjectFunction(renderer: Renderer, shadow?: LightShadow): Function;
    /**
     * Setups the shadow position node which is by default the predefined TSL node object `shadowPositionWorld`.
     *
     * @param {NodeBuilder} object - A configuration object that must at least hold a material reference.
     */
    setupShadowPosition({ context, material }: NodeBuilder): void;
}
import NodeMaterial from '../../materials/nodes/NodeMaterial.js';
