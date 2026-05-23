export default SobelOperatorNode;
export function sobel(node: Node<any>): SobelOperatorNode;
/**
 * Post processing node for detecting edges with a sobel filter.
 * A sobel filter should be applied after tone mapping and output color
 * space conversion.
 *
 * @augments TempNode
 * @three_import import { sobel } from 'three/addons/tsl/display/SobelOperatorNode.js';
 */
declare class SobelOperatorNode extends TempNode {
    /**
     * Constructs a new sobel operator node.
     *
     * @param {TextureNode} textureNode - The texture node that represents the input of the effect.
     */
    constructor(textureNode: TextureNode);
    /**
     * The texture node that represents the input of the effect.
     *
     * @type {TextureNode}
     */
    textureNode: TextureNode;
    /**
     * A uniform node holding the inverse resolution value.
     *
     * @private
     * @type {UniformNode<vec2>}
     */
    private _invSize;
    /**
     * This method is used to update the effect's uniforms once per frame.
     *
     * @param {NodeFrame} frame - The current node frame.
     */
    updateBefore(): void;
    /**
     * This method is used to setup the effect's TSL code.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {ShaderCallNodeInternal}
     */
    setup(): ShaderCallNodeInternal;
}
import { TempNode } from 'three/webgpu';
