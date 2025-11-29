import Node from "../core/Node.js";
import ArrayElementNode from "../utils/ArrayElementNode.js";
import BufferNode from "./BufferNode.js";

type UniformArrayElementNode<TNodeType> = ArrayElementNode<TNodeType>;

declare class UniformArrayNodeInterface<TNodeType> {
    array: unknown[];
    elementType: string | null;
    paddedType: string;

    readonly isArrayBufferNode: true;

    getPaddedType(): string;

    element: (indexNode: Node) => UniformArrayElementNode<TNodeType>;
}

declare const UniformArrayNode: {
    new<TNodeType>(value: unknown[], elementType?: string | null): UniformArrayNode<TNodeType>;
};

type UniformArrayNode<TNodeType> = UniformArrayNodeInterface<TNodeType> & BufferNode<TNodeType, unknown[]>;

export default UniformArrayNode;

export const uniformArray: <TNodeType>(values: unknown[], nodeType?: string | null) => UniformArrayNode<TNodeType>;
