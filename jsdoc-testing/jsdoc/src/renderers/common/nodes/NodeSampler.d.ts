export default NodeSampler;
/**
 * A special form of sampler binding type.
 * It's texture value is managed by a node object.
 *
 * @private
 * @augments Sampler
 */
declare class NodeSampler extends Sampler {
    /**
     * Constructs a new node-based sampler.
     *
     * @param {string} name - The samplers's name.
     * @param {TextureNode} textureNode - The texture node.
     * @param {UniformGroupNode} groupNode - The uniform group node.
     */
    constructor(name: string, textureNode: TextureNode, groupNode: UniformGroupNode);
    /**
     * The texture node.
     *
     * @type {TextureNode}
     */
    textureNode: TextureNode;
    /**
     * The uniform group node.
     *
     * @type {UniformGroupNode}
     */
    groupNode: UniformGroupNode;
}
import Sampler from '../Sampler.js';
