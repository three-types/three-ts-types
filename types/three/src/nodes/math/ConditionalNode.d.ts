import Node from "../core/Node.js";

declare class ConditionalNode extends Node {
    condNode: Node;
    ifNode: Node;
    elseNode: Node | null;

    constructor(condNode: Node, ifNode: Node, elseNode?: Node | null);
}

export default ConditionalNode;

export const select: (
    condNode: Node,
    ifNode: Node | number,
    elseNode?: Node | number | null,
) => Node;

declare module "../core/Node.js" {
    interface NodeElements {
        select: (
            ifNode: Node | number,
            elseNode?: Node | number | null,
        ) => Node;
        selectAssign: (
            ifNode: Node | number,
            elseNode?: Node | number | null,
        ) => this;
    }
}
