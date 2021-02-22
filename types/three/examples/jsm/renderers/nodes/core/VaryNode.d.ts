import Node from './Node';
import NodeBuilder from './NodeBuilder';

export class VaryNode<TNode extends Node = Node> {
    value: TNode;

    constructor(value: TNode);

    getType: <TBuilder extends NodeBuilder = NodeBuilder>(builder: TBuilder) => string;

    generate: <TBuilder extends NodeBuilder = NodeBuilder>(builder: TBuilder, output: string) => string;
}

export default VaryNode;
