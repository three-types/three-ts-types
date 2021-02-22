import Node from '../core/Node';
import NodeBuilder from '../core/NodeBuilder';

export class MathNode<TANode extends Node = Node, TBNode extends Node = Node> extends Node {
    static NORMALIZE: string;
    static INVERSE_TRANSFORM_DIRETION: string;

    method: string;
    a: TANode;
    b: TBNode | null;

    constructor(method: string, a: TANode, b?: TBNode);

    getType: <TBuilder extends NodeBuilder = NodeBuilder>(builder: TBuilder) => string;

    generate: <TBuilder extends NodeBuilder = NodeBuilder>(builder: TBuilder, output: string) => string;
}

export default MathNode;
