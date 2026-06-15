export default FXAANode;
export function fxaa(node: Node<vec4>): FXAANode;
/**
 * Post processing node for applying FXAA. This node requires sRGB input
 * so tone mapping and color space conversion must happen before the anti-aliasing.
 *
 * @augments TempNode
 * @three_import import { fxaa } from 'three/addons/tsl/display/FXAANode.js';
 */
declare class FXAANode extends TempNode {
    /**
     * Constructs a new FXAA node.
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
