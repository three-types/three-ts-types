import { ShaderNodeObject } from "../tsl/TSLCore.js";
import Node from "./Node.js";
import StructTypeNode from "./StructTypeNode.js";

declare class StructNode extends Node {
    constructor(structLayoutNode: StructTypeNode);
}

export default StructNode;

export interface Struct {
    (...params: unknown[]): ShaderNodeObject<StructNode>;
    layout: StructTypeNode;
    isStruct: true;
}

export const struct: (membersLayout: MembersLayout, name?: string | null) => Struct;
