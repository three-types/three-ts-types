import Node from './Node.js';

export default class VaryNode extends Node {
    node: Node;
    name: string | null;

    constructor(node: Node, name?: string | null);
}
