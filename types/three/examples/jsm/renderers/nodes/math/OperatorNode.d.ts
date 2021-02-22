import Node from '../core/Node';
import NodeBuilder from '../core/NodeBuilder';

export class OperatorNode<TANode extends Node = Node, TBNode extends Node = Node> extends Node {
    op: string;
    a: TANode;
    b: TBNode;

    constructor(op: string, a: TANode, b: TBNode);

    getVectorFromMatrix: (type: string) => string;

    getType: <TBuilder extends NodeBuilder = NodeBuilder>(builder: TBuilder) => string;

    generate: <TBuilder extends NodeBuilder = NodeBuilder>(builder: TBuilder, output: string) => string;
}

export default OperatorNode;
