import StorageBufferAttribute from "../../renderers/common/StorageBufferAttribute.js";
import StorageInstancedBufferAttribute from "../../renderers/common/StorageInstancedBufferAttribute.js";
import { GPUBufferBindingType } from "../../renderers/webgpu/utils/WebGPUConstants.js";
import { NodeRepresentation, ShaderNodeObject } from "../tsl/TSLCore.js";
import StorageArrayElementNode from "../utils/StorageArrayElementNode.js";
import BufferNode from "./BufferNode.js";

export default class StorageBufferNode extends BufferNode {
    readonly isStorageBufferNode: true;
    bufferObject: boolean;

    access: GPUBufferBindingType;

    constructor(
        value: StorageBufferAttribute | StorageInstancedBufferAttribute,
        bufferType?: string | null,
        bufferCount?: number,
    );

    element(indexNode: NodeRepresentation): ShaderNodeObject<StorageArrayElementNode>;

    setBufferObject(value: boolean): this;

    setAccess(value: GPUBufferBindingType): this;

    toReadOnly(): this;
}

export const storage: (
    value: StorageBufferAttribute | StorageInstancedBufferAttribute,
    type?: string | null,
    count?: number,
) => ShaderNodeObject<StorageBufferNode>;
export const storageObject: (
    value: StorageBufferAttribute | StorageInstancedBufferAttribute,
    type?: string | null,
    count?: number,
) => ShaderNodeObject<StorageBufferNode>;
