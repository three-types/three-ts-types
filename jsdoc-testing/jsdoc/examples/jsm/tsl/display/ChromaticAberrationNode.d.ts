export default ChromaticAberrationNode;
export function chromaticAberration(node: Node<any>, strength?: Node | number, center?: (Node | Vector2) | null, scale?: Node | number): ChromaticAberrationNode;
/**
 * Post processing node for applying chromatic aberration effect.
 * This effect simulates the color fringing that occurs in real camera lenses
 * by separating and offsetting the red, green, and blue channels.
 *
 * @augments TempNode
 * @three_import import { chromaticAberration } from 'three/addons/tsl/display/ChromaticAberrationNode.js';
 */
declare class ChromaticAberrationNode extends TempNode {
    /**
     * Constructs a new chromatic aberration node.
     *
     * @param {TextureNode} textureNode - The texture node that represents the input of the effect.
     * @param {Node} strengthNode - The strength of the chromatic aberration effect as a node.
     * @param {Node} centerNode - The center point of the effect as a node.
     * @param {Node} scaleNode - The scale factor for stepped scaling from center as a node.
     */
    constructor(textureNode: TextureNode, strengthNode: Node, centerNode: Node, scaleNode: Node);
    /**
     * The texture node that represents the input of the effect.
     *
     * @type {texture}
     */
    textureNode: texture;
    /**
     * A node holding the strength of the effect.
     *
     * @type {Node}
     */
    strengthNode: Node;
    /**
     * A node holding the center point of the effect.
     *
     * @type {Node}
     */
    centerNode: Node;
    /**
     * A node holding the scale factor for stepped scaling.
     *
     * @type {Node}
     */
    scaleNode: Node;
    /**
     * This method is used to setup the effect's TSL code.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {ShaderCallNodeInternal}
     */
    setup(): ShaderCallNodeInternal;
}
import { TempNode } from 'three/webgpu';
