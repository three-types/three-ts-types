import { NodeObjects, NodeRepresentation } from "../shadernode/ShaderNode.js";
import Node from "./Node.js";
import NodeBuilder from "./NodeBuilder.js";

export default class StackNode extends Node {
    isStackNode: true;
    nodes: Node[];
    outputNode: Node | null;

    constructor();

    add(node: Node): this;

    if(boolNode: Node, method: (inputs: NodeObjects<unknown>, builder: NodeBuilder) => NodeRepresentation): this;

    elseIf(node: Node, method: (inputs: NodeObjects<unknown>, builder: NodeBuilder) => NodeRepresentation): this;

    else(node: Node, method: (inputs: NodeObjects<unknown>, builder: NodeBuilder) => NodeRepresentation): this;
}
