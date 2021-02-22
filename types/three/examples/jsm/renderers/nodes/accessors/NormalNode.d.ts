import Node from '../core/Node';

export default class NormalNode extends Node {
    static LOCAL: string;
    static WORLD: string;
    static VIEW: string;

    scope: string;

    constructor(scope: string);
}
