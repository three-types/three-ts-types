import Node from '../core/Node';

export default class PositionNode extends Node {
    static LOCAL: string;

    scope: string;

    constructor(scope?: string);
}
