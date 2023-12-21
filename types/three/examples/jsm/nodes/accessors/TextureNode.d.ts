import { Texture } from '../../../../src/Three.js';
import UniformNode from '../core/UniformNode.js';
import Node from '../core/Node.js';
import { NodeRepresentation, Swizzable } from '../shadernode/ShaderNode.js';

export default class TextureNode extends UniformNode {
    isTextureNode: true;

    uvNode: Node | null;
    levelNode: Node | null;

    constructor(value: Texture, uvNode?: Node, levelNode?: Node | null);

    getDefaultUV(): Node;
}

export const texture: (
    value: Texture,
    uvNode?: NodeRepresentation,
    levelNode?: NodeRepresentation,
) => Swizzable<TextureNode>;
export const sampler: (aTexture: Texture | TextureNode) => Swizzable;
