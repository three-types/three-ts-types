import Node from '../core/Node';

export default class MathNode<TANode extends Node = Node, TBNode extends Node = Node> extends Node {
    static NORMALIZE: string;
    static INVERSE_TRANSFORM_DIRETION: string;

    method: string;
    a: TANode;
    b: TBNode | null;

    constructor(method: string, a: TANode, b?: TBNode);
}
