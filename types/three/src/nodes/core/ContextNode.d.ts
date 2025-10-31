import Node from "./Node.js";
import { NodeBuilderContext } from "./NodeBuilder.js";

declare class ContextNode extends Node {
    readonly isContextNode: true;

    node: Node | null;
    value: NodeBuilderContext;

    constructor(node?: Node | null, value?: NodeBuilderContext);
}

export default ContextNode;

interface ContextFunction {
    (value?: NodeBuilderContext): ContextNode;
    (node: Node, value?: NodeBuilderContext): ContextNode;
}

export const context: ContextFunction;

export const uniformFlow: (node: Node) => ContextNode;

export const setName: (node: Node, label: string) => Node;

/**
 * @deprecated "label()" has been deprecated. Use "setName()" instead.
 */
export function label(node: Node, label: string): Node;

declare module "./Node.js" {
    interface NodeElements {
        context: (context?: NodeBuilderContext) => ContextNode;
        contextAssign: (context?: NodeBuilderContext) => this;

        /**
         * @deprecated "label()" has been deprecated. Use "setName()" instead.
         */
        label: (label: string) => Node;
        /**
         * @deprecated "label()" has been deprecated. Use "setName()" instead.
         */
        labelAssign: (label: string) => this;

        uniformFlow: () => ContextNode;
        uniformFlowAssign: () => this;

        setName: (label: string) => Node;
        setNameAssign: (label: string) => this;
    }

    interface NodeExtensions<TValue> {
        setName: (label: string) => Node<TValue>;
        setNameAssign: (label: string) => this;
    }
}
