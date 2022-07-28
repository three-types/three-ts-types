import { NodeTypeOption, NodeValueOption } from './constants';
import Node from './Node';
import NodeBuilder from './NodeBuilder';

export default class InputNode extends Node {
    isInputNode: true;
    value: NodeValueOption;

    constructor(value: NodeValueOption, nodeType?: NodeTypeOption);

    getInputType(builder: NodeBuilder): string | null;
}
