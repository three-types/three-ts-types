import InputNode from '../core/InputNode.js';
import { Vector3 } from '../../../../../src/Three';

export class Vector3Node extends InputNode {
    value: Vector3;
    isVector3Node: boolean;

    constructor(value: Vector3);
}

export default Vector3Node;
