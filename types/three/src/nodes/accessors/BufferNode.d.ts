import UniformNode from "../core/UniformNode.js";
import { NodeOrType } from "../tsl/TSLCore.js";

interface BufferNodeInterface {
    isBufferNode: true;

    bufferType: string;
    bufferCount: number;
}

declare const BufferNode: {
    new<TNodeValue, TValue>(value: TValue, bufferType: string, bufferCount?: number): BufferNode<TNodeValue, TValue>;
};

export interface BufferNodeExtensions<TNodeValue, TValue> {
}

type BufferNode<TNodeValue, TValue> =
    & UniformNode<TNodeValue, TValue>
    & BufferNodeInterface
    & BufferNodeExtensions<TNodeValue, TValue>;

export default BufferNode;

export const buffer: <TNodeValue, TValue>(
    value: TValue,
    nodeOrType: NodeOrType,
    count: number,
) => BufferNode<TNodeValue, TValue>;
