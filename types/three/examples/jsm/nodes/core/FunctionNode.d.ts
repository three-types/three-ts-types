import CodeNode, { CodeNodeInclude } from './CodeNode.js';
import FunctionCallNode from './FunctionCallNode.js';
import NodeBuilder from './NodeBuilder.js';
import NodeFunction from './NodeFunction.js';
import NodeFunctionInput from './NodeFunctionInput.js';
import Node from './Node.js';

export type FunctionNodeArguments = Node[] | { [name: string]: Node };

export default class FunctionNode<P extends Node[] | { [name: string]: Node }> extends CodeNode {
    keywords: { [key: string]: Node };
    constructor(code?: string, includes?: CodeNodeInclude[]);

    getInputs(builder: NodeBuilder): NodeFunctionInput[];
    getNodeFunction(builder: NodeBuilder): NodeFunction;
    call(parameters: P): FunctionCallNode<P>;
}
