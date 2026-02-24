import Node from "./Node.js";

interface VarNodeInterface<TNode> {
    node: TNode;
    name: string | null;

    readonly isVarNode: true;

    readOnly: boolean;

    intent: boolean;

    setIntent(value: boolean): this;
    getIntent(): boolean;
}

declare const VarNode: {
    new<TNode>(node: TNode, name?: string | null, readOnly?: boolean): VarNode<TNode>;
};

type VarNode<TNode> = (TNode extends Node<infer TNodeType> ? Node<TNodeType> : unknown) & VarNodeInterface<TNode>;

export default VarNode;

export const Var: <TNode>(node: TNode, name?: string | null) => VarNode<TNode>;

export const Const: <TNode>(node: TNode, name?: string | null) => VarNode< TNode>;

export const VarIntent: <TNode>(node: TNode) => VarNode< TNode>;

declare module "./Node.js" {
    interface NodeExtensions<TNodeType> {
        toVar: (name?: string | null) => VarNode<this>;

        toConst: (name?: string | null) => VarNode<this>;

        toVarIntent: () => VarNode<this>;
    }
}
