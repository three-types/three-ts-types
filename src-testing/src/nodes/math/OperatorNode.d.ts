import Node from "../core/Node.js";
import TempNode from "../core/TempNode.js";

export type OperatorNodeOp =
    | "%"
    | "&"
    | "|"
    | "^"
    | ">>"
    | "<<"
    | "=="
    | "!="
    | "&&"
    | "||"
    | "^^"
    | "<"
    | ">"
    | "<="
    | ">="
    | "+"
    | "-"
    | "*"
    | "/";

export default class OperatorNode extends TempNode {
    aNode: Node;
    bNode: Node;
    op: OperatorNodeOp;

    readonly isOperatorNode: true;

    constructor(op: OperatorNodeOp, ...params: [Node, Node, ...Node[]]);
}

type OperatorNodeParameter = Node | number;

export const add: (
    a: OperatorNodeParameter,
    b: OperatorNodeParameter,
    ...params: OperatorNodeParameter[]
) => OperatorNode;
export const sub: (
    a: OperatorNodeParameter,
    b: OperatorNodeParameter,
    ...params: OperatorNodeParameter[]
) => OperatorNode;
export const mul: (
    a: OperatorNodeParameter,
    b: OperatorNodeParameter,
    ...params: OperatorNodeParameter[]
) => OperatorNode;
export const div: (
    a: OperatorNodeParameter,
    b: OperatorNodeParameter,
    ...params: OperatorNodeParameter[]
) => OperatorNode;
export const mod: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const equal: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const notEqual: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const lessThan: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const greaterThan: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const lessThanEqual: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const greaterThanEqual: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const and: (
    a: OperatorNodeParameter,
    b: OperatorNodeParameter,
    ...params: OperatorNodeParameter[]
) => OperatorNode;
export const or: (
    a: OperatorNodeParameter,
    b: OperatorNodeParameter,
    ...params: OperatorNodeParameter[]
) => OperatorNode;
export const not: (value: OperatorNodeParameter) => OperatorNode;
export const xor: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const bitAnd: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const bitNot: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const bitOr: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const bitXor: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const shiftLeft: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;
export const shiftRight: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;

export const incrementBefore: (a: OperatorNodeParameter) => Node;
export const decrementBefore: (a: OperatorNodeParameter) => Node;
export const increment: (a: OperatorNodeParameter) => Node;
export const decrement: (a: OperatorNodeParameter) => Node;

declare module "../core/Node.js" {
    interface NodeElements {
        add: (
            b: OperatorNodeParameter,
            ...params: OperatorNodeParameter[]
        ) => OperatorNode;
        addAssign: (
            b: OperatorNodeParameter,
            ...params: OperatorNodeParameter[]
        ) => this;

        sub: (
            b: OperatorNodeParameter,
            ...params: OperatorNodeParameter[]
        ) => OperatorNode;
        subAssign: (
            b: OperatorNodeParameter,
            ...params: OperatorNodeParameter[]
        ) => this;

        mul: (
            b: OperatorNodeParameter,
            ...params: OperatorNodeParameter[]
        ) => OperatorNode;
        mulAssign: (
            b: OperatorNodeParameter,
            ...params: OperatorNodeParameter[]
        ) => this;

        div: (
            b: OperatorNodeParameter,
            ...params: OperatorNodeParameter[]
        ) => OperatorNode;
        divAssign: (
            b: OperatorNodeParameter,
            ...params: OperatorNodeParameter[]
        ) => this;

        mod: (
            b: OperatorNodeParameter,
        ) => OperatorNode;
        modAssign: (
            b: OperatorNodeParameter,
        ) => this;

        equal: (
            b: OperatorNodeParameter,
        ) => OperatorNode;

        notEqual: (
            b: OperatorNodeParameter,
        ) => OperatorNode;

        lessThan: (
            b: OperatorNodeParameter,
        ) => OperatorNode;

        greaterThan: (
            b: OperatorNodeParameter,
        ) => OperatorNode;

        lessThanEqual: (
            b: OperatorNodeParameter,
        ) => OperatorNode;

        greaterThanEqual: (
            b: OperatorNodeParameter,
        ) => OperatorNode;

        and: (
            b: OperatorNodeParameter,
            ...params: OperatorNodeParameter[]
        ) => OperatorNode;

        or: (
            b: OperatorNodeParameter,
            ...params: OperatorNodeParameter[]
        ) => OperatorNode;

        not: () => OperatorNode;

        xor: (
            b: OperatorNodeParameter,
        ) => OperatorNode;

        bitAnd: (
            b: OperatorNodeParameter,
        ) => OperatorNode;

        bitNot: (
            b: OperatorNodeParameter,
        ) => OperatorNode;

        bitOr: (
            b: OperatorNodeParameter,
        ) => OperatorNode;

        bitXor: (
            b: OperatorNodeParameter,
        ) => OperatorNode;

        shiftLeft: (
            b: OperatorNodeParameter,
        ) => OperatorNode;

        shiftRight: (
            b: OperatorNodeParameter,
        ) => OperatorNode;

        incrementBefore: () => OperatorNode;

        decrementBefore: () => OperatorNode;

        increment: () => OperatorNode;

        decrement: () => OperatorNode;
    }
}

/**
 * @deprecated "modInt()" is deprecated. Use "mod( int( ... ) )" instead.
 */
export const modInt: (a: OperatorNodeParameter, b: OperatorNodeParameter) => OperatorNode;

declare module "../core/Node.js" {
    interface NodeElements {
        /**
         * @deprecated "modInt()" is deprecated. Use "mod( int( ... ) )" instead.
         */
        modInt: (b: OperatorNodeParameter) => OperatorNode;
    }
}
