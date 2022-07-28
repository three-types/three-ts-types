import UniformNode from '../core/UniformNode';

export default class BufferNode extends UniformNode {
    isBufferNode: true;

    bufferType: string;
    bufferCount: number;

    constructor(value: ArrayLike<number>, bufferType: string, bufferCount?: number);
}
