import Node from "./Node.js";
import NodeBuilder from "./NodeBuilder.js";

declare class StackNode extends Node {
    isStackNode: true;
    nodes: Node[];
    outputNode: Node | null;

    constructor();

    If(boolNode: Node, method: () => void): this;

    ElseIf(boolNode: Node, method: () => void): this;

    Else(method: () => void): this;

    Switch(expression: Node): this;

    Case(...params: [...Node[], () => void]): this;

    Default(method: () => void): this;

    /**
     * Whether the nodes of this stack only declare variables and compute values, e.g. the body of a function
     * which does not assign a value or call a function that is not pure.
     *
     * @param {NodeBuilder} builder - The current node builder.
     * @return {boolean} Whether the stack is pure.
     */
    isPure(builder: NodeBuilder): boolean;
}

export default StackNode;

export const stack: () => StackNode;
