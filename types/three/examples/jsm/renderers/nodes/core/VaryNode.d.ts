import Node from './Node';

export default class VaryNode<TNode extends Node = Node> {
    value: TNode;

    constructor(value: TNode);
}
