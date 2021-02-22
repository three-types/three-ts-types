import InputNode from '../core/InputNode.js';
import { Vector4 } from '../../../../../src/Three';

export class Vector4Node extends InputNode {
    value: Vector4;
    isVector4Node: boolean;

    constructor(value: Vector4);
}

export default Vector4Node;
