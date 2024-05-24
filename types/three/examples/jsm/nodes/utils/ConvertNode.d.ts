import Node, { NodeTypeOption } from "../core/Node.js";

export default class ConvertNode extends Node {
    node: Node;
    convertTo: NodeTypeOption;
    constructor(node: Node, convertTo: NodeTypeOption);
}
