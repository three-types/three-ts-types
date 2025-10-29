import Node from "./Node.js";
import NodeBuilder from "./NodeBuilder.js";

export type Precision = "low" | "medium" | "high";

interface InputNodeInterface<TValue> {
    isInputNode: true;
    value: TValue;
    precision: Precision | null;

    getInputType(builder: NodeBuilder): string | null;
    setPrecision(precision: Precision): this;
}

declare const InputNode: {
    new<TNodeValue, TValue>(value: TValue, nodeType?: string | null): InputNode<TNodeValue, TValue>;
};

type InputNode<TNodeValue, TValue> = Node<TNodeValue> & InputNodeInterface<TValue>;

export default InputNode;
