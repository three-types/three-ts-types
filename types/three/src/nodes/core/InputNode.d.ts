import Node from "./Node.js";
import NodeBuilder from "./NodeBuilder.js";

export type Precision = "low" | "medium" | "high";

declare abstract class InputNode<Value> extends Node {
    isInputNode: true;
    value: Value;
    precision: Precision | null;

    constructor(value: Value, nodeType?: string | null);

    getInputType(builder: NodeBuilder): string | null;
    setPrecision(precision: Precision): this;
}

export default InputNode;

export type { InputNode };
