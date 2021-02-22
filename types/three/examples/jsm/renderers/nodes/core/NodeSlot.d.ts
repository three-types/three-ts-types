import Node from './Node';

export class NodeSlot<TNode extends Node = Node> {
    constructor(node: TNode, name: string, output: string);
}

export default NodeSlot;
