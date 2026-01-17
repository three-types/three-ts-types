import Node from "./Node.js";
import NodeBuilder from "./NodeBuilder.js";

interface AttributeNodeInterface {
    setAttributeName(attributeName: string): this;

    getAttributeName(builder: NodeBuilder): string;
}

declare const AttributeNode: {
    new(attributeName: string, nodeType?: string | null): AttributeNode;
};

type AttributeNode<TNodeType = unknown> = Node<TNodeType> & AttributeNodeInterface;

export default AttributeNode;

export const attribute: (
    name: string,
    nodeType?: string | null,
) => AttributeNode;
