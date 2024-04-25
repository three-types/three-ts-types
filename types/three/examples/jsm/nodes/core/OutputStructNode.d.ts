import { ShaderNodeObject } from "../shadernode/ShaderNode";
import Node from "./Node";

export default class OutputStructNode extends Node {
    members: Node[];

    readonly isOutputStructNode: true;

    constructor(...members: Node[]);
}

export const outputStruct: ShaderNodeObject<OutputStructNode>;
