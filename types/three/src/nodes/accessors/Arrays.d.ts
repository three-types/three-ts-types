import { TypedArray } from "../../core/BufferAttribute.js";
import { Struct } from "../core/StructNode.js";
import StorageBufferNode from "./StorageBufferNode.js";

export const attributeArray: <TElementType>(
    count: TypedArray | number,
    type?: string | Struct,
) => StorageBufferNode<TElementType>;

export const instancedArray: <TElementType>(
    count: TypedArray | number,
    type?: string | Struct,
) => StorageBufferNode<TElementType>;
