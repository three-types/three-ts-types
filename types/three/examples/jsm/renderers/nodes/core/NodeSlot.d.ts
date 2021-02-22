import Node from './Node';

export default class NodeSlot<TNode extends Node = Node> {
    constructor(node: TNode, name: string, output: string);
}
