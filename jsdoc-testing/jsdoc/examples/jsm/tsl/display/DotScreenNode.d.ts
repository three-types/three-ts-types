export default DotScreenNode;
export function dotScreen(node: Node<any>, angle?: number, scale?: number): DotScreenNode;
/**
 * Post processing node for creating dot-screen effect.
 *
 * @augments TempNode
 * @three_import import { dotScreen } from 'three/addons/tsl/display/DotScreenNode.js';
 */
declare class DotScreenNode extends TempNode {
    /**
     * Constructs a new dot screen node.
     *
     * @param {Node} inputNode - The node that represents the input of the effect.
     * @param {number} [angle=1.57] - The rotation of the effect in radians.
     * @param {number} [scale=1] - The scale of the effect. A higher value means smaller dots.
     */
    constructor(inputNode: Node, angle?: number, scale?: number);
    /**
     * The node that represents the input of the effect.
     *
     * @type {Node}
     */
    inputNode: Node;
    /**
     * A uniform node that represents the rotation of the effect in radians.
     *
     * @type {UniformNode<float>}
     */
    angle: UniformNode<float>;
    /**
     * A uniform node that represents the scale of the effect. A higher value means smaller dots.
     *
     * @type {UniformNode<float>}
     */
    scale: UniformNode<float>;
    /**
     * This method is used to setup the effect's TSL code.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {ShaderCallNodeInternal}
     */
    setup(): ShaderCallNodeInternal;
}
import { TempNode } from 'three/webgpu';
