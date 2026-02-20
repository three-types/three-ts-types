import Node from "../core/Node.js";

declare class ComputeBuiltinNode extends Node {
    constructor(builtinName: string, nodeType: string);
}

export default ComputeBuiltinNode;

export const numWorkgroups: ComputeBuiltinNode & Node<"uvec3">;
export const workgroupId: ComputeBuiltinNode & Node<"uvec3">;
export const globalId: ComputeBuiltinNode & Node<"uvec3">;
export const localId: ComputeBuiltinNode & Node<"uvec3">;
export const subgroupSize: ComputeBuiltinNode & Node<"uint">;
