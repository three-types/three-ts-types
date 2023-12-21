import { NodeTypeOption, NodeValueOption } from './constants.js';
import InputNode from './InputNode.js';
import NodeBuilder from './NodeBuilder.js';
import Node from './Node.js';
import { ShaderNodeObject } from '../shadernode/ShaderNode.js';

export default class UniformNode extends InputNode {
    isUniformNode: true;

    constructor(value: NodeValueOption, nodeType?: NodeTypeOption | null);
    getUniformHash(builder: NodeBuilder): string;
}

export const uniform: (
    arg1: Node | ShaderNodeObject<Node> | NodeValueOption,
    arg2?: Node | ShaderNodeObject<Node> | NodeValueOption,
) => ShaderNodeObject<Node>;
