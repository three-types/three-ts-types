import { Vector2 } from '../../../../../src/Three';
import InputNode from '../core/InputNode.js';

export default class Vector2Node extends InputNode {
    value: Vector2;
    isVector2Node: boolean;

    constructor(value: Vector2);
}
