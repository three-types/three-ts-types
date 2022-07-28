import Node from '../core/Node';
import { NodeTypeOption } from '../Nodes';

export default class ReferenceNode extends Node {
    object: any;
    property: string;
    uniformType: string;
    node: Node | null;

    constructor(property: string, uniformType: NodeTypeOption, object?: any);

    setNodeType(uniformType: NodeTypeOption): void;
}
