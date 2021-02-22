export default class NodeUniform<TNode extends Node = Node> {
    name: string;
    type: string;
    node: TNode;
    needsUpdate: boolean | undefined;

    isNodeUniform: boolean;

    constructor(name: string, type: string, node: TNode, needsUpdate?: boolean);

    get value(): any;

    set value(val: any);
}
