import Node from '../core/Node.js';
import PositionNode from '../accessors/PositionNode.js';
import TextureNode from '../accessors/TextureNode.js';
import { NodeRepresentation, Swizzable } from '../shadernode/ShaderNode.js';

export default class TriplanarTexturesNode extends Node {
    textureXNode: TextureNode;
    textureYNode: TextureNode | null;
    textureZNode: TextureNode | null;

    scaleNode: Swizzable;

    positionNode: Swizzable<PositionNode>;
    normalNode: Swizzable<PositionNode>;

    constructor(
        textureXNode: Node,
        textureYNode?: TextureNode | null,
        textureZNode?: TextureNode | null,
        scaleNode?: Swizzable,
        positionNode?: Swizzable<PositionNode>,
        normalNode?: Swizzable<PositionNode>,
    );
}

export const triplanarTextures: (
    textureXNode: NodeRepresentation,
    textureYNode?: NodeRepresentation,
    textureZNode?: NodeRepresentation,
    scaleNode?: NodeRepresentation,
    positionNode?: NodeRepresentation,
    normalNode?: NodeRepresentation,
) => Swizzable<TriplanarTexturesNode>;
export const triplanarTexture: (
    texture: NodeRepresentation,
    ...params: NodeRepresentation[]
) => Swizzable<TriplanarTexturesNode>;
