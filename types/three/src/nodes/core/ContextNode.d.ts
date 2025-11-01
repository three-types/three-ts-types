import Node from "./Node.js";
import { NodeBuilderContext } from "./NodeBuilder.js";

declare class ContextNodeInterface<TNodeType> extends Node {
    readonly isContextNode: true;

    node: Node<TNodeType>;
    value: NodeBuilderContext;
}

declare const ContextNode: {
    new<TNodeType>(node: Node<TNodeType>, value?: NodeBuilderContext): ContextNode<TNodeType>;
};

type ContextNode<TNodeType> = ContextNodeInterface<TNodeType> & Node<TNodeType>;

export default ContextNode;

export const context: <TNodeType>(node: Node<TNodeType>, context?: NodeBuilderContext) => ContextNode<TNodeType>;

export const uniformFlow: <TNodeType>(node: Node<TNodeType>) => ContextNode<TNodeType>;

export const setName: (node: Node, label: string) => Node;

/**
 * @deprecated "label()" has been deprecated. Use "setName()" instead.
 */
export function label(node: Node, label: string): Node;

declare module "./Node.js" {
    interface NodeElements {
        /**
         * @deprecated "label()" has been deprecated. Use "setName()" instead.
         */
        label: (label: string) => Node;
        /**
         * @deprecated "label()" has been deprecated. Use "setName()" instead.
         */
        labelAssign: (label: string) => this;
    }

    interface NodeExtensions<TValue> {
        context: (context?: NodeBuilderContext) => ContextNode<TValue>;
        contextAssign: (context?: NodeBuilderContext) => this;

        uniformFlow: () => ContextNode<TValue>;
        uniformFlowAssign: () => this;

        setName: (label: string) => Node<TValue>;
        setNameAssign: (label: string) => this;
    }
}
