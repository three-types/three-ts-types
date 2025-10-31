import Node from "../core/Node.js";

interface ConditionalNodeInterface {
    condNode: Node;
    ifNode: Node;
    elseNode: Node | null;
}

declare const ConditionalNode: {
    new<TNodeValue>(
        condNode: Node<"bool">,
        ifNode: Node<TNodeValue>,
        elseNode?: Node<TNodeValue> | null,
    ): ConditionalNode<TNodeValue>;
};

type ConditionalNode<TNodeValue> = Node<TNodeValue> & ConditionalNodeInterface;

export default ConditionalNode;

interface Select {
    (
        condNode: Node<"bool">,
        ifNode: Node<"float"> | number,
        elseNode?: Node<"float"> | number | null,
    ): Node<"float">;
    <TNodeValue>(
        condNode: Node<"bool">,
        ifNode: Node<TNodeValue>,
        elseNode?: Node<TNodeValue> | null,
    ): Node<TNodeValue>;
}

export const select: Select;

interface SelectExtension {
    (
        ifNode: Node<"float"> | number,
        elseNode?: Node<"float"> | number | null,
    ): Node<"float">;
    <TNodeValue>(
        ifNode: Node<TNodeValue>,
        elseNode?: Node<TNodeValue> | null,
    ): Node<TNodeValue>;
}

declare module "../core/Node.js" {
    interface BoolExtensions {
        select: SelectExtension;
        selectAssign: <TNodeValue>(
            ifNode: Node<TNodeValue>,
            elseNode?: Node<TNodeValue> | null,
        ) => this;
    }
}
