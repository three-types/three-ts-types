import Node from "../core/Node.js";
import TempNode from "../core/TempNode.js";
import { NodeRepresentation, ShaderNodeObject } from "../tsl/TSLCore.js";

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

export const add: (
    aNode: NodeRepresentation,
    bNode: NodeRepresentation,
    ...params: NodeRepresentation[]
) => ShaderNodeObject<OperatorNode>;
export const sub: (
    aNode: NodeRepresentation,
    bNode: NodeRepresentation,
    ...params: NodeRepresentation[]
) => ShaderNodeObject<OperatorNode>;
export const mul: (
    aNode: NodeRepresentation,
    bNode: NodeRepresentation,
    ...params: NodeRepresentation[]
) => ShaderNodeObject<OperatorNode>;
export const div: (
    aNode: NodeRepresentation,
    bNode: NodeRepresentation,
    ...params: NodeRepresentation[]
) => ShaderNodeObject<OperatorNode>;
export const modInt: (aNode: NodeRepresentation, bNode: NodeRepresentation) => ShaderNodeObject<OperatorNode>;
export const equal: (aNode: NodeRepresentation, bNode: NodeRepresentation) => ShaderNodeObject<OperatorNode>;
export const notEqual: (aNode: NodeRepresentation, bNode: NodeRepresentation) => ShaderNodeObject<OperatorNode>;
export const lessThan: (aNode: NodeRepresentation, bNode: NodeRepresentation) => ShaderNodeObject<OperatorNode>;
export const greaterThan: (aNode: NodeRepresentation, bNode: NodeRepresentation) => ShaderNodeObject<OperatorNode>;
export const lessThanEqual: (aNode: NodeRepresentation, bNode: NodeRepresentation) => ShaderNodeObject<OperatorNode>;
export const greaterThanEqual: (aNode: NodeRepresentation, bNode: NodeRepresentation) => ShaderNodeObject<OperatorNode>;
export const and: (
    aNode: NodeRepresentation,
    bNode: NodeRepresentation,
    ...params: NodeRepresentation[]
) => ShaderNodeObject<OperatorNode>;
export const or: (
    aNode: NodeRepresentation,
    bNode: NodeRepresentation,
    ...params: NodeRepresentation[]
) => ShaderNodeObject<OperatorNode>;
export const not: (value: NodeRepresentation) => ShaderNodeObject<OperatorNode>;
export const xor: (aNode: NodeRepresentation, bNode: NodeRepresentation) => ShaderNodeObject<OperatorNode>;
export const bitAnd: (aNode: NodeRepresentation, bNode: NodeRepresentation) => ShaderNodeObject<OperatorNode>;
export const bitNot: (aNode: NodeRepresentation, bNode: NodeRepresentation) => ShaderNodeObject<OperatorNode>;
export const bitOr: (aNode: NodeRepresentation, bNode: NodeRepresentation) => ShaderNodeObject<OperatorNode>;
export const bitXor: (aNode: NodeRepresentation, bNode: NodeRepresentation) => ShaderNodeObject<OperatorNode>;
export const shiftLeft: (aNode: NodeRepresentation, bNode: NodeRepresentation) => ShaderNodeObject<OperatorNode>;
export const shiftRight: (aNode: NodeRepresentation, bNode: NodeRepresentation) => ShaderNodeObject<OperatorNode>;

declare module "../tsl/TSLCore.js" {
    interface NodeElements {
        add: typeof add;
        sub: typeof sub;
        mul: typeof mul;
        div: typeof div;
        modInt: typeof modInt;
        equal: typeof equal;
        notEqual: typeof notEqual;
        lessThan: typeof lessThan;
        greaterThan: typeof greaterThan;
        lessThanEqual: typeof lessThanEqual;
        greaterThanEqual: typeof greaterThanEqual;
        and: typeof and;
        or: typeof or;
        not: typeof not;
        xor: typeof xor;
        bitAnd: typeof bitAnd;
        bitNot: typeof bitNot;
        bitOr: typeof bitOr;
        bitXor: typeof bitXor;
        shiftLeft: typeof shiftLeft;
        shiftRight: typeof shiftRight;
    }
}

/**
 * @deprecated .remainder() has been renamed to .modInt().
 */
export const remainder: (
    aNode: NodeRepresentation,
    bNode: NodeRepresentation,
    ...params: NodeRepresentation[]
) => ShaderNodeObject<OperatorNode>;

declare module "../tsl/TSLCore.js" {
    interface NodeElements {
        /**
         * @deprecated .remainder() has been renamed to .modInt().
         */
        remainder: typeof remainder;
    }
}
