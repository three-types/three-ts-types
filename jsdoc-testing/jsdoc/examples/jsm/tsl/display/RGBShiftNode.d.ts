export default RGBShiftNode;
export function rgbShift(node: Node<any>, amount?: number, angle?: number): RGBShiftNode;
/**
 * Post processing node for shifting/splitting RGB color channels. The effect
 * separates color channels and offsets them from each other.
 *
 * @augments TempNode
 * @three_import import { rgbShift } from 'three/addons/tsl/display/RGBShiftNode.js';
 */
declare class RGBShiftNode extends TempNode {
    /**
     * Constructs a new RGB shift node.
     *
     * @param {TextureNode} textureNode - The texture node that represents the input of the effect.
     * @param {number} [amount=0.005] - The amount of the RGB shift.
     * @param {number} [angle=0] - Defines the orientation in which colors are shifted.
     */
    constructor(textureNode: TextureNode, amount?: number, angle?: number);
    /**
     * The texture node that represents the input of the effect.
     *
     * @type {TextureNode}
     */
    textureNode: TextureNode;
    /**
     * The amount of the RGB shift.
     *
     * @type {UniformNode<float>}
     */
    amount: UniformNode<float>;
    /**
     * Defines in which direction colors are shifted.
     *
     * @type {UniformNode<float>}
     */
    angle: UniformNode<float>;
    /**
     * This method is used to setup the effect's TSL code.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {ShaderCallNodeInternal}
     */
    setup(): ShaderCallNodeInternal;
}
import { TempNode } from 'three/webgpu';
