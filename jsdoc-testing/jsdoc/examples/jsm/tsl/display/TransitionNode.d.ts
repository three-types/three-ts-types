export default TransitionNode;
export function transition(nodeA: Node<any>, nodeB: Node<any>, mixTextureNode: Node<any>, mixRatio: Node<any> | number, threshold: Node<any> | number, useTexture: Node<any> | number): TransitionNode;
/**
 * Post processing node for creating a transition effect between scenes.
 *
 * @augments TempNode
 * @three_import import { transition } from 'three/addons/tsl/display/TransitionNode.js';
 */
declare class TransitionNode extends TempNode {
    /**
     * Constructs a new transition node.
     *
     * @param {TextureNode} textureNodeA - A texture node that represents the beauty pass of the first scene.
     * @param {TextureNode} textureNodeB - A texture node that represents the beauty pass of the second scene.
     * @param {TextureNode} mixTextureNode - A texture node that defines how the transition effect should look like.
     * @param {Node<float>} mixRatioNode - The interpolation factor that controls the mix.
     * @param {Node<float>} thresholdNode - Can be used to tweak the linear interpolation.
     * @param {Node<float>} useTextureNode - Whether `mixTextureNode` should influence the transition or not.
     */
    constructor(textureNodeA: TextureNode, textureNodeB: TextureNode, mixTextureNode: TextureNode, mixRatioNode: Node<any>, thresholdNode: Node<any>, useTextureNode: Node<any>);
    /**
     * A texture node that represents the beauty pass of the first scene.
     *
     * @type {TextureNode}
     */
    textureNodeA: TextureNode;
    /**
     * A texture node that represents the beauty pass of the second scene.
     *
     * @type {TextureNode}
     */
    textureNodeB: TextureNode;
    /**
     * A texture that defines how the transition effect should look like.
     *
     * @type {TextureNode}
     */
    mixTextureNode: TextureNode;
    /**
     * The interpolation factor that controls the mix.
     *
     * @type {Node<float>}
     */
    mixRatioNode: Node<any>;
    /**
     * Can be used to tweak the linear interpolation.
     *
     * @type {Node<float>}
     */
    thresholdNode: Node<any>;
    /**
     * Whether `mixTextureNode` should influence the transition or not.
     *
     * @type {Node<float>}
     */
    useTextureNode: Node<any>;
    /**
     * This method is used to setup the effect's TSL code.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {ShaderCallNodeInternal}
     */
    setup(): ShaderCallNodeInternal;
}
import { TempNode } from 'three/webgpu';
