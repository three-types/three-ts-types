import Node from "./Node.js";
import NodeBuilder from "./NodeBuilder.js";
import TempNode from "./TempNode.js";

interface AssignNodeInterface {
    readonly isAssignNode: true;

    needsSplitAssign(builder: NodeBuilder): boolean;
}

declare const AssignNode: {
    new<TNodeValue>(targetNode: Node, sourceNode: Node): AssignNode<TNodeValue>;
}

type AssignNode<TNodeValue> = TempNode<TNodeValue> & AssignNodeInterface;

export default AssignNode;

export const assign: <TNodeValue>(targetNode: Node, sourceNode: Node | number) => AssignNode<TNodeValue>;
