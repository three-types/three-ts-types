import { NodeTypeOption, NodeValueOption } from './constants.js';
import Node from './Node.js';
import NodeBuilder from './NodeBuilder.js';

export default abstract class InputNode extends Node {
    isInputNode: true;
    value: NodeValueOption;

    constructor(value: NodeValueOption, nodeType?: NodeTypeOption | null);

    getInputType(builder: NodeBuilder): string | null;
}
