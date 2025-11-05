import Node from "../core/Node.js";
import NodeBuilder from "../core/NodeBuilder.js";

type LoopNodeType = "int" | "uint" | "float";

interface LoopNodeObjectParameter<TNodeType extends LoopNodeType> {
    // TODO Expand to other types and update loop function types appropriately
    type?: TNodeType;
    // TODO The variable name should affect the type of the loop function
    // name?: string;
    start: Node<TNodeType> | number;
    end: Node<TNodeType> | number;
    condition?: string;
}

declare class LoopNode extends Node {
    params: unknown[];

    constructor(params?: unknown[]);

    getProperties(builder: NodeBuilder): unknown;
}

export default LoopNode;

interface Loop {
    <TNodeType extends LoopNodeType>(
        i: LoopNodeObjectParameter<TNodeType>,
        func: (inputs: { readonly i: Node<TNodeType> }) => void,
    ): Node;
    <TNodeType extends LoopNodeType>(
        i: LoopNodeObjectParameter<TNodeType>,
        j: LoopNodeObjectParameter<TNodeType>,
        func: (inputs: { readonly i: Node<TNodeType>; readonly j: Node<TNodeType> }) => void,
    ): Node;
}

export const Loop: Loop;
export const Continue: () => Node;
export const Break: () => Node;
