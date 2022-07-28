import Node from './Node';

export default class VarNode extends Node {
    node: Node;
    name: string | null;

    constructor(node: Node, name?: string);

    op(op: string, ...params: any[]): this;
    assign(...params: any[]): this;
    add(...params: any[]): this;
    sub(...params: any[]): this;
    mul(...params: any[]): this;
    div(...params: any[]): this;
}
