import { NodeTypeOption } from "../core/Node.js";
import { ShaderNodeObject } from "../shadernode/ShaderNode.js";
import ReferenceNode from "./ReferenceNode.js";

export type NodeUserData = Record<string, any>;

export default class UserDataNode extends ReferenceNode<NodeUserData> {
    userData: NodeUserData | null;
    constructor(property: string, inputType: NodeTypeOption, userData?: NodeUserData | null);
}

export const userData: (
    name: string,
    inputType: NodeTypeOption,
    userData?: NodeUserData,
) => ShaderNodeObject<UserDataNode>;
