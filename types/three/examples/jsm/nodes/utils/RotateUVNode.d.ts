import TempNode from '../core/TempNode.js';
import Node from '../core/Node.js';
import { Swizzable } from '../shadernode/ShaderNode.js';

export default class RotateUVNode extends TempNode {
    uvNode: Node;
    rotationNode: Node;
    centerNode: Node;

    constructor(uvNode: Node, rotationNode: Node, centerNode?: Node);
}

export const rotateUV: (uvNode: Node, rotationNode: Node, centerNode?: Node) => Swizzable<RotateUVNode>;
