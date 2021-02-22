import Node from '../core/Node';

export default class OperatorNode<TANode extends Node = Node, TBNode extends Node = Node> extends Node {
    op: string;
    a: TANode;
    b: TBNode;

    constructor(op: string, a: TANode, b: TBNode);

    getVectorFromMatrix: (type: string) => string;
}
