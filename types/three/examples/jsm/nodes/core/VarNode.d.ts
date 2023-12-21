import { OperatorNodeOp } from '../math/OperatorNode.js';
import Node from './Node.js';
import { NodeRepresentation, Swizzable } from '../shadernode/ShaderNode.js';

export default class VarNode extends Node {
    node: Node;
    name: string | null;

    constructor(node: Node, name?: string | null);

    op(op: OperatorNodeOp, ...params: Node[]): this;
    assign(...params: Node[]): this;
    add(...params: Node[]): this;
    sub(...params: Node[]): this;
    mul(...params: Node[]): this;
    div(...params: Node[]): this;
}

export const label: (node: NodeRepresentation, name?: string) => Swizzable<VarNode>;
export const temp: (node: NodeRepresentation, name?: string) => Swizzable<VarNode>;
