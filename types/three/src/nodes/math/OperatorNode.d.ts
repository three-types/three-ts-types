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

export const add: unknown;
export const sub: unknown;
export const mul: unknown;
export const div: unknown;
export const mod: unknown;
export const equal: unknown;
export const notEqual: unknown;
export const lessThan: unknown;
export const greaterThan: unknown;
export const lessThanEqual: unknown;
export const greaterThanEqual: unknown;
export const and: unknown;
export const or: unknown;
export const not: unknown;
export const xor: unknown;
export const bitAnd: unknown;
export const bitNot: unknown;
export const bitOr: unknown;
export const bitXor: unknown;
export const shiftLeft: unknown;
export const shiftRight: unknown;

export const incrementBefore: unknown;
export const decrementBefore: unknown;
export const increment: unknown;
export const decrement: unknown;

/**
 * @deprecated "modInt()" is deprecated. Use "mod( int( ... ) )" instead.
 */
export const modInt: unknown;
