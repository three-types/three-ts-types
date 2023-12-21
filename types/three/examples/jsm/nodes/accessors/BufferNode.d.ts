import { NodeTypeOption } from '../core/constants.js';
import UniformNode from '../core/UniformNode.js';
import { NodeOrType, Swizzable } from '../shadernode/ShaderNode.js';

export default class BufferNode extends UniformNode {
    isBufferNode: true;

    bufferType: string;
    bufferCount: number;

    constructor(value: ArrayLike<number>, bufferType: NodeTypeOption, bufferCount?: number);
}

export const buffer: (value: ArrayLike<number>, nodeOrType: NodeOrType, count: number) => Swizzable<BufferNode>;
