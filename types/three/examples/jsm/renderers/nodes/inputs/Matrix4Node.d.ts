import InputNode from '../core/InputNode.js';
import { Matrix4 } from '../../../../../src/Three';

export default class Matrix4Node extends InputNode {
    value: Matrix4;
    isMatrix4Node: boolean;

    constructor(value: Matrix4);
}
