import Node from "../core/Node.js";

export default class RemapNode extends Node<"float"> {
    node: Node;
    inLowNode: Node;
    inHighNode: Node;
    outLowNode: Node;
    outHighNode: Node;

    doClamp: boolean;

    constructor(node: Node, inLowNode: Node, inHighNode: Node, outLowNode?: Node, outHighNode?: Node);
}

export const remap: (
    node: Node,
    inLowNode: Node | number,
    inHighNode: Node | number,
    outLowNode?: Node | number,
    outHighNode?: Node | number,
) => RemapNode;
export const remapClamp: (
    node: Node,
    inLowNode: Node | number,
    inHighNode: Node | number,
    outLowNode?: Node | number,
    outHighNode?: Node | number,
) => RemapNode;

declare module "../core/Node.js" {
    interface FloatExtensions {
        remap: (
            inLowNode: Node<"float"> | number,
            inHighNode: Node<"float"> | number,
            outLowNode?: Node<"float"> | number,
            outHighNode?: Node<"float"> | number,
        ) => RemapNode;
        remapAssign: (
            inLowNode: Node<"float"> | number,
            inHighNode: Node<"float"> | number,
            outLowNode?: Node<"float"> | number,
            outHighNode?: Node<"float"> | number,
        ) => this;

        remapClamp: (
            inLowNode: Node<"float"> | number,
            inHighNode: Node<"float"> | number,
            outLowNode?: Node<"float"> | number,
            outHighNode?: Node<"float"> | number,
        ) => RemapNode;
        remapClampAssign: (
            inLowNode: Node<"float"> | number,
            inHighNode: Node<"float"> | number,
            outLowNode?: Node<"float"> | number,
            outHighNode?: Node<"float"> | number,
        ) => this;
    }
}
