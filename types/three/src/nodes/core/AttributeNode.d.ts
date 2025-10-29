import Node from "./Node.js";
import NodeBuilder from "./NodeBuilder.js";

interface AttributeNodeInterface {
    setAttributeName(attributeName: string): this;

    getAttributeName(builder: NodeBuilder): string;
}

declare const AttributeNode: {
    new<TNodeType>(attributeName: string, nodeType?: string | null): AttributeNode<TNodeType>;
}

type AttributeNode<TNodeType> = Node<TNodeType> & AttributeNodeInterface;

export default AttributeNode;

export const attribute: <TNodeType>(
    name: string,
    nodeType?: string | null,
) => AttributeNode<TNodeType>;
