import { ShaderNodeObject } from "../shadernode/ShaderNode.js";
import InputNode from "./InputNode.js";
import Node, { NodeTypeOption } from "./Node.js";
import NodeBuilder from "./NodeBuilder.js";
import UniformGroupNode from "./UniformGroupNode.js";

export default class UniformNode<Value> extends InputNode<Value> {
    readonly isUniformNode: true;

    groupNode: UniformGroupNode;

    constructor(value: Value, nodeType?: NodeTypeOption | null);

    setGroup(group: UniformGroupNode): this;

    getGroup(): UniformGroupNode;

    getUniformHash(builder: NodeBuilder): string;
}

export const uniform: <Value>(
    arg1: InputNode<Value> | Value,
    arg2?: Node | string,
) => ShaderNodeObject<UniformNode<Value>>;
