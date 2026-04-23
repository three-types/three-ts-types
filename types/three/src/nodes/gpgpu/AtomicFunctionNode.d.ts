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

declare class AtomicFunctionNode extends Node {
    method: AtomicMethod;
    pointerNode: Node;
    valueNode: Node;
    parents: boolean;

    constructor(method: AtomicMethod, pointerNode: Node, valueNode: Node);

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

export default AtomicFunctionNode;

export const atomicFunc: <TNodeType extends string = string>(
    method: AtomicMethod,
    pointerNode: Node<TNodeType>,
    valueNode: Node,
) => Node<TNodeType>;

export const atomicLoad: <TNodeType extends string = string>(
    pointerNode: Node<TNodeType>,
) => Node<TNodeType>;

export const atomicStore: <TNodeType extends string = string>(
    pointerNode: Node<TNodeType>,
    valueNode: Node | number,
) => Node<TNodeType>;

export const atomicAdd: <TNodeType extends string = string>(
    pointerNode: Node<TNodeType>,
    valueNode: Node | number,
) => Node<TNodeType>;

export const atomicSub: <TNodeType extends string = string>(
    pointerNode: Node<TNodeType>,
    valueNode: Node | number,
) => Node<TNodeType>;

export const atomicMax: <TNodeType extends string = string>(
    pointerNode: Node<TNodeType>,
    valueNode: Node,
) => Node<TNodeType>;

export const atomicMin: <TNodeType extends string = string>(
    pointerNode: Node<TNodeType>,
    valueNode: Node,
) => Node<TNodeType>;

export const atomicAnd: <TNodeType extends string = string>(
    pointerNode: Node<TNodeType>,
    valueNode: Node,
) => Node<TNodeType>;

export const atomicOr: <TNodeType extends string = string>(
    pointerNode: Node<TNodeType>,
    valueNode: Node,
) => Node<TNodeType>;

export const atomicXor: <TNodeType extends string = string>(
    pointerNode: Node<TNodeType>,
    valueNode: Node,
) => Node<TNodeType>;