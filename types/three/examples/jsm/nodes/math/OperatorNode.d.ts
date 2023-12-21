import TempNode from '../core/TempNode.js';
import Node from '../core/Node.js';
import { NodeRepresentation, Swizzable } from '../shadernode/ShaderNode.js';

export type OperatorNodeOp =
    | '='
    | '%'
    | '&'
    | '|'
    | '^'
    | '>>'
    | '<<'
    | '=='
    | '&&'
    | '||'
    | '^^'
    | '<'
    | '>'
    | '<='
    | '>='
    | '+'
    | '-'
    | '*'
    | '/';

export default class OperatorNode extends TempNode {
    aNode: Node;
    bNode: Node;
    op: OperatorNodeOp;

    constructor(op: OperatorNodeOp, ...params: [Node, Node, ...Node[]]);
}

export type Operator = (a: NodeRepresentation, b: NodeRepresentation, ...others: NodeRepresentation[]) => Swizzable;

export const add: Operator;
export const sub: Operator;
export const mul: Operator;
export const div: Operator;
export const remainder: Operator;
export const equal: Operator;
export const assign: Operator;
export const lessThan: Operator;
export const greaterThan: Operator;
export const lessThanEqual: Operator;
export const greaterThanEqual: Operator;
export const and: Operator;
export const or: Operator;
export const xor: Operator;
export const bitAnd: Operator;
export const bitOr: Operator;
export const bitXor: Operator;
export const shiftLeft: Operator;
export const shiftRight: Operator;
