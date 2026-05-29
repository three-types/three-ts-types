/**
 * A special form of sampled texture binding type.
 * It's texture value is managed by a node object.
 *
 * @private
 * @augments SampledTexture
 */
export class NodeSampledTexture extends SampledTexture {
    /**
     * Constructs a new node-based sampled texture.
     *
     * @param {string} name - The textures's name.
     * @param {TextureNode} textureNode - The texture node.
     * @param {UniformGroupNode} groupNode - The uniform group node.
     * @param {?string} [access=null] - The access type.
     */
    constructor(name: string, textureNode: TextureNode, groupNode: UniformGroupNode, access?: string | null);
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
    /**
     * The access type.
     *
     * @type {?string}
     * @default null
     */
    access: string | null;
}
/**
 * A special form of sampled cube texture binding type.
 * It's texture value is managed by a node object.
 *
 * @private
 * @augments NodeSampledTexture
 */
export class NodeSampledCubeTexture extends NodeSampledTexture {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSampledCubeTexture: boolean;
}
/**
 * A special form of sampled 3D texture binding type.
 * It's texture value is managed by a node object.
 *
 * @private
 * @augments NodeSampledTexture
 */
export class NodeSampledTexture3D extends NodeSampledTexture {
    /**
     * This flag can be used for type testing.
     *
     * @type {boolean}
     * @readonly
     * @default true
     */
    readonly isSampledTexture3D: boolean;
}
import { SampledTexture } from '../SampledTexture.js';
