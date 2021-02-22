import { Vector, Vector2 } from '../../../../../src/Three';
import InputNode from '../core/InputNode.js';

export class Vector2Node extends InputNode {
    value: Vector2;
    isVector2Node: boolean;

    constructor(value: Vector2);
}

export default Vector2Node;
