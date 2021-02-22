import Node from '../core/Node';
export default class SwitchNode<TNode extends Node = Node> extends Node {
    node: TNode;
    components: string;
    constructor(node: TNode, components: string);
}
