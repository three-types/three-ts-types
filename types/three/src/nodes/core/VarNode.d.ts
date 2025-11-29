import Node from "./Node.js";

interface VarNodeInterface {
    node: Node;
    name: string | null;

    readonly isVarNode: true;

    readOnly: boolean;

    intent: boolean;

    setIntent(value: boolean): this;
    getIntent(): boolean;
}

declare const VarNode: {
    new<TNodeValue>(node: Node, name?: string | null, readOnly?: boolean): VarNode<TNodeValue>;
};

type VarNode<TNodeValue> = Node<TNodeValue> & VarNodeInterface;

export default VarNode;

export const Var: <TNodeValue>(node: Node<TNodeValue>, name?: string | null) => VarNode<TNodeValue>;

export const Const: <TNodeValue>(node: Node<TNodeValue>, name?: string | null) => VarNode<TNodeValue>;

export const VarIntent: <TNodeValue>(node: Node<TNodeValue>) => Node<TNodeValue>;

declare module "./Node.js" {
    interface NodeExtensions<TValue> {
        toVar: (name?: string | null) => VarNode<TValue>;

        toConst: (name?: string | null) => VarNode<TValue>;

        toVarIntent: () => VarNode<TValue>;
    }
}
