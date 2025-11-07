import { BufferAttribute } from "../../core/BufferAttribute.js";
import StorageBufferAttribute from "../../renderers/common/StorageBufferAttribute.js";
import StorageInstancedBufferAttribute from "../../renderers/common/StorageInstancedBufferAttribute.js";
import { NodeAccess } from "../core/constants.js";
import Node from "../core/Node.js";
import { Struct } from "../core/StructNode.js";
import StructTypeNode from "../core/StructTypeNode.js";
import StorageArrayElementNode from "../utils/StorageArrayElementNode.js";
import BufferNode from "./BufferNode.js";

interface StorageBufferNodeInterface<TNodeType> {
    readonly isStorageBufferNode: true;

    structTypeNode: StructTypeNode | null;

    access: NodeAccess;
    isAtomic: boolean;
    isPBO: boolean;

    bufferObject: boolean;

    element: (indexNode: Node | number) => StorageArrayElementNode<TNodeType>;

    setPBO(value: boolean): this;

    getPBO(): boolean;

    setAccess(value: NodeAccess): this;

    toReadOnly(): this;

    setAtmoic(value: boolean): this;

    toAtomic(): this;
}

declare const StorageBufferNode: {
    new<TNodeType>(
        value: StorageBufferAttribute | StorageInstancedBufferAttribute,
        bufferType?: string | Struct | null,
        bufferCount?: number,
    ): StorageBufferNode<TNodeType>;
};

type StorageBufferNode<TNodeType> =
    & StorageBufferNodeInterface<TNodeType>
    & BufferNode<TNodeType, StorageBufferAttribute | StorageInstancedBufferAttribute>;

export default StorageBufferNode;

export const storage: <TNodeType>(
    value: StorageBufferAttribute | StorageInstancedBufferAttribute | BufferAttribute,
    type?: string | Struct | null,
    count?: number,
) => StorageBufferNode<TNodeType>;

/**
 * @deprecated
 */
export const storageObject: <TNodeType>(
    value: StorageBufferAttribute | StorageInstancedBufferAttribute,
    type?: string | Struct | null,
    count?: number,
) => StorageBufferNode<TNodeType>;
