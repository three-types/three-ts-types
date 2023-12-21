import Node from './Node.js';
import { NodeRepresentation, Swizzable } from '../shadernode/ShaderNode.js';

export default class VaryingNode extends Node {
    node: Node;
    name: string | null;

    constructor(node: Node, name?: string | null);
}

export const varying: (node: NodeRepresentation, name?: string) => Swizzable<VaryingNode>;
