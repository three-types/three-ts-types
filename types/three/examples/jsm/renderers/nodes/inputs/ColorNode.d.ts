import { Color } from './../../../../../src/Three';
import InputNode from '../core/InputNode';

export default class ColorNode extends InputNode {
    value: Color | string | number;

    isColorNode: boolean;

    constructor(value: Color | string | number);
}
