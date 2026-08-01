export default LightsNode;
export function lights(lights?: Array<Light>): LightsNode;
/**
 * This node represents the scene's lighting and manages the lighting model's life cycle
 * for the current build 3D object. It is responsible for computing the total outgoing
 * light in a given lighting context.
 *
 * @augments Node
 */
declare class LightsNode extends Node {
    /**
     * Constructs a new lights node.
     */
    constructor();
    /**
     * A node representing the total diffuse light.
     *
     * @type {Node<vec3>}
     */
    totalDiffuseNode: Node<any>;
    /**
     * A node representing the total specular light.
     *
     * @type {Node<vec3>}
     */
    totalSpecularNode: Node<any>;
    /**
     * A node representing the outgoing light.
     *
     * @type {Node<vec3>}
     */
    outgoingLightNode: Node<any>;
    /**
     * An array representing the lights in the scene.
     *
     * @private
     * @type {Array<Light>}
     */
    private _lights;
    /**
     * Computes a hash value for identifying the current light nodes setup.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @return {string} The computed hash.
     */
    getHash(builder: NodeBuilder): string;
    /**
     * Analyzes the node's dependencies by building all nested light nodes
     * and the output node.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     */
    analyze(builder: NodeBuilder): void;
    /**
     * Creates lighting nodes for each scene light. This makes it possible to further
     * process lights in the node system.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @return {Array<LightingNode>} The array of lighting nodes.
     */
    setupLightsNode(builder: NodeBuilder): Array<LightingNode>;
    /**
     * Sets up a direct light in the lighting model.
     *
     * @param {Object} builder - The builder object containing the context and stack.
     * @param {Object} lightNode - The light node.
     * @param {Object} lightData - The light object containing color and direction properties.
     */
    setupDirectLight(builder: Object, lightNode: Object, lightData: Object): void;
    /**
     * Sets up a direct rect area light in the lighting model.
     *
     * @param {Object} builder - The builder object containing the context and stack.
     * @param {Object} lightNode - The light node.
     * @param {Object} lightData - The light object containing color and area light properties.
     */
    setupDirectRectAreaLight(builder: Object, lightNode: Object, lightData: Object): void;
    /**
     * Setups the internal lights by building all respective
     * light nodes.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @param {Array<LightingNode>} lightNodes - An array of lighting nodes.
     */
    setupLights(builder: NodeBuilder, lightNodes: Array<LightingNode>): void;
    getLightNodes(builder: any): any;
    /**
     * The implementation makes sure that for each light in the scene
     * there is a corresponding light node. By building the light nodes
     * and evaluating the lighting model the outgoing light is computed.
     *
     * @param {NodeBuilder} builder - A reference to the current node builder.
     * @return {Node<vec3>} A node representing the outgoing light.
     */
    setup(builder: NodeBuilder): Node<any>;
    /**
     * Configures this node with an array of lights.
     *
     * @param {Array<Light>} lights - An array of lights.
     * @return {LightsNode} A reference to this node.
     */
    setLights(lights: Array<Light>): LightsNode;
    /**
     * Returns an array of the scene's lights.
     *
     * @return {Array<Light>} The scene's lights.
     */
    getLights(): Array<Light>;
    /**
     * Whether the scene has lights or not.
     *
     * @type {boolean}
     */
    get hasLights(): boolean;
}
import Node from '../core/Node.js';
