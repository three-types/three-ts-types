import InputNode from "./InputNode.js";
import NodeBuilder from "./NodeBuilder.js";

interface ConstNodeInterface {
    isConstNode: true;

    generateConst(builder: NodeBuilder): string;
}

declare const ConstNode: {
    new<TNodeValue, TValue>(value: TValue, nodeType?: string | null): ConstNode<TNodeValue, TValue>;
};

type ConstNode<TNodeValue, TValue> = InputNode<TNodeValue, TValue> & ConstNodeInterface;

export default ConstNode;
