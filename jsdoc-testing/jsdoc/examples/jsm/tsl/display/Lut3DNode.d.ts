export default Lut3DNode;
export function lut3D(node: Node, lut: TextureNode, size: number, intensity: Node<any> | number): Lut3DNode;
/**
 * A post processing node for color grading via lookup tables.
 *
 * @augments TempNode
 * @three_import import { lut3D } from 'three/addons/tsl/display/Lut3DNode.js';
 */
declare class Lut3DNode extends TempNode {
    /**
     * Constructs a new LUT node.
     *
     * @param {Node} inputNode - The node that represents the input of the effect.
     * @param {TextureNode} lutNode - A texture node that represents the lookup table.
     * @param {number} size - The size of the lookup table.
     * @param {Node<float>} intensityNode - Controls the intensity of the effect.
     */
    constructor(inputNode: Node, lutNode: TextureNode, size: number, intensityNode: Node<any>);
    /**
     * The node that represents the input of the effect.
     *
     * @type {Node}
     */
    inputNode: Node;
    /**
     * A texture node that represents the lookup table.
     *
     * @type {TextureNode}
     */
    lutNode: TextureNode;
    /**
     * The size of the lookup table.
     *
     * @type {UniformNode<float>}
     */
    size: UniformNode<any>;
    /**
     * Controls the intensity of the effect.
     *
     * @type {Node<float>}
     */
    intensityNode: Node<any>;
    /**
     * This method is used to setup the effect's TSL code.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {ShaderCallNodeInternal}
     */
    setup(): ShaderCallNodeInternal;
}
import { TempNode } from 'three/webgpu';
