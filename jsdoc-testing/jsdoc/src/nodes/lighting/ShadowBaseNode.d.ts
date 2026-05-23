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
     * Setups the shadow position node which is by default the predefined TSL node object `shadowPositionWorld`.
     *
     * @param {NodeBuilder} object - A configuration object that must at least hold a material reference.
     */
    setupShadowPosition({ context, material }: NodeBuilder): void;
}
