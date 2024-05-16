import { ShaderNodeObject } from "../shadernode/ShaderNode.js";
import { NodeTypeOption } from "./constants.js";
import InputNode from "./InputNode.js";
import Node from "./Node.js";
import NodeBuilder from "./NodeBuilder.js";

export default class UniformGroupNode extends Node {
    readonly isUniformGroup: true;
    name: string;
    version: number;

    constructor(name: string, shared?: boolean);

    set needsUpdate(value: boolean);

}

export const uniformGroup: (name: string) => UniformGroupNode;
export const sharedUniformGroup: (name: string) => UniformGroupNode;
