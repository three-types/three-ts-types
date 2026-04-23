import Node from "../core/Node.js";

export type AtomicMethod =
    | typeof AtomicFunctionNode.ATOMIC_LOAD
    | typeof AtomicFunctionNode.ATOMIC_STORE
    | typeof AtomicFunctionNode.ATOMIC_ADD
    | typeof AtomicFunctionNode.ATOMIC_SUB
    | typeof AtomicFunctionNode.ATOMIC_MAX
    | typeof AtomicFunctionNode.ATOMIC_MIN
    | typeof AtomicFunctionNode.ATOMIC_AND
    | typeof AtomicFunctionNode.ATOMIC_OR
    | typeof AtomicFunctionNode.ATOMIC_XOR;

declare class AtomicFunctionNodeClass extends Node {
    static ATOMIC_LOAD: "atomicLoad";
    static ATOMIC_STORE: "atomicStore";
    static ATOMIC_ADD: "atomicAdd";
    static ATOMIC_SUB: "atomicSub";
    static ATOMIC_MAX: "atomicMax";
    static ATOMIC_MIN: "atomicMin";
    static ATOMIC_AND: "atomicAnd";
    static ATOMIC_OR: "atomicOr";
    static ATOMIC_XOR: "atomicXor";
}

interface AtomicFunctionNodeInterface {
    method: AtomicMethod;
    pointerNode: Node;
    valueNode: Node | null;
    parents: boolean;
}

export type AtomicFunctionNode<TNodeType = unknown> = Node<TNodeType> & AtomicFunctionNodeInterface;

declare const AtomicFunctionNode: {
    new<TNodeType = unknown>(
        method: AtomicMethod,
        pointerNode: Node,
        valueNode: Node | null,
    ): AtomicFunctionNode<TNodeType>;
} & typeof AtomicFunctionNodeClass;

export default AtomicFunctionNode;

export const atomicFunc: <TNodeType = unknown>(
    method: AtomicMethod,
    pointerNode: Node<TNodeType>,
    valueNode: Node | null,
) => AtomicFunctionNode<TNodeType>;

export const atomicLoad: <TNodeType = unknown>(
    pointerNode: Node<TNodeType>,
) => AtomicFunctionNode<TNodeType>;

export const atomicStore: <TNodeType = unknown>(
    pointerNode: Node<TNodeType>,
    valueNode: Node | number,
) => AtomicFunctionNode<TNodeType>;

export const atomicAdd: <TNodeType = unknown>(
    pointerNode: Node<TNodeType>,
    valueNode: Node | number,
) => AtomicFunctionNode<TNodeType>;

export const atomicSub: <TNodeType = unknown>(
    pointerNode: Node<TNodeType>,
    valueNode: Node | number,
) => AtomicFunctionNode<TNodeType>;

export const atomicMax: <TNodeType = unknown>(
    pointerNode: Node<TNodeType>,
    valueNode: Node,
) => AtomicFunctionNode<TNodeType>;

export const atomicMin: <TNodeType = unknown>(
    pointerNode: Node<TNodeType>,
    valueNode: Node,
) => AtomicFunctionNode<TNodeType>;

export const atomicAnd: <TNodeType = unknown>(
    pointerNode: Node<TNodeType>,
    valueNode: Node,
) => AtomicFunctionNode<TNodeType>;

export const atomicOr: <TNodeType = unknown>(
    pointerNode: Node<TNodeType>,
    valueNode: Node,
) => AtomicFunctionNode<TNodeType>;

export const atomicXor: <TNodeType = unknown>(
    pointerNode: Node<TNodeType>,
    valueNode: Node,
) => AtomicFunctionNode<TNodeType>;
