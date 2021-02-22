import Node from '../core/Node';

export default class CameraNode extends Node {
    static POSITION: string;
    static PROJECTION: string;
    static VIEW: string;

    updateType: string;
    scope: string;
    _inputNode: Node | null;

    constructor(scope?: string);
}
