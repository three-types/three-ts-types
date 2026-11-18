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
     * @param {LightShadow} [shadow=light.shadow] - The light shadow.
     */
    constructor(light: Light, shadow?: LightShadow);
    /**
     * The shadow casting light.
     *
     * @type {Light}
     */
    light: Light;
    /**
     * The light shadow which defines the properties light's
     * shadow.
     *
     * @type {LightShadow}
     */
    shadow: LightShadow;
    /**
     * A Weak Map holding the current frame ID per camera. Used
     * to control the update of shadow maps.
     *
     * @type {WeakMap<Camera,number>}
     * @private
     */
    private _cameraFrameId;
    /**
     * Describes the render call that last updated the shadow map. Used
     * to share the shadow map with render calls nested in that one.
     *
     * @type {{frameId: number, callDepth: number, sceneId: number, layersMask: number}}
     * @private
     */
    private _lastUpdate;
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
    /**
     * Updates the shadow. Must be implemented by subclasses.
     *
     * @abstract
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    updateShadow(): void;
    /**
     * Returns `true` if the shadow map must be rendered for the given frame. The shadow
     * map is rendered once per camera and frame. Renders nested in the one that has
     * updated the shadow map in the current frame share it.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     * @return {boolean} Whether the shadow map must be rendered.
     */
    needsRefresh(frame: NodeFrame): boolean;
    /**
     * The implementation performs the update of the shadow map if necessary.
     *
     * @param {NodeFrame} frame - A reference to the current node frame.
     */
    updateBefore(frame: NodeFrame): false | undefined;
}
import NodeMaterial from '../../materials/nodes/NodeMaterial.js';
