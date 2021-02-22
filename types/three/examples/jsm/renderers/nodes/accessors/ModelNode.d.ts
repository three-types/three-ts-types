import Node from '../core/Node';

export default class ModelNode extends Node {
    static VIEW: string;
    static NORMAL: string;

    scope: string;
    updateType: string;
    _inputNode: Node | null;

    constructor(scope?: string);
}
