import Node from "./Node.js";
import NodeBuilder from "./NodeBuilder.js";

interface TempNodeInterface {
    isTempNode: true;

    hasDependencies(builder: NodeBuilder): boolean;
}

declare const TempNode: {
    new<TNodeValue>(type: string | null): TempNode<TNodeValue>;
};

type TempNode<TNodeValue> = Node<TNodeValue> & TempNodeInterface;

export default TempNode;
