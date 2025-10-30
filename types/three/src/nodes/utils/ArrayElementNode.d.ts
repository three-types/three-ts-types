import Node from "../core/Node.js";

export default class ArrayElementNode extends Node {
    node: Node;
    indexNode: Node;

    constructor(node: Node, indexNode: Node);
}
