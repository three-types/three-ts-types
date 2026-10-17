import Node from "../core/Node.js";
import TempNode from "../core/TempNode.js";
import VarNode from "../core/VarNode.js";

export type PackFloatNodeEncoding = "snorm" | "unorm" | "float16";

export type PackFloatNodeLayout = "2x16" | "4x8";

declare class PackFloatNode extends TempNode<"uint"> {
    vectorNode: Node;
    encoding: PackFloatNodeEncoding;
    layout: PackFloatNodeLayout;

    readonly isPackFloatNode: true;

    constructor(encoding: PackFloatNodeEncoding, vectorNode: Node);
}

export default PackFloatNode;

export const packSnorm2x16: (value: Node) => VarNode<"uint", PackFloatNode>;
export const packUnorm2x16: (value: Node) => VarNode<"uint", PackFloatNode>;
export const packHalf2x16: (value: Node) => VarNode<"uint", PackFloatNode>;
export const packSnorm4x8: (value: Node) => VarNode<"uint", PackFloatNode>;
export const packUnorm4x8: (value: Node) => VarNode<"uint", PackFloatNode>;
