import TextureNode from "../accessors/TextureNode.js";
import Node from "../core/Node.js";
import { ShaderNodeObject } from "../tsl/TSLCore.js";

export default class TriplanarTexturesNode extends Node {
    textureXNode: TextureNode;
    textureYNode: TextureNode | null;
    textureZNode: TextureNode | null;

    scaleNode: ShaderNodeObject<Node>;

    positionNode: ShaderNodeObject<Node>;
    normalNode: ShaderNodeObject<Node>;

    constructor(
        textureXNode: Node,
        textureYNode?: TextureNode | null,
        textureZNode?: TextureNode | null,
        scaleNode?: ShaderNodeObject<Node>,
        positionNode?: ShaderNodeObject<Node>,
        normalNode?: ShaderNodeObject<Node>,
    );
}

export const triplanarTextures: (
    textureXNode: Node,
    textureYNode?: Node,
    textureZNode?: Node,
    scaleNode?: Node,
    positionNode?: Node,
    normalNode?: Node,
) => ShaderNodeObject<TriplanarTexturesNode>;
export const triplanarTexture: (
    texture: Node,
    ...params: Node[]
) => ShaderNodeObject<TriplanarTexturesNode>;
