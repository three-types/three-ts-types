import InputNode from "./InputNode.js";
import { NodeTypeOption } from "./Node.js";
import NodeBuilder from "./NodeBuilder.js";

export default class ConstNode<Value> extends InputNode<Value> {
    isConstNode: true;
    constructor(value: Value, nodeType?: NodeTypeOption | null);

    generateConst(builder: NodeBuilder): string;
}
