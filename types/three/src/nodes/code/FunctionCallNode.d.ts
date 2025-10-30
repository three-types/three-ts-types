import Node from "../core/Node.js";
import TempNode from "../core/TempNode.js";
import { ProxiedObject } from "../tsl/TSLCore.js";
import FunctionNode, { FunctionNodeArguments } from "./FunctionNode.js";

interface FunctionCallNodeInterface<P extends Array<Node | number> | { [name: string]: Node | number }>
{
    functionNode: FunctionNode<P>;
    parameters: { [name: string]: Node };


    setParameters(parameters: P): this;
    getParameters(): P;
}

declare const FunctionCallNode: {
    new<TNodeValue, P extends Array<Node | number> | { [name: string]: Node | number }>(functionNode?: FunctionNode<P>, parameters?: P): FunctionCallNode<TNodeValue, P>;
}

type FunctionCallNode<TNodeValue, P extends Array<Node | number> | { [name: string]: Node | number }> = TempNode<TNodeValue> & FunctionCallNodeInterface<P>;

export default FunctionCallNode;

export const call: <TNodeValue, P extends FunctionNodeArguments>(
    functionNode?: FunctionNode<P>,
    parameters?: ProxiedObject<P>,
) => FunctionCallNode<TNodeValue, P>;

declare module "../Nodes.js" {
    interface FunctionNode<P extends FunctionNodeArguments> {
        call: <TNodeValue>(parameters?: ProxiedObject<P>) => FunctionCallNode<TNodeValue, P>;
        callAssign: (parameters?: ProxiedObject<P>) => this;
    }
}
