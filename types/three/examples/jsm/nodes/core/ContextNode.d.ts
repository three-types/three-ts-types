import Node from './Node';

export default class ContextNode extends Node {
    isContextNode: true;
    node: Node;
    context: any;

    constructor(node: Node, context: any);
}
