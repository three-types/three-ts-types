import Node from '../core/Node';
import NodeBuilder from '../core/NodeBuilder';

export class SwitchNode<TNode extends Node = Node> extends Node {
    node: TNode;
    components: string;
    constructor(node: TNode, components: string);

    getType: <TBuilder extends NodeBuilder = NodeBuilder>(builder: TBuilder) => string;

    generate: <TBuilder extends NodeBuilder = NodeBuilder>(builder: TBuilder, output: string) => string;
}

export default SwitchNode;
