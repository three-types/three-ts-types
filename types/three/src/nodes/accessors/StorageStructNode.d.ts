import StorageBufferAttribute from "../../renderers/common/StorageBufferAttribute.js";
import { Struct } from "../core/StructNode.js";
import StorageBufferNode from "./StorageBufferNode.js";

interface StorageStructNodeInterface {
    readonly isStorageStructNode: true;
}

declare const StorageStructNode: {
    new(value: StorageBufferAttribute, structType: Struct): StorageStructNode;
};

type StorageStructNode = StorageStructNodeInterface & StorageBufferNode<"struct">;

export default StorageStructNode;

export const storageStruct: (value: StorageBufferAttribute, structType: Struct) => StorageStructNode;
