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

export const select: <TNodeValue>(
    condNode: Node<"bool">,
    ifNode: Node<TNodeValue>,
    elseNode?: Node<TNodeValue> | null,
) => Node;

declare module "../core/Node.js" {
    interface BoolExtensions {
        select: <TNodeValue>(
            ifNode: Node<TNodeValue>,
            elseNode?: Node<TNodeValue> | null,
        ) => Node<TNodeValue>;
        selectAssign: <TNodeValue>(
            ifNode: Node<TNodeValue>,
            elseNode?: Node<TNodeValue> | null,
        ) => this;
    }
}
