import Node from "../core/Node.js";
import NodeBuilder from "../core/NodeBuilder.js";

interface ArrayElementNodeInterface {
    node: Node;
    indexNode: Node;

    readonly isArrayElementNode: true;

    getOutputNode(builder: NodeBuilder): Node | null;

    generateAccess(builder: NodeBuilder): string;

    generateUniformArrayAccess(builder: NodeBuilder): string;

    generateStorageAccess(builder: NodeBuilder): string;
}

declare const ArrayElementNode: {
    new<TNodeType>(node: Node, indexNode: Node): ArrayElementNode<TNodeType>;
};

type ArrayElementNode<TNodeType> = Node<TNodeType> & ArrayElementNodeInterface;

export default ArrayElementNode;
