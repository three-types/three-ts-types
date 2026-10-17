export default DotScreenNode;
export function dotScreen(node: Node<any>, angle?: number | Node<float>, scale?: number | Node<float>): DotScreenNode;
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
     * @param {number|Node<float>} [angle=1.57] - The rotation of the effect in radians.
     * @param {number|Node<float>} [scale=1] - The scale of the effect. A higher value means smaller dots.
     */
    constructor(inputNode: Node, angle?: number | Node<float>, scale?: number | Node<float>);
    /**
     * The node that represents the input of the effect.
     *
     * @type {Node}
     */
    inputNode: Node;
    /**
     * The rotation of the effect in radians.
     *
     * @type {Node<float>}
     */
    angle: Node<float>;
    /**
     * The scale of the effect. A higher value means smaller dots.
     *
     * @type {Node<float>}
     */
    scale: Node<float>;
    /**
     * This method is used to setup the effect's TSL code.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {ShaderCallNodeInternal}
     */
    setup(): ShaderCallNodeInternal;
}
import { TempNode } from 'three/webgpu';
