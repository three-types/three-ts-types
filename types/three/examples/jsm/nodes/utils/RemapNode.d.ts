import Node from '../core/Node.js';
import { Swizzable } from '../shadernode/ShaderNode.js';

export default class RemapNode extends Node {
    node: Node;
    inLowNode: Node;
    inHighNode: Node;
    outLowNode: Node;
    outHighNode: Node;

    doClamp: boolean;

    constructor(node: Node, inLowNode: Node, inHighNode: Node, outLowNode: Node, outHighNode: Node);
}

export const remap: (node: Node, inLowNode: Node) => Swizzable<RemapNode>;
export const remapClamp: (node: Node, inLowNode: Node) => Swizzable<RemapNode>;
