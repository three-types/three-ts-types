import InputNode from '../core/InputNode.js';
import { Matrix3 } from '../../../../../src/Three';

export default class Matrix3Node extends InputNode {
    value: Matrix3;
    isMatrix3Node: boolean;

    constructor(value: Matrix3);
}
