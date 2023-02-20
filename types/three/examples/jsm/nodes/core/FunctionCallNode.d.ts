import FunctionNode from './FunctionNode.js';
import TempNode from './TempNode.js';
import Node from './Node.js';

export default class FunctionCallNode<P extends Node[] | { [name: string]: Node }> extends TempNode {
    functionNode: FunctionNode<P>;
    parameters: { [name: string]: Node };

    constructor(functionNode?: FunctionNode<P>, parameters?: P);

    setParameters(parameters: P): this;
    getParameters(): P;
}
