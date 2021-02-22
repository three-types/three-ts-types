import InputNode from '../core/InputNode';

export class FloatNode extends InputNode {
    value: number;
    isFloatNode: boolean;

    constructor(value: number);
}

export default FloatNode;
