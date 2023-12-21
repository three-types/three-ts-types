import Node from '../core/Node.js';
import { NodeRepresentation, Swizzable } from '../shadernode/ShaderNode.js';

export default class SpriteSheetUVNode extends Node {
    countNode: Node;
    uvNode: Node;
    frameNode: Node;

    constructor(countNode: Node, uvNode?: Node, frameNode?: Node);
}

export const spritesheetUV: (
    countNode: NodeRepresentation,
    uvNode?: NodeRepresentation,
    frameNode?: NodeRepresentation,
) => Swizzable<SpriteSheetUVNode>;
